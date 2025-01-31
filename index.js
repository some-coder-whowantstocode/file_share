const http = require('node:http');
const fs = require('fs');
const path = require('path');

const server = http.createServer({keepAliveTimeout:10000},async(req,res)=>{
    if ( req.url === '/'){
        const filepath = path.join(__dirname,'client/index.html');
        const stat = fs.statSync(filepath);
        
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': stat.size
        });
    
        const readStream = fs.createReadStream(filepath);
        readStream.pipe(res)
    }
    else if ( req.url === '/index.js'){
        const filepath = path.join(__dirname,'client/index.js');
        const stat = fs.statSync(filepath);
        
        res.writeHead(200, {
            'Content-Type': 'application/javascript',
            'Content-Length': stat.size
        });
    
        const readStream = fs.createReadStream(filepath);
        readStream.pipe(res);
    }
    else if(req.url === '/index.css'){
        const filepath = path.join(__dirname,'client/index.css');
        const stat = fs.statSync(filepath);
        
        res.writeHead(200, {
            'Content-Type': 'text/css',
            'Content-Length': stat.size
        });
    
        const readStream = fs.createReadStream(filepath);
        readStream.pipe(res);
    }
    else {
        res.end("404 not found");
    }
})

server.on('clientError',(err, socket)=>{
    if(err.code === "ECONNERESET" || !socket.writable) {
        return;
    }
    socket.end('400 Bad Request')
})

server.listen(9310,()=>{console.log("server running")})