import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../../hook/useLoading";
import { checkPartNotAssignTask } from "../../../redux/feature/partSclice";

import { createPartTask } from "../../../redux/feature/partTaskSclice";
function AssignPerson({ show, onHide, task, load }) {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);
   const { id } = useParams();

   // function handleAdd(user, task) {
   //    if (!user._id) toast.warn(`Vui lòng đăng nhập vào hệ thống`);

   //    dispatch(
   //       createAssignTask({
   //          payload: { worker: user._id, task: task._id, creator: user._id },
   //          assignTask: {
   //             userId: user._id,
   //             name: user.name,
   //             filed: user.field,
   //             avartar: user.avartar,
   //             taskId: task._id,
   //             taskName: task.name,
   //             perform: { status: false, date: Date.now() },
   //             finish: { status: false, date: Date.now() },
   //          },
   //          toast,
   //          setLoading,
   //       })
   //    );
   // }

   // get user not assign task
   // useEffect(() => {
   //    if (task._id) {
   //       dispatch(checkNotAssignTask({ query: { project: id, task: task._id }, setLoading }));
   //    }
   // }, [id, task._id, load]);

   // const { notAssignTask } = useSelector((state) => state.assignTask);

   //  =================================== part ======================================

   useEffect(() => {
      if (task._id) {
         dispatch(checkPartNotAssignTask({ query: { project: id, task: task._id }, setLoading }));
      }
   }, [id, task._id, load]);

   const { partNotAssignTask } = useSelector((state) => state.part);

   const handAddPart = (part, task) => {
      if (!user._id) toast.warn(`Vui lòng đăng nhập vào hệ thống`);

      dispatch(
         createPartTask({
            payload: {
               task: task._id,
               creator: user._id,
               part: part._id,
            },
            toast,
            setLoading,
            dispatch,
         })
      );
   };

   return (
      <Modal
         show={show}
         onHide={onHide}
         onClick={(e) => e.stopPropagation()}
         className="modal custom-modal fade"
         role="dialog"
      >
         <div ole="document">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Giao việc {task.name}</h5>
                  <button type="button" className="close-x">
                     <span
                        aria-hidden="true"
                        onClick={(e) => {
                           onHide();
                           e.stopPropagation();
                        }}
                     >
                        ×
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <ul className="chat-user-list tab-pane overflow" id="part">
                     {partNotAssignTask?.map((item) => (
                        <li key={item?._id}>
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
                                 <div className="import" onClick={() => handAddPart(item, task)}>
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
      </Modal>
   );
}

export default AssignPerson;
