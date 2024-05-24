const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
    } else {
      //add student to data base
      pool.query(
        queries.addStudent,
        [name, email, age, dob],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Student created successfully");
        }
      );
    }
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
  //if student is not in a db->student doesnt exist
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) throw error;
        res.send("Student deleted");
      });
    } else {
      res.send("Student does not exist in the db");
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student updated successfully");
      });
    } else {
      res.send("Student does not exist in the db");
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
