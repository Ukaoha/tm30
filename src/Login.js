/** @format */

import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import "./login.css";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://movieserver-davidoh.koyeb.app/v1/tokens/authentication",
          values
        );

        toast.success("login successful!");
      } catch (error) {
        if (error.response) {
          console.error("login failed:", error.response.data);
          toast.error("login failed. Please try again.");
        } else {
          console.error("login failed:", error.message);
          toast.error("login failed. Please check your network connection.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="image-wrapper">
          <div className="main-img">
            <img src="./hero.png" />
          </div>
          <div className="img-title">
            <h2>Image Processor Pro</h2>
            <p>Everything You need in an easily customizeable dashbord</p>
          </div>
        </div>

        <div className="form-wrapper">
          <h2>IMGPP</h2>

          <h1>Sign In</h1>
          <p>Welcome back! please enter your details</p>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <p className="error">
                {formik.touched.email && formik.errors.email}
              </p>
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>

              <div className="input-container">
                {showPassword ? (
                  <RiLockPasswordFill
                    className="icon"
                    onClick={handleTogglePasswordVisibility}
                  />
                ) : (
                  <RiLockPasswordLine
                    className="icon"
                    onClick={handleTogglePasswordVisibility}
                  />
                )}

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>

              <p className="error">
                {formik.touched.password && formik.errors.password}
              </p>
            </div>

            <div>
              <button type="submit" className="login-button">
                {loading ? (
                  <Circles
                    height="30"
                    width="30"
                    margin="auto"
                    color="#fff"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    className="load"
                  />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
            <button type="submit" className="google-buton">
              <img className="google" src="./google.png" /> Sign in with Google
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
