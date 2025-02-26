import { deleteFile } from "./controllers/delete";
import { downloadFile } from "./controllers/download";
import { listFiles } from "./controllers/list";
import { uploadfile } from "./controllers/Upload";
import { errorHandler } from "./middleware/errorHandler";

export const ApiHandler =(req:any,res:any)=>{
    switch(req.url){
        case "/API/uploadfile" :
            errorHandler(req,res,uploadfile);
        break;

        case "/API/listfile" :
            errorHandler(req,res,listFiles);
        break;

        case "/API/downloadFile" :
            errorHandler(req,res,downloadFile);
        break;

        case "/API/deleteFile" :
            errorHandler(req,res,deleteFile);
        break;

        default:
            return (res as any).status(404).end("No such path exists");
    }
}