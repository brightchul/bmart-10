import React, { useEffect } from "react";
import style from "styled-components";
import { useHistory } from "react-router-dom";
import { Layout, ShadowBar } from "../components/common";
import {
  OrderBtn,
  CartHeader,
  CartList,
  CartTotal,
  NotCartItem,
} from "../components/cart";
import { PopUpContext, CartContext } from "../context";
import { MESSAGE } from "../constants/message";

const FakeComp = style.div`
  height: 80px;
`;

const Cart = (): JSX.Element => {
  // totalPrice, deliveryTips, cartItemList - context api
  const cartDispatch = CartContext.useCartDispatch();

  useEffect(() => {
    cartDispatch({
      type: "GET_CART",
    });
  }, []);

  const cartData = CartContext.useCartState();
  const {
    cartList,
    totalPrice,
    deliveryTips,
    checkItemAmount,
    isAllChecked,
  } = cartData;

  const isCart = cartList.length > 0 ? true : false; // 장바구니에 담긴 상품이 있는지 여부

  const history = useHistory();
  const popupDispatch = PopUpContext.usePopUpDispatch();

  const onAllCheck = (): void => {
    cartDispatch({
      type: "ALL_CHECK_CART_ITEM",
    });
  };

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
    <Layout>
      {isCart ? (
        <>
          <CartHeader isAllChecked={isAllChecked} onCheck={onAllCheck} />
          <ShadowBar />
          <CartList data={cartList} />
          <ShadowBar />
          <CartTotal totalPrice={totalPrice} deliveryTips={deliveryTips} />
          <FakeComp />
          <OrderBtn
            orderAction={orderAction}
            totalPrice={totalPrice}
            count={checkItemAmount}
          />
        </>
      ) : (
        <NotCartItem />
      )}
    </Layout>
  );
};

export default Cart;
