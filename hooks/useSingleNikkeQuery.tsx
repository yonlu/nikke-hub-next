import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchSingleNikkeByName(name: string) {
  const { data } = await axios.get(`http://localhost:3000/nikke/${name}`);
  return data;
}

export const useSingleNikkeQuery = (name: string) =>
  useQuery(["singleNikke", name], () => fetchSingleNikkeByName(name));
