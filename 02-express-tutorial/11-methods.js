console.log("Express Tutorial");

const express = require("express");
const app = express();
const { people } = require("./data");

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This route returns all the people as a json data
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// POST method to create a new person into the local file or on the local server
app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res
      .status(401)
      .json({ success: false, msg: "Please provide the name value" });
  } else {
    res.status(201).send({ success: true, person: name });
  }
});

// Sample POST request for the testing purpose in the POSTMAN
app.post("/api/postman/people", (req, res) => {
  console.log(req.body);

  const { name } = req.body;

  if (!name) {
    res
      .status(401)
      .json({ success: false, msg: "Please provide the name value" });
  } else {
    res
      .status(201)
      .send({ success: true, data: [...people, { name, id: new Date() }] });
  }
});

// Sample put method to update some random person's name from the people array
app.put("/api/people/:personID", (req, res) => {
  const { name } = req.body;
  const { personID } = req.params;

  if (!name) {
    res.status(401).json({
      success: false,
      msg: "Please provide a name to update the previous name",
    });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(personID)) {
      person.name = name;
    }
    return person;
  });

  res
    .status(201)
    .send({ success: true, msg: "Data updated succesfully", data: newPeople });
});

// Sample delete method to delete a person from the people array
app.delete("/api/people/:personID", (req, res) => {
  const { personID } = req.params;

  // Check if personID is provided
  if (!personID) {
    return res.status(400).json({
      success: false,
      msg: "Please provide an ID to remove a person from the list",
    });
  }

  // Find the person in the array
  const personIndex = people.findIndex(
    (person) => person.id === Number(personID)
  );
  if (personIndex === -1) {
    return res.status(404).json({
      success: false,
      msg: "Person not found in the list",
    });
  }

  // Remove the person from the array
  const newPeople = people.filter((person) => person.id !== Number(personID));
  res.status(200).json({
    success: true,
    msg: "Person deleted successfully from the list",
    data: newPeople,
  });
});

// This is a post route to create a new item in our local DB or onto the server, but before that we need a parser to read the body that comes by default with the express
app.post("/login", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(401).send("Please provide the credentials to access this route");
  } else {
    res.status(201).send(`Welcome ${name}`);
  }
  console.log(name);
});

app.listen(8000, () => console.log("Server started on 8000"));
