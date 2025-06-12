import { z } from "zod";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  date: z
    .date()
    .min(new Date(), "Meeting must be set in the future")
    .or(z.string().transform((val) => new Date(val))),
  time: z
    .string()
    .regex(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid time format (use HH:MM)"
    ),
  meetingLevel: z.enum(["client", "team", "division", "department"]),
  participants: z
    .array(z.string().email("Invalid email address"))
    .nonempty("At least one participant is required"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters"),
});

export {schema as meetingSchema};