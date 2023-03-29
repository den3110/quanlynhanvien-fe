import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import { removePayslip } from "../../redux/feature/payslipSclice";
import { deleteProject } from "../../redux/feature/projectSclice";

const DeletePayslip = ({ show, onHide, project }) => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const handleDelete = () => {
      if (!project) {
         toast.warn("Phiếu lương không tồn tại");
         return;
      }

      dispatch(removePayslip({ id: project._id, toast, onHide, setLoading }));
   };
   return (
      <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide}>
         <div className="modal-content">
            <div className="modal-body">
               <div className="form-header">
                  <h3>Xoá phiếu lương {project?.name}</h3>
                  <p>Bạn có chắc muốn xóa phiếu lương ?</p>
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

export default DeletePayslip;
