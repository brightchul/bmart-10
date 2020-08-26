export type CartItem = {
  email: string;
  id: string;
  amount: number;
  checked: string;
};

export type UserCartList = {
  id: string;
  amount: number;
  checked: string;
};

export type CartListItem = {
  id: number;
  title: string;
  cost: number;
  discount: number;
  amount: number;
  image_url: string;
  checked: string;
};
