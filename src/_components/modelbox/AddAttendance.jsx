import React from "react";
import { Modal } from "react-bootstrap";
import { WifiOutlined } from "@ant-design/icons";
import { Checkbox, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import attendanceSclice, {
   createAttendance,
   fetchWiffi,
} from "../../redux/feature/attendanceSclice";
import { useLoading } from "../../hook/useLoading";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddAttendance = ({ show, onHide }) => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { id } = useParams();
   const { user } = useSelector((state) => state.auth);
   // ------------------------------- fetch wiffi ------------------------------------
   const handleOpenWiffi = (e) => {
      if (e) dispatch(fetchWiffi({ setLoading }));

      dispatch(attendanceSclice.actions.learWiffi());
   };

   const { wiffi } = useSelector((state) => state.attendance);
   // ------------------------------- fetch wiffi -------------------------------------^

   // ------------------------------- create attendance -------------------------------
   const handleCreate = (e, wiffi) => {
      dispatch(
         createAttendance({
            payload: { project: id, user: user._id, wiffi },
            setLoading,
            onHide,
            toast,
         })
      );
   };
   // ------------------------------- create attendance -------------------------------

   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Wiffi chấm công</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body style={{ height: "520px" }}>
            <ul className="chat-user-list tab-pane show active overflow" id="choose">
               <div className="media import-content">
                  <div className="content-media">
                     <div className="media-body align-self-center text-nowrap">
                        <div className="user-name">
                           <WifiOutlined />
                        </div>
                     </div>
                  </div>
                  <Switch onChange={handleOpenWiffi} />
               </div>
               {wiffi?.map((item, index) => (
                  <li key={index}>
                     <a href="#">
                        <div className="media import-content">
                           <div className="content-media">
                              <div className="media-body align-self-center text-nowrap">
                                 <div className="user-name">{item?.ssid}</div>
                              </div>
                           </div>
                           <Checkbox onChange={(e) => handleCreate(e, item?.ssid)} />
                        </div>
                     </a>
                  </li>
               ))}
            </ul>
         </Modal.Body>
      </Modal>
   );
};

export default AddAttendance;
