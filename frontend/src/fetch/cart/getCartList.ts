import { API_HOST } from "../../constants/API";

import { CartItemType } from "../../types/Cart";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: {
        cartList: CartItemType[];
      };
    };

export default async function getCartList(): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/cart`, {
    mode: "cors",
    method: "GET",
  }).then((res) => res.json());
}
