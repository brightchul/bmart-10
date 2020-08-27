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

const SaleSection = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: flex-end;
`;

const Sale = styled.span`
  font-size: 1em;
  font-weight: 800;
  color: #f01616;
`;

const Price = styled.span`
  font-size: 1em;
  padding-left: 3px;
  font-weight: 500;
  color: #bbb;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.div`
  text-align: right;
`;

const getDiscountPrice = (price: number, saleValue: number): number => {
  return Math.ceil((price * (100 - saleValue)) / 100);
};

type Props = {
  id?: number;
  title: string;
  imageURL: string;
  discount: number;
  price: number;
};

export default function SearchBar(props: Props): JSX.Element {
  const history = useHistory();

  const discountedPrice = getDiscountPrice(props.price, props.discount);

  return (
    <Wrapper onClick={(): void => history.push(`/goods/${props.id}`)}>
      <LazyImage imageURL={props.imageURL} />
      <Information>
        <Title>{props.title}</Title>
        {props.discount > 0 && (
          <SaleSection>
            <Price>{props.price}원</Price>
            <Sale>-{props.discount}%</Sale>
          </SaleSection>
        )}
        <DiscountedPrice>{discountedPrice}원</DiscountedPrice>
      </Information>
    </Wrapper>
  );
}
