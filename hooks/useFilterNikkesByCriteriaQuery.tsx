import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchFilterNikkesByCriteria(filters: any) {
  const { data } = await axios.get("http://localhost:3000/filter/nikke", {
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
