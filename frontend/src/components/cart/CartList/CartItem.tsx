import React from "react";
import style from "styled-components";

import { COLOR } from "../../../constants/style";
import { CheckBox } from "../../common";
import { CartItemType } from "../../../types/Cart";

import { CartContext } from "../../../contexts";

const ItemWrapper = style.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TitleWrapper = style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckBoxWrapper = style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p {
    margin-left: 5px;
    font-weight: 700;
  }
`;

const DeleteBtn = style.div`
  color: ${COLOR.BLUE}
`;

const ContentWrapper = style.div`
  display: flex;
  margin-top: 15px;
`;

const ImgWrapper = style.div`
  display: flex;

  > img {
    width: 100px;
    height: 100px;
  }
`;

const PriceWrapper = style.div`
  display: flex;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  justify-content: space-between;
`;

const Price = style.div`
  display: flex;
  color: ${COLOR.GREY_2};
  margin-right: 5px;
`;

const SaleWrapper = style.div`
  display: flex;
  margin-top: 5px;
`;

const Sale = style.div`
  display: flex;
`;

const ChangeCounter = style.div`
  display: flex;
  border: 1px solid grey;
  border-radius: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
  width: 7rem;
`;

const CounterItem = style.div`
  display: flex;
  align-items: center;
`;

const CounterButton = style.button`
  border: 0;
  background: transparent;
  outline: none;
  font-size: 1rem;
`;

type Props = {
  data: CartItemType;
};

const CartItem = (props: Props): JSX.Element => {
  const { data } = props;
  const { id, title, cost, discount, amount, imageUrl, checked } = data;
  const salePrice = cost - Math.round(cost * (discount * 0.01));

  const cartDispatch = CartContext.useCartDispatch();

  const onCheckItem = (): void => {
    cartDispatch({
      type: "CHECK_CART_ITEM",
      payload: {
        id,
        checked: !checked,
      },
    });
  };

  const onDecrease = (): void => {
    const count = amount < 2 ? 1 : amount - 1;
    cartDispatch({
      type: "UPDATE_CART",
      payload: {
        id,
        amount: count,
      },
    });
  };

  const onIncrease = (): void => {
    cartDispatch({
      type: "UPDATE_CART",
      payload: {
        id,
        amount: amount + 1,
      },
    });
  };

  const onRemove = (): void => {
    cartDispatch({
      type: "REMOVE_CART",
      payload: {
        id,
      },
    });
  };

  return (
    <ItemWrapper>
      <TitleWrapper>
        <CheckBoxWrapper onClick={onCheckItem}>
          <CheckBox isChecked={checked} />
          <p>{title}</p>
        </CheckBoxWrapper>
        <DeleteBtn onClick={onRemove}>삭제</DeleteBtn>
      </TitleWrapper>
      <ContentWrapper>
        <ImgWrapper>
          <img src={imageUrl} />
        </ImgWrapper>
        <PriceWrapper>
          <div>
            <Price>({cost}원)</Price>
            <SaleWrapper>
              {discount !== 0 && (
                <Price style={{ textDecoration: "line-through" }}>
                  {cost}원
                </Price>
              )}
              <Sale>{salePrice}원</Sale>
            </SaleWrapper>
          </div>
          <ChangeCounter>
            <CounterButton
              style={{ color: amount === 1 ? COLOR.GREY_3 : COLOR.BLACK }}
              onClick={onDecrease}
            >
              ㅡ
            </CounterButton>
            <CounterItem>{amount}</CounterItem>
            <CounterButton onClick={onIncrease}>+</CounterButton>
          </ChangeCounter>
        </PriceWrapper>
      </ContentWrapper>
    </ItemWrapper>
  );
};

export default CartItem;
