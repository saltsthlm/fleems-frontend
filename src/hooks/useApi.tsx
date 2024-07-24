import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Client, Driver, Task, Vehicle } from "../types/ApiResponses";
import { BASE_API_URL } from "../util/config";

type ApiEndpoints = "drivers" | "clients" | "tasks" | "vehicles" | "dwaddwa";

export default function useApi(endpoint: ApiEndpoints) {
  const fetchData = async () => {
    try {
      let data;
      switch (endpoint) {
        case "drivers":
          data = await axios.get<Driver[]>(BASE_API_URL + endpoint);
          break;
        case "clients":
          data = await axios.get<Client[]>(BASE_API_URL + endpoint);
          break;
        case "tasks":
          data = await axios.get<Task[]>(BASE_API_URL + endpoint);
          break;
        case "vehicles":
          data = await axios.get<Vehicle[]>(BASE_API_URL + endpoint);
          break;
        default:
          return null;
      }
      return data.data;
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
