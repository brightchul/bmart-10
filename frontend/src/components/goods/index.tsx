import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  EtcInfo,
  ButtonArea,
  Button,
  Shadow,
  HideArea,
  HideAreaHeader,
  HideAreaContent,
  BagButton,
  RightSpan,
  ItemInfo,
  ItemImg,
  ItemContent,
} from "./StyleComponent";
import { getItem, ItemType } from "../../mock";
import MainItem from "../home/MainItem";
import DeliveryInfo from "./DeliveryInfo";
import ReturnExchangeInfo from "./ReturnExchangeInfo";
import InfoSummary from "./InfoSummary";
import Counter from "./Counter";
import { CartItemType } from "../../types/Cart";
import { PopUpContext, CartContext } from "../../contexts";
import { MESSAGE } from "../../constants/message";

const Container = styled.div`
  margin-top: -15px;
`;

const getPrice = (item: ItemType | undefined): number => {
  return (
    (parseInt(item?.price || "0") * (1 - parseInt(item?.sale || "0") / 100)) | 0
  );
};

export default function Goods({ goodId }: { goodId: string }): JSX.Element {
  const item = getItem(parseInt(goodId));
  const price = getPrice(item);

  const [yPercent, setYPercent] = useState({ y: "100%" });
  const [count, setCount] = useState(1);

  const popupDispatch = PopUpContext.usePopUpDispatch();
  const history = useHistory();

  const cartDispatch = CartContext.useCartDispatch();

  const makeCartItem = (item: ItemType): CartItemType => {
    const goodId = item.goodId || 0;
    const updateItem: CartItemType = {
      id: goodId,
      title: item.title,
      cost: parseInt(item.price),
      discount: parseInt(item.sale) || 0,
      imageUrl: item.src,
      checked: true,
      amount: count,
    };

    return updateItem;
  };

  const addCart = (): void => {
    setYPercent({ y: "100%" });
    if (item) {
      const updateItem: CartItemType = makeCartItem(item);
      cartDispatch({
        type: "ADD_CART",
        payload: {
          data: updateItem,
          count,
        },
      });

      // 상품이 담겼다는 메세지 추가
      const goCartPage = (): void => {
        popupDispatch({ type: "POPUP_CLOSE" });
        history.push("/cart");
      };
      popupDispatch({
        type: "POPUP_OPEN",
        payload: {
          content: MESSAGE.ADD_CART,
          confirmAction: goCartPage,
        },
      });
    }
  };

  return (
    <Container>
      <MainItem width="100%" padding="0.5em 1em" {...item}></MainItem>
      <InfoSummary></InfoSummary>
      <EtcInfo>
        <DeliveryInfo></DeliveryInfo>
        <ReturnExchangeInfo></ReturnExchangeInfo>
      </EtcInfo>
      <ButtonArea>
        <Button onClick={(): void => setYPercent({ y: "0%" })}>구매하기</Button>
      </ButtonArea>
      <Shadow
        style={{ display: yPercent.y === "100%" ? "none" : "block" }}
        onClick={(): void => setYPercent({ y: "100%" })}
      ></Shadow>
      <HideArea style={{ transform: `translateY(${yPercent.y})` }}>
        <HideAreaHeader>
          <span>{item?.title}</span>
          <RightSpan onClick={(): void => setYPercent({ y: "100%" })}>
            닫기
          </RightSpan>
        </HideAreaHeader>
        <HideAreaContent>
          <ItemContent>
            <ItemImg style={{ backgroundImage: `url(${item?.src})` }}></ItemImg>

            <ItemInfo>
              <ul>
                <li>{item?.title}</li>
                <li>1회 최대 구매수량 10개</li>
                <li>{price}원</li>
              </ul>
            </ItemInfo>
            <Counter setCount={setCount} count={count}></Counter>
          </ItemContent>
          <BagButton onClick={addCart}>
            <span>{count}개 담기 </span>
            <RightSpan>{count * price}원</RightSpan>
          </BagButton>
        </HideAreaContent>
      </HideArea>
    </Container>
  );
}
