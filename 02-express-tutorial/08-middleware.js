const express = require("express");
const app = express();

// Middlewares
// Whenever we define a method then there is a very important factor that must needs to be taken under consideration, we need to execute the next() function that we need to declare as an arguement and also at the end of the middleware function, need to call it to keep the server free from the previously executed middleware
const logger = (req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  next();
};

// This is an another way to implement middlewares to the routes
app.use(logger);

// In this by default URL to the home page of our server we are implementing a logger middleware which just prints about the info of the METHOD and the URL
app.get("/", logger, (req, res) => {
  res.status(200).send("Home");
});

app.get("/about", logger, (req, res) => {
  res.status(200).send("About");
});

app.listen(8000, () => console.log("Server started on port 8000"));
