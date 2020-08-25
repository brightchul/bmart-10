import { get } from "../request";

export const getSubCategoryList = async (
  mainCategoryName: string
): Promise<any> => {
  const subCategoryList = await get(`/api/category/list/${mainCategoryName}`);
  return subCategoryList;
};

export const getCategoryGoods = async ({
  mainCategoryName,
  subCategoryNo,
}: {
  mainCategoryName?: string;
  subCategoryNo?: string;
}) => {
  if (subCategoryNo === undefined || subCategoryNo === "") {
    return await get(`/api/category/goods/${mainCategoryName}`);
  } else {
    return await get(
      `/api/category/goods/${mainCategoryName}/${subCategoryNo}`
    );
  }
};
