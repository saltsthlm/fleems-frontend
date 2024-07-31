import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../util/config";
import { useAuth } from "../AuthProvider";
import { CreateDriver } from "../types/createTypes";

type ApiResponseMapping = {
  drivers: CreateDriver;
};
type ApiEndpoints = keyof ApiResponseMapping;

export default function useDeleteApi<T extends ApiEndpoints>(endpoint: T) {
  const { credential } = useAuth();

  const doDelete = async (entry: string) => {
    const { data } = await axios.delete<ApiResponseMapping[T]>(
      BASE_API_URL + endpoint + "/" + entry,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${credential}`,
        },
      }
    );
    return data;
  };

  const mutation = useMutation({
    // mutationKey: [`api-${endpoint}-delete`],
    mutationFn: async (entry: string) => {
      return doDelete(entry);
    },
  });

  return {
    doDelete: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
