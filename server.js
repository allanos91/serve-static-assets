const http = require("http");
const fs = require("fs");
const { receiveMessageOnPort } = require("worker_threads");

const getContentType = (filename) => {
  const ext = filename.split(".")[1];
  let contentType;

  switch (ext) {
    case "jpg":
      contentType = "image/jpg";
      break;
    case "png":
      contentType = "image/png";
      break;
    case "css":
      contentType = "text/css";
      break;
    default:
      contentType = `text/plain`;
      console.log("no extension");
  }
  return contentType
};

const server = http.createServer((req, res) => {
  // Your code here

  //p2
  if (req.url.startsWith("/static")) {
    // const assetFile = fs.readFileSync('./assets/images/dog.jpg')
    //get req.url then split by '/', the last element should be the file extension we want to send (e.q. dog.jpg === jpg)
    //Parse the route
    if (req.method === "GET" && req.url.startsWith("/static")) {
      const assetPath = req.url.split("/static");

      try {
        const resBody = fs.readFileSync("./assets" + assetPath);
        res.statusCode = 200;
        return res.end(resBody);
      } catch {
        throw new Error("Cannot find the asset path");
      }
    }
    // const arr = req.url.split('/')
    // const targetFile = arr[arr.length - 1]
    // if()
    // if (req.url === './assets/images' && req.method === 'GET') {
    //   res.setHeader('Content-Type', 'image.jpeg')
    //   res.end(assetFile)
    // }
    // if (req.url === './assets/css' && req.method === 'GET') {
    //   res.setHeader('Content-type', '')
    // }
  }

  //p1
  const helloText = fs.readFileSync("./index.html");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(helloText);
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
