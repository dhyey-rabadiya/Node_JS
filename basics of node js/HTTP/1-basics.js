const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to Home page");
    return;
  }

  if (req.url === "/about") {
    res.end("Welcome to about page");
    return;
  }

  res.end(`
    <h1> OOps Page not Found </h1>
    `);
});

// Here on the creation of server we are passing a callback function with req and res
// We can alternatively use the evens package and emitter
const server2 = http.createServer;
server2.on("request", (res, res) => {
  res.end("Hello from the server");
});

server.listen(8000);
