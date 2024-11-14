require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
// USE v2
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Router import
const productRouter = require("./routes/productRoutes");

// database
const connectDB = require("./db/connect");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
// to parse the json data from the req.body
app.use(express.json());
// We are using cloudinary over here in this project to upload image files to the server, as here we are setting this in such manner that once the file gets uploaded to the cloudinary then the local file will automatically gets deleted
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

// Router set-up
app.use("/api/v1/products", productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
