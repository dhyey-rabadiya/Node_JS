const express = require("express");
const app = express();
const { products } = require("./data");

// This is just an example to send data in json format
app.get("/", (req, res) => {
  res.json([
    { name: "Dhyey", surname: "Rabadiya" },
    { name: "Manav", surname: "Kheni" },
  ]);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8000, () => console.log("Server Started on port 8000"));
