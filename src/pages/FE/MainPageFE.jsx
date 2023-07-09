import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { styled } from "styled-components";
import SearchPageFE from "./SearchPageFE";
import Header from "./Header";
const StyleMain = styled.div`
  width: 100%;
  position: relative;
  .content {
    margin: 0 auto;
    width: 90%;
    padding-top: 60px;
  }
`;
const MainPageFE = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <StyleMain>
      <Header onClick={() => setIsOpenSearch(true)} />
      <SearchPageFE
        isOpenSearch={isOpenSearch}
        onClick={() => setIsOpenSearch(false)}
      />
      <div className="content">
        <Outlet></Outlet>
      </div>
    </StyleMain>
  );
};

export default MainPageFE;
