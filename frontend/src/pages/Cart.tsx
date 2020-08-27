import React, { useEffect } from "react";
import style from "styled-components";
import { Layout, ShadowBar } from "../components/common";
import {
  OrderBtn,
  CartHeader,
  CartList,
  CartTotal,
  NotCartItem,
} from "../components/cart";
import { CartContext } from "../contexts";

const FakeComp = style.div`
  height: 80px;
`;

const Cart = (): JSX.Element => {
  // totalPrice, deliveryTips, cartItemList - context api
  const cartDispatch = CartContext.useCartDispatch();

  const cartData = CartContext.useCartState();
  const { cartList } = cartData;
  const isCart = cartList.length > 0 ? true : false; // 장바구니에 담긴 상품이 있는지 여부

  useEffect(() => {
    cartDispatch({
      type: "GET_CART",
    });
  }, []);

  return (
    <Layout>
      {isCart ? (
        <>
          <CartHeader />
          <ShadowBar />
          <CartList data={cartList} />
          <ShadowBar />
          <CartTotal />
          <FakeComp />
          <OrderBtn />
        </>
      ) : (
        <NotCartItem />
      )}
    </Layout>
  );
};

export default Cart;
