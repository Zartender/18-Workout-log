const express = require("express");
// creating an object for mongoose
const mongoose = require("mongoose");
// commiunicates the api routes
const routesAPI = require("./routes/api")
// communicates the routes for the html
const routesHTML = require("./routes/html")
const uri = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(uri || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});