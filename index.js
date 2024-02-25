const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
const PORT = 3000;

function getTodoIdx(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function generateRandomId() {
  return uuidv4();
}

app.get("/todos", (req, res) => {
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    const id = req.params.id;
    let arr = JSON.parse(data);

    let todoIdx = getTodoIdx(arr, id);
    if (todoIdx === -1) {
      res.sendStatus(404);
    } else {
      res.json(arr[todoIdx]);
    }
  });
});

app.post("/todos", (req, res) => {});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
