const mongoose = require("mongoose");
const Student = require("../model/student");
const studentdata = require("./studentdata.js");

main()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/school");
}

async function initializeStudent() {
  await Student.deleteMany();
  await Student.insertMany(studentdata);
}

initializeStudent();
