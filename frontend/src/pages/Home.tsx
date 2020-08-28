import React, { useState, useEffect } from "react";
import { Layout, HorizontalSlider } from "../components/common";
import Category from "../components/home/CategoryButtonArea";
import MainItemContainer from "../components/home/MainItemContainer";
import MainItemGallery from "../components/home/MainItemGallery";
import Banner from "../components/common/Banner";
import Recommend from "../components/home/Recommend";
import MainItem from "../components/home/MainItem";
import PullTo from "../components/home/PullTo";
import { getAdsData } from "../mock";

import { PULL_TO } from "../constants/layout";
import { ItemType } from "../types/ItemType";
import {
  getCategoryGoods,
  getPopularGoods,
  getDiscountGoods,
  getNewGoods,
} from "../fetch/category";

type ArrCategoryGoods = Array<ItemType> | undefined;

type Data =
  | {
      title: string;
      price: string;
      sale: string;
      src: string;
      width?: string;
    }
  | ItemType;

export default function Home(): JSX.Element {
  const advertiseMockData = getAdsData();

  let isScroll = true;
  let scrollStart = 0;

  const observable = {
    callbacks: new Array<Function>(),
    trigger: function (height: number): void {
      this.callbacks.forEach((callback) => {
        callback(height);
      });
    },
  };

  function onTouchStart(event: React.TouchEvent<HTMLDivElement>): void {
    const { screenY, pageY, clientY } = event.touches[0];

    if (Math.round(pageY) > Math.round(clientY) + PULL_TO.THRESHOLD) {
      return;
    }
    isScroll = true;
    scrollStart = screenY;
  }

  function onTouchEnd(): void {
    if (!isScroll) return;

    isScroll = false;
    observable.trigger(0);
  }

  function onTouchMove(event: React.TouchEvent<HTMLDivElement>): void {
    if (!isScroll) return;

    const { screenY } = event.touches[0];

    if (screenY - scrollStart < 0 && scrollStart + PULL_TO.SIZE < screenY) {
      isScroll = false;
      return;
    }

    observable.trigger(Math.min(screenY - scrollStart, PULL_TO.SIZE));
  }

  const [
    [foodList, livingList, discountList, newList, popularList],
    setList,
  ] = useState([
    [] as ArrCategoryGoods,
    [] as ArrCategoryGoods,
    [] as ArrCategoryGoods,
    [] as ArrCategoryGoods,
    [] as ArrCategoryGoods,
  ]);

  // createdAt으로 10개 뽑아오기
  // orderCnt로 10개 뽑아오기

  useEffect((): void => {
    Promise.all([
      getCategoryGoods({
        mainCategoryName: "국·반찬·메인요리",
        startIdx: 0,
        offset: 36,
      }),
      getCategoryGoods({
        mainCategoryName: "생활용품·리빙",
        startIdx: 0,
        offset: 36,
      }),
      getDiscountGoods({
        startIdx: 0,
        offset: 4,
      }),
      getNewGoods({
        startIdx: 0,
        offset: 10,
      }),
      getPopularGoods({
        startIdx: 0,
        offset: 10,
      }),
    ]).then(
      ([
        updatedFoodList,
        updatedLivingList,
        updatedDiscountList,
        updatedNewList,
        updatedPopularList,
      ]): void => {
        setList([
          updatedFoodList,
          updatedLivingList,
          updatedDiscountList,
          updatedNewList,
          updatedPopularList,
        ]);
      }
    );
  }, []);

  const name = localStorage.getItem("name") || "우리 고객";

  return (
    <Layout>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <PullTo observable={observable} />
        <Banner advertiseData={advertiseMockData}></Banner>
        <Category></Category>
        <HorizontalSlider title={`${name}님을 위해 준비한 상품`}>
          {(livingList?.slice(5, 20) || []).map(
            (item: ItemType, idx: number) => (
              <MainItem fontSize="0.8em" key={idx + ""} {...item} />
            )
          )}
        </HorizontalSlider>
        <MainItemGallery data={discountList || []} />
        <MainItemContainer data={foodList}>지금 뭐 먹지?</MainItemContainer>
        <HorizontalSlider title={"새로 나왔어요"} isMore>
          {(newList || []).map((item: Data, idx: number) => (
            <MainItem fontSize="0.8em" key={idx + ""} {...item} />
          ))}
        </HorizontalSlider>
        <HorizontalSlider title={"요즘 잘 팔려요"} isMore>
          {(popularList || []).map((item: Data, idx: number) => (
            <MainItem fontSize="12px" key={idx + ""} {...item} />
          ))}
        </HorizontalSlider>
        <MainItemContainer data={livingList}>
          지금 필요한 생필품!!
        </MainItemContainer>
        <Recommend />
      </div>
    </Layout>
  );
}
