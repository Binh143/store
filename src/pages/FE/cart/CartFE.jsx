import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../context/auth-context";
import CartItem from "../../../component/cart/CartItem";
import { checkedAllCart } from "../../../reducers/action";
const StyleCart = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  .left {
    width: 75%;
    color: rgb(var(--white) / 1);
  }
  .header-cart {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(var(--tertiary) / 0.6);
    box-shadow: rgb(var(--tertiary) / 0.16) 0px 7px 29px 0px;
    border-radius: 10px;
  }
  .cbox-all {
    width: 50%;
  }
  .cbox-header {
    position: relative;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    padding-left: 25px;
  }
  .cbox-header input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 3px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #eee;
    border-radius: 4px;
  }
  .cbox-header:hover input ~ .checkmark {
    background-color: #ccc;
  }
  .cbox-header input:checked ~ .checkmark {
    background-color: rgb(var(--pink-dark) / 1);
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .cbox-header input:checked ~ .checkmark:after {
    display: block;
  }
  .cbox-header .checkmark:after {
    left: 5px;
    top: 0px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .wrapper {
    margin-top: 1rem;

    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .right {
    width: 25%;
    background: rgb(var(--tertiary) / 0.6);
    box-shadow: rgb(var(--tertiary) / 0.16) 0px 7px 29px 0px;
    border-radius: 10px;
  }
  svg {
    cursor: pointer;
  }

  .link-no-cart {
    color: rgb(var(--pink-dark));
  }
`;
const CartFE = () => {
  const { state, dispatch } = useAuth();
  const [checkAll, setCheckAll] = useState(state.checkAll);
  useEffect(() => {
    const handleCheckAll = () => {
      setCheckAll(state.checkAll);
    };
    handleCheckAll();
  }, [state]);
  return (
    <StyleCart>
      <div className="left">
        <div className="header-cart">
          <div className="cbox-all">
            <label
              className="cbox-header"
              onChange={() => dispatch(checkedAllCart({ checks: checkAll }))}
            >
              Tất cả(6 sản phẩm)
              <input
                type="checkbox"
                checked={checkAll}
                onChange={(e) => setCheckAll(e.target.checked)}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <span>Đơn giá</span>
          <span>Số lượng</span>
          <span>Thành tiền</span>
          <FaTrash></FaTrash>
        </div>
        <div className="wrapper">
          {Number(state.itemCounter) > 0 ? (
            state.selectedItems.map((item, index) => (
              <CartItem
                key={item.id}
                index={index}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                selected={item.selected}
              />
            ))
          ) : (
            <div>
              chưa có sản phẩm nào{" "}
              <Link to="/category/all" className="link-no-cart">
                Click xem nhiều sản phẩm
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="right">vbfbsd</div>
    </StyleCart>
  );
};

export default CartFE;
