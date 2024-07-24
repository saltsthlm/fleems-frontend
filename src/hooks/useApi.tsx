import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Client, Driver, Task, Vehicle } from "../types/ApiResponses";
import { BASE_API_URL } from "../util/config";

type ApiResponseMapping = {
  drivers: Driver[],
  clients: Client[],
  tasks: Task[],
  vehicles: Vehicle[]
};
type ApiEndpoints = keyof ApiResponseMapping;

export default function useApi<T extends ApiEndpoints>(endpoint: T) {
  const fetchData = async () => {
    try {
      const { data } = await axios.get<ApiResponseMapping[T]>(BASE_API_URL + endpoint);
      return data;
    } catch (error) {
      if (error instanceof AxiosError != true) {
        console.log("An unknown error ocurred when fetching api:", error);
        return null;
      }
      console.log("An error ocurred when fetching api:", error.message);
      return null;
    }
  };

  const {
    data,
    isPending: loading,
    error,
  } = useQuery({
    queryKey: [`api-${endpoint}`],
    queryFn: async () => {
      return fetchData();
    },
  });

  return { data, loading, error };
}
