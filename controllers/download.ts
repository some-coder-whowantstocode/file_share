import fs from 'fs';
import http from 'http';

export const downloadFile =(req:any,res:any)=>{
    const {filename} = req.queries;
    fs.readdir('./uploaded',(err,files)=>{
        if(err){
            res.writeHead(500);
            res.end(JSON.stringify({err:"something went wrong"}))
            return;
        }
        const i = files.find((name)=>name == filename);
        if(!i){
            res.writeHead(404);
            res.end(JSON.stringify({err:"no such file exists"}))
            return;
        }
        const file = fs.createWriteStream(filename);
        http.get(`./uploaded/${filename}`,(response)=>{
            response.pipe(file);
            file.on("finish",()=>{
                file.close(()=>{
                    console.log("file downloaded successfully");
                })
            })
        }).on('error',(err)=>{
            fs.unlink(filename,()=>{
                console.log(err);
            })
        })
    })
    res.end("hi")
}