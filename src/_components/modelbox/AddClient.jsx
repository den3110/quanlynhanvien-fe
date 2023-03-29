import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { emailrgx, phonergx } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { createClient, updateClient } from "../../redux/feature/clientSclice";

const AddClient = ({ show, handleClose, editClient, render }) => {
   const [isEdit, setIsEdit] = useState("");
   const [client, setClient] = useState({
      name: "",
      email: "",
      mobile: "",
      company: "",
      field: "",
      tax: "",
   });

   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const empty = () => {
      setClient({
         name: "",
         email: "",
         mobile: "",
         company: "",
         field: "",
         tax: "",
      });

      setIsEdit("");
   };

   const handleClosed = () => {
      empty();
      handleClose();
   };

   // set data
   useEffect(() => {
      setClient(editClient);
      setIsEdit(editClient._id);
   }, [render]);

   const handleSave = () => {
      if (validatetion()) {
         dispatch(
            createClient({
               payload: { ...client, creator: user._id },
               toast,
               handleClose,
               setLoading,
               empty,
            })
         );
      }
   };

   const handleUpdate = () => {
      // api
      if (validatetion()) {
         dispatch(
            updateClient({
               id: editClient._id,
               payload: { ...client, creator: user._id, oldEmail: editClient.email },
               toast,
               handleClose,
               setLoading,
               empty,
            })
         );
      }
   };

   const validatetion = () => {
      if (!user._id) {
         toast.warn(`Làm ơn đăng nhập vào hệ thống`);
         return false;
      }

      if (!client.name) {
         toast.warn("Vui lòng nhập họ tên");
         return false;
      }

      if (!client.email) {
         toast.warn("Vui lòng nhập email");
         return false;
      }

      if (client.email) {
         const isValidEmail = emailrgx.test(client.email);
         if (!isValidEmail) {
            toast.warn("Vui lòng nhập đúng email");
            return false;
         }
      }

      if (!client.mobile) {
         toast.warn("Vui lòng nhập số điện thoại");
         return false;
      }

      if (client.mobile) {
         const isValidPhone = phonergx.test(client.mobile);
         if (!isValidPhone) {
            toast.warn("Vui lòng nhập đúng số điện thoại");
            return false;
         }
      }

      if (!client.field) {
         toast.warn("Vui lòng nhập lĩnh vực");
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
               <h5 className="modal-title">{isEdit ? "Sửa khách hàng" : "Khách hàng mới"}</h5>
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
                              Họ tên <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              defaultValue={client.name}
                              onChange={(e) => setClient({ ...client, name: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">Email</label>
                           <input
                              className="form-control"
                              type="email"
                              defaultValue={client.email}
                              onChange={(e) => setClient({ ...client, email: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Số điện thoại <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="number"
                              defaultValue={client.mobile}
                              onChange={(e) => setClient({ ...client, mobile: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Công ty <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control floating"
                              type="text"
                              defaultValue={client.company}
                              onChange={(e) => setClient({ ...client, company: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">Lĩnh vực</label>
                           <input
                              className="form-control"
                              type="text"
                              defaultValue={client.field}
                              onChange={(e) => setClient({ ...client, field: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">Mã số thuế</label>
                           <input
                              className="form-control"
                              type="number"
                              defaultValue={client.tax}
                              onChange={(e) => setClient({ ...client, tax: e.target.value })}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="submit-section">
                     {!isEdit ? (
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           Lưu
                        </button>
                     ) : (
                        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                           Cập nhật
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default AddClient;
