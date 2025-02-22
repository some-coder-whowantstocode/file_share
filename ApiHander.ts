import { uploadfile } from "./controllers/Upload";

export const ApiHandler =(req:Request,res:Response)=>{
    switch(req.url){
        case "/API/uploadfile" :
            uploadfile(req,res);
        break;

        default:
            return (res as any).status(404).end("No such path exists");
    }
}