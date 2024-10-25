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

server.listen(8000);
