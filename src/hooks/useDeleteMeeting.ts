import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CACHE_KEY_MEETINGS } from "../constants";
import APIClient from "../services/apiClient";
import type { MeetingResponse } from "./useMeeting";

const apiClient = new APIClient<MeetingResponse>("/meetings");

export default function useDeleteMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetingId: string) => apiClient.delete(parseInt(meetingId)),
    onMutate: (meetingId) => {
      queryClient.cancelQueries({ queryKey: CACHE_KEY_MEETINGS });
      const meetings = queryClient.getQueryData<MeetingResponse[]>(CACHE_KEY_MEETINGS);
      const meeting = meetings?.find((m) => m.id === parseInt(meetingId));
      return { meeting };
    },
    onSuccess: (_, id, context) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_MEETINGS });
      toast.success(
        `Successfully deleted ${context?.meeting?.title}`
      );
    },
    onError: (error, variables, context) => {
      console.log("Context: " + context);
      console.log("Variables: " + variables);

      toast.error(error.message);
    },
  });
}
