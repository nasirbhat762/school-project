const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  teacherid: {
    type: String,
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
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
