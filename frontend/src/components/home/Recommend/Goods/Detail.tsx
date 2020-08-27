import React from "react";
import styled from "styled-components";

import ItemPrice from "./ItemPrice";

const MARGIN_TOP = "0.3em";

const Wrapper = styled.div`
  margin-top: ${MARGIN_TOP};
`;

const ItemTitle = styled.div`
  white-space: break-spaces;
  height: 40px;
  line-height: 1rem;

  font-size: 1rem;
  overflow: hidden;
`;

type Props = {
  title: string;
  price: number;
  sale: number;
};

function trimText(text: string): string {
  if (!text) {
    return "";
  }
  if (text.length > 20) {
    return text.substring(0, 20) + "...";
  }
  return text;
}

export default function Detail(props: Props): JSX.Element {
  return (
    <Wrapper>
      <ItemTitle>{trimText(props.title)}</ItemTitle>
      <ItemPrice price={props.price} sale={props.sale} />
    </Wrapper>
  );
}
