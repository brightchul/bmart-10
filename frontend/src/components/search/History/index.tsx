import React from "react";
import styled from "styled-components";

import { getHistory } from "../../../utils/localstorage";
import { useSearchState } from "../../../contexts/SearchContext";

import HistoryText from "./HistoryText";

const Wrapper = styled.div`
  margin-top: 80px;
`;

export default function SearchBar(): JSX.Element {
  const state = useSearchState();

  return (
    <Wrapper>
      {state.showHistory
        ? getHistory()
            .reverse()
            .map((history, index) => (
              <HistoryText key={`history.${index}`}>{history}</HistoryText>
            ))
        : null}
    </Wrapper>
  );
}
