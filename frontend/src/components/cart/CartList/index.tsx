import React from "react";
import style from "styled-components";

import CartItem from "./CartItem";
import { CartItemType } from "../../../types/Cart";
import { CartContext } from "../../../contexts";

const ListWrapper = style.div`
  width: 100%;
  padding: 15px;
`;

type Props = {
  data: Array<CartItemType>;
};

const CartList = (props: Props): JSX.Element => {
  const { data } = props;

  const cartDispatch = CartContext.useCartDispatch();

  const onCheckItem = (id: number): void => {
    cartDispatch({
      type: "CHECK_CART_ITEM",
      payload: {
        id,
      },
    });
  };

  const onDecrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ): void => {
    e.preventDefault();
    cartDispatch({
      type: "UPDATE_CART",
      payload: {
        id,
        type: "minus",
      },
    });
  };

  const onIncrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ): void => {
    e.preventDefault();
    cartDispatch({
      type: "UPDATE_CART",
      payload: {
        id,
        type: "plus",
      },
    });
  };

  return (
    <ListWrapper>
      {data.map((item, index) => (
        <CartItem
          key={index + item.name}
          data={item}
          onCheck={onCheckItem}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </ListWrapper>
  );
};

export default CartList;
