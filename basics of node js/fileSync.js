const {readFileSync, writeFileSync} = require("fs")

// The lines below reads content from the txt files
const first = readFileSync("./content/first.txt", "utf-8")
const second = readFileSync("./content/second.txt", "utf-8")

console.log(first);
console.log(second);

// The line below writes the content by creating a new file result.txt if not exist ot else modifying the content of result.txt completely
writeFileSync("./content/result.txt", `${first} ${second}`)
writeFileSync("./content/result.txt", `${first} ${second}`, {flag: true})
// The above line will not remove the content from the existing file, instead it will just append the content to the existing content