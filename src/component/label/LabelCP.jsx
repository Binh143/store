import React from "react";
import styled from "styled-components";
const StyleLabel = styled.label`
  font-weight: 600;
  color: rgb(var(--tertiary) / 1);
  cursor: pointer;
`;
const LabelCP = ({ htmlFor = "", children, ...props }) => {
  return (
    <StyleLabel htmlFor={htmlFor} {...props}>
      {children}
    </StyleLabel>
  );
};

export default LabelCP;
