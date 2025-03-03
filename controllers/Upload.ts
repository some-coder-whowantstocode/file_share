import fs from "fs";

export const uploadfile = (req: any, res: any) => {
  const { start, end, blob, name } = req.body;

  const files = fs.readdirSync('./uploading');

  const exists = files.find(file=>file === name);

  const filepath = `./uploading/${name}`;

  console.log(exists)

  if (!exists){
    fs.writeFileSync(filepath,blob)
  }else {
    const filedata = fs.statSync(filepath);

    if (filedata.size > start ){
      res.writeHead(400);
      res.end(JSON.stringify({err:"file upload is corrupted"}));
      return;
    }
  
    fs.writeFileSync(filepath,blob,{flag:"a+"});
  
   
  }

  if(end){
    const newPath = `./uploaded/${name}`;
    fs.renameSync(filepath,newPath);
  }
 
  res.writeHead(201);
  res.end(JSON.stringify({msg:"chunk uploaded"}));

};
