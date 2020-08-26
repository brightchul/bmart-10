import React from "react";
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
  const data = [] as Array<ItemType>;
  const itemData = [] as Array<ItemType>;

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
        <HorizontalSlider title={"고객님을 위해 준비한 상품"}>
          {data.map((item: ItemType, idx: number) => (
            <MainItem key={idx + ""} {...item} />
          ))}
        </HorizontalSlider>
        <MainItemGallery data={data.slice(0, 4)} />
        <MainItemContainer data={itemData.slice(0, 30)}>
          지금 뭐 먹지?
        </MainItemContainer>
        <HorizontalSlider title={"새로 나왔어요"} isMore>
          {data.map((item: Data, idx: number) => (
            <MainItem key={idx + ""} {...item} />
          ))}
        </HorizontalSlider>
        <HorizontalSlider title={"요즘 잘 팔려요"} isMore>
          {data.map((item: Data, idx: number) => (
            <MainItem key={idx + ""} {...item} />
          ))}
        </HorizontalSlider>
        <MainItemContainer data={itemData}>
          지금 필요한 생필품!!
        </MainItemContainer>
        <Recommend />
      </div>
    </Layout>
  );
}
