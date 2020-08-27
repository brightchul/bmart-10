import React from "react";

export type ItemContextType = {
  goodId?: string | number;
  title?: string;
  cost?: string;
  sale?: string;
  discount?: string;
  width?: string;
  imageUrl?: string;
  fontSize?: string;
  padding?: string;
  children?: React.ReactElement;
};
export const ItemContext = React.createContext<ItemContextType>({});
