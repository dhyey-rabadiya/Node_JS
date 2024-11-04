console.log("Express Tutorial");

const express = require("express");
const app = express();

// Import of the routes
const people = require("./routes/people");
const peopleControllerRoute = require("./routes/peopleController");

// Middleware which helps us to get the data from the POST, PUT and DELETE methods as a json() object
app.use(express.json());
// Normal routing with the methods defined in the same file
// app.use("/api/", people);
// Advanced Routing with methods seperated into seperate file as a controllers
app.use("/api", peopleControllerRoute);

app.listen(8000, () => console.log("Server started on port 8000"));
