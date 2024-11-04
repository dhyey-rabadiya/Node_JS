const express = require("express");
const app = express();

// Import of the routes
const peopleRoute = require("./routes/people");
const authRoute = require("./routes/auth");

// Middleware which helps us to get the data from the POST, PUT and DELETE methods as a json() object
app.use(express.json());
app.use("/api/people", peopleRoute);
app.use("/login", authRoute);

app.listen(8000, () => console.log("Server started on port 8000"));
