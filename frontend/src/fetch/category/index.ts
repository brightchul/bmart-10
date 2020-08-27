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
  startIdx,
  offset,
}: {
  mainCategoryName?: string;
  subCategoryNo?: string;
  startIdx?: number;
  offset?: number;
}): Promise<ArrCategoryGoods> => {
  if (subCategoryNo === undefined || subCategoryNo === "") {
    return (
      await fetchGet<{ success: boolean; data?: ArrCategoryGoods }>(
        `/api/category/goods/${mainCategoryName}?startIdx=${startIdx}&offset=${offset}`
      )
    )?.data;
  } else {
    return (
      await fetchGet<{ success: boolean; data?: ArrCategoryGoods }>(
        `/api/category/goods/${mainCategoryName}/${subCategoryNo}?startIdx=${startIdx}&offset=${offset}`
      )
    )?.data;
  }
};

export const getNewGoods = async ({
  startIdx,
  offset,
}: {
  startIdx?: number;
  offset?: number;
}): Promise<ArrCategoryGoods> => {
  return (
    await fetchGet<{ success: boolean; data?: ArrCategoryGoods }>(
      `/api/goods/new?startIdx=${startIdx}&offset=${offset}`
    )
  )?.data;
};

export const getPopularGoods = async ({
  startIdx,
  offset,
}: {
  startIdx?: number;
  offset?: number;
}): Promise<ArrCategoryGoods> => {
  return (
    await fetchGet<{ success: boolean; data?: ArrCategoryGoods }>(
      `/api/goods/popular?startIdx=${startIdx}&offset=${offset}`
    )
  )?.data;
};

export const getDiscountGoods = async ({
  startIdx,
  offset,
}: {
  startIdx?: number;
  offset?: number;
}): Promise<ArrCategoryGoods> => {
  return (
    await fetchGet<{ success: boolean; data?: ArrCategoryGoods }>(
      `/api/goods/discount?startIdx=${startIdx}&offset=${offset}`
    )
  )?.data;
};
