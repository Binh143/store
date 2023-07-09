import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import useDebounce from "../../hook/useDebounce";
import dataProduct from "../../data/dataProduct";
const StyleSearch = styled.section`
  display: ${(props) => (props.isopensearch ? "grid" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgb(var(--primary) / 0.3);
  padding: 1rem;
  place-content: center;
  z-index: 9;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);

  .search-content {
    max-width: 760px;
    width: clamp(18.75rem, 15.406rem + 26.7441vw, 47.5rem);
    max-height: 490px;
    background: rgb(var(--secondary) / 1);
    z-index: 10;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .search-header {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    padding: 0.5rem 1rem 0 1.5rem;
    border-bottom: solid 1px #e2e8f00d;
  }
  .search-icon {
    width: 30px;
    height: 30px;
    color: rgb(var(--tertiary) / 1);
  }
  .search-icon-close {
    width: 30px;
    height: 30px;
    color: rgb(var(--tertiary) / 1);
    cursor: pointer;
  }
  .input-search {
    width: 100%;
    outline: none;
    border: none;
    background: transparent;
    color: rgb(var(--tertiary) / 1);
    font-size: 1rem;
  }
  .search-body {
    width: 100%;
    height: 390px;
    overflow-y: scroll;
  }
  .search-list {
    width: 100%;
    display: block;
  }
  .search-item-none {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    padding: 0.5rem 1.5rem;
  }
  .search-item {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    padding: 0.5rem 1.5rem;
    border-bottom: solid 1px #e2e8f00d;
    cursor: pointer;
  }
  .search-list:last-child {
    border: none;
  }
  .search-item:hover {
    background: rgb(var(--primary) / 1);
    transition: background 0.4s ease;
  }

  .search-images {
    width: 80px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
  }
  .search-link {
    width: 100%;
    display: block;
    color: rgb(var(--tertiary) / 1);
    font-size: 0.9rem;
  }

  /* 6958000
7758
pc 800
10%
85%
1 6715  */
  .search-footer {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: solid 1px #e2e8f00d;
    padding: 0 1.5rem;
    color: rgb(var(--tertiary) / 1);
  }
`;

const SearchPageFE = ({ isOpenSearch, onClick = () => {} }) => {
  const [keySearch, setKeySearch] = useState();
  const query = useDebounce(keySearch, keySearch === "" ? 0 : 1000);
  const [data, setData] = useState("");
  const dataProducts = dataProduct;
  useEffect(() => {
    const fetchData = () => {
      //fetch data
      setData("");
      if (query) {
        for (let i = 0; i < dataProducts.length; i++) {
          if (dataProducts[i].title.includes(query) === true) {
            setData((prev) => [...prev, dataProduct[i]]);
          }
        }
      }
    };
    fetchData();
  }, [query]);
  // clear text input search
  useEffect(() => {
    if (isOpenSearch) {
      document.querySelector("#input-search").focus();
      document.querySelector("#input-search").value = "";
      setData("");
      setKeySearch("");
    }
  }, [isOpenSearch]);

  return (
    <StyleSearch isopensearch={+isOpenSearch}>
      <div className="search-content">
        <div className="search-header">
          <BiSearch className="search-icon" />
          <input
            type="text"
            name="input-search"
            id="input-search"
            className="input-search"
            placeholder="Search here... "
            onChange={(e) => setKeySearch(e.target.value)}
          />
          <MdClose className="search-icon-close" onClick={onClick} />
        </div>
        <div className="search-body">
          <ul className="search-list">
            {data.length <= 0 && (
              <li className="search-item-none">Không tìm thấy sản phẩm</li>
            )}
            {data.length > 0 &&
              data.map((item, index) => (
                <li className="search-item" key={item.id}>
                  <img
                    src={item.image || "/asset/images/no-image.jpg"}
                    alt={item.title || "noImage"}
                    className="search-images"
                  />
                  <Link
                    to={`/product/${item.id}`}
                    className="search-link Line"
                    onClick={onClick}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="search-footer">
          <span>by Husky</span>
        </div>
      </div>
    </StyleSearch>
  );
};

export default SearchPageFE;
