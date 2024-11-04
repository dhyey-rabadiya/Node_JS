const express = require("express");
const path = require("path");

const app = express();

// When we execute the code below then it gets executed and the HTML content from the Navbar app gets showed, but not the CSS, JS and all the other stuff
// Because the server also makes the request to all the files like CSS, JS and other but couldnt locate it therefore it only shows the skeleton of the page and not the styling
// We dont need to hard code all the request that a server makes to all the individual files
// Express comes with a inbuilt middleware
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });

// app.use() where we can specify the folder so that server will automatically locate those files
app.use(express.static("./navbar-app"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.listen(8000, () => console.log("Server Started on 8000..."));
