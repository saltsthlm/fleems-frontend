import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../util/config";
import { useAuth } from "../AuthProvider";
import {
  CreateAssignment,
  CreateDriver,
  CreateVehicle,
} from "../types/CreateTypes";

type ApiResponseMapping = {
  drivers: CreateDriver;
  assignments: CreateAssignment;
  vehicles: CreateVehicle;
};
type ApiEndpoints = keyof ApiResponseMapping;

export default function usePostApi<T extends ApiEndpoints>(
  endpoint: T,
  body: ApiResponseMapping[T]
) {
  const { credential } = useAuth();

  const fetchData = async () => {
    console.log(credential);
    const { data } = await axios.post<ApiResponseMapping[T]>(
      BASE_API_URL + endpoint,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${credential}`,
        },
      }
    );
    return data;
  };

  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: [`api-${endpoint}`],
    queryFn: async () => {
      return fetchData();
    },
  });

  return { data, isLoading, error };
}
