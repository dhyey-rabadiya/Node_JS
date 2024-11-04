const app = require("express")();
const authorize = require("./authorize");
const { logger } = require("./logger");
const { products } = require("./data");

// Here the logger middleware is been applied to all the routes of the server
// But the authorize middleware is been applied to the routes that follows /API/
app.use([logger, authorize]);
// The line above implements two middlewares on all the routes therefore it provides unauthorized access to all the routes, even the starting route of the server
// app.use("/", logger);
// The line below indicates that a route that follows /api/ in that route implement a authorize() middleware, and only provide the data if user === "dhyey"
app.use("/api", authorize);

app.get("/", (req, res) => {
  res
    .status(200)
    .send('<h1>Home Page</h1><a href = "/api/products">Products<a>');
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

// What if i want to implement a some middlewares only specic to a route, then also it is possible with express
app.get("/api/items", [logger, authorize], (req, res) => {
  res.status(200).send("Items");
});

app.listen(8000, (req, res) => {
  console.log("Server started on 8000");
});
