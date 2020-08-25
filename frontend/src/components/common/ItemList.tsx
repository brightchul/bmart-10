import React, { useState } from "react";
import styled from "styled-components";
import MainItem from "../home/MainItem";
const Container = styled.div`
  width: 100%;
  padding: 15px;
`;

const SortHeader = styled.div`
  height: 2em;
  line-height: 2em;
  text-align: right;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SortSelect = styled.div`
  border-radius: 15px 15px 0px 0px;
  position: fixed;
  background-color: #eee;
  width: 100%;
  bottom: 0px;
  transition: transform 0.2s linear;
  z-index: 3000;
`;
const SortSelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const SelectOne = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
`;

const SelectShadow = styled.div`
  background-color: #000;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  display: none;
  opacity: 0.5;
  z-index: 3000;
`;

const CheckIcon = ({ show }: { show: boolean }): JSX.Element => (
  <i
    className="fa fa-check"
    style={{ fontSize: "1em", opacity: Number(show) }}
  ></i>
);

type SortType = {
  title: string;
  sortLogic: (a: ItemType, b: ItemType) => number;
};

const sortTypeArr: Array<SortType> = [
  {
    title: "기본 정렬순",
    sortLogic: (a: ItemType, b: ItemType): number =>
      a.title > b.title ? 1 : -1,
  },
  {
    title: "인기 상품순",
    sortLogic: (a: ItemType, b: ItemType): number =>
      a.title > b.title ? 1 : -1,
  },
  {
    title: "금액 높은순",
    sortLogic: (a: ItemType, b: ItemType): number =>
      parseInt(b.cost) - parseInt(a.cost),
  },
  {
    title: "금액 낮은순",
    sortLogic: (a: ItemType, b: ItemType): number =>
      parseInt(a.cost) - parseInt(b.cost),
  },
  {
    title: "신규 상품순",
    sortLogic: (a: ItemType, b: ItemType): number =>
      a.title > b.title ? 1 : -1,
  },
  {
    title: "할인율 순",
    sortLogic: (a: ItemType, b: ItemType): number =>
      parseInt(b.discount) - parseInt(a.discount),
  },
];

type ItemType = {
  amount: string;
  categoryName: string;
  cost: string;
  createdAt: string;
  discount: string;
  goodId: string;
  imageUrl: string;
  orderCnt: string;
  title: string;
};

export default function ItemList({
  data,
}: {
  data: Array<ItemType>;
}): JSX.Element {
  const [sortState, setSortState] = useState({ y: "100%", sortIdx: 0, data });
  sortState.data = data;

  return (
    <div style={{ height: "100%" }}>
      <SelectShadow
        style={{ display: sortState.y === "100%" ? "none" : "block" }}
        onClick={(): void => setSortState({ ...sortState, y: "100%" })}
      ></SelectShadow>
      <Container>
        <SortHeader>
          <span
            onClick={(): void => {
              setSortState({ ...sortState, y: "0%" });
            }}
          >
            {sortTypeArr[sortState.sortIdx].title} ▼
          </span>
        </SortHeader>

        <Wrapper>
          {sortState.data.map(
            (one: ItemType, idx: number): JSX.Element => {
              return <MainItem key={idx + ""} width="48%" {...one}></MainItem>;
            }
          )}
        </Wrapper>
      </Container>
      <SortSelect style={{ transform: `translateY(${sortState.y})` }}>
        <SortSelectHeader>
          <span></span>
          <span>정렬</span>
          <span onClick={(): void => setSortState({ ...sortState, y: "100%" })}>
            닫기
          </span>
        </SortSelectHeader>
        <div>
          {sortTypeArr.map((one: SortType, sortIdx: number) => (
            <SelectOne
              key={sortIdx + ""}
              onClick={(): void =>
                setSortState({
                  y: "100%",
                  sortIdx,
                  data: data.sort(one.sortLogic),
                })
              }
            >
              <span>{one.title}</span>
              <CheckIcon show={sortState.sortIdx === sortIdx}></CheckIcon>
            </SelectOne>
          ))}
        </div>
      </SortSelect>
    </div>
  );
}
