import NoteRepository from "../repositories/NoteRepository";
import { prisma } from "../config/database";

class NoteService {
  static async createNote(taskId: number, content: string) {
    return await NoteRepository.create(taskId, content);
  }

  static async getNotesByTaskId(taskId: number) {
    return await NoteRepository.findByTaskId(taskId);
  }

  static async checkIfTaskExists(taskId: number): Promise<boolean> {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    return !!task;
  }
  static async getNoteById(id: number) {
    return await NoteRepository.findById(id);
  }

  static async updateNote(id: number, content: string) {
    const note = await prisma.note.findUnique({
      where: { id }
    });
  
    if (!note) {
      return null; 
    }
  
    return await prisma.note.update({
      where: { id },
      data: { content }
    });
  }
  static async deleteNote(id: number) {
    return await NoteRepository.delete(id);
  }
}

export default NoteService;
