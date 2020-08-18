import React from "react";
import Layout from "../components/common/Layout";
import Category from "../components/home/CategoryButtonArea";
import MainItemContainer from "../components/home/MainItemContainer";
import MainItemGallery from "../components/home/MainItemGallery";
import Banner from "../components/home/Banner";
import Recommend from "../components/home/Recommend";
import itemData from "../ItemData.json";

import PullTo from "../components/home/PullTo";

const data = [
  {
    title: "한끼 당근 1개",
    price: "7500",
    sale: "7%",
    src: "/asset/img/1583285919646l0.jpg",
  },
  {
    title: "GAP 오이 2입",
    price: "14900",
    sale: "",
    src: "/asset/img/1531993158257l0.jpg",
  },
  {
    title: "친환경 당근 500g",
    price: "13900",
    sale: "",
    src: "/asset/img/1463997072538l0.jpg",
  },
  {
    title: "다다기오이 3입",
    price: "2990",
    sale: "",
    src: "/asset/img/1592985466972l0.jpg",
  },
  {
    title: "무농약 양배추 1/2통",
    price: "10500",
    sale: "",
    src: "/asset/img/1573711443599l0.jpg",
  },
  {
    title: "양배추 2종",
    price: "14900",
    sale: "",
    src: "/asset/img/1593066870177l0.jpg",
  },
];

const advertiseMockData = [
  {
    imageURL:
      "https://user-images.githubusercontent.com/38618187/90112691-4b324600-dd8b-11ea-83cf-d387131713dd.jpg",
  },
  {
    imageURL:
      "https://user-images.githubusercontent.com/38618187/90112683-49688280-dd8b-11ea-8c03-d693e9a9fd1f.jpg",
  },
  {
    imageURL:
      "https://user-images.githubusercontent.com/38618187/90112698-4cfc0980-dd8b-11ea-90a9-a4342fc1086e.gif",
  },
];

export default function Home(): JSX.Element {
  let isScroll = true;
  let scrollStart = 0;

  const observable = {
    callbacks: new Array<Function>(),
    trigger: function (height: number) {
      this.callbacks.forEach((callback) => {
        callback(height);
      });
    },
  };

  function onTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const { screenY } = event.touches[0];
    isScroll = true;
    scrollStart = screenY;
  }

  function onTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!isScroll) return;

    isScroll = false;
    observable.trigger(0);
  }

  function onTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!isScroll) return;

    const { screenY } = event.touches[0];

    if (screenY - scrollStart < 0) {
      isScroll = false;
      return;
    }

    observable.trigger(screenY - scrollStart);
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
        <MainItemGallery data={data.slice(0, 4)}></MainItemGallery>
        <MainItemContainer data={itemData.slice(0, 30)}>
          지금 뭐 먹지?
        </MainItemContainer>
        <MainItemContainer data={itemData.slice(30, 60)}>
          지금 필요한 생필품!!
        </MainItemContainer>
        <Recommend></Recommend>
      </div>
    </Layout>
  );
}
