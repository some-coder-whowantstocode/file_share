export const uploadfile = (req:any, res:any)=>{
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(JSON.stringify({message:"super"}))
}