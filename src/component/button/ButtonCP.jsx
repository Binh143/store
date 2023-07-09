import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinnerCP";

const StyleButton = styled.button`
  cursor: ${(props) => (props.isLoading ? "wait" : "pointer")};
  padding: 0 20px;
  height: ${(props) => props.height || "66px"};
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: white;
      color: rgb(var(--tertiary) / 1);
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: rgb(var(--tertiary) / 1);
      background-image: linear-gradient(
        to right bottom,
        rgb(var(--pink-light) / 1),
        rgb(var(--pink-dark) / 1)
      );
    `};
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
/**
 *@requires
 * @param {string} type type of button ex: "button"| "submit"
 * @returns
 */
const ButtonCP = ({
  children,
  type = "button",
  kind = "primary",
  onClick = () => {},
  ...props
}) => {
  const { isLoading, href } = props;
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (href !== "" && typeof href === "string") {
    return (
      <Link to={href}>
        <StyleButton
          type={type}
          kind={kind}
          {...props}
          style={{ display: "inline-block" }}
        >
          {child}
        </StyleButton>
      </Link>
    );
  }
  return (
    <StyleButton type={type} kind={kind} onClick={onclick} {...props}>
      {child}
    </StyleButton>
  );
};
ButtonCP.prototype = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};
export default ButtonCP;
