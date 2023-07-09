import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import { addToCart } from "../../reducers/action";
import { AuthProvider, useAuth } from "../../context/auth-context";
const StyleProduct = styled.div`
  /* max-width: 250px;
  width: 230px; */
  border-radius: 10px;
  background-color: rgb(var(--secondary) / 1);
  overflow: hidden;

  .product-img {
    width: 100%;
    height: 100%;
    max-height: 220px;
    object-fit: cover;
    display: block;
    border-radius: 10px 10px 0 0;
    transition: transform 0.5s ease;
  }
  .product-img:hover {
    transform: scale(1.05);
  }
  .product-content {
    width: 100%;
    padding: 0.5rem 0.5rem 1rem;
  }
  .product-content-link {
    color: rgb(var(--tertiary) / 1);
  }
  .product-content-title {
    font-size: 0.9rem;
  }
  .product-content-price {
    color: rgb(var(--pink-dark));
  }
  .product-footer {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  }
  .product-rating {
    display: flex;
  }
  .product-rating,
  .product-view {
    display: flex;
    gap: 0.4rem;
  }
  .product-rating > svg {
    color: #ffc107;
    width: 15px;
    height: 15px;
  }
  .product-view > svg {
    color: rgb(var(--tertiary) / 1);
    width: 15px;
    height: 15px;
  }
  .product-btn {
    background: rgb(var(--pink-dark) / 0.8);
    color: white;
    padding: 0.5rem;
    border-radius: 6px;
    border: none;
    outline: none;
    width: 100%;
    margin-bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    gap: 0.5rem;
    cursor: pointer;
    transition: background 0.5s ease;
  }
  .product-btn:hover {
    background: rgb(var(--pink-dark) / 1);
  }
  .product-btn-icon {
    width: 18px;
    height: 18px;
  }
  @media only screen and (max-width: 399.98px) {
    .product-btn-text {
      display: none;
    }
  }
`;
const ProductItem = ({ id, title, price, image, count, rate }) => {
  const { dispatch } = useAuth();
  const handleAddToCart = () => {
    dispatch(
      addToCart({ id, title, price, image, quantity: 1, selected: false })
    );
  };
  return (
    <StyleProduct>
      <img
        src={image || "/asset/images/no-image.jpg"}
        alt={title || "no-image"}
        className="product-img"
      />
      <div className="product-content">
        <Link to={`/product/${id}`} className="product-content-link">
          <h3 className="product-content-title Line">{title}</h3>
        </Link>
        <span className="product-content-price">{price}$</span>
        <div className="product-footer ">
          <span className="product-rating">
            <FaStar />
            {rate}
          </span>
          <span className="product-view">
            <FaEye />
            {count}
          </span>
        </div>
        <button className="product-btn" onClick={handleAddToCart}>
          <FaShoppingCart className="product-btn-icon" />
          <span className="product-btn-text">add to cart</span>
        </button>
      </div>
    </StyleProduct>
  );
};

export default ProductItem;
