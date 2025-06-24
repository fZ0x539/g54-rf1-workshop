import { useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { type Meeting } from "../zod/schema";
import { CACHE_KEY_MEETINGS } from "../constants";

export interface MeetingResponse extends Meeting {
  id: number;
}

const apiClient = new APIClient<MeetingResponse>("/meetings");

export function useMeetings() {
  return useQuery({
    queryKey: CACHE_KEY_MEETINGS,
    queryFn: apiClient.getAll,
    staleTime: 5 * 1000,
  });
}

export function useMeeting(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["meeting", id],
    queryFn: () => apiClient.getById(id),
    staleTime: 5 * 1000,
    initialData: () => {
      return queryClient
        .getQueryData<MeetingResponse[]>(CACHE_KEY_MEETINGS)
        ?.find((m) => m.id === id);
    },
    initialDataUpdatedAt: () => {
      return queryClient.getQueryState(CACHE_KEY_MEETINGS)?.dataUpdatedAt;
    },
  });
}
