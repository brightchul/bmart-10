import React, { useContext } from "react";
import styled from "styled-components";
import { ItemContext, ItemContextType } from "./ItemContext";

type ValueType = {
  cost?: string;
  sale?: string;
  saleValue?: number;
  discountedPrice?: number;
};

const DEFAULT_PRICE = "0";
const DEFAULT_SALE = "0%";

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

const getSaleValue = (sale: string): number => {
  const saleValue = parseInt(sale);
  return Number.isNaN(saleValue) ? 0 : saleValue;
};

const getDiscountPrice = (price: string, saleValue: number): number => {
  const result = parseInt(price) * (1 - saleValue / 100);
  return parseInt(result + ""); // 소수값 제거
};

const getValues = ({
  cost = DEFAULT_PRICE,
  sale = DEFAULT_SALE,
}: ItemContextType): ValueType => {
  const saleValue: number = getSaleValue(sale);
  const discountedPrice = getDiscountPrice(cost, saleValue);

  return { cost, sale, saleValue, discountedPrice };
};

export default function ItemPrice(): JSX.Element {
  const { cost, sale, saleValue = 0, discountedPrice }: ValueType = getValues(
    useContext(ItemContext)
  );

  return (
    <div>
      {saleValue > 0 && (
        <div style={{ marginTop: MARGIN_TOP }}>
          <Sale>{sale}</Sale>
          <Price>{cost}원</Price>
        </div>
      )}
      <DiscountedPrice>{discountedPrice}원</DiscountedPrice>
    </div>
  );
}
