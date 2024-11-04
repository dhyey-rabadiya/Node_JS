const express = require("express");
const router = express.Router();

const { people } = require("../data");

// This route returns all the people as a json data
router.get("/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// POST method to create a new person into the local file or on the local server
router.post("/people", (req, res) => {
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
router.post("/postman/people", (req, res) => {
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
router.put("/people/:personID", (req, res) => {
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
router.delete("/people/:personID", (req, res) => {
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

// Now our people route is ready which basically does all the CRUD operations for the people array
module.exports = router;
