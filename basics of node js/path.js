const path = require("path")

const testPath = path.join("/content", "subfolder", "test.txt")
console.log(testPath);

// to get the base path
console.log(path.basename(testPath));

// Lets Create an absolute path
const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt")
console.log(absolute);


