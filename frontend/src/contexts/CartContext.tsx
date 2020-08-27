import React, { createContext, useReducer, Dispatch, useContext } from "react";
import { CartItemType } from "../types/Cart";

type Cart = {
  cartList: Array<CartItemType>;
  totalPrice: number;
  deliveryTips: number;
  checkItemAmount: number;
  isAllChecked: boolean;
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
        count: number;
      };
    }
  | {
      type: "UPDATE_CART";
      payload: {
        id: number;
        amount: number;
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
        checked: boolean;
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
    if (!item.checked) isAllChecked = false;
  });

  return isAllChecked;
};

const getCartCheckItem = (cartList: Array<CartItemType>): number => {
  const checkedCartItem = cartList.filter((item) => item.checked);
  let totalCount = 0;
  checkedCartItem.forEach((item) => {
    totalCount += item.amount;
  });

  return totalCount;
};

const getTotalPrice = (cartList: Array<CartItemType>): number => {
  const checkedCartItem = cartList.filter((item) => item.checked);
  let totalPrice = 0;
  checkedCartItem.forEach((item) => {
    const salePrice =
      item.cost - Math.round(item.cost * (item.discount * 0.01));
    totalPrice += salePrice * item.amount;
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

const updateCartOrder = (
  cartList: Array<CartItemType>,
  id: number,
  item: CartItemType
): Array<CartItemType> => {
  const updateArr = cartList;
  const itemIndex = cartList.findIndex((item) => item.id === id);
  updateArr.splice(itemIndex, 1, item);
  return updateArr;
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
      return {
        cartList: state.cartList,
        ...getUpdateState(state.cartList),
      };
    }
    case "ADD_CART": {
      const updateItem = action.payload.data;
      let updateCartList = [...state.cartList, updateItem];

      // cart list에 이미 있는 상품인지 검사
      const isItemCheck = state.cartList.find(
        (cart): CartItemType | boolean => cart.id === updateItem.id
      );
      if (isItemCheck) {
        const prevData = isItemCheck;
        const prevCount = prevData.amount;
        const removeData = state.cartList.filter(
          (cart): CartItemType | boolean => cart.id !== updateItem.id
        );
        updateCartList = [
          ...removeData,
          {
            ...updateItem,
            amount: action.payload.count + prevCount,
          },
        ];
      }
      return {
        cartList: updateCartList,
        ...getUpdateState(updateCartList),
      };
    }
    case "UPDATE_CART": {
      const updateCartItem: CartItemType | undefined = state.cartList.find(
        (item) => item.id === action.payload.id
      );
      let updateCartList: Array<CartItemType> = [];
      if (updateCartItem) {
        // 순서 보장하여 내용 업데이트
        updateCartList = updateCartOrder(state.cartList, action.payload.id, {
          ...updateCartItem,
          amount: action.payload.amount,
        });
      }
      return {
        cartList: updateCartList,
        ...getUpdateState(updateCartList),
      };
    }
    case "REMOVE_CART": {
      const removeCartItem = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        cartList: removeCartItem,
        ...getUpdateState(removeCartItem),
      };
    }
    case "REMOVE_CHECKED_CART": {
      const removeCheckCartItem = state.cartList.filter(
        (item) => !item.checked
      );
      return {
        cartList: removeCheckCartItem,
        ...getUpdateState(removeCheckCartItem),
      };
    }
    case "CHECK_CART_ITEM": {
      const checkCartItem = state.cartList.find(
        (item) => item.id === action.payload.id
      );
      // 순서 보장하여 내용 업데이트
      let updateCartList: Array<CartItemType> = [];

      if (checkCartItem) {
        updateCartList = updateCartOrder(state.cartList, action.payload.id, {
          ...checkCartItem,
          checked: action.payload.checked,
        });
      }
      return {
        cartList: updateCartList,
        ...getUpdateState(updateCartList),
      };
    }
    case "ALL_CHECK_CART_ITEM": {
      const allCheckCartItem = state.cartList.map((item) => ({
        ...item,
        checked: !state.isAllChecked,
      }));
      return {
        cartList: allCheckCartItem,
        ...getUpdateState(allCheckCartItem),
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
