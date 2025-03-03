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
  }
}

customElements.define('upload-page',Uploader);