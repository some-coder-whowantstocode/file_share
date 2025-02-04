import path from 'path';
import fs from 'fs';

export const Redirect = (res : Response, url:string) => {
  try {
    switch (url) {
      case "NotFound": {
        const dir = __dirname.split('/middleware')[0];
        const filepath = path.join(dir, "client/pages/NotFound.html");
        const stat = fs.statSync(filepath);

        (res as any).writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": stat.size,
        });

        const readStream = fs.createReadStream(filepath);
        readStream.pipe((res as any));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
