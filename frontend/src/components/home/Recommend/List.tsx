import React from "react";
import styled from "styled-components";

import { Good } from "../../../types/RecommandGoods";
import { RECOMMEND_SECTION } from "../../../constants/layout";

import Content from "./Content";

const datas: Array<Good> = [
  {
    id: 1,
    name: "무 1통",
    categoryName: "",
    cost: 2200,
    discount: 0,
    imageUrl:
      "https://bmart-10-bucket.s3.ap-northeast-2.amazonaws.com/public/img/1542781238687l0.jpg",
  },
  {
    id: 2,
    name: "가지 2입",
    categoryName: "",
    cost: 1680,
    discount: 0,
    imageUrl:
      "https://bmart-10-bucket.s3.ap-northeast-2.amazonaws.com/public/img/1593066725283l0.jpg",
  },
  {
    id: 3,
    name: "이유식 재료 친환경 당근 250g",
    categoryName: "",
    cost: 1400,
    discount: 10,
    imageUrl:
      "https://bmart-10-bucket.s3.ap-northeast-2.amazonaws.com/public/img/1585893088954l0.jpg",
  },
  {
    id: 4,
    name: "무농약 간편 샐러드 6종",
    categoryName: "",
    cost: 1800,
    discount: 50,
    imageUrl:
      "https://bmart-10-bucket.s3.ap-northeast-2.amazonaws.com/public/img/1470792312213l0.jpg",
  },
];

const Wrapper = styled.div<{ innerHeight: number }>`
  width: 100%;
`;

const Text = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  innerHeight?: number;
  contentHeight?: number;
  menus: Array<string>;
};

export default function List(props: Props): JSX.Element {
  return (
    <Wrapper innerHeight={props.innerHeight || RECOMMEND_SECTION.SIZE}>
      {props.menus.map((menu, index) => (
        <Content
          goodsData={datas}
          key={`${menu}.${index}`}
          innerHeight={RECOMMEND_SECTION.SIZE}
        ></Content>
      ))}
      <Text>
        <p>더이상 대표 상품이 없어요</p>
      </Text>
    </Wrapper>
  );
}
