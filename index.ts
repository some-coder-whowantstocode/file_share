import http from 'http';

import { errorHandler } from './middleware/errorHandler';
import {handler} from './httpHandler'

const server = http.createServer({keepAliveTimeout:10000},(req,res)=>{
    errorHandler(req,res,handler)
})

server.on('clientError',(err:Error, socket:any)=>{
    const errorCode = (err as any).code;
    if(errorCode === "ECONNERESET" || !socket.writable) {
        return;
    }
    socket.end('400 Bad Request')
})

server.listen(9310,()=>{console.log("server running")})