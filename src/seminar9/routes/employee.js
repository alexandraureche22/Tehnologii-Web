const { Op } = require("sequelize");
const Employee = require("../models/employee");

const router = require("express").Router();

router
  .route("/employees")
  .get(async (req, res) => {
    // get all
    try {
      const employees = await Employee.findAll({});
      return res.status(200).json(employees);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    // create
    // console.log("req.body :>> ", req.body);
    try {
      const newEmployee = await Employee.create(req.body);
      return res.status(200).json(newEmployee);
    } catch (err) {
      // De obicei, erorile de validare (SequelizeValidationError) sunt prinse aici
      return res.status(500).json(err);
    }
  });

// NOU ENDPOINT: ȘTERGEREA UNEI ÎNREGISTRĂRI DUPĂ ID

router.route("/employees/:id").delete(async (req, res) => {
  try {
    const { id } = req.params; // Extrage ID-ul din parametrii rutei

    // Folosește metoda destroy() a Sequelize pentru a șterge
    const deletedRowCount = await Employee.destroy({
      where: { id: id },
    });

    if (deletedRowCount === 0) {
      // Nici o înregistrare nu a fost găsită/ștersă
      return res.status(404).json({ message: "Angajatul nu a fost găsit." });
    }

    // Răspuns standard pentru o ștergere reușită fără conținut de returnat
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
