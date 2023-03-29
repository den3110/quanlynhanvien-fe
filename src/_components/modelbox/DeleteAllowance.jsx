import React from "react";
import Modal from "react-bootstrap/Modal";

const Delete = ({ title, name, show, onHide, handleRemove }) => {
   return (
      <Modal show={show} onHide={onHide} centered>
         <div className="modal-content">
            <div className="modal-body">
               <div className="form-header">
                  <h3>Xóa {title}</h3>
                  <p>{`Bạn có chắc muôn xóa ${title} ${name}`}</p>
               </div>
               <div className="modal-btn delete-action">
                  <div className="row">
                     <div className="col-6">
                        <p className="btn btn-primary continue-btn" onClick={handleRemove}>
                           Xóa
                        </p>
                     </div>
                     <div className="col-6">
                        <p
                           data-bs-dismiss="modal"
                           className="btn btn-primary cancel-btn"
                           onClick={() => {
                              onHide();
                           }}
                        >
                           Hủy
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default Delete;
