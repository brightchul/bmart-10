import React from "react";
import styled from "styled-components";

import { Good } from "../../../types/RecommandGoods";

import Goods from "./Goods";

const Wrapper = styled.div<{ innerHeight: number | undefined }>`
  width: 100%;
  ${(props): string | null =>
    props.innerHeight ? `height: ${props.innerHeight}px;` : null}

  display: flex;
  flex-direction: column;

  border: 1px solid #e8e8e8;
  margin-top: -1px;
  margin-left: -1px;
`;

const Row = styled.div`
  width: calc(100% - 20px);
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  goodsData: Good[];
  innerHeight?: number;
};

export default function Content(props: Props): JSX.Element {
  return (
    <Wrapper innerHeight={props.innerHeight}>
      <Row>
        <Goods {...props.goodsData[0]} />
        <Goods {...props.goodsData[1]} />
      </Row>
      <Row>
        <Goods {...props.goodsData[2]} />
        <Goods {...props.goodsData[3]} />
      </Row>
    </Wrapper>
  );
}
