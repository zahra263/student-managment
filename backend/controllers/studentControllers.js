const Student = require("../models/Student");

const createStudent = async (req, res) => {
  try {

    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Student Added Successfully",
      student: student
    });

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

const getStudents = async (req, res) => {
  try {

    const students = await Student.find();

    res.status(200).json({
      message: "All Students",
      students: students
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getStudentById = async (req, res) => {
  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student Not Found"
      });
    }

    res.status(200).json(student);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

const updateStudent = async (req, res) => {
  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!student) {
      return res.status(404).json({
        message: "Student Not Found"
      });
    }
    res.status(200).json({
      message: "Student Updated Successfully",
      student: student
    });
  } catch (error) {

    res.status(400).json({
      message: error.message
    });
  }
};

const deleteStudent = async (req, res) => {
  try {

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student Not Found"
      });
    }

    res.status(200).json({
      message: "Student Deleted Successfully"
    });

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};