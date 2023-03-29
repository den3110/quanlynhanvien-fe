import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import { useEffect } from "react";
import { useState } from "react";
import workerSclice, { workerNoAssign } from "../../redux/feature/workerSclice";
import { createJoinProject } from "../../redux/feature/joinProjectSclice";
import { UserRoleType } from "../../constant";
function AssignUser({ show, onHide }) {
   const { workers } = useSelector((state) => state.worker);
   const dispatch = useDispatch();
   const { id } = useParams();
   const { setLoading } = useLoading();

   function handleAdd(worker) {
      dispatch(
         createJoinProject({
            payload: { joinor: worker._id, project: id, role: UserRoleType.WORKER },
            toast,
            setLoading,
            worker,
            dispatch,
         })
      );
   }

   useEffect(() => {
      fetchWorker();
   }, []);

   function fetchWorker() {
      dispatch(workerNoAssign({ setLoading }));
   }

   return (
      <Modal
         aria-labelledby="contained-modal-title-vcenter"
         centered
         show={show}
         onHide={onHide}
         className="modal custom-modal fade"
         role="dialog"
      >
         <div ole="document">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Thêm người lao dộng</h5>
                  <button type="button" className="close-x">
                     <span aria-hidden="true" onClick={onHide}>
                        ×
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <div className="input-group m-b-30">
                     <input
                        placeholder="Search a user to assign"
                        className="form-control search-input"
                        type="text"
                     />
                  </div>
                  <div className="body-dialog">
                     <ul className="chat-user-list">
                        {workers?.map((item, index) => (
                           <li key={index}>
                              <a href="#">
                                 <div className="media import-content">
                                    <div className="content-media">
                                       <span className="avatar">
                                          {/* <img alt="" src={Avatar_09} /> */}
                                       </span>
                                       <div className="media-body align-self-center text-nowrap">
                                          <div className="user-name">{item?.name}</div>
                                          {/* <span className="designation">{item?.department}</span> */}
                                       </div>
                                    </div>
                                    <div className="import" onClick={() => handleAdd(item)}>
                                       Thêm
                                    </div>
                                 </div>
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
}

export default AssignUser;
