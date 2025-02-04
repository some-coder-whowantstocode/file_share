const {ServeFile} = require('./serveFile');

interface typeStore {
    [key:string]:String
}

const handler = (req : Request,res: Response)=>{
    const urlParts = req.url.split('.');
    const extention = urlParts[urlParts.length-1];
    console.log(urlParts)
switch (extention) {
    case "/":
        {   
            ServeFile("text/html","/index.html",res);
        }
        break;

    case "js": 
        {
            const url = urlParts[urlParts.length - 2]+"."+extention;
            ServeFile('application/javascript',url,res);
        }
        break;
    
    case "css":
        {
            const url = urlParts[urlParts.length - 2]+"."+extention;
            ServeFile('text/css',url,res);
        }
        break;
    
    default:
        // const regex = /assets/
        let url = urlParts[urlParts.length - 2]+"."+extention;
        console.log(url)
        if(url){
            const t = req.url.split('.').pop();
            console.log(t)
            const assetType :typeStore = {
                "jpg":"image/jpg",
                "png":"image/png",
                "ico":"image/x-icon"
            }
            // if(t == "ico"){
            //     url = "/assets"+url
            // }
            const contentType = assetType[(t as string)] || ""
            ServeFile(contentType,url,res)
        }
       
        break;
}
}

module.exports = {handler}