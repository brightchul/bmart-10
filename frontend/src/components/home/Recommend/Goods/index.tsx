import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import LazyImage from "../../../common/LazyImage";
import Detail from "./Detail";

import {imgURL} from "../../../../utils/func";


const Wrapper = styled.div`
  width: 45%;
`;

type Props = {
  id: string | number;
  name: string;
  cost: number;
  discount: number;
  imageUrl: string;
};

export default function MainItem(props: Props): JSX.Element {
  const history = useHistory();
  return (
    <Wrapper onClick={(): void => history.push(`/goods/${props.id}`)}>
      <LazyImage
        width={"100%"}
        height={"150px"}
        imageURL={`${imgURL(props.imageUrl)}`}
      />
      {/* 이미지 레이지 로딩 때문에 느려지는 경우 아래 이미지 태그로 대체함 */}
      {/* <img width={"100%"} height={"100px"} src={props.imageUrl} /> */}
      <Detail title={props.name} price={props.cost} sale={props.discount} />
    </Wrapper>
  );
}
