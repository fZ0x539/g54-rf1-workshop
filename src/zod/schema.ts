import { z } from "zod";

export const meetingLevels = [
  "Team",
  "Department",
  "Division",
  "Client",
] as const;
export type MeetingLevel = (typeof meetingLevels)[number];

export const meetingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  meetingLevel: z.enum(meetingLevels),
  participants: z
    .array(z.string().email())
    .min(1, "At least one participant is required"),
  description: z
    .string()
    .min(1, "Please enter a description.")
    .max(500, "Description cannot exceed 500 characters"),
});

export type Meeting = z.infer<typeof meetingSchema>;
