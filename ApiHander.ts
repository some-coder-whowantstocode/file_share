import { uploadfile } from "./controllers/Upload";
import { errorHandler } from "./middleware/errorHandler";

export const ApiHandler =(req:any,res:any)=>{
    switch(req.url){
        case "/API/uploadfile" :
            errorHandler(req,res,uploadfile);
        break;

        default:
            return (res as any).status(404).end("No such path exists");
    }
}