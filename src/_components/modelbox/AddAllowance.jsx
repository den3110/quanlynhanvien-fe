import React, { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { listProjectByAllLevel } from "../../redux/feature/projectSclice";
import { UserRoleType } from "../../constant/index";
import { createSalary, updateSalary } from "../../redux/feature/salarySclice";
import { toast } from "react-toastify";
const AddAllowance = ({ show, handleClose, isSalary, load }) => {
   const handleClosed = () => {
      handleClose();
      empty();
   };

   const [salary, setSalary] = useState({
      beneficiary: "",
      salary: "0",
      go: "0",
      home: "0",
      toxic: "0",
      diligence: "0",
      eat: "0",
      project: "",
   });

   const empty = () => {
      setSalary({
         beneficiary: "",
         salary: "",
         go: "",
         home: "",
         toxic: "",
         diligence: "",
         eat: "",
         project: "",
      });
   };

   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);

   // ------------------- fetch project ----------------------
   useEffect(() => {
      if (user.role) {
         if (user.role === UserRoleType.ADMIN) {
            dispatch(listProjectByAllLevel({ setLoading }));
         }

         if (user.role !== UserRoleType.ADMIN) {
            dispatch(listProjectByAllLevel({ userId: user._id, setLoading }));
         }
      }
   }, [user._id]);

   const { projects } = useSelector((state) => state.project);

   // -------------------------- create ----------------------

   const handleSave = () => {
      if (validate()) {
         dispatch(
            createSalary({
               payload: {
                  ...salary,
                  creator: user._id,
                  projectEX: projects?.find((item) =>
                     item._id === salary?.project ? { name: item?.name, _id: item?._id } : ""
                  ),
               },
               toast,
               onHide: handleClose,
               setLoading,
               empty,
            })
         );
      }
   };

   //  ----------------------------- edit --------------------------

   useEffect(() => {
      if (isSalary._id) setSalary(isSalary);
   }, [isSalary, load]);

   const handleUpdate = () => {
      if (validate()) {
         dispatch(
            updateSalary({
               id: salary?._id,
               payload: { ...salary, creator: user._id },
               toast,
               onHide: handleClose,
               setLoading,
               empty,
            })
         );
      }
   };

   const validate = () => {
      if (!salary.beneficiary) {
         toast.warn("Làm ơn nhập tên nhóm thụ hưởng");
         return false;
      }
      if (salary.salary === undefined) {
         toast.warn("Làm ơn nhập mức lương");
         return false;
      }
      if (salary.go === undefined) {
         toast.warn("Làm ơn nhập mức phụ cấp đi lại");
         return false;
      }
      if (salary.home === undefined) {
         toast.warn("Làm ơn nhập mức phụ cấp nhà ở");
         return false;
      }
      if (salary.toxic === undefined) {
         toast.warn("Làm ơn nhập mức phụ cấp nặng nhọc/ độc hai");
         return false;
      }
      if (salary.eat === undefined) {
         toast.warn("Làm ơn nhập mức phụ cấp ăn uống");
         return false;
      }
      if (salary.diligence === undefined) {
         toast.warn("Làm ơn nhập mức phụ cấp chuyên cần");
         return false;
      }
      if (!salary.project) {
         toast.warn("Làm ơn chọn dự án");
         return false;
      }
      return true;
   };

   return (
      <Modal
         show={show}
         onHide={handleClosed}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">
                  {salary?._id ? "Chỉnh sửa nhóm thụ hưởng" : "Thêm nhóm thụ hưởng"}
               </h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={handleClosed}>
                     ×
                  </span>
               </button>
            </div>
            <div className="modal-body">
               <div>
                  <div className="row">
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Tên nhóm thụ hưởng <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              defaultValue={salary.beneficiary}
                              onChange={(e) =>
                                 setSalary({ ...salary, beneficiary: e.target.value })
                              }
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Lương / ngày <span className="text-danger">*</span>
                           </label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.salary}
                                 onChange={(e) => setSalary({ ...salary, salary: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Đi lại / tháng</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.go}
                                 onChange={(e) => setSalary({ ...salary, go: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Nhà ở / tháng</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.home}
                                 onChange={(e) => setSalary({ ...salary, home: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Nặng nhọc/ độc hại / ngày</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.toxic}
                                 onChange={(e) => setSalary({ ...salary, toxic: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Ăn uống / ngày</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.eat}
                                 onChange={(e) => setSalary({ ...salary, eat: e.target.value })}
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">Chuyên cần / tháng</label>
                           <div className="input-box">
                              <input
                                 prefix="￥"
                                 className="form-control tel"
                                 type="number"
                                 defaultValue={salary.diligence}
                                 onChange={(e) =>
                                    setSalary({ ...salary, diligence: e.target.value })
                                 }
                              />
                              <span className="prefix">VND</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Dự án <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              value={salary?.project}
                              onChange={(e) =>
                                 setSalary({
                                    ...salary,
                                    project: e.target.value,
                                 })
                              }
                           >
                              <option>Chọn dự án</option>
                              {projects?.map((item) => (
                                 <option key={item?._id} value={item?._id}>
                                    {item?.name}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="submit-section">
                     {salary?._id ? (
                        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                           Sửa
                        </button>
                     ) : (
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           Lưu
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default memo(AddAllowance);
