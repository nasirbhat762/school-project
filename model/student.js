const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  teacher: {
    type:String,
    required:true,
  },
  subject: {
    type:String,
    required:true,
  },
  marks: {
    type:String,
    required:true,
  },
  dob: {
    type: Date,
    required: true,
  },
  parentage: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
