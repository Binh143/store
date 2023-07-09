import React from "react";
import styled from "styled-components";

const StyleField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 15px;
  margin-bottom: 15px;
  height: 118px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const FieldCP = ({ children }) => {
  return <StyleField>{children}</StyleField>;
};

export default FieldCP;
