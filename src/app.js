import express from "express";
import db from "./utils/database.js";
import Todo from "./models/todos.model.js";
import "dotenv/config";

Todo;

//variable del entorno llamada PORT
const PORT = process.env.PORT ?? 5000;

// probar conexión a la DB
db.authenticate()
  .then(() => {
    console.log("conexión correcta");
  })
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("base de datos sincronizada"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

//HEALTHCHECK
app.get("/", (req, res) => {
  res.send("OK");
});

//CREATE TASK
app.post("/todos", async (req, res) => {
  try {
    const { body } = req;
    const todo = await Todo.create(body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//READ TASK

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// FIND ONE :id

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT /todos => Update

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const todo = await Todo.update(body, {
      where: { id },
    });
    res.json(todo);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE

app.delete('/todos/:id', async ( req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: { id }
    });
    res.status(204).end()
  } catch (error) {
    res.status(400).json(err);
  }
  });


app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});
