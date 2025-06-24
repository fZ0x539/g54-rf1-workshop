import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { type Meeting } from "../zod/schema";

const apiClient = new APIClient<Meeting>('/meetings')

export default function useMeeting() {
  return useQuery({
    queryKey: ['meetings'],
    queryFn: apiClient.getAll,
    staleTime: 5 * 1000,
    
  })
}
