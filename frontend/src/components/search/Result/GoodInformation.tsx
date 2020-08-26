import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import LazyImage from "./LazyImage";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  margin: 5px;
  display: flex;

  align-items: center;
`;

const Information = styled.div`
  width: calc(100% - 120px);
  height: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: right;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const Price = styled.p`
  margin: 0;
  padding: 0;
`;

type Props = {
  id?: number;
  title: string;
  imageURL: string;
  price: number;
};

export default function SearchBar(props: Props): JSX.Element {
  const history = useHistory();

  return (
    <Wrapper onClick={(): void => history.push(`/goods/${props.id}`)}>
      <LazyImage imageURL={props.imageURL} />
      <Information>
        <Title>{props.title}</Title>
        <Price>{props.price.toLocaleString()} 원</Price>
      </Information>
    </Wrapper>
  );
}
