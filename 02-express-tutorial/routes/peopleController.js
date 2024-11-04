const express = require("express");
const router = express.Router();
const {
  getPeople,
  addNewperson,
  addNewpersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/peopleController");

// Get people
router.get("/people", getPeople);

// Add person
router.post("/people", addNewperson);
// Add person as a POSTMAN method
router.post("/people", addNewpersonPostman);

// Update Person
router.put("/people/:personID", updatePerson);

// Delete Person
router.delete("/people/:personID", deletePerson);

module.exports = router;
