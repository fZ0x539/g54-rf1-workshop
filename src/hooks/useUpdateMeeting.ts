import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CACHE_KEY_MEETINGS } from "../constants";
import APIClient from "../services/apiClient";
import { type MeetingRequest } from "./useMeeting";

const apiClient = new APIClient<MeetingRequest>("/meetings");

export default function useUpdateMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiClient.update,
    onMutate: async (updatedMeeting) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [CACHE_KEY_MEETINGS] }),
        queryClient.cancelQueries({ queryKey: ["meeting", updatedMeeting.id] }),
      ]);

      const previousMeetings =
        queryClient.getQueryData<MeetingRequest[]>(CACHE_KEY_MEETINGS) || [];

      const previousMeeting = queryClient.getQueryData<MeetingRequest>([
        "meeting",
        updatedMeeting.id,
      ]);

      queryClient.setQueryData(CACHE_KEY_MEETINGS, (old: MeetingRequest[] = []) =>
        old.map(m => m.id === updatedMeeting.id ? { ...m, ...updatedMeeting } : m)
      );

      queryClient.setQueryData(["meeting", updatedMeeting.id], updatedMeeting);

      return { previousMeetings, previousMeeting };
    },
    onError: (err, variables, context) => {
      if (context?.previousMeetings) {
        queryClient.setQueryData(
          [CACHE_KEY_MEETINGS],
          context.previousMeetings
        );
      }

      if (context?.previousMeeting) {
        queryClient.setQueryData(
          ["meeting", variables.id],
          context.previousMeeting
        );
      }
      toast.error(`Error updating meeting: ${err.message}`);
    },
    onSuccess: (updatedMeeting) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_MEETINGS] }),
        queryClient.invalidateQueries({
          queryKey: ["meeting", updatedMeeting.id],
        }),
      ]);
      toast.success("Successfully updated: " + updatedMeeting.title);
    }
  });
}
