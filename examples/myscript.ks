local g is GUI(600).
local dom is LEX().

run "example.ksml.ks"(g, dom).

set dom:mylabel:TEXT to "My fancy text.".
set dom:mysecondbutton:ONClICK to {
  run "example.ksml.ks"(dom:recursion).
}.

g:SHOW().
