const fs = require("fs");
const path = require("path");

const ServeFile = (contentType, url, res) => {
  const filepath = path.join(
    __dirname,
    `client${url}`
  );
  const stat = fs.statSync(filepath);

  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": stat.size,
  });

  const readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
};

module.exports = { ServeFile };
