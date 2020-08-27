import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ACTIVE_BACKGROUND = `#e8e8e8`;
const BORDER_COLOR = `#e8e8e8`;

const Wrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  width: 50%;
  padding: 10px;

  height: 50px;
  line-height: 30px;

  margin-top: -1px;
  margin-left: -1px;

  border: 1px solid ${BORDER_COLOR};

  &.active {
    background-color: ${ACTIVE_BACKGROUND};
  }
`;

const UList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  background-color: ${ACTIVE_BACKGROUND};

  margin-bottom: 10px;
`;

const List = styled.li`
  width: 50%;
  padding: 10px;

  height: 50px;
  line-height: 30px;

  background-color: ${ACTIVE_BACKGROUND};
`;

type Props = {
  leftSide: {
    title: string;
    subCategories: string[];
  };
  rightSide?: {
    title: string;
    subCategories: string[];
  };
};

type Open = "none" | "left" | "right";

export default function SubMenu(props: Props): JSX.Element {
  const [open, setOpen] = useState<Open>("none");
  const history = useHistory();

  return (
    <Wrapper>
      <TitleWrapper>
        <Title
          onClick={(): void => {
            setOpen(open === "left" ? "none" : "left");
          }}
          className={open === "left" ? "active" : undefined}
        >
          {props.leftSide.title}
        </Title>
        {props.rightSide ? (
          <Title
            onClick={(): void => {
              setOpen(open === "right" ? "none" : "right");
            }}
            className={open === "right" ? "active" : undefined}
          >
            {props.rightSide.title}
          </Title>
        ) : null}
      </TitleWrapper>

      {open === "left" ? (
        <>
          <UList>
            <List
              onClick={(): void => {
                history.push(`/category/${props.leftSide.title}`);
              }}
            >
              전체보기
            </List>
            {props.leftSide.subCategories.map((cur) => (
              <List
                key={cur}
                onClick={(): void => {
                  history.push(`/category/${cur}`);
                }}
              >
                {cur}
              </List>
            ))}
          </UList>
        </>
      ) : null}

      {open === "right" && props.rightSide !== undefined ? (
        <>
          <UList>
            <List
              onClick={(): void => {
                history.push(`/category/${props.rightSide?.title}`);
              }}
            >
              전체보기
            </List>
            {props.rightSide.subCategories.map((cur) => (
              <List
                key={cur}
                onClick={(): void => {
                  history.push(`/category/${cur}`);
                }}
              >
                {cur}
              </List>
            ))}
          </UList>
        </>
      ) : null}
    </Wrapper>
  );
}
