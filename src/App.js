import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePageFE from "./pages/FE/home/HomePageFE";
import MainPageFE from "./pages/FE/MainPageFE";
import ProductDetail from "./pages/FE/detail/ProductDetail";
import NotFoundPage from "./pages/FE/NotFoundPage";
import CategoryFE from "./pages/FE/category/CategoryFE";
import ContactFE from "./pages/FE/contact/ContactFE";
import SignInPageFE from "./pages/FE/user/SignInPageFE";
import SignUpPageFE from "./pages/FE/user/SignUpPageFE";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CartFE from "./pages/FE/cart/CartFE";
import AboutUsFE from "./pages/FE/about/AboutUsFE";

const StyleOffline = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  .container {
    color: rgb(var(--tertiary) / 1);
    width: 50%;
    margin: 0 auto;
  }
  .heading {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  .error {
    color: rgb(220 56 63);
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);
  return (
    <div className="App">
      {isOnline ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPageFE />}>
              <Route index element={<HomePageFE></HomePageFE>}></Route>
              <Route
                exact
                path="product/:id"
                element={<ProductDetail />}
              ></Route>
              <Route exact path="category" element={<CategoryFE />}></Route>
              <Route exact path="category/:id" element={<CategoryFE />}></Route>
              <Route exact path="contact" element={<ContactFE />}></Route>
              <Route exact path="cart" element={<CartFE />}></Route>
              <Route exact path="about" element={<AboutUsFE />}></Route>
              <Route exact path="sign-in" element={<SignInPageFE />}></Route>
              <Route exact path="sign-up" element={<SignUpPageFE />}></Route>
              <Route path="*" element={<NotFoundPage></NotFoundPage>} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <StyleOffline>
          <div className="container">
            <h2 className="heading">Fake Store</h2>
            <h3 className="error">Lỗi: Kiểm tra kết nổi internet</h3>
            <p className="error-container">
              Hiện chúng tôi nhận thấy bạn chưa kết nối internet, hãy kết nối
              internet để tải dữ liệu từ website của chúng tôi
            </p>
          </div>
        </StyleOffline>
      )}
    </div>
  );
}

export default App;
