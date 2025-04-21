import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      res.status(400).json({ errors });
      return;
    }
    req.body = result.data;

    next();
  };
