import React, { useContext } from "react";
import styled from "styled-components";
import { ItemContext, ItemContextType } from "./ItemContext";

type ValueType = {
  cost?: string;
  discount?: string;
  saleValue?: number;
  width?: string;
  discountedPrice?: number;
};

const DEFAULT_PRICE = "0";
const DEFAULT_DISCOUNT = "0%";

const MARGIN_TOP = "0px";

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
  width,
  cost = DEFAULT_PRICE,
  discount = DEFAULT_DISCOUNT,
}: ItemContextType): ValueType => {
  const saleValue: number = getSaleValue(discount);
  const discountedPrice = getDiscountPrice(cost, saleValue);

  return { cost, width, discount, saleValue, discountedPrice };
};
const ItemPriceWrapper = styled.div`
  ${({ width }: { width?: string }): string | false =>
    width === "100%" &&
    `
    display:flex;
    margin-top:0.5em;
    margin-bottom:0.5em;`}
`;
export default function ItemPrice(): JSX.Element {
  const {
    cost,
    width,
    discount,
    saleValue = 0,
    discountedPrice,
  }: ValueType = getValues(useContext(ItemContext));

  return (
    <ItemPriceWrapper width={width}>
      {saleValue > 0 && (
        <div style={{ marginTop: MARGIN_TOP }}>
          <Sale>{discount}%</Sale>&nbsp;
          <Price>{cost?.toLocaleString()}원</Price>&nbsp;
        </div>
      )}
      <DiscountedPrice>{discountedPrice?.toLocaleString()}원</DiscountedPrice>
    </ItemPriceWrapper>
  );
}
