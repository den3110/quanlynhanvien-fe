import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserRoleType } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { removeClient } from "../../redux/feature/clientSclice";
import { removeEmployees } from "../../redux/feature/employeesSclice";
import { removeWorker } from "../../redux/feature/workerSclice";

const DeleteUser = ({ show, onHide, userRemove }) => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const handleDelete = () => {
      if (!userRemove) {
         toast.warn("người dùng không tồn tại");
         return;
      }

      // gobal payload delete
      let payload = { id: userRemove._id, onHide, setLoading, toast };

      if (userRemove.role === UserRoleType.EMPLOYEE) {
         dispatch(removeEmployees(payload));
      }
      if (userRemove.role === UserRoleType.CLIENT) {
         dispatch(removeClient(payload));
      }
      if (userRemove.role === UserRoleType.WORKER) {
         dispatch(removeWorker(payload));
      }
   };
   return (
      <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide}>
         <div className="modal-content">
            <div className="modal-body">
               <div className="form-header">
                  <h3>
                     Xoá{" "}
                     {userRemove.role === UserRoleType.CLIENT
                        ? "khách hàng"
                        : userRemove.role === UserRoleType.EMPLOYEE
                        ? "nhân viên"
                        : userRemove.role === UserRoleType.WORKER
                        ? "người lao động"
                        : ""}{" "}
                     {userRemove?.name}
                  </h3>
                  <p>
                     Bạn có chắc muốn xóa{" "}
                     {userRemove.role === UserRoleType.CLIENT
                        ? "khách hàng"
                        : userRemove.role === UserRoleType.EMPLOYEE
                        ? "nhân viên"
                        : userRemove.role === UserRoleType.WORKER
                        ? "người lao động"
                        : ""}{" "}
                     ?
                  </p>
               </div>
               <div className="modal-btn delete-action">
                  <div className="row">
                     <div className="col-6" onClick={handleDelete}>
                        <a href="#" className="btn btn-danger continue-btn">
                           Xóa
                        </a>
                     </div>
                     <div className="col-6" onClick={onHide}>
                        <a href="#" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">
                           Hủy
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default DeleteUser;
