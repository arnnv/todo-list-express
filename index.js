const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
app.use(express.json());

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

app.post("/todos", (req, res) => {
  const todo = {
    id: generateRandomId(),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    let arr = JSON.parse(data);
    arr.push(todo);
    fs.writeFile("./todos.json", JSON.stringify(arr), (err) => {
      if (err) throw err;
      res.status(201).json(todo);
    });
  });
});

app.put("/todos/:id", (req, res) => {
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) throw err;

    const id = req.params.id;
    let arr = JSON.parse(data);
    let todoIdx = getTodoIdx(arr, id);

    if (todoIdx === -1) {
      res.sendStatus(404);
    } else {
      arr[todoIdx].title = req.body.title;
      arr[todoIdx].description = req.body.description;

      fs.writeFile("./todos.json", JSON.stringify(arr), (err) => {
        if (err) throw err;
        res.status(200).json(arr[todoIdx]);
      });
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) throw err;

    const id = req.params.id;
    let arr = JSON.parse(data);
    const todoIdx = getTodoIdx(arr, id);

    if (todoIdx === -1) {
      res.sendStatus(404);
    } else {
      arr.splice(todoIdx, 1);
      fs.writeFile("./todos.json", JSON.stringify(arr), (err) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    }
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
