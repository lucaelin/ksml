import xmldom from 'xmldom';
const parser = new xmldom.DOMParser();

function parseAttribute(attribute) {
  if(attribute.prefix==='param') return;
  if(attribute.name.toLowerCase() === 'id') {
    return `ids:ADD("${attribute.value}", node).`;
  }
  return `set node:${attribute.name} to ${attribute.value}.`;
}

function parseParameter(attribute) {
  if(attribute.prefix!=='param') return;
  return attribute.value;
}

function parseDocumentNode(node) {
  let childcode = [];
  if(node.childNodes) {
    for(let i = 0; i < node.childNodes.length; i++) {
      const cn = node.childNodes[i];
      childcode.push(parseNode(cn));
    }
  }
  return `parameter node.
parameter ids is LEX().
${childcode.join('\n')}
`;
}

function parseTextNode(node) {
  let txt = node.data.trim();
  if(txt) {
    return `  set node:text to "${txt}".`;
  }
  return ``;
}

function parseElementNode(node) {
  let childcode = [];
  if(node.childNodes) {
    childcode.push(`\n  //childnodes`);
    for(let i = 0; i < node.childNodes.length; i++) {
      const cn = node.childNodes[i];
      const code = parseNode(cn);
      if(code) childcode.push(parseNode(cn));
    }
  }

  let attrcode = [];
  let parameter = [];
  if(node.attributes) {
    attrcode.push(`\n  //attributes`);
    for(let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      const code = parseAttribute(attr);
      if(code) attrcode.push(code);
      const param = parseParameter(attr);
      if(param) parameter.push(param);
    }
  }

  return (
    `{\n`+
    `  local parent is node.\n`+
    `  local node is parent:add${node.tagName}(${parameter.join(', ')}).\n`+
    `  `+attrcode.join('\n  ')+'\n'+
    `  `+childcode.join('\n')+'\n'+
    `}`
  ).split('\n').map(s=>'  '+s).join('\n');
}

function parseNode(node) {
  switch(node.nodeType) {
    case node.TEXT_NODE:
      return parseTextNode(node);
    case node.ELEMENT_NODE:
      return parseElementNode(node);
    case node.DOCUMENT_NODE:
      return parseDocumentNode(node);
    default:
      return ``;
  }
}

export function convert(xml) {
  const dom = parser.parseFromString(xml, "text/html");
  return parseNode(dom);
}

export function onlineConvert(input) {
  const code = convert(input);
  const output = '// This code is generated using KSML (lucaelin.github.io/ksml)\n'
    + '// KSML-Source: ~'
    + btoa(unescape(encodeURIComponent(input)))
    + '~\n'
    + code;
  return output;
}
