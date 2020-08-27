import { fetchGet } from "..";
import { ItemType } from "../../types/ItemType";

type SubCategoryInfo = {
  no: string;
  name: string;
};

type ArrSubCategoryInfo = Array<SubCategoryInfo> | undefined;

export const getSubCategoryList = async (
  mainCategoryName: string
): Promise<ArrSubCategoryInfo> => {
  const subCategoryList: ArrSubCategoryInfo = (
    await fetchGet<{ success: boolean; data?: ArrSubCategoryInfo }>(
      `/api/category/list/${mainCategoryName}`
    )
  )?.data;
  return subCategoryList;
};

type ArrCategoryGoods = Array<ItemType> | undefined;

export const getCategoryGoods = async ({
  mainCategoryName,
  subCategoryNo,
}: {
  mainCategoryName?: string;
  subCategoryNo?: string;
}): Promise<ArrCategoryGoods> => {
  if (subCategoryNo === undefined || subCategoryNo === "") {
    return (
      await fetchGet<{ success: boolean; data?: ArrCategoryGoods }>(
        `/api/category/goods/${mainCategoryName}`
      )
    )?.data;
  } else {
    return (
      await fetchGet<{ success: boolean; data?: ArrCategoryGoods }>(
        `/api/category/goods/${mainCategoryName}/${subCategoryNo}`
      )
    )?.data;
  }
};
