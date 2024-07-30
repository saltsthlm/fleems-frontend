import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../util/config";
import { useAuth } from "../AuthProvider";
import { Driver, Vehicle } from "../types/ApiResponses";

type ApiResponseMapping = {
  drivers: Driver;
  vehicles: Vehicle;
};
type ApiEndpoints = keyof ApiResponseMapping;

export default function usePutApi<T extends ApiEndpoints>(
  endpoint: T,
  body: ApiResponseMapping[T]
) {
  const { credential } = useAuth();

  const fetchData = async () => {
    const { data } = await axios.put<ApiResponseMapping[T]>(
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
