import { z } from "zod";

export const meetingLevels = ["Team", "Department", "Division", "Client"] as const;
export type MeetingLevel = typeof meetingLevels[number];

export const meetingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  meetingLevel: z.enum(meetingLevels), // Now just stores the string
  participants: z.array(z.string().email()).min(1, "At least one participant is required"),
  description: z.string().min(1, "Please enter a description.")
});

export type Meeting = z.infer<typeof meetingSchema>;


// const schema = z.object({
//   title: z
//     .string()
//     .min(1, "Title is required")
//     .max(100, "Title must be less than 100 characters"),
//   date: z.string().transform((val) => new Date(val)),
//   time: z
//     .string()
//     .regex(
//       /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
//       "Invalid time format (use HH:MM)"
//     ),
//   meetingLevel: z.enum(["client", "team", "division", "department"]),
//   participants: z
//     .array(z.string().email("Invalid email address"))
//     .nonempty("At least one participant is required"),
//   description: z
//     .string()
//     .max(500, "Description must be less than 500 characters"),
// });
