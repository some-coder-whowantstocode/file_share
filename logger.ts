const fs = require('fs');
const path = require('path')

const filepath = path.join(__dirname,'log.txt');

const create = async()=>{
    try{
        if(fs.existsSync(filepath)) {
            return;
        }
        fs.writeFile(filepath,'');
    }catch(err){
        console.log("logger create is not working",err)
    }
   
}

export const write = async(message:string)=>{
    try{
        await create();
        fs.open(filepath,'a',(err:Error,fd:any)=>{
            if(err) console.log(err);

            try{
                fs.appendFile(fd,message+'\n','utf-8',(err:Error)=>{
                    if(err){
                        console.log(err)
                    }
                })
            }catch(err){
                console.log(err);
            }
        })
        
    }catch(err){
        console.log("error while logger write",write);
    }
}
