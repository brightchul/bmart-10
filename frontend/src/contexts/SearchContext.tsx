import React, { useReducer, useContext, createContext, Dispatch } from "react";

import { Good } from "../types/Good";

type State = {
  searchResult: Good[];
  showHistory: boolean;
};

type Action =
  | { type: "SET_GOODS"; goods: Good[] }
  | { type: "SET_SHOW_HISTORY"; showHistory: boolean };

type SampleDispatch = Dispatch<Action>;

const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<SampleDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_GOODS":
      return {
        ...state,
        searchResult: action.goods,
      };
    case "SET_SHOW_HISTORY":
      return {
        ...state,
        showHistory: action.showHistory,
      };
    default:
      throw new Error("Unhandled action");
  }
}

export function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    showHistory: false,
    searchResult: [],
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useSearchState(): State {
  const state = useContext(StateContext);

  if (!state) throw new Error("Cannot find SampleProvider");
  return state;
}

export function useSearchDispatch(): React.Dispatch<Action> {
  const dispatch = useContext(DispatchContext);

  if (!dispatch) throw new Error("Cannot find SampleProvider");
  return dispatch;
}
