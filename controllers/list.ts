import fs from 'fs';

export const listFiles =(req:any,res:any)=>{
    fs.readdir('./uploaded',{},(err,files)=>{
        if(err){
            console.log(err);
        }else {
            console.log(files)
        }
    })

}