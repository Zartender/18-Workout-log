const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");


const uri = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(uri || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});