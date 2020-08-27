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
  checked: boolean;
};
export default async function updateCartItemChecked(
  data: Item
): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/cart/checked`, {
    mode: "cors",
    method: "PATCH",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
