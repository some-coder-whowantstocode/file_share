import fs from 'fs';

export const uploadfile = (req:any, res:any)=>{
    res.writeHead(200, {
        "Content-Type": "application/json",
    });


    const base64string = req.body.blob;

    const filedata = base64string;
    // console.log(filedata)

    // fs.writeFile(`./uploaded/${req.body.name}`,filedata,(err)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("file craeted lol")
    // })
    

    res.end(JSON.stringify({message:"super"}))
}