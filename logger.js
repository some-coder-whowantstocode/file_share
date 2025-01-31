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

const write = async(message)=>{
    try{
        await create();
        fs.open(filepath,'a',(err,fd)=>{
            if(err) console.log(err);

            try{
                fs.appendFile(fd,message+'\n','utf-8',(err)=>{
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

module.exports = { write}