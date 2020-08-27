import { API_HOST } from "../../constants/API";
export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
    };

export default async function removeCartItem(
  list: string
): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/cart`, {
    mode: "cors",
    method: "DELETE",
    body: JSON.stringify(list),
  }).then((res) => res.json());
}
