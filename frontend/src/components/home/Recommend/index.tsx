import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Menus from "./Menus";
import List from "./List";

import { HEADER, FOOTER } from "../../../constants/layout";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const dummyMenuData = [
  "채소",
  "과일·견과·쌀",
  "수산·해산·건어물",
  "정육·계란",
  "국·반찬·메인요리",
  "샐러드·간편식",
  "면·양념·오일",
  "음료·우유·떡·간식",
  "베이커리·치즈·델리",
  "건강식품",
  "생활용품·리빙",
  "뷰티·바디케어",
  "주방용품",
  "가전제품",
  "베이비·키즈",
  "반려동물",
];

export default function Recommend(): JSX.Element {
  const screeHeight = screen.height;
  const MenusHeight = 30;

  return (
    <Wrapper>
      <Header />
      <Menus innerHeight={MenusHeight} menus={dummyMenuData} />
      <List
        innerHeight={screeHeight - (HEADER.SIZE + FOOTER.SIZE + MenusHeight)}
        menus={dummyMenuData}
      />
    </Wrapper>
  );
}
