import React from "react";
import style from "styled-components";

import { COLOR } from "../../constants/style";
import { CartContext } from "../../contexts";

type RowType = {
  justifyAttr?: string;
};

const TotalWrapper = style.div`
  width: 100%;
  padding: 15px;
`;

const Row = style.div<RowType>`
  display: flex;
  justify-content: ${(props): string | undefined => props.justifyAttr};
  margin-bottom: 10px;
`;
const Title = style.div`
  font-weight: 600;
`;

const Price = style.div`
`;

const Limit = style.div`
  color: ${COLOR.RED};
`;

const CartTotal = (): JSX.Element => {
  const cartData = CartContext.useCartState();
  const { totalPrice, deliveryTips } = cartData;

  return (
    <TotalWrapper>
      <Row>
        <Title>주문 금액</Title>
        <Price>{totalPrice}원</Price>
      </Row>
      <Row>
        <Title>배달팁</Title>
        <Price>{deliveryTips}원</Price>
      </Row>
      {totalPrice <= 5000 && (
        <Row justifyAttr="flex-end">
          <Limit>최소 주문금액 5,000원</Limit>
        </Row>
      )}
    </TotalWrapper>
  );
};


Row.defaultProps = {
  justifyAttr: "space-between",
};

export default CartTotal;
