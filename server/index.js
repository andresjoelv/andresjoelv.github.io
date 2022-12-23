const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/entry", (req, res) => {
  console.log("req", req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
