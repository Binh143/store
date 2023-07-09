import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import AuthenticationPage from "./AuthenticationPageStyle";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldCP from "../../../component/field/FieldCP";
import ButtonCP from "../../../component/button/ButtonCP";
import InputCP from "../../../component/input/InputCP";
import LabelLabelCP from "../../../component/label/LabelCP";
import { FaUserAlt } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const StyleSignUp = styled.div``;
const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(6, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});
const SignUpPageFE = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page";
    if (localStorage.getItem("accessToken")) {
      return navigate("/dashboard");
    }
  }, []);
  const handleSignIn = async (values) => {
    // if (!isValid) return;
    // // await signInWithEmailAndPassword(auth, values.email, values.password);
    // const result = await AuthResourceAPI.postSignIn(values);
    // console.log(
    //   "🚀 ~ file: SignInPage.jsx:53 ~ handleSignIn ~ result:",
    //   result
    // );
  };

  return (
    <StyleSignUp>
      <AuthenticationPage>
        <form className="form" onSubmit={handleSubmit(handleSignIn)}>
          <FieldCP>
            <LabelLabelCP htmlFor="username">Username</LabelLabelCP>
            <InputCP
              type="text"
              name="username"
              placeholder="Enter your username"
              control={control}
            >
              <FaUserAlt className="input-icon" />
            </InputCP>
          </FieldCP>
          <FieldCP>
            <LabelLabelCP htmlFor="password">Password</LabelLabelCP>
            <InputCP
              type={togglePassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {!togglePassword ? (
                <AiFillEye
                  className={"input-icon"}
                  onClick={() => setTogglePassword(true)}
                ></AiFillEye>
              ) : (
                <AiFillEyeInvisible
                  className={"input-icon"}
                  onClick={() => setTogglePassword(false)}
                ></AiFillEyeInvisible>
              )}
            </InputCP>
          </FieldCP>
          <div className="have-account">
            You have had account? <NavLink to="/sign-in">Login account</NavLink>
          </div>
          <ButtonCP
            type="submit"
            style={{
              width: "100%",
              height: "50px",
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Register
          </ButtonCP>
        </form>
      </AuthenticationPage>
    </StyleSignUp>
  );
};

export default SignUpPageFE;
