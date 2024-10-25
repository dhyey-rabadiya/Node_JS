// // const { error } = require("console")
// const { readFile, writeFile } = require("fs");

// readFile("./content/first.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   const first = result;
//   // console.log(first);

//   readFile("./content/second.txt", "utf8", (err, result) => {
//     const second = result;
//     console.log(second);

//     writeFile(
//       "./content/resultAsync.txt",
//       `${first} ${second}`,
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log(result);
//       }
//     );
//   });
// });

// This is the code from reading a file in asynchronous manner
// Lets convert this code into a readable code and also shorten code by the use of Promise()

const { readFile, writeFile } = require("fs");

const getData = (path) => {
  return new Promise((reject, resolve) => {
    readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const start = async () => {
  const first = await getData("../content/first.txt");
  const second = await getData("../content/second.txt");
  console.log(first, second);
};

start();
