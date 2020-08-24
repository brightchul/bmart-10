import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

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
  price: number;
  sale: number;
};

export default function ItemPrice(props: Props): JSX.Element {
  const discountedPrice = getDiscountPrice(props.price, props.sale);

  return (
    <Wrapper>
      {props.sale > 0 && (
        <>
          <Sale>-{props.sale}%</Sale>
          <Price>{props.price}원</Price>
        </>
      )}
      <DiscountedPrice>{discountedPrice}원</DiscountedPrice>
    </Wrapper>
  );
}
