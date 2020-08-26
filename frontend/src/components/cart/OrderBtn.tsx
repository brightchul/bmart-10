import React from "react";
import style from "styled-components";
import { useHistory } from "react-router-dom";
import { COLOR } from "../../constants/style";
import { CartContext, PopUpContext } from "../../contexts";
import { MESSAGE } from "../../constants/message";

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

const OrderBtn = (): JSX.Element => {
  const cartData = CartContext.useCartState();
  const { totalPrice, checkItemAmount } = cartData;

  const history = useHistory();
  const popupDispatch = PopUpContext.usePopUpDispatch();

  const goLoginPage = (): void => {
    popupDispatch({ type: "POPUP_CLOSE" });
    history.push("/login");
  };

  const orderAction = (): void => {
    const token = localStorage.getItem("token");
    if (token) {
      // 구매하기
    } else {
      // 로그인 페이지로 유도
      popupDispatch({
        type: "POPUP_OPEN",
        payload: {
          content: MESSAGE.LOGIN_INDUCE,
          confirmAction: goLoginPage,
        },
      });
    }
  };

  return (
    <BtnWrapper>
      <Btn onClick={orderAction}>
        <Count>{checkItemAmount}</Count>
        <Price>{totalPrice}원 배달 주문하기</Price>
      </Btn>
    </BtnWrapper>
  );
};

export default OrderBtn;
