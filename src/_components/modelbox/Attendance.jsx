import React from "react";
import { Modal } from "react-bootstrap";
import { WifiOutlined } from "@ant-design/icons";
import { Checkbox, Switch } from "antd";

function AddWiffi({ show, onHide }) {
   const onChange = (e) => {
      console.log(`checked = ${e.target.checked}`);
   };
   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Cập nhật wiffi chấm công</h5>
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
                     href="#choose"
                     data-bs-toggle="tab"
                     aria-expanded="true"
                  >
                     Chọn wiffi
                  </a>
               </li>
               <li className="nav-item">
                  <a className="nav-link" href="#update" data-bs-toggle="tab" aria-expanded="false">
                     Cập nhật
                  </a>
               </li>
            </ul>
            <div className="body-dialog">
               <div className="tab-content">
                  {/* update wiffi */}
                  <div className="tab-pane show" id="update">
                     <span>Wiffi đã chọn</span>
                     <div className="input-group m-b-30">
                        <input className="form-control search-input" type="text" disabled />
                     </div>
                     <span>Mật khẩu</span>
                     <div className="input-group m-b-30">
                        <input
                           placeholder="Nhập mật khẩu wiffi"
                           className="form-control search-input"
                           type="password"
                        />
                     </div>
                     <div className="button-dialog">
                        <button className="primary">Lưu</button>
                     </div>
                  </div>
                  {/* choose wiffi */}
                  <ul className="chat-user-list tab-pane show active" id="choose">
                     <li>
                        <a href="#">
                           <div className="media import-content">
                              <div className="content-media">
                                 <div className="media-body align-self-center text-nowrap">
                                    <div className="user-name">
                                       <WifiOutlined />
                                    </div>
                                 </div>
                              </div>
                              <Switch />
                           </div>
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <div className="media import-content">
                              <div className="content-media">
                                 <div className="media-body align-self-center text-nowrap">
                                    <div className="user-name">jnm'</div>
                                 </div>
                              </div>
                              <Checkbox onChange={onChange} />
                           </div>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default AddWiffi;
