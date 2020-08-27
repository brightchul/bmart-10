import { API_HOST } from "../../constants/API";
import { Good } from "../../types/RecommandGoods";

export type APIResponse = {
  success: true;
  data: {
    menus: string[];
    recommends: [
      {
        title: string;
        goodsData: Good[];
      }
    ];
  };
};

export default async function getGoodsByName(): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/recommend`, {
    mode: "cors",
    method: "GET",
  }).then((res) => res.json());
}
