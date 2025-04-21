import { Request, Response } from "express";
import TaskService from "../services/TaskService";

class TaskController {
  async create(req: Request, res: Response) {
    const { title, description, category, priority, status } = req.body;

    try {
      const newTask = await TaskService.createTask({
        title,
        description: description || null,
        category,
        priority,
        status,
      });

      res.status(201).json(newTask);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error creating task" });
      return;
    }
  }

  async findAll(req: Request, res: Response) {
    const { page, limit, category, search, status } = req.query;

    try {
      const tasks = await TaskService.getTasksWithFilters({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        category: category as string | undefined,
        search: search as string | undefined,
        status: status as string | undefined,
      });

      res.status(200).json(tasks);
      return;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Page")) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error fetching tasks with filters" });
      }
      return;
    }
  }
  async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const task = await TaskService.getTaskById(Number(id));

      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.status(200).json(task);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching task by id" });
      return;
    }
  }

  async findByStatus(req: Request, res: Response) {
    const { status } = req.params;

    try {
      const tasks = await TaskService.getTasksByStatus(status);

      if (tasks.length === 0) {
        res.status(404).json({ message: "No tasks found with this status" });
        return;
      }

      res.status(200).json(tasks);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks by status" });
      return;
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, category, priority, status } = req.body;

    try {
      const updatedTask = await TaskService.updateTask(Number(id), {
        title,
        description,
        category,
        priority,
        status,
      });

      if (!updatedTask) {
        res.status(404).json({ message: "Task not found for update" });
        return;
      }

      res.status(200).json(updatedTask);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error updating task" });
      return;
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedTask = await TaskService.deleteTask(Number(id));

      if (!deletedTask) {
        res.status(404).json({ message: "Task not found for deletion" });
        return;
      }

      res.status(204).send();
      return;
    } catch (error) {
      res.status(500).json({ message: "Error deleting task" });
      return;
    }
  }
}

export default new TaskController();
