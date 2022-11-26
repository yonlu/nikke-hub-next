import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Nikke {
  id: string;
  name: string;
  rarity: string;
  burst: string;
  code: string;
  weapon: string;
  image: string;
  backstory: string;
}

async function fetchSingleNikkeByName(name: string): Promise<Nikke> {
  return axios
    .get(`http://localhost:3000/nikke/${name}`)
    .then((response) => response.data);
}

export const useSingleNikkeQuery = (name: string) =>
  useQuery(["singleNikke", name], () => fetchSingleNikkeByName(name));
