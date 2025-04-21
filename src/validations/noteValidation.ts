import { z } from "zod";
import { textField } from "./taskValidation"; 


export const createNoteSchema = z.object({
  content: textField(3, 255, "Content"), 
});
