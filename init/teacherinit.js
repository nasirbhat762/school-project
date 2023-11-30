const mongoose = require("mongoose");
const Teacher = require("../model/teacher");
const teacherdata = require("./teacherdata.js");

main()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/school");
}

async function initializeTeacher() {
  await Teacher.deleteMany();
  await Teacher.insertMany(teacherdata);
}

initializeTeacher();
