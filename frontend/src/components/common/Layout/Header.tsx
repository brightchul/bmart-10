import React from "react";
import styled from "styled-components";

import { COLOR, SVG } from "../../../constants/style";
import { HEADER } from "../../../constants/layout";
// import Logo from '/asset/';
import { KEY_NAME } from "../../../constants/message";
import { useHistory } from "react-router-dom";

type CategoryType = {
  mainCategory: string;
  subCategory?: string;
};

const Layer = styled.div`
  z-index: 3000;
  position: fixed;
  top: 0;

  width: 100%;
  height: ${HEADER.SIZE}px;
  background-color: ${COLOR.GREEN_1};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Item = styled.div`
  width: 36px;
`;

const Title = styled.h2`
  color: #fff;
`;

const getCategoryName = (
  mainCategory: string,
  subCategory: string | undefined
): string => {
  if (subCategory) return KEY_NAME[mainCategory].subCategory[subCategory].name;
  return KEY_NAME[mainCategory]?.name;
};

const Header = ({ mainCategory, subCategory }: CategoryType): JSX.Element => {
  // const categoryName = getCategoryName(mainCategory, subCategory);
  const categoryName = "";
  const history = useHistory();

  return (
    <Layer>
      <Item onClick={(): void => history.goBack()}>
        <svg width={36} height="36px">
          <path fill={COLOR.WHITE} d={SVG.ARROW_BACK} />
        </svg>
      </Item>
      <div>
        {categoryName ? (
          <Title>{categoryName}</Title>
        ) : (
          <img src="/asset/images/logo.png" width={"60px"} />
        )}
      </div>
      <Item></Item>
    </Layer>
  );
};

export default Header;
