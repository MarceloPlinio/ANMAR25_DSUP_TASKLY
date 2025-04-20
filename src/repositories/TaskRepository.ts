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

  async findAllWithFilters(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) {
    const { page = 1, limit = 10, category, search } = params;

    const where: any = {};

    if (category) {
      where.category = {
        contains: category,
        mode: "insensitive",
      };
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const tasks = await prisma.task.findMany({
      where,
      include: { notes: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return tasks;
  }

  async count(where: any) {
    return await prisma.task.count({ where });
  }
}

export default new TaskRepository();
