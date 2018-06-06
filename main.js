const parser = new (require('xmldom').DOMParser)();

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
  switch(node.constructor.name) {
    case 'Text':
      return parseTextNode(node);
    case 'Element':
      return parseElementNode(node);
    case 'Document':
      return parseDocumentNode(node);
    default:
      return ``;
  }
}

function convert(xml) {
  const dom = parser.parseFromString(xml, "text/html");
  return parseNode(dom);
}

if(typeof window !== 'undefined' && typeof document !== 'undefined') {
  editor = ace.edit(document.querySelector('#editor'));
  editor.session.setMode("ace/mode/xml");
  document.querySelector('button').addEventListener('click', function(){
    document.querySelector('pre').innerText = convert(editor.getValue());
  });
} else if(typeof global !== 'undefined') {
  const fs = require('fs');
  for(arg of process.argv.slice(2)) {
    let xml = fs.readFileSync(arg, 'utf8');
    fs.writeFileSync(arg+".ks", convert(xml));
  }
}
