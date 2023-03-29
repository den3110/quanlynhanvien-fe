import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createWorkerProject } from "../../redux/feature/workerProjectSclice";
import { useLoading } from "../../hook/useLoading";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createTask } from "../../redux/feature/taskSclice";
function CreateTask({ show, onHide }) {
   const [assign, setAssign] = useState({
      name: "",
      content: "",
   });
   const dispatch = useDispatch();
   const { id } = useParams();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);

   function handleAdd() {
      if (!user._id) return toast.warn("Làm ơn đăng nhập vào hệ thống");
      dispatch(
         createTask({
            payload: { ...assign, project: id, creator: user._id },
            toast,
            onHide,
            setLoading,
         })
      );
   }

   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Thêm công việc</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body>
            <span>Tiêu đề</span>
            <div className="input-group m-b-30">
               <input
                  placeholder="Nhập tên công việc"
                  className="form-control search-input"
                  type="text"
                  onChange={(e) => setAssign({ ...assign, name: e.target.value })}
               />
            </div>
            <span>Mô tả</span>
            <div className="input-group m-b-30">
               <TextArea
                  onChange={(e) => setAssign({ ...assign, content: e.target.value })}
                  className="form-control search-input"
                  rows={4}
                  placeholder="Mô tả công việc"
               />
            </div>
            <div className="button-dialog">
               <button className="primary" onClick={handleAdd}>
                  Lưu
               </button>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default CreateTask;
