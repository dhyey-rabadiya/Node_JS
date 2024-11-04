const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(401).send("Please provide the credentials to access this route");
  } else {
    res.status(201).send(`Welcome ${name}`);
  }
  console.log(name);
});

module.exports = router;
