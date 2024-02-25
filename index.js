const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.get("/todos", (req, res) => {
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
