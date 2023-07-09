// GET_ALL_PRODUCT,
//   GET_NUMBER_CART,
//   DECREASE_QUANTITY,
//   INCREASE_QUANTITY,
//   DELETE_CART,

import { type } from "@testing-library/user-event/dist/type";
import {
  ADD_CART,
  CHECKED_ALL,
  CHECKED_CART,
  CLEAR_CART,
  DECREASE_QUANTITY,
  DELETE_CART,
  INCREASE_QUANTITY,
} from "./constant";

//   ADD_CART,
export const addToCart = (payload) => ({
  type: ADD_CART,
  payload,
});
export const resetCart = (payload) => ({
  type: CLEAR_CART,
  payload,
});
export const decreaseCart = (payload) => ({
  type: DECREASE_QUANTITY,
  payload,
});
export const increaseCart = (payload) => ({
  type: INCREASE_QUANTITY,
  payload,
});
export const deleteCart = (payload) => ({
  type: DELETE_CART,
  payload,
});
export const checkedCart = (payload) => ({
  type: CHECKED_CART,
  payload,
});
export const checkedAllCart = (payload) => ({
  type: CHECKED_ALL,
  payload,
});
