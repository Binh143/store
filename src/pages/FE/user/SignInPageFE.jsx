import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import AuthenticationPage from "./AuthenticationPageStyle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FieldCP from "../../../component/field/FieldCP";
import ButtonCP from "../../../component/button/ButtonCP";
import InputCP from "../../../component/input/InputCP";
import LabelLabelCP from "../../../component/label/LabelCP";
import { FaUserAlt } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import UserAPI from "../../../api/user/UserAPI";
import { useAuth } from "../../../context/auth-context";

const StyleSignInPage = styled.div``;
const schema = yup.object({
  username: yup
    .string()
    .min(2, "Username của bạn phải có ít nhất 2 ký tự trở lên")
    .max(20, "Username của bạn có nhiều nhất 20 ký tự")
    .required("Xin hãy điền username"),
  password: yup
    .string()
    .min(6, "Password của bạn phải có ít nhất 6 ký tự trở lên")
    .required("Xin hãy điền password"),
});
const SignInPageFE = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [togglePassword, setTogglePassword] = useState(false);
  // const user = useSelector((state) => state.user);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Page | FakeStore";

    if (localStorage.getItem("token")) {
      return navigate("/");
    }
  }, [localStorage.getItem("token")]);
  const handleSignIn = async (values) => {
    if (!isValid) {
      return;
    }
    try {
      const result = await UserAPI.postLoginFE(values);

      if (result.status === 200) {
        setUser({
          username: values.username,
          token: result?.data.token,
        });
        localStorage.setItem("token", result?.data.token);
        toast.success("Đăng nhập thành công. Chào mừng bạn đã quay trở lại", {
          delay: 1000,
        });
        return navigate(localStorage.getItem("urlApplication"));
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        return toast.error(
          "Đăng nhập không thành công. Vui lòng kiểm tra lại username và  password",
          {
            delay: 1000,
          }
        );
      }
      return toast.error("Có lỗi không xác định, chúng tôi đang xử lí", {
        delay: 1000,
      });
    }
  };

  return (
    <StyleSignInPage>
      <AuthenticationPage>
        <form className="form" onSubmit={handleSubmit(handleSignIn)}>
          <FieldCP>
            <LabelLabelCP htmlFor="username">Username</LabelLabelCP>
            <InputCP
              type="text"
              name="username"
              placeholder="Enter your username"
              control={control}
            ></InputCP>
            <div className="form-errors">
              {errors.username && errors.username.message}
            </div>
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
            <div className="form-errors">
              {errors.password && errors.password.message}
            </div>
          </FieldCP>
          <div className="have-account">
            You have not had account?{" "}
            <NavLink to="/sign-up">Register an account</NavLink>
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
            Login
          </ButtonCP>
        </form>
      </AuthenticationPage>
    </StyleSignInPage>
  );
};

export default SignInPageFE;
