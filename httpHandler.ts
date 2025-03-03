import { ApiHandler } from "./ApiHander";
import { errorHandler } from "./middleware/errorHandler";

const { ServeFile } = require("./serveFile");

interface typeStore {
  [key: string]: String;
}

export const handler = (req: any, res: any) => {
  const Apiroute = req.url.split("/");
  switch (req.method) {
    case "POST":
      {
        let data : Buffer[] =[];
        req.on('data',(chunk:Buffer)=>{
          data.push(chunk);
        })
        req.on('end',()=>{
          try {
          if(data.length === 0){
            throw new Error("body not found");
          }
          const body = JSON.parse(Buffer.concat(data).toString());
          req.body = body;
          if (Apiroute[1] == "API") {
            errorHandler(req,res,ApiHandler)
          }
          } catch (error : any) {
            res.writeHead(500);
            res.end("something went wrong")
          }
          
        })
        
      }
      break;

    case "GET":
      {
          const urlParts = req.url.split(".");
          const extention = urlParts[urlParts.length - 1];
          switch (extention) {
            case "/":
              {
                ServeFile("text/html", "/index.html", res);
              }
              break;

            case "js":
              {
                const url = urlParts[urlParts.length - 2] + "." + extention;
                ServeFile("application/javascript", url, res);
              }
              break;

            case "css":
              {
                const url = urlParts[urlParts.length - 2] + "." + extention;
                ServeFile("text/css", url, res);
              }
              break;

            default:
              // const regex = /assets/
              let url = urlParts[urlParts.length - 2] + "." + extention;
              if (url) {
                const t = req.url.split(".").pop();
                const assetType: typeStore = {
                  jpg: "image/jpg",
                  png: "image/png",
                  ico: "image/x-icon",
                };
                // if(t == "ico"){
                //     url = "/assets"+url
                // }
                const contentType = assetType[t as string] || "";
                ServeFile(contentType, url, res);
              }

              break;
          }
      }
      break;

    default:
  }
};

