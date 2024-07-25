import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Client, Driver, Task, Vehicle } from "../types/ApiResponses";
import { BASE_API_URL } from "../util/config";

type ApiResponseMapping = {
  drivers: Driver[];
  clients: Client[];
  tasks: Task[];
  vehicles: Vehicle[];
};
type ApiEndpoints = keyof ApiResponseMapping;

export default function useApi<T extends ApiEndpoints>(endpoint: T) {
  const fetchData = async () => {
    const { data } = await axios.get<ApiResponseMapping[T]>(
      BASE_API_URL + endpoint,
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
