import fs from 'fs';
import path from 'path';

export const ServeFile = (contentType : String, url: String, res: Response) => {
  const filepath = path.join(
    __dirname,
    `client${url}`
  );
  console.log(filepath)
  const stat = fs.statSync(filepath);

  (res as any).writeHead(200, {
    "Content-Type": contentType,
    'Cache-Control': 'public, max-age=3600',
    "Content-Length": stat.size
  });

  const readStream = fs.createReadStream(filepath);
  readStream.pipe((res as any));
};
