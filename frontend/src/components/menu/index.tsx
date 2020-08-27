import React from "react";
import styled from "styled-components";

import dummyData from "./dummy.catetory";

import SubMenu from "./SubMenu";

const Wrapper = styled.div``;

const Section = styled.section``;

const Header = styled.header`
  margin: 20px 20px 10px 20px;
  font-weight: bold;
`;

const SubCategory = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
`;

type Category = {
  title: string;
  subCategories: string[];
};

type GroupCategory = {
  leftSide: Category;
  rightSide?: Category;
};

function groupByTwo(list: Category[]): GroupCategory[] {
  const result: GroupCategory[] = [];

  let pre: undefined | Category = undefined;
  list.forEach((cur, index) => {
    if (index % 2 === 0) {
      pre = cur;
    } else {
      if (pre) {
        result.push({
          leftSide: pre,
          rightSide: cur,
        });
        pre = undefined;
      }
    }
  });

  if (pre) {
    result.push({
      leftSide: pre,
    });
  }

  return result;
}

export default function Menu(): JSX.Element {
  return (
    <Wrapper>
      <Section>
        <Header>맛있는 것</Header>
        <SubCategory>
          {groupByTwo(dummyData.food).map((cur, index) => (
            <SubMenu
              key={`foods/${index}`}
              leftSide={cur.leftSide}
              rightSide={cur.rightSide}
            />
          ))}
        </SubCategory>
      </Section>

      <Section>
        <Header>편리한 것</Header>
        <SubCategory>
          {groupByTwo(dummyData.chore).map((cur, index) => (
            <SubMenu
              key={`chore/${index}`}
              leftSide={cur.leftSide}
              rightSide={cur.rightSide}
            />
          ))}
        </SubCategory>
      </Section>
    </Wrapper>
  );
}
