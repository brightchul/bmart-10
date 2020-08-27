import React from "react";
import style from "styled-components";

import { CheckBox } from "../common";
import { CartContext } from "../../contexts";

const HeaderWrapper = style.div`
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleCheck = style.div`
  display: flex;
  align-items: center;
`;

const ToggleTitle = style.p`
  margin-left: 5px;
`;

const CartHeader = (): JSX.Element => {
  const cartData = CartContext.useCartState();
  const { isAllChecked } = cartData;

  const cartDispatch = CartContext.useCartDispatch();

  const onAllCheck = (): void => {
    cartDispatch({
      type: "ALL_CHECK_CART_ITEM",
    });
  };

  const onRemoveCheckedItem = (): void => {
    cartDispatch({
      type: "REMOVE_CHECKED_CART",
    });
  };

  return (
    <HeaderWrapper>
      <ToggleCheck onClick={onAllCheck}>
        <CheckBox isChecked={isAllChecked} />
        <ToggleTitle>{isAllChecked ? "선택 해제" : "모두 선택"}</ToggleTitle>
      </ToggleCheck>
      <p onClick={onRemoveCheckedItem}>선택 비우기</p>
    </HeaderWrapper>
  );
};

CartHeader.defaultProps = {
  isAllChecked: false,
};

export default CartHeader;
