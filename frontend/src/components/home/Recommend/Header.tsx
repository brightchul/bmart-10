import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;

  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StrongText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const Text = styled.p`
  font-size: 1.5rem;

  margin: 0;
  padding: 0;
`;

export default function Header(): JSX.Element {
  return (
    <Wrapper>
      <StrongText>번쩍하면 배달오는</StrongText>
      <Text>B+ 마트 대표 상품</Text>
    </Wrapper>
  );
}
