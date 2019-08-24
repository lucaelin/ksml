// This code is generated using KSML (lucaelin.github.io/ksml)
// KSML-Source: ~PHZib3g+CiAgPGxhYmVsIHN0eWxlOmZvbnQ9JyJSb2JvdG8gTW9ub3NwYWNlIicgc3R5bGU6Zm9udHNpemU9JzIwJz48L2xhYmVsPgogIDxoYm94PgogICAgPGxhYmVsIGlkPSdteWVsZW1lbnQnIHN0eWxlOmZvbnQ9JyJSb2JvdG8gTW9ub3NwYWNlIicgc3R5bGU6Zm9udHNpemU9JzIwJz4KICAgICAgJmx0O2ImZ3Q7bXlsYWJlbDIgcmljaCB0ZXh0Jmx0Oy9iJmd0OwogICAgPC9sYWJlbD4KICAgIDxidXR0b24gb25jbGljaz0neyBwcmludCAiYnV0dG9uIHByZXNzZWQiLiB9Jz48L2J1dHRvbj4KICA8L2hib3g+CjwvdmJveD4=~
parameter node.
parameter ids is LEX().
  {
    local parent is node.
    local node is parent:addvbox().

    //attributes

    //childnodes
    {
      local parent is node.
      local node is parent:addlabel().

      //attributes
      set node:style:font to "Roboto Monospace".
      set node:style:fontsize to 20.

      //childnodes
    }
    {
      local parent is node.
      local node is parent:addhbox().

      //attributes

      //childnodes
      {
        local parent is node.
        local node is parent:addlabel().

        //attributes
        ids:ADD("myelement", node).
        set node:style:font to "Roboto Monospace".
        set node:style:fontsize to 20.

        //childnodes
        set node:text to "<b>mylabel2 rich text</b>".
      }
      {
        local parent is node.
        local node is parent:addbutton().

        //attributes
        set node:onclick to { print "button pressed". }.

        //childnodes
      }
    }
  }