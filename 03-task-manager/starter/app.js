const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
// We need to import the env module before using it
require("dotenv").config();

app.use(express.static("./public"));
// Middleware that lets us parse the body's data which comes as a json object
app.use(express.json());
// Routes Set-up
app.use("/api/v1/tasks", tasks);
// Middleware to handle routes that doesnt exist
app.use(notFound);
// Middleware to handle the errors
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("server");
});

const PORT = process.env.PORT || 8000;
// Async server to start the server after the successfull connection to the mongoDB ATLAS
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();

// In this project we are not working with the local files, but using the MongoDB as database instead
// Routes
// app.get("api/v1/tasks") // get all the tasks
// app.get("api/v1/tasks/:id") // get the single task
// app.post("api/v1/tasks") // create a new task
// app.put("api/v1/tasks/:id") // to update an existing task
// app.delete("api/v1/tasks/:id") // to delete a task from the DB
