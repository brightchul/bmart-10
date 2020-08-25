import React from "react";
import styled from "styled-components";
import { History } from "history";
import { useHistory } from "react-router-dom";

const Menu = styled.div`
  width: 50%;
  padding: 1em;
  &:not(:last-child) {
    border-right: 1px solid #f6f6f6;
  }
`;

const RowContainer = styled.div``;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid #f6f6f6;
`;
const SubCategory = styled.div``;

const categoryGo = (history: History, baseUrl: string, no: number): void => {
  if (name === undefined) return;
  history.push(`${baseUrl}/${no}`);
};

type SubCategoryInfo = { no: number; name: string };

function makeRow(
  oneRowInfo: Array<SubCategoryInfo>,
  baseUrl: string,
  mainCategoryName: string,
  idx: number
): JSX.Element {
  const history = useHistory();

  return (
    <RowContainer key={idx + ""}>
      <Row key={idx + ""}>
        {oneRowInfo.map((one: SubCategoryInfo, idx: number) => (
          <Menu
            key={idx + ""}
            onClick={(): void => categoryGo(history, baseUrl, one.no)}
          >
            {one && one.name}
          </Menu>
        ))}
      </Row>
      <SubCategory></SubCategory>
    </RowContainer>
  );
}

function splitArr(
  arr: Array<SubCategoryInfo>,
  colLength: number
): Array<Array<SubCategoryInfo>> {
  let lastRow: Array<SubCategoryInfo | string> = [];
  const result: Array<Array<SubCategoryInfo>> = [];

  arr.forEach((one: SubCategoryInfo, idx: number) => {
    idx % colLength === 0 && result.push((lastRow = []));
    lastRow.push(one);
  });

  while (lastRow.length < colLength) lastRow.push("");

  return result;
}
type CategoryMenuProps = {
  baseUrl: string;
  mainCategoryName: string;
  categoryData: Array<any>;
  col?: number;
};

export default function CategoryMenu({
  baseUrl,
  mainCategoryName,
  categoryData = [],
  col = 2,
}: any): JSX.Element {
  const arr = splitArr(categoryData, col);

  return (
    <div>
      {arr.map(
        (oneRowInfo: Array<SubCategoryInfo>, idx: number): JSX.Element => {
          return makeRow(oneRowInfo, baseUrl, mainCategoryName, idx);
        }
      )}
    </div>
  );
}
