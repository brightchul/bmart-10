import React from "react";
import style from "styled-components";
import { COLOR } from "../../constants/style";

const BtnWrapper = style.div`
  width: 100%;
  padding: 15px;
  position: fixed;
  bottom: 80px;
`;

const Btn = style.button`
  width: 100%;
  border: 1px solid ${COLOR.GREEN_1};
  background: ${COLOR.GREEN_1};
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
`;

const Count = style.div`
  width: 25px;
  height: 25px;
  background: ${COLOR.WHITE};
  color: ${COLOR.GREEN_1};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  margin-right: 10px;
`;

const Price = style.div`
  color: ${COLOR.WHITE};
`;

type Props = {
  orderAction: () => void;
  totalPrice: number;
  count: number;
};

const OrderBtn = (props: Props): JSX.Element => {
  const { orderAction, totalPrice, count } = props;

  return (
    <BtnWrapper>
      <Btn onClick={orderAction}>
        <Count>{count}</Count>
        <Price>{totalPrice}원 배달 주문하기</Price>
      </Btn>
    </BtnWrapper>
  );
};

OrderBtn.defaultProps = {
  totalPrice: 0,
  count: 0,
};

export default OrderBtn;
