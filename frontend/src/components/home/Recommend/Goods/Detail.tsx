import React from "react";
import styled from "styled-components";

import ItemPrice from "./ItemPrice";

const MARGIN_TOP = "0.3em";

const Wrapper = styled.div`
  margin-top: ${MARGIN_TOP};
`;

const ItemTitle = styled.div`
  white-space: break-spaces;
  height: 2rem;
  line-height: 1rem;

  font-size: 1rem;
`;

type Props = {
  title: string;
  price: number;
  sale: number;
};

export default function Detail(props: Props): JSX.Element {
  return (
    <Wrapper>
      <ItemTitle>{props.title}</ItemTitle>
      <ItemPrice price={props.price} sale={props.sale} />
    </Wrapper>
  );
}
