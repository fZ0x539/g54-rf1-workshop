import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { type Meeting } from "../zod/schema";

interface MeetingResponse extends Meeting {
  id: number;
}

const apiClient = new APIClient<MeetingResponse>('/meetings')

export default function useMeeting() {
  return useQuery({
    queryKey: ['meetings'],
    queryFn: apiClient.getAll,
    staleTime: 5 * 1000,
    
  })
}
