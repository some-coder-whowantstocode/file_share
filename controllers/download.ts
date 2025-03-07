import fs from 'fs';
import http from 'http';
import path from 'path';

export const downloadFile =(req:any,res:any)=>{
    const {filename} = req.queries;
    console.log(filename)
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

        const uploadDir = path.join(process.cwd(), 'uploaded');
        const filepath = path.join(uploadDir, filename);

        // Set headers for file download
        // res.writeHead(200, {
        //     'Content-Type': 'application/octet-stream',
        //     'Content-Disposition': `attachment; filename="${filename}"`,
        // });

        // Create a readable stream and pipe it to the response
        const fileStream = fs.createReadStream(filepath);
        fileStream.pipe(res);

        // Handle file stream errors
        fileStream.on('error', (err) => {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ err: "Error while reading the file." }));
        });
    })
    // res.end("hi")
}