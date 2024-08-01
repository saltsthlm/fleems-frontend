import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../util/config";
import { useAuth } from "../AuthProvider";
import {
  CreateAssignment,
  CreateDriver,
  CreateVehicle,
} from "../types/createTypes";

type ApiResponseMapping = {
  drivers: CreateDriver;
  assignments: CreateAssignment;
  vehicles: CreateVehicle;
};
type ApiEndpoints = keyof ApiResponseMapping;

export default function usePostApi<T extends ApiEndpoints>(endpoint: T) {
  const { credential } = useAuth();

  const {
    data,
    isPending: isLoading,
    error,
    mutate: doPost,
  } = useMutation({
    mutationKey: [`api-${endpoint}`],
    mutationFn: async (body: ApiResponseMapping[T]) => {
      await axios.post<ApiResponseMapping[T]>(BASE_API_URL + endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${credential}`,
        },
      });
    },
  });

  return { data, isLoading, error, doPost };
}
