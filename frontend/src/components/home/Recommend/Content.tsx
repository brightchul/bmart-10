import React from "react";
import styled from "styled-components";

import MainItem from "../MainItem";

const Wrapper = styled.div<{ innerHeight: number | undefined }>`
  width: 100%;
  ${(props): string | null =>
    props.innerHeight ? `height: ${props.innerHeight}px;` : null}

  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: calc(100% - 70px);
  margin: 10px 35px 10px 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  innerHeight?: number;
};

export default function Content(props: Props): JSX.Element {
  return (
    <Wrapper innerHeight={props.innerHeight}>
      <Row>
        <MainItem></MainItem>
        <MainItem></MainItem>
      </Row>
      <Row>
        <MainItem></MainItem>
        <MainItem></MainItem>
      </Row>
    </Wrapper>
  );
}
