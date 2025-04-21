import TaskRepository from "../repositories/TaskRepository";
import { Task } from "@prisma/client";

class TaskService {
  static async createTask(taskData: {
    title: string;
    description?: string | null;
    category: string;
    priority: string;
    status: string;
  }): Promise<Task> {
    try {
      const newTask = await TaskRepository.create({
        title: taskData.title,
        description: taskData.description || null,
        category: taskData.category,
        priority: taskData.priority,
        status: taskData.status,
      });
      return newTask;
    } catch (error) {
      throw new Error("Error creating task");
    }
  }

  static async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await TaskRepository.findAll();
      return tasks;
    } catch (error) {
      throw new Error("Error fetching tasks");
    }
  }

  static async getTaskById(id: number): Promise<Task | null> {
    try {
      const task = await TaskRepository.findById(id);
      return task;
    } catch (error) {
      throw new Error("Error fetching task by id");
    }
  }

  static async getTasksWithFilters(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    status?: string;
  }) {
    try {
      const { page = 1, limit = 10, category, search, status } = params;

      const where: any = {};

      if (category) {
        where.category = { contains: category.toLowerCase() };
      }

      if (search) {
        where.OR = [
          { title: { contains: search.toLowerCase() } },
          { description: { contains: search.toLowerCase() } },
        ];
      }

      if (status) {
        const normalizedStatus = status.toUpperCase();
        if (
          ["TO_DO", "DONE", "IN_PROGRESS", "BLOCKED"].includes(normalizedStatus)
        ) {
          where.status = normalizedStatus;
        }
      }

      const totalCount = await TaskRepository.count(where);

      const totalPages = Math.ceil(totalCount / limit);

      if (totalPages > 0 && page > totalPages) {
        return {
          error: `Page ${page} does not exist. Only pages 1 to ${totalPages} are available.`,
        };
      }

      const tasks = await TaskRepository.findAllWithFilters({
        page,
        limit,
        category,
        search,
        status: where.status,
      });

      if (tasks.length === 0) {
        return {
          message: "No tasks found with the given filters.",
          tasks: [],
          currentPage: page,
          totalPages,
          totalItems: totalCount,
        };
      }

      return {
        tasks,
        currentPage: page,
        totalPages,
        totalItems: totalCount,
      };
    } catch (error) {
      throw new Error("Error fetching tasks with filters");
    }
  }

  static async getTasksByStatus(status: string): Promise<Task[]> {
    try {
      const tasks = await TaskRepository.findByStatus(status);
      return tasks;
    } catch (error) {
      throw new Error("Error fetching tasks by status");
    }
  }

  static async updateTask(
    id: number,
    taskData: {
      title?: string;
      description?: string | null;
      category?: string;
      priority?: string;
      status?: string;
    }
  ): Promise<Task | null> {
    try {
      const updatedTask = await TaskRepository.update(id, {
        title: taskData.title,
        description: taskData.description || null,
        category: taskData.category,
        priority: taskData.priority,
        status: taskData.status,
      });
      return updatedTask;
    } catch (error) {
      throw new Error("Error updating task");
    }
  }

  static async deleteTask(id: number): Promise<Task | null> {
    try {
      const deletedTask = await TaskRepository.delete(id);
      return deletedTask;
    } catch (error) {
      throw new Error("Error deleting task");
    }
  }
}

export default TaskService;
