const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

// Route that returns all the products
app.get("/api/v1/products", (req, res) => {
  const newProds = products.map((product) => {
    const { id, name, desc } = product;
    return { id, name, desc };
  });
  // Here we are returning less information from the products
  res.json(newProds);
});

// This is a simple query with a single parameter
app.get("/api/v1/products/:productID", (req, res) => {
  // here req.params is an giant object that contains information about the request that has been performed
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if (!singleProduct) {
    res.status(404).send("<h1>Product not Found!</h1>");
  }

  res.json(singleProduct);
});

// Complex Parammeter URL
app.get("/api/v1/products/:productID/reviews/:reviewID", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Query example
app.get("/api/v1/query", (req, res) => {
  // console.log(req.query);
  let sortedProducts = [...products];

  // Here req.query is an objet which consists all queries that we provide
  const { search, limit } = req.query;
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }

  // Limit is used to prevent all the products to be sent to the URL request at once
  // The main purpose of the limit is to send limitied number of products at a time and also used in pagination of products
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  res.status(200).json(sortedProducts);
});

app.all("*", (req, res) => {
  res.send('<h1>You seem to be lost</h1><a href="/">Home</a>');
});

app.listen(8000, () => console.log("Server started on port 8000"));
