import React from "react";
import style from "styled-components";

import { COLOR } from "../../../constants/style";
import { CheckBox } from "../../common";
import { CartItemType } from "../../../types/Cart";

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
  onCheck: (id: number) => void;
  onIncrease: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
  onDecrease: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
};

const CartItem = (props: Props): JSX.Element => {
  const { data, onCheck, onIncrease, onDecrease } = props;
  const { id, name, cost, discount, cnt, imageUrl, isChecked } = data;
  const salePrice = cost - Math.round(cost * (discount * 0.01));

  return (
    <ItemWrapper>
      <TitleWrapper>
        <CheckBoxWrapper onClick={(): void => onCheck(id)}>
          <CheckBox isChecked={isChecked} />
          <p>{name}</p>
        </CheckBoxWrapper>
        <DeleteBtn>삭제</DeleteBtn>
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
              name="minus"
              style={{ color: cnt === 1 ? COLOR.GREY_3 : COLOR.BLACK }}
              onClick={(
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ): void => onDecrease(e, id)}
            >
              ㅡ
            </CounterButton>
            <CounterItem>{cnt}</CounterItem>
            <CounterButton
              name="plus"
              onClick={(
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ): void => onIncrease(e, id)}
            >
              +
            </CounterButton>
          </ChangeCounter>
        </PriceWrapper>
      </ContentWrapper>
    </ItemWrapper>
  );
};

CartItem.defaultProps = {
  goodId: 0,
  title: "",
  price: 0,
  sale: 0,
  src: "string",
};

export default CartItem;
