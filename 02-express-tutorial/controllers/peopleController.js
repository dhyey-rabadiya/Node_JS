const { people } = require("../data");

// Funtion to get all the people
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

// Function to add a new person
const addNewperson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res
      .status(401)
      .json({ success: false, msg: "Please provide the name value" });
  } else {
    res.status(201).send({ success: true, person: name });
  }
};

// Function to add a new person as a POSTMAN dedicated function
const addNewpersonPostman = (req, res) => {
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
};

// Function to update an existing person
const updatePerson = (req, res) => {
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

  res.status(201).send({
    success: true,
    msg: "Data updated succesfully",
    data: newPeople,
  });
};

// Funtion to delete a person from the people array
const deletePerson = (req, res) => {
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
};

// Now all the CRUD operations are been seperated into different functions that can be exported for the use into another file
module.exports = {
  getPeople,
  addNewperson,
  addNewpersonPostman,
  updatePerson,
  deletePerson,
};
