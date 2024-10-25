// const { error } = require("console")
const { readFile, writeFile } = require("fs");

readFile("./content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  const first = result;
  // console.log(first);

  readFile("./content/second.txt", "utf8", (err, result) => {
    const second = result;
    console.log(second);

    writeFile(
      "./content/resultAsync.txt",
      `${first} ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(result);
      }
    );
  });
});
