import React, { Children } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const AuthenticationPageStyle = styled.div`
  max-height: 100vh;
  padding: 20px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: rgb(var(--tertiary) / 1);
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 50px;
  }
  .logo-link {
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 5rem;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-bottom: 30px;
    margin-top: 30px;
    text-align: center;
    color: rgb(var(--tertiary) / 1);
    a {
      display: inline-block;
      color: rgb(var(--pink-dark));
      font-weight: 500;
    }
  }
  .form-errors {
    font-size: 0.9rem;
    color: rgb(220 53 69);
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyle>
      <div className="container">
        <Link to="/" className="logo-link">
          <img src="/asset/images/logo.png" alt="logo" className="logo" />
        </Link>
        <h1 className="heading">Fake Store</h1>
        {children}
      </div>
    </AuthenticationPageStyle>
  );
};

export default AuthenticationPage;
