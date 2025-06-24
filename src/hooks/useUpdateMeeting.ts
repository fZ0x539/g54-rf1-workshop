import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { type MeetingRequest } from "./useMeeting";
import type { Meeting } from "../zod/schema";
import { CACHE_KEY_MEETINGS } from "../constants";
import toast from "react-hot-toast";

const apiClient = new APIClient<MeetingRequest>("/meetings");

export default function useUpdateMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiClient.update,
    onMutate: async (updatedMeeting) => {

      await queryClient.cancelQueries({ queryKey: [CACHE_KEY_MEETINGS] });

      const previousMeetings =
        queryClient.getQueryData<MeetingRequest[]>(CACHE_KEY_MEETINGS) || [];

       queryClient.setQueryData<MeetingRequest[]>(
        [CACHE_KEY_MEETINGS],
        (oldMeetings = []) => 
          oldMeetings.map(meeting => 
            meeting.id === updatedMeeting.id ? updatedMeeting : meeting
          )
      );
      return { previousMeetings }; //return snapshotted value for onErrr
    },
    onError: (err, updatedMeeting, context) => {
      if(context?.previousMeetings){
        queryClient.setQueryData([CACHE_KEY_MEETINGS], context.previousMeetings);
      }
    },
    onSuccess: () => {
      toast.success("Successfully updated meeting!")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_MEETINGS] });
    }
  });
}
