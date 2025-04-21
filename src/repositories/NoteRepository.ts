import { prisma } from "../config/database";


class NoteRepository {
  static async create(taskId: number, content: string) {
    return await prisma.note.create({
      data: {
        content,
        taskId,
      },
    });
  }

  static async findByTaskId(taskId: number) {
    return await prisma.note.findMany({
      where: { taskId },
    });
  }

  static async findById(id: number) {
    return await prisma.note.findUnique({
      where: { id },
    });
  }
  static async update(id: number, content: string) {
    return await prisma.note.update({
      where: { id },
      data: { content },
    });
  }

  static async delete(id: number) {
    const note = await prisma.note.delete({
      where: { id },
    });
    return note ? true : false;
  }
}

export default NoteRepository;
