import { API_HOST } from "../../constants/API";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
    };
type Item = {
  id: number;
  amount: number;
};
export default async function updateCartItemAmount(
  data: Item
): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/cart`, {
    mode: "cors",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
