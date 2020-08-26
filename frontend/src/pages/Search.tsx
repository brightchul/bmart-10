import React from "react";
import styled from "styled-components";

import { Layout } from "../components/common";

import SearchBar from "../components/search/Searchbar";
import History from "../components/search/History";
import Result from "../components/search/Result";

import { SearchProvider } from "../contexts/SearchContext";

const Blank = styled.div`
  height: 70px;
`;

const Search = (): JSX.Element => {
  return (
    <Layout>
      <SearchProvider>
        <SearchBar />
        <Blank />
        <History />
        <Result />
      </SearchProvider>
    </Layout>
  );
};

export default Search;
