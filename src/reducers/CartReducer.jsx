import { toast } from "react-toastify";
import {
  GET_ALL_PRODUCT,
  GET_NUMBER_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
  ADD_CART,
  CLEAR_CART,
  CHECKED_CART,
  CHECKED_ALL,
} from "./constant";
const initProduct = {
  selectedItems: [],
  itemCounter: 0,
  total: 0,
  checkout: false,
  checkAll: false,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_CART: {
      if (Number(state?.itemCounter <= 0)) {
        state = {
          ...state,
          itemCounter: 1,
          total: action.payload.price,
          selectedItems: [action.payload],
        };
        localStorage.setItem("cart", JSON.stringify(state));
        return state;
      } else {
        let flag = false;
        state.selectedItems.length > 0 &&
          state.selectedItems.map((item, index) => {
            if (item.title === action.payload.title) {
              flag = true;
              if (item.quantity + 1 <= 10) {
                ++state.selectedItems[index].quantity;
                // ++state.itemCounter;
                state.total = state.total + state.selectedItems[index].price;
                localStorage.setItem("cart", JSON.stringify(state));
                return state;
              } else {
                toast.warning("Đã đến giới hạn số lượng 10 sản phẩm");
                return state;
              }
            }
          });
        if (!flag === true) {
          console.log("chay 2");
          state = {
            ...state,
            itemCounter: ++state.itemCounter,
            total: state.total + action.payload.price,
            selectedItems: [...state.selectedItems, action.payload],
          };
          localStorage.setItem("cart", JSON.stringify(state));
          return state;
        }

        return state;
      }
    }
    case DECREASE_QUANTITY: {
      const IndexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      --state.selectedItems[IndexI].quantity;
      // --state.itemCounter;
      state.total = state.total - state.selectedItems[IndexI].price;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    }
    case INCREASE_QUANTITY: {
      const IndexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      ++state.selectedItems[IndexI].quantity;
      // state.itemCounter = state.itemCounter + 1;
      state.total = state.total + state.selectedItems[IndexI].price;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    }
    case DELETE_CART: {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      state = {
        ...state,
        selectedItems: [...newSelectedItems],
        itemCounter: state.itemCounter - 1,
        total: state.total - action.payload.price,
      };
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    }
    case CHECKED_CART: {
      const IndexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      state.selectedItems[IndexI].selected = action.payload.selected;
      let flag = true;
      state.selectedItems.map((item, index) =>
        item.selected === false ? (flag = false) : ""
      );
      if (flag === true) {
        state.checkAll = true;
      } else state.checkAll = false;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    }
    case CHECKED_ALL: {
      state.checkAll = action.payload.checks;
      state.selectedItems.map(
        (item, index) =>
          (state.selectedItems[index].selected = action.payload.checks)
      );
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    }
    case CLEAR_CART: {
      return initProduct;
    }
    default:
      throw new Error("Invalid action.");
  }
};
export { initProduct, todoReducer };
