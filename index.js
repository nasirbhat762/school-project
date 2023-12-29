const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Teacher = require("./model/teacher");
const Student = require("./model/student");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./ErrorClass/ExpressError");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/school");
}

app.listen(port, () => {
  console.log(`app is listenint on the port ${port}`);
});

// Root Route
app.get("/", (req, res) => {
  // yahan pe express implicitly(khudse) next ko call lagata hai
  // throw new ExpressError(404, "page not found");
  res.send("this is root");
});

// Teachers route
app.get("/teachers", async (req, res) => {
  const teachers = await Teacher.find();
  res.render("./teacher/teachers.ejs", { teachers });
});
// Teacher show route
app.get("/teachers/:id/show", async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  res.render("./teacher/showteacher.ejs", { teacher });
});
// New Route
app.get("/teachers/new", (req, res) => {
  res.render("./teacher/new.ejs");
});
// Add Route
app.post("/teachers", async (req, res) => {
  const {
    name,
    dob,
    qualification,
    subject,
    gender,
    teacherid,
    parentage,
    contact,
    email,
    address,
  } = req.body;
  await Teacher.create({
    name,
    dob,
    qualification,
    subject,
    gender,
    teacherid,
    parentage,
    contact,
    email,
    address,
  });
  res.redirect("/teachers");
});
// Edit Route
app.get("/teachers/:id/edit", async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  res.render("./teacher/edit.ejs", { teacher });
});
app.patch("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    dob,
    qualification,
    subject,
    gender,
    teacherid,
    parentage,
    contact,
    email,
    address,
  } = req.body;
  const teacher = await Teacher.findByIdAndUpdate(id, {
    name,
    dob,
    qualification,
    subject,
    gender,
    teacherid,
    parentage,
    contact,
    email,
    address,
  });
  res.redirect(`/teachers/${id}/show`);
});
// Delete Route
app.delete("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  await Teacher.findByIdAndDelete(id);
  res.redirect("/teachers");
});

//Students Route
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.render("./student/students.ejs", { students });
});
// Student show route
app.get("/students/:id/show", async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    // yahan pe express implicitly(khudse) next ko call nahi lagata so explicitly lagana padega
    next(new ExpressError(404, "user not found"));
  } else {
    res.render("./student/showstudent.ejs", { student });
  }
});
// New Route
app.get("/students/new", (req, res) => {
  res.render("./student/new.ejs");
});
app.post("/students", async (req, res) => {
  const {
    rollno,
    name,
    standard,
    teacher,
    subject,
    marks,
    dob,
    parentage,
    contact,
    address,
  } = req.body;
  await Student.create({
    rollno,
    name,
    standard,
    teacher,
    subject,
    marks,
    dob,
    parentage,
    contact,
    address,
  });

  res.redirect("/students");
});
// Delete Route
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.redirect("/students");
});
//Edit Route
app.get("/students/:id/edit", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  res.render("./student/edit", { student });
});
// Update Route
app.patch("/students/:id", async (req, res) => {
  const { id } = req.params;
  const {
    rollno,
    name,
    standard,
    teacher,
    subject,
    marks,
    dob,
    parentage,
    contact,
    address,
  } = req.body;
  await Student.findByIdAndUpdate(id, {
    rollno,
    name,
    standard,
    teacher,
    subject,
    marks,
    dob,
    parentage,
    contact,
    address,
  });

  res.redirect(`/students/${id}/show`);
});

app.get("/marks/student", async (req, res) => {
  let { search } = req.query;
  let students = await Student.find({ name: `${search}` });

  res.render("./mark/show.ejs", { students });
});
app.get("/marks", async (req, res) => {
  let students = await Student.find();
  res.render("./mark/marks.ejs", { students });
});

// custom error handling middleware

app.use((err, req, res, next) => {
  const { status = 500, message = "some error occured" } = err;
  res.status(status).send(message);
});
