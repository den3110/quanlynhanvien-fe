/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { createPayslip, payslipById, updatePayslip } from "../../../redux/feature/payslipSclice.js";
import { useLoading } from "../../../hook/useLoading";

const AddPayslip = () => {
   const [menu, setMenu] = useState(false);
   const [paysplip, setPaysplip] = useState({
      name: "",
      //
      leave: "",
      reward: "",
      bonus: "",
      overtime: "",
      sunday: "",
      holiday: "",
      service: "",

      // salary paid for social insurance
      salary_paid_social: "",
      //
      society: "",
      medican: "",
      unemployment: "",
      union: "",
   });

   const dispatch = useDispatch();
   const history = useHistory();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);
   const { payslip } = useSelector((state) => state.payslip);

   const { id } = useParams();

   useEffect(() => {
      if (id) {
         dispatch(payslipById({ id, setLoading }));
      }
   }, [id]);

   useEffect(() => {
      if (id) {
         setPaysplip(payslip);
      }
   }, [payslip]);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   const handleSave = () => {
      if (validatetion()) {
         dispatch(
            createPayslip({
               payload: { ...paysplip, creator: user._id },
               toast,
               history,
               setLoading,
            })
         );
      }
   };

   const handleUpdate = () => {
      if (!payslip._id) {
         toast.warn("Phiếu lương không tồn tại");
         return;
      }

      if (validatetion()) {
         dispatch(
            updatePayslip({
               id: payslip._id,
               payload: { ...paysplip, creator: user._id },
               toast,
               history,
               setLoading,
            })
         );
      }
   };

   const validatetion = () => {
      if (!user._id) {
         toast.warn("Làm ơn đăng nhập vào hệ thống");
         return false;
      }

      if (!paysplip.name) {
         toast.warn("Vui lòng nhập tên phiếu lương");
         return false;
      }
      if (!paysplip.leave) {
         delete paysplip.leave;
      }
      if (!paysplip.reward) {
         delete paysplip.reward;
      }
      if (!paysplip.rice) {
         delete paysplip.rice;
      }
      if (!paysplip.bonus) {
         delete paysplip.bonus;
      }
      if (!paysplip.overtime) {
         delete paysplip.overtime;
      }
      if (!paysplip.sunday) {
         delete paysplip.sunday;
      }
      if (!paysplip.holiday) {
         delete paysplip.holiday;
      }
      if (!paysplip.service) {
         delete paysplip.service;
      }
      //
      if (!paysplip.salary_paid_social) {
         toast.warn(`Làm ơn nhập lương đóng bảo hiểm xã hội`);
         return false;
      }
      if (!paysplip.medican) {
         delete paysplip.medican;
      }
      if (!paysplip.society) {
         delete paysplip.society;
      }
      if (!paysplip.unemployment) {
         delete paysplip.unemployment;
      }
      if (!paysplip.union) {
         delete paysplip.union;
      }
      if (!paysplip.accident) {
         delete paysplip.accident;
      }
      if (!paysplip.health) {
         delete paysplip.health;
      }

      return true;
   };

   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Dashboard - HRMS Admin Template</title>
               <meta name="description" content="Dashboard" />
            </Helmet>
            {/* Page Content */}

            <div className="content container-fluid">
               <div className="row">
                  <div className="col-md-12">
                     <div className="card">
                        <div className="card-body">
                           <h2 className="payslip-title">
                              {id ? "Chỉnh sửa phúc lợi và bảo hiểm" : "Thêm phúc lợi và bảo hiểm"}
                           </h2>
                           <div>
                              <div className="row">
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Tên phúc lợi bảo hiểm
                                          <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          min={0}
                                          className="form-control"
                                          type="text"
                                          defaultValue={paysplip?.name}
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                name: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>
                              </div>
                              <h3>Phúc lợi</h3>
                              <div className="row">
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phép năm ( tháng / năm)
                                          <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          min={0}
                                          className="form-control"
                                          type="number"
                                          defaultValue={paysplip?.leave}
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                leave: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Thưởng Lễ/Tết <span className="text-danger">*</span>
                                       </label>

                                       <input
                                          min={0}
                                          prefix="￥"
                                          className="form-control"
                                          type="number"
                                          defaultValue={paysplip?.reward}
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                reward: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Lương Tháng 13 <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          min={0}
                                          className="form-control"
                                          type="number"
                                          defaultValue={paysplip?.bonus}
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                bonus: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Làm Ngoài Giờ <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.overtime}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   overtime: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Làm Chủ Nhật <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.sunday}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   sunday: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Làm Lễ Tết <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.holiday}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   holiday: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phí Dịch Vụ <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.service}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   service: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Lương đóng bảo hiểm xã hội
                                       </label>
                                       <div className="input-box">
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip.salary_paid_social}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   salary_paid_social: e.target.value,
                                                })
                                             }
                                          />
                                          <span className="prefix">VND</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <h3>Bảo hiểm</h3>
                              <div className="row">
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Bảo Hiểm Xã Hội <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.society}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   society: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Bảo Hiểm Y Tế
                                          <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.medican}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   medican: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Bảo Hiểm Thất Nghiệp
                                          <span className="text-danger">*</span>
                                       </label>{" "}
                                       <br />
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.unemployment}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   unemployment: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Công Đoàn <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             min={0}
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             defaultValue={paysplip?.union}
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   union: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="submit-section">
                                 {!id ? (
                                    <button
                                       className="btn btn-primary submit-btn"
                                       onClick={handleSave}
                                    >
                                       Lưu
                                    </button>
                                 ) : (
                                    <button
                                       className="btn btn-primary submit-btn"
                                       onClick={handleUpdate}
                                    >
                                       Cập nhật
                                    </button>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Content */}
         </div>
      </div>
   );
};

export default AddPayslip;
