import { FILE_INFORMATION, addFileInfo, clearFileInfo } from "./store.js";

class Uploader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        * {
          padding: 0;
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          box-sizing: border-box;
        }
        #dropbox {
          max-width: 100dvw;
          height: 40dvw;
          border: 2px dashed rgb(0, 0, 26);
          background-color: rgba(179, 179, 241, 0.281);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        #file {
          display: none;
        }
        #filedata {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .filelogo {
          width: 100px;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        header {
          background-color: #4CAF50;
          color: white;
          padding: 15px 0;
          text-align: center;
          height: 100px;
          width: 100vw;
          border: 2px;
        }
        nav {
          text-align: center;
          margin: 20px 0;
        }
        nav a {
          margin: 0 15px;
          text-decoration: none;
          color: #4CAF50;
        }
        .container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px 0;
          position: fixed;
          width: 100%;
          bottom: 0;
        }
      </style>
      <input type="file" name="file" id="file" multiple>
      <label id="dropbox" for="file">
        Click here to select file or drop file here 
      </label>
      <div id="fileinfo"></div>
        `;

    this.initialize();
  }

  initialize() {
    const file = this.shadowRoot.getElementById("file");

    const Renderer = (element) => {
      try {
        if (typeof element !== "object" || element === null) {
          console.log("Renderer inside custom renderer only accepts objects");
          return null;
        }
        const {
          elem,
          val,
          id,
          classes = [],
          attr = [],
          children = [],
        } = element;

        if (typeof elem !== "string") {
          console.log("the element is missing some parameters");
          return null;
        }

        const parent = document.createElement(elem);
        val && (parent.innerText = val);

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

    const GenerateFile = (filedata, file) => {
      if (file) {
        const image = {
          elem: "img",
          attr: [
            ["src", "assets/document.jpg"],
            ["alt", "document"],
          ],
          classes: ["filelogo"],
        };
        const title = {
          elem: "div",
          val: file.name,
        };
        const img = Renderer(image);
        const element = Renderer(title);
        if (filedata) {
          const node = document.getElementById(filedata);
          const div = document.createElement("div");
          // div.setAttribute('id',`filedata${}`)
          if (img) {
            div.appendChild(img);
          }

          if (element) {
            div.appendChild(element);
          }
          node.appendChild(div);
        }
      }
    };

    const GenerateAll = () => {
      const filedata = "filedata";
      const existingFile = document.getElementById(filedata);
      existingFile && existingFile.remove();
      console.log(existingFile);

      const newfiledata = {
        elem: "div",
        attr: [["id", filedata]],
      };
      const elem = Renderer(newfiledata);
      if (elem) {
        document.body.appendChild(elem);
      }

      FILE_INFORMATION.map((info) => {
        GenerateFile(filedata, info);
      });
    };

    file &&
      file.addEventListener("input", (e) => {
        try {
          const element = e.target;
          if (!element) return;

          const { files } = element;

          // const reader = new FileReader();

          // reader.onload = (event)=>{
          //   const filedata = event.target.result;
          //   console.log(filedata);
          // }
          clearFileInfo();
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              // reader.readAsArrayBuffer(files[i])
              uploadFile(files[i]);
              addFileInfo(files[i]);
            }
          }
          GenerateAll();
        } catch (error) {
          console.log(error);
        }
      });

    const uploadFile = async (file) => {
      try {
        const chunkSize = 1024 * 1024;
        const totalChunks = Math.ceil(file.size / chunkSize);

        const reader = new FileReader();

        reader.onload = async (event) => {
          let filedata = event.target.result;
          filedata = filedata.replace(/^data:application\/pdf;base64,/, "");
          for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = filedata.slice(start, end);

            const response = await fetch("API/uploadfile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                start,
                end: i == totalChunks - 1,
                blob: chunk,
                name: file.name,
              }),
            });

            const reader = response.body.getReader();
            const { value } = await reader.read();
            console.log(value);
            const decoder = new TextDecoder();
            const text = decoder.decode(value);
            console.log(text);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
      }
    };
  }
}

customElements.define("upload-page", Uploader);
