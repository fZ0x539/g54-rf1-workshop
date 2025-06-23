import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Meeting } from "../zod/schema";
import APIClient from "../services/apiClient";
import { CACHE_KEY_MEETINGS } from "../constants";

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
    onError: (error, newMeeting, context) => {
      if (!context) return;
      queryClient.setQueryData<Meeting[]>(
        CACHE_KEY_MEETINGS,
        context.previousMeetings
      );
    },
    onSuccess: (savedMeeting, newMeeting) => {
      return queryClient.invalidateQueries({ queryKey: CACHE_KEY_MEETINGS });
    },
  });
}
