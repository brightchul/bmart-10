import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FixedBox from "./FixedBox";
import Input from "./Input";
import SearchIcon from "./SeachIcon";
import DeleteButton from "./DeleteButton";

import { useSearchDispatch } from "../../../contexts/SearchContext";

import { setHistory } from "../../../utils/localstorage";
import getGoodsByName from "../../../fetch/goods/getGoodsByName";

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  padding: 10px;

  width: 100%;

  background-color: #fff;
`;

export default function SearchBar(): JSX.Element {
  const [showDelete, setShowDelete] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useSearchDispatch();

  function search(query: string): void {
    history.pushState({}, "", `?query=${query}`);

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
  }, []);

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

    setHistory(query);
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
        />
        <DeleteButton onClick={deleteFilter} show={showDelete} />
        <SearchIcon
          onClick={(): void => {
            if (query.length === 0) return;

            setHistory(query);
            search(query);
          }}
        />
      </FixedBox>
    </Wrapper>
  );
}
