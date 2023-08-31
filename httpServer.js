const http = require("http");
const fs = require("fs");
class HttpServerManager {
  constructor() {
    this.server = http.createServer((req, res) => {
      let url = req.url;
      if (url === "/") {
        url = "/index.html";
      }
      const filePath = "./webPage" + url;
      const contentType = HttpServerManager.getContentType(filePath);
      if (contentType === null) {
        res.writeHead(500);
        res.end("500 - Internal Server Error");
        return;
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code === "ENOENT") {
            res.writeHead(404);
            res.end("404 - Not Found");
          } else {
            res.writeHead(500);
            res.end("500 - Internal Server Error");
          }
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf-8");
        }
      });
    });
  }

  Listen() {
    this.server.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
  }

  static getContentType(filePath) {
    if (filePath.endsWith(".html")) {
      return "text/html";
    }
    if (filePath.endsWith(".css")) {
      return "text/css";
    }
    if (filePath.endsWith(".js")) {
      return "text/javascript";
    }
    if (filePath.endsWith(".webp")) {
      return "image/webp";
    }
    if (filePath.endsWith(".json")) {
      return "application/json";
    }
    if (filePath.endsWith(".png")) {
      return "image/png";
    }
    return null;
  }
}

module.exports = HttpServerManager;
