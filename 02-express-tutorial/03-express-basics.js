const express = require("express");

const app = express();
// The above line creates a server
// This is very simple server creation as compared to in-built HTTP module

app.get("/", (req, res) => {
  res.status(200).send("Hello Welcome to the server");
  // The above line specifies that everything went good and with status 200 returning something to the server
});

app.get("/about", (req, res) => {
  res.send("Hello fromt the about page");
});

app.all("*", (req, res) => {
  res.send("<h1> You seem to be lost </h1>");
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

// Some methods that are provided by the Express
// app.get
// app.post // to create a new thing on the server
// app.put // to update something on the server
// app.delete // to delete something from the server
// app.patch // to update a specific thing on the server
// app.use
