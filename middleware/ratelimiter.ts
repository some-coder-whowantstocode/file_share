//per-ip rate limmitng , token bucket and header/cookie

const userIP : Map<string, number> = new Map();
const RequestLimit = {
    duration:15 * 60 * 1000,
    currReqs:0,
    maxReqs:2000,
    message:"Server is busy right now try again later."
};
const BlockedIp :Map<string, string> = new Map();

(()=>{
    setInterval(() => {
        RequestLimit.currReqs = 0;
    }, RequestLimit.duration);
})();

export const RateLimiter = (req:Request, res:Response)=>{
    try {
        if(RequestLimit.currReqs >= RequestLimit.maxReqs ){
            (res as any).status(429).end(RequestLimit.message);
            return;
        }
        const ip : string | undefined = (req as any).connection.remoteAddress || (req as any).headers["x-forwarded-for"];
        if(!ip) {
            (res as any).status(400).end("Invalid request no IP found");
            return;
        }
        const isBlocked = BlockedIp.has(ip);
        if(isBlocked){
            return (res as any).status(403).send('Your id has been temporaryly blocked\.');
        }
        const reqcount = userIP.get(ip);
        if (reqcount){
            if(reqcount > 60){

            }
        }else{
            userIP.set(ip,1);
        }
        
    } catch (error) {
        console.log(error)
    }
}
