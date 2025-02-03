  import './store.js'
  const file = document.getElementById("file");

  const Renderer = (element) => {
    try {
      if (typeof element !== "object" || element === null) {
        console.log("Renderer inside custom renderer only accepts objects");
        return null;
      }
      const { elem, val, id, classes = [], attr = [], children = [] } = element;

      if (typeof elem !== "string") {
        console.log("the element is missing some parameters");
        return null;
      }

      const parent = document.createElement(elem);
      val && (parent.innerText = val)

      if (Array.isArray(attr)) {
        attr.map(([name, value]) => {
          if (typeof name === "string" && typeof value === "string") {
            parent.setAttribute(name, value);
          } else {
            console.warn("name and value in attr must be string");
          }
        });
      } else {
        console.warn("attr must be an array of [name,value]");
      }

      if (Array.isArray(classes)) {
        classes.map((c) => {
          if (typeof c === "string") {
            parent.classList.add(c);
          } else {
          }
        });
      } else {
        console.warn("classes must be an array of classnames");
      }

      if (Array.isArray(children)) {
        children.map((child) => {
          const newchild = Renderer(child);
          if (newchild) parent.appendChild(newchild);
        });
      }

      return parent;
    } catch (error) {
      console.log(error);
    }
  };

  const GenerateFile = (filedata,file)=>{
      
          if (file) {
            const image = {
                  elem:"img",
                  attr:[
                    ["src","assets/document.jpg"],
                    ["alt","document"],
                  ],
                  classes:["filelogo"]
            };
            const title = {
                elem:"div",
                val: file.name,
            }
            const img = Renderer(image);
            const element = Renderer(title);
            if(filedata){
              const node = document.getElementById(filedata);
              const div = document.createElement('div');
              if(img){
                div.appendChild(img);
              }
              
              if(element){
                div.appendChild(element);
              }
              node.appendChild(div);
            }
           
          }
  }

  file &&
    file.addEventListener("input", (e) => {
      try {
        const element = e.target;
        if (!element) return;

        const { files } = element;

        const filedata = "filedata";
        const existingFile = document.getElementById(filedata);
        existingFile && existingFile.remove();

        const newfiledata = {
          elem: "div",
          attr:[
            ["id",filedata]
          ]
        };
        const elem = Renderer(newfiledata);
        if(elem){
          document.body.appendChild(elem);
        }
       
        
        if (files && files.length > 0) {
          for (let i=0;i<files.length;i++){
            GenerateFile(filedata,files[i]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
