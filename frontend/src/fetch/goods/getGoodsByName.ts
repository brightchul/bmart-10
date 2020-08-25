import { API_HOST } from "../../constants/API";
import { Good } from "../../types/Good";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: {
        goods: Good[];
      };
    };

export default async function getGoodsByName(
  query: string
): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/goods/query/${query}`, {
    mode: "cors",
    method: "GET",
  }).then((res) => res.json());
}
