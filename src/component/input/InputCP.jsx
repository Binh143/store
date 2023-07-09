import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
const InputStyle = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "10px 50px 10px 10px" : "10px")};
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    background: rgb(var(--tertiary) / 1);
    border-radius: 8px;
    transition: all 0.2s linear;
    border: solid 1px transparent;
    outline: none;
  }
  input:focus {
    background-color: white;
    border: solid 1px rgb(var(--pink-dark) / 1);
  }
  input:invalid {
    border: solid 1px red;
  }

  input::-webkit-input-placeholder {
    color: rgb(var(--secondary) / 0.8);
  }
  input::-moz-input-placeholder {
    color: rgb(var(--secondary) / 0.8);
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
    color: rgb(var(--pink-dark) / 0.8);
    width: 20px;
    height: 20px;
  }
`;
const InputCP = ({
  name = "",
  type = "text",
  hasIcon = false,
  control,
  children,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyle hasIcon={children ? true : false}>
      <input type={type} id={name} {...props} {...field} />
      {children}
    </InputStyle>
  );
};

export default InputCP;
