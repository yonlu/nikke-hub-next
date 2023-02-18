import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

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

async function fetchFilterNikkesByCriteria(filters: any) {
  const { data } = await api.get<Nikke[]>("/filter/nikke", {
    params: {
      rarity: filters?.rarity ? filters.rarity : [],
      burst: filters?.burst ? filters.burst : [],
      code: filters?.code ? filters.code : [],
      weapon: filters?.weapon ? filters.weapon : [],
    },
  });
  return data;
}

export const useFilterNikkesByCriteriaQuery = (filters: any) =>
  useQuery(["filteredNikkes", filters], () =>
    fetchFilterNikkesByCriteria(filters)
  );
