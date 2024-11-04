const express = require("express");
const app = express();

// Instead of creating a default route to the home page and explicitly passing the index.html file through res.sendFile
// There is also an alternative to this, that we can specify the folder and by default server will point to the index.html file, as it will be the starting point of any website and index.html contains all the imports of files and folders

app.use(express.static("./navbar-app"));

app.all("*", (req, res) => {
  res.send("<h1>You seem to be lost</h1>");
});

app.listen(8000, () => console.log("server started on port 8000..."));
