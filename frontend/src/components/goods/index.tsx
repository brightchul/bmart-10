import React, { useState, useEffect } from "react";
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

import MainItem from "../home/MainItem";
import DeliveryInfo from "./DeliveryInfo";
import ReturnExchangeInfo from "./ReturnExchangeInfo";
import InfoSummary from "./InfoSummary";
import Counter from "./Counter";
import { CartItemType } from "../../types/Cart";
import { PopUpContext, CartContext } from "../../contexts";
import { MESSAGE } from "../../constants/message";
import getGoodsById from "../../fetch/goods/getGoodsByGoodId";
import { ItemType } from "../../types/ItemType";

const Container = styled.div`
  margin-top: -15px;
`;

type APIResponse = {
  success: boolean;
  data?: ItemType;
};

const getCost = (item: ItemType): number => {
  return (
    (parseInt(item?.cost || "0") *
      (1 - parseInt(item?.discount || "0") / 100)) |
    0
  );
};

export default function Goods({ goodId }: { goodId: string }): JSX.Element {
  const [item, setItem] = useState({
    goodId,
    title: "",
    categoryName: "",
    createdAt: "",
    cost: "0",
    discount: "",
    amount: "",
    imageUrl: "",
  });
  useEffect(() => {
    getGoodsById(goodId).then((result: APIResponse) => {
      if (result.data === undefined) return;
      setItem(result.data);
    });
  }, []);

  const cost = getCost(item);

  const [yPercent, setYPercent] = useState({ y: "100%" });
  const [count, setCount] = useState(1);

  const popupDispatch = PopUpContext.usePopUpDispatch();
  const history = useHistory();

  const cartDispatch = CartContext.useCartDispatch();

  const makeCartItem = (item?: ItemType): CartItemType => {
    if (item === undefined) return {} as CartItemType;

    const goodId = item.goodId || "0";
    const updateItem: CartItemType = {
      id: parseInt(goodId),
      name: item.title,
      cost: parseInt(item.cost || "0"),
      discount: parseInt(item.discount || "0"),
      imageUrl: item.imageUrl,
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
            <ItemImg
              style={{ backgroundImage: `url(${item?.imageUrl})` }}
            ></ItemImg>

            <ItemInfo>
              <ul>
                <li>{item?.title}</li>
                <li>1회 최대 구매수량 10개</li>
                <li>{cost}원</li>
              </ul>
            </ItemInfo>
            <Counter setCount={setCount} count={count}></Counter>
          </ItemContent>
          <BagButton onClick={addCart}>
            <span>{count}개 담기 </span>
            <RightSpan>{count * cost}원</RightSpan>
          </BagButton>
        </HideAreaContent>
      </HideArea>
    </Container>
  );
}
