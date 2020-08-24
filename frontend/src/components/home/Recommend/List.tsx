import React from "react";
import Flicking from "@egjs/react-flicking";
import styled from "styled-components";

import Content from "./Content";

const HEIGHT = 400;

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
  store: {
    flicking: Flicking | undefined;
  };
  menus: Array<string>;
};

export default function List(props: Props): JSX.Element {
  return (
    <Wrapper innerHeight={props.innerHeight || HEIGHT}>
      {props.menus.map((menu, index) => (
        <Content key={`${menu}.${index}`} innerHeight={HEIGHT}></Content>
      ))}

      <Text>
        <p>더이상 대표 상품이 없어요</p>
      </Text>
    </Wrapper>
  );
}
