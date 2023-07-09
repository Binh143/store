import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";
import { useAuth } from "../../context/auth-context";
import {
  checkedCart,
  decreaseCart,
  deleteCart,
  increaseCart,
} from "../../reducers/action";
const StyleCartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgb(var(--tertiary) / 0.6);
  box-shadow: rgb(var(--tertiary) / 0.16) 0px 7px 29px 0px;
  border-radius: 10px;

  .cbox-cart {
    width: 50%;
    display: flex;
  }

  .cart-img {
    width: 75px;
    height: 75px;
    object-fit: cover;
  }
  .product-item {
    display: flex;
    column-gap: 10px;
  }
  .title {
    height: 65px;
    font-size: 0.9rem;
    color: rgb(var(--white) / 1);
  }
  .group-count {
    display: flex;
    /* column-gap: 5px; */
  }
  .group-count span {
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0.2rem;
    border: solid 1px #ccc;
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
    user-select: none;
  }
  .group-count input {
    width: 2.4rem;
    height: 1.8rem;
    padding: 0.2rem;
    border: solid 1px #ccc;
    outline: none;
    background-color: transparent;
    text-align: center;
    font-size: 1rem;
    color: rgb(var(--white));
  }
  strong {
    font-size: 1.1rem;
    font-weight: 400;
    color: rgb(var(--pink-dark) / 1);
    width: 6rem;
    text-align: center;
  }
`;

const CartItem = ({ index, id, title, price, image, quantity, selected }) => {
  const { dispatch, state } = useAuth();
  const [count, setCount] = useState(quantity);
  const [checked, setChecked] = useState(selected);
  const handleDecrease = () => {
    let newQuantity = Number(count) - 1;
    if (newQuantity < 1) {
      return;
    } else setCount(newQuantity);
    dispatch(decreaseCart({ id, title, price, image, quantity: newQuantity }));
  };
  const handleIncrease = () => {
    let newQuantity = Number(count) + 1;
    if (newQuantity > 10) {
      return;
    } else setCount(newQuantity);
    dispatch(increaseCart({ id, title, price, image, quantity: newQuantity }));
  };
  // useEffect(()=>{
  //   dispatch()
  // },[])
  return (
    <StyleCartItem>
      <div className="cbox-cart">
        <label
          className="cbox-header"
          // onClick={() => dispatch(checkedCart({ id, selected: checked }))}
        >
          <input
            type="checkbox"
            // value={checked}
            checked={checked}
            onChange={(e) => {
              dispatch(checkedCart({ id, selected: e.target.checked }));
              setChecked(e.target.checked);
            }}
          />
          <span className="checkmark"></span>
        </label>
        <div className="product-item">
          <img src={image} alt={title} className="cart-img" />
          <Link to={`/product/${id}`} className="title Line-3">
            {title}
          </Link>
        </div>
      </div>
      <span>{price}</span>
      <div className="group-count">
        <span onClick={handleDecrease}>-</span>
        <span>{count}</span>
        <span onClick={handleIncrease}>+</span>
      </div>
      <strong>{(Number(price) * Number(count)).toFixed(2)}</strong>
      <FaTrash
        onClick={() => dispatch(deleteCart({ id, title, price }))}
      ></FaTrash>
    </StyleCartItem>
  );
};

export default CartItem;
