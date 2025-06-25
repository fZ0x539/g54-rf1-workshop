import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CACHE_KEY_MEETINGS } from "../constants";
import APIClient from "../services/apiClient";
import type { Meeting } from "../zod/schema";

const apiClient = new APIClient<Meeting>("/meetings");

interface AddMeetingContext {
  previousMeetings: Meeting[];
}


export default function useAddMeeting() {
  const queryClient = useQueryClient();

  return useMutation<Meeting, Error, Meeting, AddMeetingContext>({
    mutationFn: apiClient.post,
    onMutate: (newMeeting) => {
      const previousMeetings =
        queryClient.getQueryData<Meeting[]>(CACHE_KEY_MEETINGS) || [];

      queryClient.setQueryData<Meeting[]>(
        CACHE_KEY_MEETINGS,
        (meeting = []) => [newMeeting, ...meeting]
      );

      return { previousMeetings };
    },
    onError: (error, _, context) => {
      if (!context) return;
      queryClient.setQueryData<Meeting[]>(
        CACHE_KEY_MEETINGS,
        context.previousMeetings
      );
      toast.error(`Error adding todo: ${error.message}`);
    },
    onSuccess: (_, newMeeting) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_MEETINGS });
      toast.success("Successfully added: " + newMeeting.title);
    },
  });
}
