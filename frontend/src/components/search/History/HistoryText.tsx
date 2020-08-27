import React from "react";
import styled from "styled-components";

import { getHistory, deleteHistoryByIndex } from "../../../utils/localstorage";
import {
  useSearchDispatch,
  useSearchState,
} from "../../../contexts/SearchContext";

import getGoodsByName from "../../../fetch/goods/getGoodsByName";

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  background-color: #eee;

  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  font-size: 16px;
  margin: 10px;

  overflow: hidden;
  height: 20px;
`;

const RemoveButton = styled.button`
  height: 20px;
  width: 40px;

  margin: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: #444;
`;

type Props = {
  index: number;
  children?: string;
};

function trimText(text: string | undefined): string {
  if (!text) {
    return "";
  }
  if (text.length > 14) {
    return text.substring(0, 13) + "...";
  }
  return text;
}

export default function SearchBar(props: Props): JSX.Element {
  const dispatch = useSearchDispatch();
  const state = useSearchState();

  return (
    <Wrapper>
      <Text
        onClick={(): void => {
          const query: string = props.children || "";

          state.input.value = query;
          dispatch({ type: "SET_SHOW_HISTORY", showHistory: false });
          dispatch({ type: "SHOW_DELETE_BUTTON", value: true });

          getGoodsByName(query).then((res) => {
            if (res.success) {
              dispatch({ type: "SET_GOODS", goods: res.data.goods });
            }
          });
        }}
      >
        {trimText(props.children)}
      </Text>
      <RemoveButton
        onClick={(): void => {
          deleteHistoryByIndex(props.index);

          const histories = getHistory();
          dispatch({ type: "SET_HISTORY", history: histories });
        }}
      >
        삭제
      </RemoveButton>
    </Wrapper>
  );
}
