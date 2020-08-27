import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FixedBox from "./FixedBox";
import Input from "./Input";
import SearchIcon from "./SearchIcon";
import DeleteButton from "./DeleteButton";

import {
  useSearchDispatch,
  useSearchState,
} from "../../../contexts/SearchContext";

import { setHistory, getHistory } from "../../../utils/localstorage";
import getGoodsByName from "../../../fetch/goods/getGoodsByName";

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  padding: 10px;

  width: 100%;

  background-color: #fff;
`;

export default function SearchBar(): JSX.Element {
  const [query, setQuery] = useState("");

  const dispatch = useSearchDispatch();
  const state = useSearchState();

  function search(query: string): void {
    dispatch({ type: "SET_SHOW_HISTORY", showHistory: false });

    getGoodsByName(query).then((res) => {
      if (res.success) {
        dispatch({ type: "SET_GOODS", goods: res.data.goods });
      }
    });
  }

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    const query = parsedUrl.searchParams.get("query");

    if (query) {
      search(query);
    }

    const histories = getHistory();
    dispatch({ type: "SET_HISTORY", history: histories });
  }, []);

  function updateFilter(): void {
    const filter = state.input.value;

    setQuery(filter);
    if (filter.length > 0) {
      dispatch({ type: "SHOW_DELETE_BUTTON", value: true });
    } else {
      dispatch({ type: "SHOW_DELETE_BUTTON", value: false });
    }
  }

  function deleteFilter(): void {
    const input = state.input;

    if (input) {
      input.value = "";
    }

    setQuery("");
    dispatch({ type: "SHOW_DELETE_BUTTON", value: false });
  }

  function searchByEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.keyCode !== 13) return;

    setHistory(query);
    const histories = getHistory();

    dispatch({ type: "SET_HISTORY", history: histories });

    search(query);
  }

  return (
    <Wrapper>
      <FixedBox>
        <Input
          placeholder="상품 검색"
          onKeyUp={updateFilter}
          onKeyDown={searchByEnter}
          onClick={(): void => {
            dispatch({ type: "SET_SHOW_HISTORY", showHistory: true });
          }}
          ref={(input: HTMLInputElement | null): void => {
            if (state.input === input) return;

            if (input) {
              dispatch({ type: "SET_INPUT", input: input });
            }
          }}
        />
        <DeleteButton onClick={deleteFilter} show={state.showDelete} />
        <SearchIcon
          onClick={(): void => {
            if (query.length === 0) return;

            setHistory(query);

            const histories = getHistory();

            dispatch({ type: "SET_HISTORY", history: histories });
            search(query);
          }}
        />
      </FixedBox>
    </Wrapper>
  );
}
