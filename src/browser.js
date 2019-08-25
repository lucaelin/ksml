import * as ksml from './ksml.js';

const editor = ace.edit(document.querySelector('#editor'));
if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
  editor.setTheme("ace/theme/twilight");
}
editor.session.setMode("ace/mode/xml");
const dom = {
  error: document.querySelector('#error'),
  output: document.querySelector('#output'),
};

function prefixedConvert(input, onerror) {
  const code = ksml.convert(input, onerror);
  const output = '// This code is generated using KSML (lucaelin.github.io/ksml)\n'
    + '// KSML-Source: ~'
    + btoa(unescape(encodeURIComponent(input)))
    + '~\n'
    + code;
  return output;
}

function update() {
  const input = editor.getValue();
  dom.error.innerText = '';
  dom.error.style.display = 'none';
  const output = prefixedConvert(input, (e)=>{
    dom.error.innerText = e;
    dom.error.style.display = 'block';
  })
  dom.output.innerText = output;
  return output;
}

document.querySelector('#convert').addEventListener('click', update);

document.querySelector('#download').addEventListener('click', function(){
  const output = update();

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
  element.setAttribute('download', 'interface.ksml.ks');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
});

document.querySelector('#upload').addEventListener('click', function(){
  const element = document.createElement('input');
  element.setAttribute('type', 'file');
  element.setAttribute('hidden', true);
  document.body.appendChild(element);

  element.addEventListener('change', function(e) {
    new Response(element.files[0]).text().then(function(text) {
      const input = text.split('\n').filter(l => l.startsWith('// KSML-Source: ~'));
      if(input.length) {
        const [_, enc] = input[0].split('~');
        editor.setValue(atob(enc));
      } else {
        editor.setValue(text);
      }

      update();
    });
  })
  element.click();

  document.body.removeChild(element);
});
