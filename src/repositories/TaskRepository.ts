import { prisma } from "../config/database";

class TaskRepository {
  async create(data: any) {
    return await prisma.task.create({
      data,
    });
  }

  async findAll() {
    return await prisma.task.findMany();
  }

  async findById(id: number) {
    return await prisma.task.findUnique({
      where: { id },
      include: { notes: true }, 
    });
  }

  async findByStatus(status: string) {
    return await prisma.task.findMany({
      where: { status },
    });
  }

  async update(id: number, data: any) {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.task.delete({
      where: { id },
    });
  }
}

export default new TaskRepository();
