// We are not limited to entering the html manually when creating a server and checking the route or request, at that time sending the HTML via res.write() and then manually typing the HTML that we want to showcase on the page
// Instead we can also pass the entire file for the request also

const http = require("http");
const { readFileSync } = require("fs");

const homePage = readFileSync("./home.html");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  }
});

server.listen(8000, () => console.log("Server started"));

// Here if we closely take a look at the server it is only making a one request
// But what if i change the html file to the nav-bar app html source file, then that html file has linked a CSS file, a JS file and also a SVG logo
// So the server also makes a request to those resources and if we simply include the HTML file via this approach then our page will only render the HTML content and not the other things, for that we need to read all the files and make a seperate request for all the resources that a server is making then and then only we will be able to see the page properly rendered with all the styling and the logic
