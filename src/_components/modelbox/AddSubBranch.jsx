import React from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { listHeador } from "../../redux/feature/workerSclice";
import { useLoading } from "../../hook/useLoading";
import { useSelector } from "react-redux";
import { useState } from "react";
import { createPart } from "../../redux/feature/partSclice";
import { toast } from "react-toastify";

const AddSubBranch = ({ show, onHide, part, user, id }) => {
   const [branch, setBranch] = useState({
      name: "",
      heador: "",
   });

   const empty = () =>
      setBranch({
         name: "",
         heador: "",
      });

   const dispatch = useDispatch();

   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(listHeador({ setLoading }));
   }, []);

   const { headors } = useSelector((state) => state.worker);

   const handleSave = () => {
      if (!user._id) {
         toast.warn("Làm ơn đăng nhập vào hệ thống");
         return;
      }

      const payload = { ...branch, project: id, creator: user._id };

      dispatch(
         createPart({
            payload: part._id ? { ...payload, parent: part._id } : payload,
            toast,
            empty,
            setLoading,
         })
      );
   };

   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">{!part?._id ? "Thêm bộ phận" : "Thêm nhánh phụ"}</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body>
            <span>Tên {!part?._id ? "bộ phận" : "nhánh"}</span>
            <div className="input-group m-b-30">
               <input
                  placeholder="Nhập tên nhánh"
                  className="form-control search-input"
                  type="text"
                  value={branch.name}
                  onChange={(e) => setBranch({ ...branch, name: e.target.value })}
               />
            </div>

            <div className="form-group">
               <label className="col-form-label">
                  Nhóm trưởng <span className="text-danger">*</span>
               </label>
               <select
                  className="form-control"
                  value={branch.heador}
                  onChange={(e) => setBranch({ ...branch, heador: e.target.value })}
               >
                  <option>Chọn nhóm trưởng</option>
                  {headors?.map((item) => (
                     <option key={item?._id} value={item?._id}>
                        {item?.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="button-dialog">
               <button className="primary" onClick={handleSave}>
                  Lưu
               </button>
            </div>
         </Modal.Body>
      </Modal>
   );
};

export default AddSubBranch;
