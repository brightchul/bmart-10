import React, { useContext } from "react";
import styled from "styled-components";
import { ItemContext, ItemContextType } from "./ItemContext";

type ValueType = {
  cost?: string;
  discount?: string;
  saleValue?: number;
  discountedPrice?: number;
};

const DEFAULT_PRICE = "0";
const DEFAULT_DISCOUNT = "0%";

const MARGIN_TOP = "-5px";

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
  font-weight: 800;
`;

const getSaleValue = (discount: string): number => {
  const saleValue = parseInt(discount);
  return Number.isNaN(saleValue) ? 0 : saleValue;
};

const getDiscountPrice = (price: string, saleValue: number): number => {
  const result = parseInt(price) * (1 - saleValue / 100);
  return parseInt(result + ""); // 소수값 제거
};

const getValues = ({
  cost = DEFAULT_PRICE,
  discount = DEFAULT_DISCOUNT,
}: ItemContextType): ValueType => {
  const saleValue: number = getSaleValue(discount);
  const discountedPrice = getDiscountPrice(cost, saleValue);

  return { cost, discount, saleValue, discountedPrice };
};

export default function ItemPrice(): JSX.Element {
  const {
    cost,
    discount,
    saleValue = 0,
    discountedPrice,
  }: ValueType = getValues(useContext(ItemContext));

  return (
    <div>
      {saleValue > 0 && (
        <div style={{ marginTop: MARGIN_TOP }}>
          <Sale>{discount}%</Sale>
          <Price>{cost}원</Price>
        </div>
      )}
      <DiscountedPrice>{discountedPrice}원</DiscountedPrice>
    </div>
  );
}
