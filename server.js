const http = require('http');
const fs = require("fs");
const { receiveMessageOnPort } = require('worker_threads');

const server = http.createServer((req, res) => {
  // Your code here

  if (req.url.startsWith('/static')) {
    const assetFile = fs.readFileSync('./assets/images/dog.jpg')

    if (req.url === './assets/images' && req.method === 'GET') {
      res.setHeader('Content-Type', 'image.jpeg')
      res.end(assetFile)
    }
    if (req.url === './assets/css' && req.method === 'GET') {
      res.setHeader('Content-type', '')
    }
  }

  const helloText = fs.readFileSync('./index.html')
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(helloText)

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
