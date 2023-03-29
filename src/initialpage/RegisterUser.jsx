import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Applogo } from "../Entryfile/imagepath";
import { registerUser } from "../redux/feature/authSclice";
import { useLoading } from "../hook/useLoading";
import TextArea from "antd/lib/input/TextArea";

const RegisterUser = () => {
   const [register, setRegister] = useState({
      name: "",
      email: "",
      cccd: 0,
      mobile: "",
      date: "",
      password: "",
      confirmPasword: "",
      field: "",
      address: "",
      fieldContent: "",
   });

   const { setLoading } = useLoading();
   const history = useHistory();
   const dispatch = useDispatch();

   function handleSave() {
      dispatch(
         registerUser({
            payload: { ...register, date: new Date(register.date).getTime() },
            toast,
            history,
            setLoading,
         })
      );
   }

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

            <Link to="/app/main/dashboard">
               <img
                  style={{ width: "100px", marginLeft: "50px" }}
                  src="https://fce.com.vn/wp-content/uploads/2022/08/logo_fce_trong_suot-1024x614.png"
                  alt="Dreamguy's Technologies"
               />
            </Link>

            <div className="container">
               <div className="account-box-12">
                  <div className="account-wrapper">
                     <h3 className="account-title">Đăng ký tài khoản</h3>
                     <p className="account-subtitle"></p>
                     <div className="row">
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Họ và tên <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="text"
                                 onChange={(e) =>
                                    setRegister({ ...register, name: e.target.value })
                                 }
                              />
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Email <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="email"
                                 onChange={(e) =>
                                    setRegister({ ...register, email: e.target.value })
                                 }
                              />
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Căn cước công dân <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="number"
                                 onChange={(e) =>
                                    setRegister({ ...register, cccd: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 {" "}
                                 Số điện thoại <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="number"
                                 onChange={(e) =>
                                    setRegister({ ...register, mobile: e.target.value })
                                 }
                              />
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Ngày sinh <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="date"
                                 onChange={(e) =>
                                    setRegister({ ...register, date: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Địa chỉ <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="text"
                                 onChange={(e) =>
                                    setRegister({ ...register, address: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Mật khẩu <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="password"
                                 onChange={(e) =>
                                    setRegister({ ...register, password: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Nhập lại mật khẩu <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="password"
                                 onChange={(e) =>
                                    setRegister({ ...register, confirmPasword: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Lĩnh vực/ ngành nghề chuyên môn{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 className="form-control"
                                 type="text"
                                 onChange={(e) =>
                                    setRegister({ ...register, field: e.target.value })
                                 }
                              />
                           </div>
                        </div>

                        <div className="col-sm-6">
                           <div className="form-group">
                              <label className="col-form-label">
                                 Mô tả chi tiết kinh nghiệm <span className="text-danger">*</span>{" "}
                                 <br />
                              </label>
                              <TextArea
                                 onChange={(e) =>
                                    setRegister({ ...register, fieldContent: e.target.value })
                                 }
                                 rows={4}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           Đăng ký
                        </button>
                     </div>
                     <div className="account-footer">
                        <p>
                           Already have an account? <Link to="/login">Login</Link>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default RegisterUser;
