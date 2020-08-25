import React from "react";
import styled, { keyframes } from "styled-components";
import { CATEGORY_TITLE_NAMES } from "../../../constants/message";

type KeyName = {
  [key: string]: { [name: string]: string };
};

const smallOut = keyframes`
  0% {
      transform: scale(1);
  }
  50% {
      transform: scale(0.8);
  }
  100% {
      transform: scale(1);
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
  width: 65px;
  height: 65px;

  &:active {
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
    animation-name: ${smallOut};
  }
`;

const ButtonImgWrapper = styled.div`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin: 0 auto;
  border: 1px solid black;
`;

const ButtonImg = styled.img`
  width: 48px;
  padding: 10px;
`;

const ButtonTitle = styled.p`
  margin-top: 5px;
  font-size: 0.7em;
  word-break: keep-all;
`;

function CategoryButton({ keyName }: { keyName: string }): JSX.Element {
  const imagePath = `/asset/icon/${keyName}.svg`;
  console.log(keyName);
  return (
    <ButtonWrapper>
      <div>
        <ButtonImgWrapper>
          <ButtonImg src={imagePath}></ButtonImg>
        </ButtonImgWrapper>
      </div>
      <ButtonTitle>
        {CATEGORY_TITLE_NAMES.find((o) => o.title === keyName)?.name}
      </ButtonTitle>
    </ButtonWrapper>
  );
}

export default CategoryButton;
