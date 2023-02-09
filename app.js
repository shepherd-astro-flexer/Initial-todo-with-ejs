const express = require("express");
// ? Not needed? const ejs = require("ejs"); 
const bodyParser = require("body-parser");
 
const app = express();

app.use(express.static("public"))

let todos = ["Buy Food", "Cook Food", "Eat Food"];

let workTodos = [];

let contacts = []

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // use app.set here, not app.use, and the "view engine" should be separated by space, not a dash

app.get("/", (req, res) => {
  const newDate = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  }
  
  const day = newDate.toLocaleDateString("en-US", options);

  // the newTodo on the .ejs file is basically the todos array, so we can loop over it
  // in this case, the newTodos value is an array
  // isang beses ka lang mag res.render. ilagay sa 2nd parameter ng object ang mga name-value pairs ng ejs file mo
  res.render("list", {listTitle: day, newTodos: todos}); // list is the name of the .ejs file inside the "views" folder
})

app.post("/", (req, res) => {
  const todo = req.body.newTodo;
  console.log(req.body)
  if (req.body.submitTodo === "Work") {
    workTodos.push(todo);
    res.redirect("/work");
  } else if (req.body.submitTodo === "Contact") {
    contacts.push(todo);
    res.redirect("/contact")
  } else {
    todos.push(todo);
    res.redirect("/"); // kailangan neto, parang sya yung magrerefresh
  }
})

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work list", newTodos: workTodos});
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.get("/contact", (req, res) => {
  res.render("list", {listTitle: "Contact list", newTodos: contacts})
})

app.listen(3000, () => {
  console.log("Server has started on port 3000.");
})


// let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// let day = days[getDay];  We pass in the getDay variable which returns a number to get a specific day on the days array depending on the getDay value.  