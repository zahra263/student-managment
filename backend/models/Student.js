const mongoose = require("mongoose");


// mongoose.Schema - Database ka structure define krta he.
const studentSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

});

// mongoose.model - "Student" model create krta he.
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;