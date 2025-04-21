import { Router } from "express"
import NoteController from "../controllers/NoteController"
import { validate } from "../middlewares/validate"
import { createNoteSchema } from "../validations/noteValidation"

const router = Router()

router.post("/tasks/:taskId/notes", validate(createNoteSchema), NoteController.create)
router.get("/tasks/:taskId/notes", NoteController.findByTaskId)
router.get("/notes/:id", NoteController.findById)
router.put("/notes/:id", validate(createNoteSchema), NoteController.update)
router.delete("/notes/:id", NoteController.delete)

export default router
