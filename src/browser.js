import { convert, onlineConvert } from './ksml.js';

const editor = ace.edit(document.querySelector('#editor'));
editor.session.setMode("ace/mode/xml");
document.querySelector('#convert').addEventListener('click', function(){
  const input = editor.getValue();
  const output = onlineConvert(input);
  document.querySelector('pre').innerText = output;
});
document.querySelector('#download').addEventListener('click', function(){
  const input = editor.getValue();
  const output = onlineConvert(input);
  document.querySelector('pre').innerText = output;

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
      const input = text.split('\n');
      if(input[1] && input[1].startsWith('// KSML-Source: ~')) {
        const [_, enc] = input[1].split('~');
        editor.setValue(atob(enc));
      } else {
        editor.setValue(text);
      }

      const output = onlineConvert(editor.getValue());
      document.querySelector('pre').innerText = output;
    });
  })
  element.click();

  document.body.removeChild(element);
});
