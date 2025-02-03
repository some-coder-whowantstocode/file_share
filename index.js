const http = require('node:http');
const fs = require('fs');
const path = require('path');

const server = http.createServer({keepAliveTimeout:10000},async(req,res)=>{
    try {
        const urlParts = req.url.split('.');
        const extention = urlParts[urlParts.length-1];
    switch (extention) {
        case "/":
            {
                const filepath = path.join(__dirname,'client/index.html');
                const stat = fs.statSync(filepath);
                
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': stat.size
                });
            
                const readStream = fs.createReadStream(filepath);
                readStream.pipe(res)
            }
            break;
    
        case "js": 
            {
                const filepath = path.join(__dirname,`client${urlParts[urlParts.length-2]}.js`);
                const stat = fs.statSync(filepath);
                
                res.writeHead(200, {
                    'Content-Type': 'application/javascript',
                    'Content-Length': stat.size
                });
            
                const readStream = fs.createReadStream(filepath);
                readStream.pipe(res);
            }
            break;
        
        case "css":
            {
                const filepath = path.join(__dirname,`client${urlParts[urlParts.length-2]}.css`);
                const stat = fs.statSync(filepath);

                res.writeHead(200, {
                    'Content-Type': 'text/css',
                    'Content-Length': stat.size
                });
            
                const readStream = fs.createReadStream(filepath);
                readStream.pipe(res);
            }
            break;
        
        default:
            const regex = /assets/
            if(regex.test(req.url)){
                const filepath = path.join(__dirname,"/client/assets/",req.url.split("assets/")[1]);
                const stat = fs.statSync(filepath);
                if ( !stat.isFile()){
                    res.end("404 not found");
                }else {
                    const type = req.url.split('.').pop();
                    const assetType = {
                        "jpg":"image/jpg",
                        "png":"image/png"
                    }
                    res.writeHead(200, {
                        'Content-Type': assetType[type],
                        'Content-Length': stat.size
                    }); 
                    const readStream = fs.createReadStream(filepath);
                    readStream.pipe(res);   
                }
            }else {
                res.end("404 page not found");
            }
            break;
    }
} catch (error) {
    console.log(error)
}
})

server.on('clientError',(err, socket)=>{
    if(err.code === "ECONNERESET" || !socket.writable) {
        return;
    }
    socket.end('400 Bad Request')
})

server.listen(9310,()=>{console.log("server running")})