import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Header from "./Header";
import Menus from "./Menus";
import List from "./List";

import getRecommendGoods from "../../../fetch/goods/getRecommendGoods";
import { Good } from "../../../types/RecommandGoods";

import { HEADER, FOOTER } from "../../../constants/layout";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

type RecommendData = {
  menus: string[];
  recommends: {
    title: string;
    goodsData: Good[];
  }[];
};

export default function Recommend(): JSX.Element {
  const [recommendData, setRecommendData] = useState<RecommendData>({
    menus: [],
    recommends: [],
  });

  useEffect(() => {
    getRecommendGoods().then((response) => {
      setRecommendData(response.data);
    });
  }, []);

  const screeHeight = screen.height;
  const MenusHeight = 30;

  return (
    <Wrapper>
      <Header />
      {recommendData.menus.length === 0 ? (
        <p>Loading</p>
      ) : (
        <>
          <Menus innerHeight={MenusHeight} menus={recommendData.menus} />
          <List
            innerHeight={
              screeHeight - (HEADER.SIZE + FOOTER.SIZE + MenusHeight)
            }
            goodsData={recommendData.recommends}
          />
        </>
      )}
    </Wrapper>
  );
}
