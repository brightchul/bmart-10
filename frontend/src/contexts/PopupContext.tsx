import React, { createContext, useReducer, Dispatch, useContext } from "react";

type PopUp = {
  isOpen: boolean;
  content: string;
  confirmAction: () => void;
};

type Action =
  | {
      type: "POPUP_OPEN";
      payload: {
        content: string;
        confirmAction: () => void;
      };
    }
  | { type: "POPUP_CLOSE" };

const initialState = {
  isOpen: false,
  content: "",
  confirmAction: (): void => {
    console.warn("popup state");
  },
};

const reducer = (state: PopUp, action: Action): PopUp => {
  switch (action.type) {
    case "POPUP_OPEN":
      return {
        confirmAction: action.payload.confirmAction,
        isOpen: true,
        content: action.payload.content,
      };
    case "POPUP_CLOSE":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
type PopUpDispatch = Dispatch<Action>;

// Context 만들기
const PopUpStateContext = createContext<PopUp | null>(null);
const PopUpDispatchContext = createContext<PopUpDispatch | null>(null);

export const PopUpProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PopUpStateContext.Provider value={state}>
      <PopUpDispatchContext.Provider value={dispatch}>
        {children}
      </PopUpDispatchContext.Provider>
    </PopUpStateContext.Provider>
  );
};

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export const usePopUpState = (): PopUp => {
  const state = useContext(PopUpStateContext);
  if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return state;
};

export const usePopUpDispatch = (): PopUpDispatch => {
  const dispatch = useContext(PopUpDispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
};
