  import {FILE_INFORMATION, addFileInfo, clearFileInfo} from './store.js'
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
              // div.setAttribute('id',`filedata${}`)
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

  const GenerateAll =()=>{
    const filedata = "filedata";
    const existingFile = document.getElementById(filedata);
    existingFile && existingFile.remove();
    console.log(existingFile)

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

    FILE_INFORMATION.map((info)=>{
      GenerateFile(filedata,info);
    })
  }

  file &&
    file.addEventListener("input", (e) => {
      try {
        const element = e.target;
        if (!element) return;

        const { files } = element;

        const reader = new FileReader();

        // reader.onload = (event)=>{
        //   const filedata = event.target.result;
        //   console.log(filedata);
        // }
        clearFileInfo();
        if (files && files.length > 0) {
          for (let i=0;i<files.length;i++){
            // reader.readAsArrayBuffer(files[i])
          uploadFile(files[i]);
            addFileInfo(files[i]);
          }
        }
        GenerateAll()
      } catch (error) {
        console.log(error);
      }
    });


const uploadFile = async(file)=>{
  try {
    const chunkSize = 1024 * 1024;
    const totalChunks = Math.ceil(file.size/chunkSize);
    if (totalChunks != 1) {
      console.log("maximum size 1 mb allowed")
      return;
    }
    let currentChunk = 0;
    // console.log(totalChunks)
   const start = currentChunk * chunkSize;
   const end = Math.min(start + chunkSize, file.size);
   const blob = file.slice(start,end);
  //  const base64blob = await 
   const response = await fetch("API/uploadfile",{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      start,
      end,
      blob,
      chunkSize,
      currentChunk
    })
   })
  //  const jsonbody = await (response) 
   console.log(response.body)
  } catch (error) {
    console.log(error)
  }
}