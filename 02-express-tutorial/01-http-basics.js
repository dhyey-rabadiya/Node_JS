const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // The below line specifies the meta data about the request and the response recieved
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1> Hello, Welcome to the Server </h1>");
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1> Welcome to About Page </h1>");
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1> You seem to be lost </h1>");
    res.end();
  }
});

server.listen(8000, () => console.log("server started"));
