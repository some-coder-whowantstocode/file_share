import fs from 'fs';

export const uploadfile = (req:any, res:any)=>{
    res.writeHead(200, {
        "Content-Type": "application/json",
    });


    const base64string = req.body.blob;

    const filedata = Buffer.from(base64string, 'base64');

    fs.writeFile(req.body.name,filedata,(err)=>{
        if(err){
            console.log(err);
        }
        console.log("file craeted lol")
    })
    // console.log(req.body.blob);
    // req.body.blob.then((ab : string)=>{
        // const buffer = Buffer.from(req.body.blob);
                
        // fs.writeFile('hi.txt',buffer,(err)=>{
        //     console.log(err);
        // })
    // })

    res.end(JSON.stringify({message:"super"}))
}