import React from "react";
import styled from "styled-components";

import { Good } from "../../../types/RecommandGoods";
import { RECOMMEND_SECTION } from "../../../constants/layout";

import Content from "./Content";

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
  goodsData: Array<{
    title: string;
    goodsData: Good[];
  }>;
};

export default function List(props: Props): JSX.Element {
  return (
    <Wrapper innerHeight={props.innerHeight || RECOMMEND_SECTION.SIZE}>
      {props.goodsData.map((recommendData, index) => (
        <Content
          goodsData={recommendData.goodsData}
          key={`${recommendData.title}.${index}`}
          innerHeight={RECOMMEND_SECTION.SIZE}
        ></Content>
      ))}
      <Text>
        <p>더이상 대표 상품이 없어요</p>
      </Text>
    </Wrapper>
  );
}
