import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProjectPayslip } from "../../redux/feature/projectSclice";
import { useLoading } from "../../hook/useLoading";

const LinkProject = ({ show, onHide }) => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { payslips } = useSelector((state) => state.payslip);
   const { project } = useSelector((state) => state.project);

   const handleLink = (payslip) => {
      dispatch(
         updateProjectPayslip({
            id,
            payload: { payslip: payslip._id },
            toast,
            onHide,
            setLoading,
            payslip,
         })
      );
   };

   return (
      <Modal
         aria-labelledby="contained-modal-title-vcenter"
         centered
         show={show}
         onHide={onHide}
         className="modal custom-modal fade"
         role="dialog"
      >
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">Liên kết phiếu lương</h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={onHide}>
                     ×
                  </span>
               </button>
            </div>
            <div className="modal-body">
               <div className="input-group m-b-30">
                  <input
                     placeholder="Tìm kiếm phiếu lương"
                     className="form-control search-input"
                     type="text"
                  />
               </div>
               <div>
                  <ul className="chat-user-list">
                     {payslips?.map(
                        (item) =>
                           project?.payslip?.length > 0 &&
                           project?.payslip[0]?._id !== item._id && (
                              <li key={item?._id}>
                                 <div className="media import-content">
                                    <div className="media-body align-self-center text-nowrap">
                                       <a href={"/app/payroll/salary-view/" + item?._id}>
                                          <div className="import-name">{item?.name}</div>
                                       </a>
                                    </div>
                                    <div className="import" onClick={() => handleLink(item)}>
                                       Liên kết
                                    </div>
                                 </div>
                              </li>
                           )
                     )}
                  </ul>
                  <a href="/app/projects/them-phieu-luong">
                     <div className="page-payslip">Thêm phiếu lương mới</div>
                  </a>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default LinkProject;
