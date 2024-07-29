import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AssignmentInfoDto,
  Client,
  Driver,
  Task,
  Vehicle,
} from "../types/ApiResponses";
import { BASE_API_URL } from "../util/config";
import { useAuth } from "../AuthProvider";

type ApiResponseMapping = {
  drivers: Driver[];
  clients: Client[];
  tasks: Task[];
  vehicles: Vehicle[];
  assignments: AssignmentInfoDto[];
};
type ApiEndpoints = keyof ApiResponseMapping;

export default function useApi<T extends ApiEndpoints>(endpoint: T) {
  const { credential } = useAuth();

  const fetchData = async () => {
    const { data } = await axios.get<ApiResponseMapping[T]>(
      BASE_API_URL + endpoint,
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
