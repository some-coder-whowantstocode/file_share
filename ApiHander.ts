import { deleteFile } from "./controllers/delete";
import { downloadFile } from "./controllers/download";
import { listFiles } from "./controllers/list";
import { uploadfile } from "./controllers/Upload";
import { errorHandler } from "./middleware/errorHandler";

interface obj {
    [key :string]:string 
}

export const ApiHandler =(req:any,res:any)=>{
    const querys = req.url.split("?");
    const allqueries :obj = {};
    for(let i=1;i<querys.length;i++){
        const [key,value] = querys[i].split("=");

            allqueries[key] = value ;
    }
    req.queries = allqueries
    switch(querys[0]){
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