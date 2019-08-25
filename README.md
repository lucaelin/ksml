# ksml - Kerboscript GUI-code generator
This tool creates Kerboscript from XML files, crafted to represent GUI-Layouts.

## Example XML
  `myinterface.ksml`
  ```xml
<vbox>
  <label style:font='"Roboto Monospace"' style:fontsize='20'>mylabel</label>
  <hbox>
    <label id='myelement' style:font='"Roboto Monospace"' style:fontsize='20'>
      &lt;b&gt;mylabel2 rich text&lt;/b&gt;
    </label>
    <button onclick='{ print "button pressed". }'>mybutton</button>
  </hbox>
</vbox>
  ```
  Now you can run `npm start ./myinterface.ksml` and it's going to generate a second file called `myinterface.ksml.ks` containing the GUI-code.
  
## Gotchas
  If you want to set a labels font, you say:
    `<label style:font='"Roboto Monospace"'>mytext</label>`.
  Note that both single and doublequotes are used to represent a string value as attribute!

  This way it is possible to add inline anonymous functions as well:
    `<button onclick='{ print "button pressed". }'>mybutton</button>`

  If you want to use Rich Text, you need to HTML-Encode the text:
    `&lt;b&gt;value2&lt;/b&gt;`


## Adding the generated code into your project is easy:
  Call the file from your Kerboscropt code and pass it a GUI to render to:
  ```
    local g is GUI(400).
    run "myinterface.ks"(g).
    g:SHOW().
  ```


## Using ID:
  IDs can be use to dynamically pick certain elements from your interface.
  First add an ID-Attribute to the element you want to use inside your own code:
    `<label id='mylabel' >mylabel</label>`
  Now you can pass a second argument when running the interfaces script:
  ```
    local g is GUI(400).
    local ids is LEX().
    run "interface.ksml.ks"(g, ids).
    g:SHOW().
    set ids["mylabel"]:TEXT to "My fancy text.".
  ```

## Uploading and Downloading ksml files:
  You can upload your local xml files into the editor.
  Uploading a local .ksml.ks file, previously downloaded using this tool, will restore the XML it originated from.
        
