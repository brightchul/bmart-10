import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Layout, HorizontalSlider } from "../components/common";
import MainItem from "../components/home/MainItem";
import CategoryMenu from "../components/common/CategoryMenu";
import Banner from "../components/common/Banner";
import { getAdsData, getItems } from "../mock";
import ItemList from "../components/common/ItemList";
import { getSubCategoryList, getCategoryGoods } from "../fetch/category";

type Data = {
  title: string;
  price: string;
  sale: string;
  src: string;
  width?: string;
};

type CategoryType = {
  mainCategory?: string;
  subCategory?: string;
};

const Category = ({
  match: {
    params: { mainCategory = "", subCategory = "" },
  },
}: RouteComponentProps<CategoryType>): JSX.Element => {
  const [[subCategoryDataList, goodsDataList], setDataArr] = useState([[], []]);

  useEffect(() => {
    Promise.all([
      getSubCategoryList(mainCategory),
      getCategoryGoods({
        mainCategoryName: mainCategory,
        subCategoryNo: subCategory,
      }),
    ]).then(([newSubCategoryDataList, newGoodsDataList]) => {
      setDataArr([newSubCategoryDataList.data, newGoodsDataList.data]);
    });
    return () => setDataArr([subCategoryDataList, []]);
  }, [mainCategory, subCategory]);

  const data = goodsDataList.slice(0, 6);
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
          {data.map((item: Data, idx: number) => {
            return <MainItem key={idx + ""} {...item} />;
          })}
        </HorizontalSlider>
      )}
      <ItemList data={goodsDataList}></ItemList>
    </Layout>
  );
};

export default Category;
