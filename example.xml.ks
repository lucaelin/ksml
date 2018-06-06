parameter node.
parameter ids.
  {
  local parent is node.
  local node is parent:addvbox.
  //attributes
  //childnodes
  
    {
    local parent is node.
    local node is parent:addlabel.
    //attributes
    set node:style:fOnt to "Roboto Monospace".
    set node:style:fontsize to 20.
    //childnodes
    set node:text to "value".
    }
  
    {
    local parent is node.
    local node is parent:addhbox.
    //attributes
    //childnodes
      {
      local parent is node.
      local node is parent:addlabel.
      //attributes
      ids:ADD("myelement", node).
      set node:style:font to "Roboto Monospace".
      set node:style:fontsize to 20.
      //childnodes
      set node:text to "<b>value2<\b>".
      }
    }
  
  }
