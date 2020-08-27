import React from "react";
import style from "styled-components";

import CartItem from "./CartItem";
import { CartItemType } from "../../../types/Cart";

const ListWrapper = style.div`
  width: 100%;
  padding: 15px;
`;

type Props = {
  data: Array<CartItemType>;
};

const CartList = (props: Props): JSX.Element => {
  const { data } = props;

  return (
    <ListWrapper>
      {data.map((item, index) => (
        <CartItem key={index + item.title} data={item} />
      ))}
    </ListWrapper>
  );
};

export default CartList;
