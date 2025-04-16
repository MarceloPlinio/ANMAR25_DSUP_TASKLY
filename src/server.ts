import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json()); // Middleware para aceitar JSON

// Rota para criar uma tarefa
app.post("/tasks", async (req, res) => {
  const { title, description, status, priority, category } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        category,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
