import { fetchGet } from "..";
import { ItemType } from "../../types/ItemType";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: ItemType;
    };

export default async function getGoodsById(id: string): Promise<APIResponse> {
  return await fetchGet<APIResponse>(`/api/goods/id/${id}`);
}
