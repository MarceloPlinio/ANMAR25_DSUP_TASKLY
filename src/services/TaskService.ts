import TaskRepository from '../repositories/TaskRepository';
import { Task } from '@prisma/client';

class TaskService {
  static async createTask(taskData: { title: string; description: string; category: string; priority: string; status: string }): Promise<Task> {
    try {
      const newTask = await TaskRepository.create(taskData);
      return newTask;
    } catch (error) {
      throw new Error('Error creating task');
    }
  }

  static async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await TaskRepository.findAll();
      return tasks;
    } catch (error) {
      throw new Error('Error fetching tasks');
    }
  }

  static async getTaskById(id: number): Promise<Task | null> {
    try {
      const task = await TaskRepository.findById(id);
      return task;
    } catch (error) {
      throw new Error('Error fetching task by id');
    }
  }

  static async getTasksByStatus(status: string): Promise<Task[]> {
    try {
      const tasks = await TaskRepository.findByStatus(status);
      return tasks;
    } catch (error) {
      throw new Error('Error fetching tasks by status');
    }
  }

  static async updateTask(id: number, taskData: { title?: string; description?: string; category?: string; priority?: string; status?: string }): Promise<Task | null> {
    try {
      const updatedTask = await TaskRepository.update(id, taskData);
      return updatedTask;
    } catch (error) {
      throw new Error('Error updating task');
    }
  }

  static async deleteTask(id: number): Promise<Task | null> {
    try {
      const deletedTask = await TaskRepository.delete(id);
      return deletedTask;
    } catch (error) {
      throw new Error('Error deleting task');
    }
  }
}

export default TaskService;
