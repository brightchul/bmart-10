import React from "react";
import styled from "styled-components";
import { imgURL } from "../../../utils/func";

type Props = {
  src?: string;
  onClick: Function;
  index: string;
};

const ImgDiv = styled.div`
  width: calc((100% - 30px) / 4);
  height: 25vw;
  background-size: cover;
  &:hover {
    outline: 3px solid red;
  }
`;

export default function GalleryImage({
  src,
  onClick,
  index,
}: Props): JSX.Element {
  const style = { backgroundImage: `url("${imgURL(src)}")` };

  return (
    <ImgDiv
      onClick={(): void => onClick(parseInt(index))}
      style={style}
    ></ImgDiv>
  );
}
