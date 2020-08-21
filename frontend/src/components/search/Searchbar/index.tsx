import React, { useState } from "react";
import styled from "styled-components";

import FixedBox from "./FixedBox";
import Input from "./Input";
import SearchIcon from "./SeachIcon";
import DeleteButton from "./DeleteButton";

import { useSearchDispatch } from "../../../contexts/SearchContext";

import getGoodsByName from "../../../fetch/goods/getGoodsByName";

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  padding: 10px;

  width: 100%;

  background-color: #fff;
`;

function setHistory(query: string): void {
  const searchHistory: string = localStorage.searchHistory;

  const historyList = {
    history: new Array<string>(),
  };

  if (searchHistory) {
    const beforeHistory: { history: string[] } = JSON.parse(searchHistory);
    historyList.history = beforeHistory.history;
  }

  historyList.history.push(query);
  if (historyList.history.length > 5) {
    historyList.history.splice(0, 1);
  }

  localStorage.searchHistory = JSON.stringify(historyList);
}

export default function SearchBar(): JSX.Element {
  const [showDelete, setShowDelete] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useSearchDispatch();

  function search(query: string): void {
    setHistory(query);

    getGoodsByName(query).then((res) => {
      if (res.success) {
        dispatch({ type: "SET_GOODS", goods: res.data.goods });
      }
    });
  }

  function updateFilter(event: React.KeyboardEvent<HTMLInputElement>): void {
    const filter = (event.target as HTMLInputElement).value;
    setQuery(filter);
    if (filter.length > 0) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }

  function deleteFilter(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const input = (event.target as HTMLInputElement).parentNode?.querySelector(
      "input"
    );

    if (input) {
      input.value = "";
    }

    setQuery("");
    setShowDelete(false);
  }

  function searchByEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.keyCode !== 13) return;

    search(query);
  }

  return (
    <Wrapper>
      <FixedBox>
        <Input
          placeholder="상품 검색"
          onKeyUp={updateFilter}
          onKeyDown={searchByEnter}
        />
        <DeleteButton onClick={deleteFilter} show={showDelete} />
        <SearchIcon
          onClick={(): void => {
            if (query.length === 0) return;
            search(query);
          }}
        />
      </FixedBox>
    </Wrapper>
  );
}
