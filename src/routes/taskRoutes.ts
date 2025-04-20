import { Router } from "express";
import TaskController from "../controllers/TaskController";
import { validate } from "../middlewares/validate";
import { createTaskSchema } from "../validations/taskValidation";

const router = Router();

router.post("/tasks", validate(createTaskSchema), TaskController.create);
router.get("/tasks", TaskController.findAll);
router.get("/tasks/:id", TaskController.findById);
router.get("/tasks/status/:status", TaskController.findByStatus);
router.put("/tasks/:id", TaskController.update);
router.delete("/tasks/:id", TaskController.delete);

export default router;
