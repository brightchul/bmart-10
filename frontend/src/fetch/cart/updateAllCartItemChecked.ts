import { API_HOST } from "../../constants/API";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
    };
type Item = {
  checked: boolean;
};
export default async function updateAllCartItemChecked(
  data: Item
): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/cart/checked/all`, {
    mode: "cors",
    method: "PATCH",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
