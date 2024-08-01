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
  stats: number[];
};
type ApiEndpoints = keyof ApiResponseMapping;

type StatsResponseMapping = {
  completed: number[];
  vehicles: number[];
  drivers: number[];
  tasks: number[];
};
type ApiExtraParams = {
  statsEndpoint: keyof StatsResponseMapping;
};
export default function useApi<T extends ApiEndpoints>(
  endpoint: T,
  options?: ApiExtraParams
) {
  const { credential } = useAuth();

  const fetchData = async () => {
    const { data } = await axios.get<ApiResponseMapping[T]>(
      BASE_API_URL +
        endpoint +
        (options?.statsEndpoint ? "/" + options.statsEndpoint : ""),
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
    queryKey: [`api-${endpoint}-${options?.statsEndpoint}`],
    queryFn: async () => {
      return fetchData();
    },
  });

  return { data, isLoading, error };
}
