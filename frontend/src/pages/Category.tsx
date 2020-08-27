import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Layout, HorizontalSlider } from "../components/common";
import MainItem from "../components/home/MainItem";
import CategoryMenu from "../components/common/CategoryMenu";
import Banner from "../components/common/Banner";
import { getAdsData } from "../mock";
import ItemList from "../components/common/ItemList";
import { getSubCategoryList, getCategoryGoods } from "../fetch/category";
import { ItemType } from "../types/ItemType";

type CategoryType = {
  mainCategory?: string;
  subCategory?: string;
};

type SubCategoryInfo = {
  no: string;
  name: string;
};

type ArrSubCategoryInfo = Array<SubCategoryInfo> | undefined;
type ArrCategoryGoods = Array<ItemType> | undefined;

const Category = ({
  match: {
    params: { mainCategory = "", subCategory = "" },
  },
}: RouteComponentProps<CategoryType>): JSX.Element => {
  const [[subCategoryDataList, goodsDataList], setDataArr] = useState([
    [] as ArrSubCategoryInfo,
    [] as ArrCategoryGoods,
  ]);

  useEffect(() => {
    Promise.all([
      getSubCategoryList(mainCategory),
      getCategoryGoods({
        mainCategoryName: mainCategory,
        subCategoryNo: subCategory,
      }),
    ]).then(([newSubCategoryDataList, newGoodsDataList]) => {
      setDataArr([newSubCategoryDataList, newGoodsDataList]);
    });
    return (): void => setDataArr([subCategoryDataList, []]);
  }, [mainCategory, subCategory]);

  const data = (goodsDataList || []).slice(0, 6);
  return (
    <Layout mainCategory={mainCategory} subCategory={subCategory}>
      {!subCategory && <Banner advertiseData={getAdsData()}></Banner>}
      {!subCategory && (
        <CategoryMenu
          baseUrl={`/category${"/" + mainCategory}`}
          mainCategoryName={mainCategory}
          categoryData={subCategoryDataList}
        ></CategoryMenu>
      )}
      {!subCategory && (
        <HorizontalSlider
          title={"이 상품 어때요?"}
          isMore
          onClick={(): void => {
            console.log("새로 나온거 더보기...");
          }}
        >
          {data.map((item: ItemType, idx: number) => {
            return <MainItem key={idx + ""} {...item} />;
          })}
        </HorizontalSlider>
      )}
      <ItemList data={goodsDataList || ([] as ItemType[])}></ItemList>
    </Layout>
  );
};

export default Category;
