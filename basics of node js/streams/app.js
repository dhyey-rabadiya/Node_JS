const { createReadStream } = require("fs");

// Why There is a need of stream ??
// When we try to read a large text file and try to store it in some variable, at that time we will get an error by reading a large file into a small variable
// Inorder to be safe from errors while reading big files, we need to use stream instead of directly readFileSync or readFile\

const stream = createReadStream("./content/large.txt", {
  highWaterMark: 90000,
  encoding: "utf8",
});
stream.on("data", (result) => {
  console.log(result);
});
