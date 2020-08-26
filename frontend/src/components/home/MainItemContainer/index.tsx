import React, { useState } from "react";
import styled from "styled-components";

import ChangeItemsButton from "./ChangeItemsButton";
import MainItem from "../MainItem";
import { ItemType } from "../../../types/ItemType";

const Wrapper = styled.div`
  padding: 25px 15px;
`;

const Goods = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

type Data =
  | {
      goodId?: string | number;
      title: string;
      price: string;
      sale?: string;
      src: string;
      width?: string;
    }
  | ItemType;

type Props = {
  width?: string;
  data?: Array<ItemType>;
  children: string;
};

const MAIN_ITEM_FONT_SIZE = "12px";

const convertDataToMainItem = (data: Data, idx: number): JSX.Element => (
  <MainItem key={idx + ""} fontSize={MAIN_ITEM_FONT_SIZE} {...data}></MainItem>
);

const next = (
  idx: number,
  dataLength?: number,
  stateFunction?: React.Dispatch<React.SetStateAction<number>>
): void => {
  const nextIdx = (idx + 1) * 6 >= (dataLength || 0) ? 0 : idx + 1;
  stateFunction !== undefined && stateFunction(nextIdx);
};

export default function MainItemContainer({
  width,
  data,
  children: title,
}: Props): JSX.Element {
  const dataLength = data?.length;
  const [idx, setIdx] = useState(0);
  const displayedData = data?.slice(idx * 6, (idx + 1) * 6);

  return (
    <div>
      <Wrapper>
        <h2>{title}</h2>
        <Goods>
          {displayedData?.map((oneData: ItemType, idx: number) =>
            convertDataToMainItem({ ...oneData, width }, idx)
          )}
        </Goods>
      </Wrapper>
      <ChangeItemsButton
        onClick={(): void => next(idx, dataLength, setIdx)}
        index={idx}
        lastIdx={(dataLength || 0) / 6}
      >
        {title}
      </ChangeItemsButton>
    </div>
  );
}
