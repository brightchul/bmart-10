import React from "react";
import styled from "styled-components";

import { getHistory, deleteHistoryByIndex } from "../../../utils/localstorage";
import {
  useSearchState,
  useSearchDispatch,
} from "../../../contexts/SearchContext";

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

export default function SearchBar(props: Props): JSX.Element {
  const state = useSearchState();
  const dispatch = useSearchDispatch();

  return (
    <Wrapper>
      <Text>{props.children}</Text>
      <RemoveButton
        onClick={() => {
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
