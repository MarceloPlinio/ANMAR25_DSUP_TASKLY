import { prisma } from "../config/database";
import { Prisma} from '@prisma/client';

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
  
      };
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ];
    }

    try {
      const tasks = await prisma.task.findMany({
        where,
        include: { notes: true },
        skip: (page - 1) * limit,
        take: limit,
      });

      return tasks;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching tasks with filters");
    }
  }

  async count(where: any): Promise<number> {
    try {
      return await prisma.task.count({
        where: where 
      });
    } catch (error) {
      throw new Error("Error counting tasks");
    }
  }
}  

export default new TaskRepository();