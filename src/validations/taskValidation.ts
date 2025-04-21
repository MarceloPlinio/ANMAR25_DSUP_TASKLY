import { z } from "zod";
import { TaskStatus } from "../constants/taskStatus";

const forbiddenWords = [
  "SELECT",
  "DROP",
  "DELETE",
  "INSERT",
  "UPDATE",
  "FROM",
  "WHERE",
  "OR",
  "AND",
  "--",
];

const containsForbiddenWords = (value: string) => {
  const upperValue = value.toUpperCase();
  const wordsInText = upperValue.split(/\W+/);
  return !forbiddenWords.some((word) => wordsInText.includes(word));
};

const containsHTML = (value: string) => /<[^>]*>/g.test(value);

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const textField = (
  min: number,
  max: number,
  fieldName: string,
  allowEmoji = false
) =>
  z
    .string()
    .transform(normalize)
    .refine((val) => val.length >= min, {
      message: `${fieldName} must be at least ${min} characters`,
    })
    .refine((val) => val.length <= max, {
      message: `${fieldName} must be at most ${max} characters`,
    })
    .refine((val) => containsForbiddenWords(val), {
      message: `${fieldName} contains forbidden words`,
    })
    .refine((val) => !containsHTML(val), {
      message: `${fieldName} must not contain HTML tags`,
    })
    .refine((val) => isNaN(Number(val)), {
      message: `${fieldName} must not be a number only`,
    })
    .refine(
      (val) => {
        if (allowEmoji) {
          return /[\p{L}]/u.test(val);
        }
        return /^[\p{L}\p{M}\s]+$/u.test(val);
      },
      {
        message: `${fieldName} must contain valid characters`,
      }
    );

export const createTaskSchema = z.object({
  title: textField(3, 30, "Title", true),
  description: z
    .string()
    .transform(normalize)
    .refine((val) => val.length <= 70, {
      message: "Description must be at most 70 characters",
    })
    .refine((val) => containsForbiddenWords(val), {
      message: "Description contains forbidden words",
    })
    .refine((val) => !containsHTML(val), {
      message: "Description must not contain HTML tags and Scripts",
    })
    .optional(),
  category: textField(3, 20, "Category"),
  priority: textField(3, 15, "Priority"),

  status: z
    .string()
    .transform((status) => status.toUpperCase())
    .refine(
      (status) => Object.values(TaskStatus).includes(status as TaskStatus),
      {
        message:
          "Status must be one of the predefined values: TO_DO, IN_PROGRESS, DONE",
      }
    ),
});
