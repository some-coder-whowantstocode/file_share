import { Redirect } from "./notFound";
import { write } from "../logger";
import { RateLimiter } from "./ratelimiter";

export const errorHandler =async(req : any,res: any, handler : Function)=>{
        try {
            // RateLimiter(req,res);
            handler(req,res);
            } catch (error:any) {
                write((error.message as string))
                const errorCode = (error as any).code;
                switch(errorCode){
                    case "ENOENT":
                        Redirect(res,"NotFound");
                        break;
                    default :
                        (res as any).end("400 Bad Request.");
                    break;
                    }

            }
}
