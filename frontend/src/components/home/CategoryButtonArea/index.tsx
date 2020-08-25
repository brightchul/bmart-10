import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CategoryButton from "./CategoryButton";
import CategoryHeader from "./CategoryButtonsHeader";
import { CATEGORY_TITLE_NAMES } from "../../../constants/message";

const categoryTitleArr = CATEGORY_TITLE_NAMES.slice(0, 10).map((o) => o.title);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Container = styled.div`
  padding: 10px;
`;

function Category(): JSX.Element {
  return (
    <Container>
      <CategoryHeader></CategoryHeader>
      <Wrapper>
        {categoryTitleArr.map((title, idx) => {
          return (
            <Link key={title + idx} to={`/category/${title}`}>
              <CategoryButton key={idx + ""} keyName={title}></CategoryButton>
            </Link>
          );
        })}
      </Wrapper>
    </Container>
  );
}

export default Category;
