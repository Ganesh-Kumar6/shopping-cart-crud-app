const express = require("express");
const bodyParser = require("body-parser");
const executeQuery = require("./execute.js");

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

// Listen to requests from the port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Middleware to handle cors
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ganesh-kumar-shopping-cart-crud-app.netlify.app/"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  next();
});

app.use(express.static("Frontend"));

app.get("/", (req, res) => {
  res.send(`<h1> Server running </h1>`);
});

// Listen for post request
app.post("/", (req, res) => {
  executeQuery(req.body.query).then((result) => {
    // console.log("the result object is ", result);
    res.send(JSON.stringify({ result }));
  });
});

// Closing the database connection
// connection.end();
