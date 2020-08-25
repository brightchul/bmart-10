import React, { createContext, useReducer, Dispatch, useContext } from "react";
import { CartItemType } from "../types/Cart";

type Cart = {
  cartList: Array<CartItemType>;
  totalPrice?: number | undefined;
  deliveryTips?: number | undefined;
  checkItemAmount?: number | undefined;
  isAllChecked?: boolean | undefined;
};

type CartState = {
  totalPrice: number;
  deliveryTips: number;
  checkItemAmount: number;
  isAllChecked: boolean;
};

type Action =
  | {
      type: "GET_CART";
    }
  | {
      type: "ADD_CART";
      payload: {
        data: CartItemType;
      };
    }
  | {
      type: "UPDATE_CART";
      payload: {
        id: number;
        type: string;
      };
    }
  | {
      type: "REMOVE_CART";
      payload: {
        id: number;
      };
    }
  | {
      type: "REMOVE_CHECKED_CART";
    }
  | {
      type: "CHECK_CART_ITEM";
      payload: {
        id: number;
      };
    }
  | {
      type: "ALL_CHECK_CART_ITEM";
    };

const storage: string | null = localStorage.getItem("cart_list");

const initialState: Cart = {
  cartList: JSON.parse(storage || "[]"),
  totalPrice: 0,
  deliveryTips: 0,
  checkItemAmount: 0,
  isAllChecked: false,
};

const saveCartList = (cartList: Array<CartItemType>): void => {
  localStorage.setItem("cart_list", JSON.stringify(cartList));
};

const allCartCheckItem = (cartList: Array<CartItemType>): boolean => {
  let isAllChecked = true;
  cartList.forEach((item) => {
    if (!item.isChecked) isAllChecked = false;
  });

  return isAllChecked;
};

const getCartCheckItem = (cartList: Array<CartItemType>): number => {
  const checkedCartItem = cartList.filter((item) => item.isChecked);
  let totalCount = 0;
  checkedCartItem.forEach((item) => {
    totalCount += item.cnt;
  });

  return totalCount;
};

const getTotalPrice = (cartList: Array<CartItemType>): number => {
  const checkedCartItem = cartList.filter((item) => item.isChecked);
  let totalPrice = 0;
  checkedCartItem.forEach((item) => {
    const salePrice =
      item.cost - Math.round(item.cost * (item.discount * 0.01));
    totalPrice += salePrice * item.cnt;
  });
  return totalPrice;
};

const getDeliveryTips = (totalPrice: number): number => {
  let deliveryTips = 0;

  if (totalPrice < 10000 && totalPrice >= 5000) {
    deliveryTips = 2500;
  } else if (totalPrice < 20000 && totalPrice >= 10000) {
    deliveryTips = 1500;
  }

  return deliveryTips;
};

const getUpdateState = (cartList: Array<CartItemType>): CartState => {
  const totalPrice = getTotalPrice(cartList);
  const checkItemAmount = getCartCheckItem(cartList);
  const deliveryTips = getDeliveryTips(totalPrice);
  const isAllChecked = allCartCheckItem(cartList);
  saveCartList(cartList);

  return {
    totalPrice,
    deliveryTips,
    checkItemAmount,
    isAllChecked,
  };
};

const reducer = (state: Cart, action: Action): Cart => {
  switch (action.type) {
    case "GET_CART": {
      const {
        totalPrice,
        checkItemAmount,
        deliveryTips,
        isAllChecked,
      } = getUpdateState(state.cartList);
      return {
        cartList: state.cartList,
        totalPrice,
        deliveryTips,
        checkItemAmount,
        isAllChecked,
      };
    }
    case "ADD_CART":
      return state;
    case "UPDATE_CART": {
      const updateCartItem = state.cartList.filter(
        (item) => item.id === action.payload.id
      );
      const removeCheckCartItem = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
      let cnt = 0;
      if (action.payload.type === "plus") {
        cnt = updateCartItem[0].cnt + 1;
      } else {
        cnt = updateCartItem[0].cnt < 2 ? 1 : updateCartItem[0].cnt - 1;
      }
      const updateCartList = [
        ...removeCheckCartItem,
        { ...updateCartItem[0], cnt },
      ];

      const {
        totalPrice,
        checkItemAmount,
        deliveryTips,
        isAllChecked,
      } = getUpdateState(updateCartList);
      return {
        cartList: updateCartList,
        totalPrice,
        deliveryTips,
        checkItemAmount,
        isAllChecked,
      };
    }
    case "REMOVE_CART": {
      const removeCheckCartItem = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
      const { totalPrice, checkItemAmount, deliveryTips } = getUpdateState(
        removeCheckCartItem
      );
      return {
        cartList: removeCheckCartItem,
        totalPrice,
        deliveryTips,
        checkItemAmount,
      };
    }
    case "CHECK_CART_ITEM": {
      const checkCartItem = state.cartList.filter(
        (item) => item.id === action.payload.id
      );
      const removeCheckCartItem = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
      const updateCartList = checkCartItem[0].isChecked
        ? [
            ...removeCheckCartItem,
            { ...checkCartItem[0], isChecked: !checkCartItem[0].isChecked },
          ]
        : [
            { ...checkCartItem[0], isChecked: !checkCartItem[0].isChecked },
            ...removeCheckCartItem,
          ];
      const {
        totalPrice,
        checkItemAmount,
        deliveryTips,
        isAllChecked,
      } = getUpdateState(updateCartList);
      return {
        cartList: updateCartList,
        totalPrice,
        deliveryTips,
        checkItemAmount,
        isAllChecked,
      };
    }
    case "ALL_CHECK_CART_ITEM": {
      const allCheckCartItem = state.cartList.map((item) => ({
        ...item,
        isChecked: !state.isAllChecked,
      }));
      const { totalPrice, checkItemAmount, deliveryTips } = getUpdateState(
        allCheckCartItem
      );
      return {
        cartList: allCheckCartItem,
        totalPrice,
        deliveryTips,
        checkItemAmount,
        isAllChecked: !state.isAllChecked,
      };
    }
    default:
      return state;
  }
};
type CartDispatch = Dispatch<Action>;

// Context 만들기
const CartStateContext = createContext<Cart | null>(null);
const CartDispatchContext = createContext<CartDispatch | null>(null);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export const useCartState = (): Cart => {
  const state = useContext(CartStateContext);
  if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return state;
};

export const useCartDispatch = (): CartDispatch => {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
};
