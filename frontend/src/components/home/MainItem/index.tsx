import React from "react";
import styled from "styled-components";
import ItemImg from "./ItemImg";
import ItemContent from "./ItemContent";
import { ItemContext, ItemContextType } from "./ItemContext";
import { useHistory } from "react-router-dom";

const DEFAULT_WIDTH = "28vw";
const wordBreak = "keep-all";

const ItemArea = styled.div`
  margin-top: 15px;
`;

export default function MainItem({
  width = DEFAULT_WIDTH,
  ...props
}: ItemContextType): JSX.Element {
  const history = useHistory();
  return (
    <ItemContext.Provider value={{ width, ...props }}>
      <ItemArea
        onClick={(): void => history.push(`/goods/${props.goodId}`)}
        style={{ width, wordBreak }}
      >
        <ItemImg></ItemImg>
        <ItemContent></ItemContent>
      </ItemArea>
    </ItemContext.Provider>
  );
}
