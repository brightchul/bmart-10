export type CartItem = {
  email: string;
  id: string;
  amount: number;
};

export type UserCartList = {
  id: string;
  amount: number;
};

export type CartListItem = {
  id: number;
  title: string;
  cost: number;
  discount: number;
  amount: number;
  image_url: string;
};
