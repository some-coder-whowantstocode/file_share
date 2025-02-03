const http = require('node:http');

const {Redirect} = require('./middleware/notFound');
const {ServeFile} = require('./serveFile');

const server = http.createServer({keepAliveTimeout:10000},async(req,res)=>{
    try {
        const urlParts = req.url.split('.');
        const extention = urlParts[urlParts.length-1];
        console.log(urlParts)
        
    switch (extention) {
        case "/":
            {   
                ServeFile("text/html","/index.html",res);
            }
            break;
    
        case "js": 
            {
                const url = urlParts[urlParts.length - 2]+"."+extention;
                ServeFile('application/javascript',url,res);
            }
            break;
        
        case "css":
            {
                const url = urlParts[urlParts.length - 2]+"."+extention;
                ServeFile('text/css',url,res);
            }
            break;
        
        default:
            const regex = /assets/
                const url = urlParts[urlParts.length - 2]+"."+extention;
                    const type = req.url.split('.').pop();
                    const assetType = {
                        "jpg":"image/jpg",
                        "png":"image/png"
                    }
                    ServeFile(assetType[type],url,res)
           
            break;
    }
} catch (error) {
    if(error.code === "ENOENT"){
        Redirect(res,"NotFound");
    }
    console.warn("lol",error)
}
})

server.on('clientError',(err, socket)=>{
    if(err.code === "ECONNERESET" || !socket.writable) {
        return;
    }
    socket.end('400 Bad Request')
})

server.listen(9310,()=>{console.log("server running")})