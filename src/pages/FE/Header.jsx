import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import {
  HiChevronUp,
  HiCog,
  HiMenu,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineDesktopComputer,
  HiUserGroup,
} from "react-icons/hi";
import {
  FaMoon,
  FaProductHunt,
  FaShoppingCart,
  FaUserAlt,
  FaUserPlus,
} from "react-icons/fa";
import { MdClose, MdContactEmergency, MdLightMode } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import CategoryAPI from "../../api/category/CategoryAPI";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-toastify";
import { resetCart } from "../../reducers/action";
const StyleHeader = styled.div`
  .header {
    background: rgb(var(--secondary) / 0.8);
    border: none;
    border-bottom: solid 1px rgb(var(--pink-light) / 40%);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 9;
  }
  .navigation {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 20px;
    padding: 0.2rem 0;
  }
  .icon-btn-dropdown-nav {
    width: 20px;
    height: 20px;
    transition: transform 0.5s ease;
  }
  .dropdown-content-nav {
    position: absolute;
    top: 25px;
    display: none;
    min-width: 150px;
    max-width: 250px;
    color: rgb(var(--tertiary));
    transition: display 0.5s ease;
    background: rgb(var(--secondary) / 1);
    border-radius: 5px;
    padding: 0.5rem 0;
  }
  .dropdown-item-nav {
    display: flex;
    align-items: center;
    gap: 0 5px;
    padding: 0 0.6rem;
  }
  .dropdown-item-nav * {
    transition: color 0.5s ease;
    cursor: pointer;
  }
  .dropdown-item-nav:hover * {
    color: rgb(var(--pink-dark) / 1);
  }
  .dropdown-link-nav {
    color: rgb(var(--tertiary));
    text-transform: capitalize;
    white-space: nowrap;
  }
  .dropdown-item-nav:hover .dropdown-link-nav {
    color: rgb(var(--pink-dark));
  }
  .nav-left {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 20px;
  }
  .nav-menu-icon {
    width: 30px;
    height: 30px;
    display: none;
    cursor: pointer;
  }
  .nav-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 5px;
  }
  .nav-logo-img {
    max-width: 40px;
    object-fit: cover;
  }
  .nav-logo-text {
    font-weight: 600;
    text-transform: capitalize;
    font-size: 1.2rem;
    color: rgb(var(--tertiary) / 1);
  }
  .nav-center {
    width: 100%;
  }
  .nav-mobile-control {
    transition: left 0.5s ease;
  }
  .nav-menu-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 15px;
    transition: width 0.7s ease, opacity 0.8s ease;
  }
  .header-mobile-menu {
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 0 10px;
    height: 45px;
    border-bottom: solid 1px rgb(var(--pink-light) / 40%);
    margin-bottom: 1rem;
    padding: 0 1rem 0;
  }
  .logo-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 5px;
  }
  .img-mobile-menu {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }
  .logo-text-menu {
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
  }
  .nav-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 10px;
  }
  .icon-menu-mobile {
    width: 18px;
    height: 18px;
    display: none;
    cursor: pointer;
  }
  .nav-menu-link {
    color: rgb(var(--tertiary) / 1);
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    display: flex;
    gap: 0 4px;
    align-items: center;
    transition: color 0.5s ease;
  }

  .nav-menu-item:hover .nav-menu-link,
  .nav-menu-item:hover .icon-menu-mobile {
    color: rgb(var(--pink-dark) / 1);
  }
  .dropdown-nav {
    position: relative;
    cursor: pointer;
  }
  .dropdown-nav:hover .dropdown-content-nav {
    display: inline-block;
  }

  .dropdown-nav:hover .icon-btn-dropdown-nav {
    transform: rotate(180deg);
  }
  .nav-right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 20px;
    z-index: 0;
  }
  .nav-right svg {
    width: 20px;
    height: 20px;
  }
  .cart {
    position: relative;
    display: flex;
    align-items: center;
    color: rgb(var(--tertiary) / 1);
  }
  .cart-status {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 10px;
    height: 10px;
    border-radius: 100rem;
    background: rgb(var(--pink-dark) / 1);
    border: solid 1px rgb(var(--secondary) / 0.8);
  }
  .user {
    display: flex;
    align-items: center;
  }
  .user-img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 100rem;
  }
  .user:hover .dropdown-content-nav {
    display: inline-block;
    right: -1rem;
    top: 20px;
  }
  .themes {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .themes:hover .dropdown-content-nav {
    display: inline-block;
    top: 20px;
    left: -50%;
  }
  .icon-search {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  @media only screen and (max-width: 767.98px) {
    .icon-menu-mobile {
      display: inline-block !important;
    }
    .nav-menu-icon {
      display: inline-block !important;
    }
    .nav-logo-text {
      display: none;
    }
    .nav-right {
      z-index: ${(props) => (props.isopenmenu ? "-1" : "0")};
    }
    .nav-mobile-control {
      position: fixed;
      top: 0;
      left: ${(props) => (props.isopenmenu ? "0" : "-100vh")};
      height: 100vh;
      width: ${(props) => (props.isopenmenu ? "100%" : "0")};
      background: rgb(var(--secondary) / 0.5);
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      user-select: none;
    }
    .header-mobile-menu {
      display: flex !important;
    }
    .nav-menu-list {
      display: inline-block !important;
      padding: 0 0 0.6rem;
      width: ${(props) => (props.isopenmenu ? "70%" : "0")};
      max-width: 300px;
      height: 100%;
      background: rgb(var(--primary) / 1);
      opacity: ${(props) => (props.isopenmenu ? "1" : "0")};
    }
    .nav-menu-item {
      justify-content: unset !important;
      padding: 0 1rem;
    }
  }
  .active {
    color: rgb(var(--pink-dark) / 1) !important;
  }
`;
const Header = ({ onClick = () => {} }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [category, setCategory] = useState("");
  const params = useParams();
  const { pathname } = useLocation();
  const { setUser } = useAuth();
  const { state, dispatch } = useAuth();
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const result = await CategoryAPI.getAllCategory();
        if (result.status === 200) {
          return setCategory(result.data);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: Header.jsx:296 ~ getAllCategory ~ error:",
          error
        );
      }
    };
    getAllCategory();
  }, []);
  const handleSignOut = () => {
    localStorage.clear();
    dispatch(resetCart());
    setUser(undefined);
    if (localStorage.getItem("token") === null) {
      return toast.success("Đăng xuất thành công", {
        delay: 1000,
      });
    }
    return toast.error("Đăng xuất không thành công, kiểm tra lại", {
      delay: 1000,
    });
  };
  const handleSetLocation = () => {
    if (pathname !== "/sign-in" && pathname !== "/sign-up") {
      return localStorage.setItem("urlApplication", pathname);
    }
  };
  return (
    <StyleHeader isopenmenu={+isOpenMenu}>
      <div className="header">
        <nav className="navigation">
          <div className="nav-left">
            <HiMenu
              title="Click Open Menu"
              className="nav-menu-icon"
              onClick={() => setIsOpenMenu(true)}
            />
            <Link to="/" className="nav-logo">
              <img
                src="/asset/images/logo.png"
                alt="logo FakeStore"
                className="nav-logo-img"
              />
              <h1 className="nav-logo-text">FakeStore</h1>
            </Link>
          </div>
          <div className="nav-center">
            <div className={`nav-mobile-control`}>
              <ul className={`nav-menu-list`}>
                <div className="header-mobile-menu">
                  <div className="logo-mobile">
                    <img
                      src="/asset/images/logo.png"
                      alt="img-mobile"
                      className="img-mobile-menu"
                    />
                    <h2 className="logo-text-menu">fake store </h2>
                  </div>
                  <MdClose
                    className="icon-mobile-menu"
                    title="Press esc to close"
                    onClick={() => setIsOpenMenu(false)}
                  />
                </div>
                <li className="nav-menu-item dropdown-nav">
                  <FaProductHunt className="icon-menu-mobile"></FaProductHunt>
                  <NavLink
                    to={"category"}
                    className={({ isActive }) =>
                      isActive ? "active nav-menu-link" : "nav-menu-link"
                    }
                  >
                    category
                    <HiChevronUp className="icon-btn-dropdown-nav" />
                  </NavLink>
                  <div className="dropdown-content-nav">
                    <ul className="dropdown-list-nav">
                      <li className="dropdown-item-nav">
                        <NavLink
                          to="category/all"
                          className={`dropdown-link-nav ${
                            params.id === "all" || params === undefined
                              ? "active"
                              : ""
                          }`}
                        >
                          All category
                        </NavLink>
                      </li>
                      {category.length > 0 &&
                        category.map((item, index) => (
                          <li className="dropdown-item-nav" key={index}>
                            <NavLink
                              to={`category/${item}`}
                              className={`dropdown-link-nav ${
                                params.id === item ? "activeMenu" : ""
                              }`}
                            >
                              {item}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                </li>
                <li className="nav-menu-item">
                  <FaShoppingCart className="icon-menu-mobile" />
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? "active nav-menu-link" : "nav-menu-link"
                    }
                  >
                    cart
                  </NavLink>
                </li>
                <li className="nav-menu-item">
                  <MdContactEmergency className="icon-menu-mobile" />
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "active nav-menu-link" : "nav-menu-link"
                    }
                  >
                    contact
                  </NavLink>
                </li>
                <li className="nav-menu-item">
                  <HiUserGroup className="icon-menu-mobile" />
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "active nav-menu-link" : "nav-menu-link"
                    }
                  >
                    about us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-right dropdown">
            <BiSearch className="icon-search" onClick={onClick} />
            <div className="themes">
              <FaMoon />
              <div className="dropdown-content-nav">
                <ul className="dropdown-list-nav">
                  <li className="dropdown-item-nav">
                    <MdLightMode />
                    <Link to="." className="dropdown-link-nav">
                      light
                    </Link>
                  </li>
                  <li className="dropdown-item-nav">
                    <FaMoon />
                    <Link to="." className="dropdown-link-nav">
                      Dark
                    </Link>
                  </li>
                  <li className="dropdown-item-nav">
                    <HiOutlineDesktopComputer />
                    <Link to="." className="dropdown-link-nav">
                      system
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/cart" className="cart" title={`${state?.itemCounter}`}>
              <FaShoppingCart />
              {Number(state?.itemCounter) !== 0 ? (
                <span className="cart-status">
                  {state?.itemCounter > 99 ? "99+" : state?.itemCounter}
                </span>
              ) : (
                ""
              )}
            </Link>
            <div className="user dropdown-nav">
              {localStorage.getItem("token") === null ? (
                <FaUserAlt className="" />
              ) : (
                <img
                  src="/asset/images/d-avatar.png"
                  alt="img-user"
                  className="user-img"
                />
              )}
              <div className="dropdown-content-nav">
                <ul className="dropdown-list-nav">
                  {localStorage.getItem("token") === null ? (
                    <>
                      <li className="dropdown-item-nav">
                        <FaUserPlus />
                        <Link
                          to="/sign-up"
                          className="dropdown-link-nav"
                          onClick={handleSetLocation()}
                        >
                          register
                        </Link>
                      </li>
                      <li className="dropdown-item-nav">
                        <HiOutlineLogin />
                        <Link
                          to="/sign-in"
                          className="dropdown-link-nav"
                          onClick={handleSetLocation()}
                        >
                          Sign in
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="dropdown-item-nav">
                        <HiCog />
                        <Link to="." className="dropdown-link-nav">
                          Setting
                        </Link>
                      </li>
                      <li className="dropdown-item-nav">
                        <HiOutlineLogout />
                        <span
                          className="dropdown-link-nav"
                          onClick={handleSignOut}
                        >
                          sign out
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </StyleHeader>
  );
};

export default Header;
