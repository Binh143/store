import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import ProductItem from "../../../component/product/ProductItem";
import CategoryAPI from "../../../api/category/CategoryAPI";
import ProductAPI from "../../../api/product/ProductAPI";

const StyleCategory = styled.div`
  width: 100%;
  height: 100%;
  .header {
    margin: 0 auto;
    max-width: 90%;
  }
  .list-cate {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  .item-cate {
    border: solid 1px rgb(var(--tertiary));
    padding: 0.25rem 1rem;
    cursor: pointer;
  }
  .text-cate {
    color: rgb(var(--tertiary));
    font-size: 0.85rem;
    white-space: nowrap;
    text-transform: capitalize;
    display: block;
  }
  .activeCate {
    color: rgb(var(--pink-dark) / 1);
  }
  .list-product {
    margin-top: 1.5rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 15px;
  }
`;
const CategoryFE = () => {
  const params = useParams();
  const [cate, setCate] = useState("");
  const [data, setData] = useState("");
  let url = params.id ? params.id : "all";
  console.log("🚀 ~ file: CategoryFE.jsx:49 ~ CategoryFE ~ url:", url);
  useEffect(() => {
    document.title = "Category Page | FakeStore";
  }, []);
  useEffect(() => {
    const requestCategoryAPI = async () => {
      try {
        const result = await CategoryAPI.getAllCategory(url);

        if (result.status === 200) {
          return setCate(result.data);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: DashboardTeacherFE.jsx:23 ~ requestAPI ~ error:",
          error
        );
      }
    };
    requestCategoryAPI();
  }, []);
  useEffect(() => {
    const requestCategoryAPI = async () => {
      try {
        const result =
          url === "all"
            ? await ProductAPI.getLimitProduct(25)
            : await ProductAPI.getProductByCategoryAll(url);
        if (result.status === 200) {
          return setData(result.data);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: DashboardTeacherFE.jsx:23 ~ requestAPI ~ error:",
          error
        );
      }
    };
    requestCategoryAPI();
  }, [url]);

  return (
    <StyleCategory>
      <div className="header">
        <ul className="list-cate">
          <li className="item-cate">
            <Link
              to={`/category/all`}
              className={`text-cate ${url === "all" ? "activeCate" : ""}`}
            >
              All Category
            </Link>
          </li>
          {cate.length > 0 &&
            cate.map((item, index) => (
              <li className="item-cate" key={index}>
                <Link
                  to={`/category/${item}`}
                  className={`text-cate ${
                    params.id === item ? "activeCate" : ""
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="list-product">
        {data.length > 0 &&
          data.map((item, index) => (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              count={item.rating.count}
              rate={item.rating.rate}
            />
          ))}
      </div>
    </StyleCategory>
  );
};

export default CategoryFE;
