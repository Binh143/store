import React, { useEffect, useState } from "react";
import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Navigation } from "swiper";
import ResponsiveSwiper from "../../../responsive/ResponsiveSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../../../component/product/ProductItem";
import ProductAPI from "../../../api/product/ProductAPI";
import CategoryAPI from "../../../api/category/CategoryAPI";

const StyleProduct = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.data ? "grid" : "block")};
  text-align: ${(props) => (props.data ? "unset" : "center")};
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(320px, 1fr));
  padding: 0 1rem;
  grid-gap: 1.5rem;
  padding-bottom: 3rem;
  .product-left {
    grid-area: 1 / 1 / 2 / 2;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .product-left-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-right {
    grid-area: 1 / 2 / 3 / 4;
  }
  .product-r-title {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: capitalize;
    color: rgb(var(--tertiary) / 1);
  }
  .product-r-category-link {
    font-size: 0.9rem;
    color: rgb(var(--pink-dark));
  }
  .product-r-price {
    margin-top: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
  }
  .product-r-group-range {
    margin-top: 1rem;
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(var(--tertiary) / 0.7);
    font-size: 0.8rem;
  }

  .product-r-group-range svg {
    margin-right: 0.3rem;
    width: 18px;
    height: 18px;
  }
  .product-r-range,
  .product-r-view {
    display: flex;
    align-items: center;
  }
  .product-r-icon-star {
    color: #ffc107;
  }
  .product-full {
    grid-area: 2 /1 / -1 / -1;
  }
  .product-r-btn {
    width: 40%;
    max-width: 50%;
    min-width: 250px;
    margin-top: 1rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    border-radius: 6px;
    background: rgb(var(--pink-dark) / 0.8);
    transition: background 0.5s ease;
    color: white;
    cursor: pointer;
  }
  .product-r-btn:hover {
    background: rgb(var(--pink-dark) / 1);
  }
  .product-r-btn-icon {
    width: 18px;
    height: 18px;
    margin-right: 0.4rem;
  }
  .product-r-btn-text {
    font-size: 1.2rem;
    text-transform: capitalize;
  }
  .product-f-desc {
    font-size: 1rem;
    font-weight: 500;
    color: rgb(var(--tertiary));
  }
  .product-suggest {
    margin-top: 2rem;
  }
  .not-product {
    width: 100%;
    display: block;
    margin-bottom: 2rem;
    margin-top: 3rem;

    font-size: 1.3rem;
    color: rgb(var(--tertiary) / 1);
  }
  .link-not-product {
    width: 100%;
    color: rgb(var(--pink-dark));
  }
`;
const ProductDetail = () => {
  const [data, setData] = useState();
  const [suggest, setSuggest] = useState("");
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Product Detail | FakeStore";
  }, []);
  useEffect(() => {
    const requestCategoryAPI = async () => {
      try {
        const result = await ProductAPI.getProductById(params.id);
        if (result.status === 200) {
          setLoading(false);
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
  }, [params.id]);
  useEffect(() => {
    const requestCategoryAPI = async () => {
      if (data?.category) {
        try {
          const result = await CategoryAPI.getSpecificCategory(
            data?.category,
            8
          );
          if (result.status === 200) {
            return setSuggest(result.data);
          }
        } catch (error) {
          console.log(
            "🚀 ~ file: DashboardTeacherFE.jsx:23 ~ requestAPI ~ error:",
            error
          );
        }
      }
    };

    requestCategoryAPI();
  }, [data?.category]);
  return (
    <StyleProduct data={data}>
      {data ? (
        <>
          <div className="product-left">
            <img
              src={data?.image || "/asset/images/no-image.jpg"}
              alt="Fake Store"
              className="product-left-img"
            />
          </div>
          <div className="product-right">
            <h2 className="product-r-title">{data?.title}</h2>
            <Link
              to={`/category/${data?.category}`}
              className="product-r-category-link"
            >
              {data?.category}
            </Link>

            <div className="product-r-group-range">
              <div className="product-r-range">
                <FaStar className="product-r-icon-star" />
                {data?.rating.rate}
              </div>
              <div className="product-r-view">
                <FaEye /> {data?.rating.count} view
              </div>
            </div>
            <h3 className="product-r-price">{data?.price}$</h3>
            <button className="product-r-btn">
              <FaShoppingCart className="product-r-btn-icon" />
              <span className="product-r-btn-text">add to cart</span>
            </button>
          </div>
          <div className="product-full">
            <p className="product-f-desc">{data?.description}</p>
            <div className="product-suggest">
              <h4>Sản phẩm có liên quan</h4>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={5}
                spaceBetween={15}
                className="home-list"
                breakpoints={ResponsiveSwiper}
              >
                {suggest.length > 0 &&
                  suggest.map(
                    (item, index) =>
                      item.title !== data?.title && (
                        <SwiperSlide key={item.id}>
                          <ProductItem
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            count={item.rating.count}
                            rate={item.rating.rate}
                          />
                        </SwiperSlide>
                      )
                  )}
              </Swiper>
            </div>
          </div>
        </>
      ) : (
        loading === false && (
          <>
            <span className="not-product">Sản phẩm không tồn tại</span>
            <Link to="/category/all" className="link-not-product">
              Xem nhiểu sản phẩm hơn
            </Link>
          </>
        )
      )}
    </StyleProduct>
  );
};

export default ProductDetail;
