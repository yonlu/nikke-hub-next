import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

async function fetchNikkes(filters?: any) {
  const { data } = await api.get("/nikke/");
  return data;
}

export const useNikkesQuery = (filters: any) =>
  useQuery(["nikkes"], () => fetchNikkes(filters));
