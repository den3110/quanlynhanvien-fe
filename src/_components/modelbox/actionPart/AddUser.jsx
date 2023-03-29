import React, { memo, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUserToPart, removeUserInPart } from "../../../redux/feature/partSclice";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const AddUserToPart = ({ show, onHide, part, id, setLoading, user }) => {
   // ======================================== add user =====================================
   const dispatch = useDispatch();
   const [joinpartEX, setJoinpartEX] = useState([]);

   const { userNotAssignPart } = useSelector((state) => state.part);

   const handleAdd = (item) => {
      if (user._id) {
         dispatch(
            addUserToPart({
               id: part._id,
               payload: { joinor: item._id, creator: user._id, part: part._id },
               userData: item,
               setJoinpartEX,
               joinpartEX,
               toast,
               setLoading,
            })
         );
         // add data assign
         // dispatch(assignTaskSclice.actions.addAssignTasks(dataAssign));
      }
   };

   // ======================================== add user ========================================
   // ======================================== remove user ========================================

   useEffect(() => {
      if (part.joinpartEX) {
         setJoinpartEX(part.joinpartEX);
      }
   }, [part.joinpartEX]);

   const handleRemoveUserInPart = (item) => {
      if (!part._id) return;
      if (!user._id) return;

      dispatch(
         removeUserInPart({
            id: item.joinpartId,
            setLoading,
            setJoinpartEX,
            joinpartEX,
            toast,
            user: item,
         })
      );
   };

   // ======================================== remove user ========================================

   return (
      <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">Cập nhật người lao động vào bộ phận</h5>
               <button type="button" className="close-x">
                  <span aria-hidden="true" onClick={onHide}>
                     ×
                  </span>
               </button>
            </div>
            <Modal.Body>
               <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                  <li className="nav-item">
                     <a
                        className="nav-link active"
                        href="#adduser"
                        data-bs-toggle="tab"
                        aria-expanded="true"
                     >
                        Thêm người
                     </a>
                  </li>
                  <li className="nav-item">
                     <a
                        className="nav-link"
                        href="#removeuser"
                        data-bs-toggle="tab"
                        aria-expanded="false"
                     >
                        Xóa
                     </a>
                  </li>
               </ul>
               <div className="body-dialog">
                  <div className="tab-content">
                     <ul className="chat-user-list tab-pane show active" id="adduser">
                        {userNotAssignPart?.map((item) => (
                           <li key={item._id}>
                              <a href="#">
                                 <div className="media import-content">
                                    <div className="content-media">
                                       <span className="avatar">{/* <img alt="" src={} /> */}</span>
                                       <div className="media-body align-self-center text-nowrap">
                                          <div className="user-name">{item?.name}</div>
                                          <span className="designation">{item?.field}</span>
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
                     {/* remove user */}
                     <ul className="chat-user-list tab-pane" id="removeuser">
                        {joinpartEX?.map((item) => (
                           <li key={item?.userId}>
                              <a href="#">
                                 <div className="media import-content">
                                    <div className="content-media">
                                       <span className="avatar">{/* <img alt="" src={} /> */}</span>
                                       <div className="media-body align-self-center text-nowrap">
                                          <div className="user-name">{item?.name}</div>
                                          <span className="designation">{item?.field}</span>
                                       </div>
                                    </div>
                                    <div
                                       className="remove-x"
                                       onClick={() => handleRemoveUserInPart(item)}
                                    >
                                       <CloseOutlined />
                                    </div>
                                 </div>
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </Modal.Body>
         </div>
      </Modal>
   );
};

export default memo(AddUserToPart);
