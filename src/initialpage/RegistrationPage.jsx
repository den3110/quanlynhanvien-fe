/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../constant";
import { toast, ToastContainer } from "react-toastify";
import { authAPI } from "../api/auth.js";

const schema = yup
   .object({
      email: yup
         .string()
         .matches(emailrgx, "Email is required")
         .required("Email is required")
         .trim(),
      password: yup.string().min(6).max(6).required("Password is required").trim(),

      repeatPassword: yup.string().required("ConfirmPassword is required").trim(),
   })
   .required();

const Registrationpage = (props) => {
   /**
    * On User Login
    */
   const [eye, seteye] = useState(true);

   const [signup, setSignup] = useState({
      email: "",
      password: "",
      repeatPassword: "",
   });

   const {
      handleSubmit,
      control,
      setError,
      clearErrors,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const onRegister = async () => {
      try {
         if (signup.password !== signup.repeatPassword) {
            toast.error("Mật khẩu không chính xác");
            return;
         }

         await authAPI.register(signup);

         toast.success("Đăng ký thành công");
         clearErrors("password");
         props.history.push("login");
      } catch (error) {
         console.log(error);
         if (typeof error?.response?.data?.message === "string") {
            toast.error(error?.response?.data?.message);
         } else {
            error?.response?.data?.message?.forEach((item) => {
               toast.error(item);
            });
         }
      }
   };
   const onEyeClick = () => {
      seteye(!eye);
   };

   const { loading } = props;
   return (
      <>
         <Helmet>
            <title>Register - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         <div className="account-content">
            <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
               Apply Job
            </Link>

            <div className="container">
               {/* Account Logo */}
               <div className="account-logo">
                  <Link to="/app/main/dashboard">
                     <img src={Applogo} alt="Dreamguy's Technologies" />
                  </Link>
               </div>
               {/* /Account Logo */}
               <div className="account-box">
                  <div className="account-wrapper">
                     <h3 className="account-title">Register</h3>
                     <p className="account-subtitle">Access to our dashboard</p>
                     {/* Account Form */}
                     <div>
                        <form>
                           <div className="form-group">
                              <label>Email</label>
                              <input
                                 className={`form-control `}
                                 type="email"
                                 autoComplete="false"
                                 value={signup.email}
                                 onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                              />
                              {/* <small>{errors?.email?.message}</small> */}
                           </div>
                           <div className="form-group">
                              <label>Mật khẩu</label>
                              <div className="pass-group">
                                 <input
                                    type={eye ? "password" : "text"}
                                    className={`form-control `}
                                    autoComplete="false"
                                    value={signup.password}
                                    onChange={(e) =>
                                       setSignup({ ...signup, password: e.target.value })
                                    }
                                 />
                                 <span
                                    onClick={onEyeClick}
                                    className={`fa toggle-password" ${
                                       eye ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                 />
                              </div>

                              {/* <small>{errors?.password?.message}</small> */}
                           </div>
                           <div className="form-group">
                              <label>Nhập lại mật khẩu</label>
                              <div className="pass-group">
                                 <input
                                    type={eye ? "password" : "text"}
                                    className={`form-control`}
                                    autoComplete="false"
                                    value={signup.repeatPassword}
                                    onChange={(e) =>
                                       setSignup({ ...signup, repeatPassword: e.target.value })
                                    }
                                 />
                                 <span
                                    onClick={onEyeClick}
                                    className={`fa toggle-password" ${
                                       eye ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                 />
                              </div>
                              {/* <small>{errors?.repeatPassword?.message}</small> */}
                           </div>
                           <div className="form-group text-center">
                              <button
                                 className="btn btn-primary account-btn"
                                 type="button"
                                 onClick={onRegister}
                              >
                                 Register
                              </button>
                           </div>
                        </form>
                        <div className="account-footer">
                           <p>
                              Already have an account? <Link to="/login">Login</Link>
                           </p>
                        </div>
                     </div>
                     {/* /Account Form */}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Registrationpage;
