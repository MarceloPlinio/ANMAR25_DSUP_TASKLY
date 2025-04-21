import { Request, Response } from "express";
import NoteService from "../services/NoteService";
class NoteController {
  
  static async create(req: Request, res: Response) {
    const { taskId } = req.params;
    const { content } = req.body;

    try {
      const note = await NoteService.createNote(Number(taskId), content);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: "Error creating note" });
    }
  }

  static async findByTaskId(req: Request, res: Response) {
    const { taskId } = req.params;

    try {
      const notes = await NoteService.getNotesByTaskId(Number(taskId));
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notes" });
    }
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const note = await NoteService.getNoteById(Number(id));
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching note" });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const updatedNote = await NoteService.updateNote(Number(id), content);
      if (updatedNote) {
        res.status(200).json(updatedNote);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating note" });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleted = await NoteService.deleteNote(Number(id));
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting note" });
    }
  }
}

export default NoteController;
