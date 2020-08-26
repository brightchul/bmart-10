import React from "react";
import styled from "styled-components";

import { getHistory } from "../../../utils/localstorage";
import {
  useSearchState,
  useSearchDispatch,
} from "../../../contexts/SearchContext";

import HistoryText from "./HistoryText";
import CloseButton from "./CloseButton";

const Wrapper = styled.div`
  padding: 10px;
  border-radius: 10px;
  margin: 10px;

  background-color: #eee;
`;

const List = styled.div``;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export default function SearchBar(): JSX.Element {
  const state = useSearchState();
  const dispatch = useSearchDispatch();

  return (
    <>
      {state.showHistory ? (
        <Wrapper>
          <List>
            {getHistory()
              .reverse()
              .map((history, index) => (
                <HistoryText key={`history.${index}`}>{history}</HistoryText>
              ))}{" "}
            <Footer>
              <CloseButton
                onClick={(): void => {
                  setTimeout(() => {
                    dispatch({ type: "SET_SHOW_HISTORY", showHistory: false });
                  }, 300);
                }}
              />
            </Footer>
          </List>
        </Wrapper>
      ) : null}
    </>
  );
}
