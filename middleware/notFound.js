const path = require('path');
const fs = require('fs')

const Redirect = (res, url) => {
  try {
    switch (url) {
      case "NotFound": {
        const dir = __dirname.split('/middleware')[0];
        const filepath = path.join(dir, "client/pages/NotFound.html");
        const stat = fs.statSync(filepath);

        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": stat.size,
        });

        const readStream = fs.createReadStream(filepath);
        readStream.pipe(res);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {Redirect}