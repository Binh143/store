import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "../../../component/product/ProductItem";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ResponsiveSwiper from "../../../responsive/ResponsiveSwiper";
import "swiper/css";
import "swiper/css/navigation";
import ProductAPI from "../../../api/product/ProductAPI";
import CategoryAPI from "../../../api/category/CategoryAPI";

const StyleHomePageFE = styled.div`
  .home-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  .home-content {
    margin-bottom: 2rem;
  }
  .hone-content-title {
    font-size: 1.2rem;
    text-transform: capitalize;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 399.98px) {
    .home-list {
      grid-template-columns: 1fr;
    }
  }
`;
const HomePageFE = () => {
  const [proNew, setProNew] = useState("");
  const [category, setCategory] = useState("");

  let arr = [];
  useEffect(() => {
    document.title = "Home Page | FakeStore";
  }, []);
  useEffect(() => {
    const requestProductAPI = async () => {
      try {
        const result = await ProductAPI.getLimitProduct(5);
        if (result.status === 200) {
          setProNew(result.data);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: DashboardTeacherFE.jsx:23 ~ requestAPI ~ error:",
          error
        );
      }
    };
    requestProductAPI();
    const requestCategoryAPI = async () => {
      try {
        const result = await CategoryAPI.getAllCategory();
        if (result.status === 200) {
          setCategory(result.data);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: DashboardTeacherFE.jsx:23 ~ requestAPI ~ error:",
          error
        );
      }
    };
    // requestCategoryAPI();
  }, []);
  useEffect(() => {
    const GetProductsSpecificCategory = async () => {
      if (category.length > 0) {
        for (let i = 0; i < category.length; i++) {
          try {
            const result = await CategoryAPI.getSpecificCategory(
              category[i],
              5
            );
            if (result.status === 200) {
              // result.data
              arr.push(result.data);
            }
          } catch (error) {
            console.log(
              "🚀 ~ file: DashboardTeacherFE.jsx:23 ~ requestAPI ~ error:",
              error
            );
          }
        }
      }
    };
    // GetProductsSpecificCategory();
  }, [arr, category]);
  return (
    <StyleHomePageFE>
      <div className="home-content">
        <h2 className="hone-content-title">New Product</h2>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={5}
          spaceBetween={15}
          className="home-list"
          breakpoints={ResponsiveSwiper}
        >
          {proNew.length > 0 &&
            proNew.map((item, index) => (
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
            ))}
        </Swiper>
      </div>

      {/* {category.length > 0 &&
        category.map((item, index) => (
          <div className="home-content" key={index}>
            <h2 className="hone-content-title">{item}</h2>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              slidesPerView={5}
              spaceBetween={15}
              className="home-list"
              breakpoints={ResponsiveSwiper}
            >
              {arr?.length > 0 &&
                arr?.map(
                  (itemPro, index2) =>
                    itemPro.length > 0 &&
                    itemPro.map((item3, index3) =>
                      item === item3.category ? (
                        <SwiperSlide>
                          {console.log(item, item3.category)}
                          <ProductItem
                            key={item3.id}
                            id={item3.id}
                            title={item3.title}
                            price={item3.price}
                            image={item3.image}
                            count={item3.rating.count}
                            rate={item3.rating.rate}
                          />
                        </SwiperSlide>
                      ) : (
                        console.log(item, item3.category)
                      )
                    )
                )}
            </Swiper>
          </div>
        ))} */}
    </StyleHomePageFE>
  );
};

export default HomePageFE;
