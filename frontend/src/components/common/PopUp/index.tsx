import React from "react";
import style from "styled-components";
import { COLOR, SVG } from "../../../constants/style";
import Svg from "../Svg";
import { PopUpContext } from "../../../contexts";

type Props = {
  onClose: () => void;
};

const Wrapper = style.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopUpBox = style.div`
  width: 15rem;
  height: 12rem;
  background-color: ${COLOR.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  flex-direction: column;
`;

const Content = style.div`
  width: 100%;
  flex: 2;
  display: flex;
  justify-content: center;
  padding: 15px;
  white-space:pre-line;
  text-align: center;
`;

const ConfirmBtn = style.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.WHITE};
  background-color:${COLOR.GREEN_1};
  border-radius: 0 0 10px 10px;
  flex: 1;
`;

const CancelBtn = style.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding: 10px;
`;

const PopUp = (props: Props): JSX.Element | null => {
  const { onClose } = props;
  const state = PopUpContext.usePopUpState();
  const dispatch = PopUpContext.usePopUpDispatch();

  if (!state.isOpen) return null;

  return (
    <Wrapper onClick={onClose}>
      <PopUpBox>
        <CancelBtn onClick={(): void => dispatch({ type: "POPUP_CLOSE" })}>
          <Svg path={SVG.CANCEL} size={25} fill={COLOR.BLACK} />
        </CancelBtn>
        <Content>{state.content}</Content>
        <ConfirmBtn onClick={state.confirmAction}>확인</ConfirmBtn>
      </PopUpBox>
    </Wrapper>
  );
};

PopUp.defaultProps = {
  onClose: null,
};

export default PopUp;
