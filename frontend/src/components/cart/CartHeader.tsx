import React from "react";
import style from "styled-components";

import { CheckBox } from "../common";

const HeaderWrapper = style.div`
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleCheck = style.div`
  display: flex;
  align-items: center;
`;

const ToggleTitle = style.p`
  margin-left: 5px;
`;

type Props = {
  isAllChecked: boolean;
  onCheck: () => void;
};

const CartHeader = (props: Props): JSX.Element => {
  const { isAllChecked, onCheck } = props;

  return (
    <HeaderWrapper>
      <ToggleCheck onClick={onCheck}>
        <CheckBox isChecked={isAllChecked} />
        <ToggleTitle>{isAllChecked ? "선택 해제" : "모두 선택"}</ToggleTitle>
      </ToggleCheck>
      <p>선택 비우기</p>
    </HeaderWrapper>
  );
};

CartHeader.defaultProps = {
  isAllChecked: false,
  onCheck: null,
};

export default CartHeader;
