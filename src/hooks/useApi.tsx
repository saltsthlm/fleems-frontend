import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Client, Driver, Task } from "../types/ApiResponses";
import { BASE_API_URL } from "../util/config";

type ApiEndpoints = "drivers" | "clients" | "tasks" | "dwaddwa";

export default function useApi(endpoint: ApiEndpoints) {
  const fetchDrivers = async () => {
    try {
      const data = await axios.get<Driver[]>(BASE_API_URL + endpoint);
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

  const fetchClients = async () => {
    try {
      const data = await axios.get<Client[]>(BASE_API_URL + endpoint);
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

  const fetchTasks = async () => {
    try {
      const data = await axios.get<Task[]>(BASE_API_URL + endpoint);
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
      switch (endpoint) {
        case "drivers":
          return fetchDrivers();
        case "clients":
          return fetchClients();
        case "tasks":
          return fetchTasks();
        default:
          return null;
      }
    },
  });

  return { data, loading, error };
}
