import React, { memo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { formatHourToSecond, overtimeOpition, overtimeType } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { createOvertime } from "../../redux/feature/overtimeSclice";
import { Radio } from "antd";

function AddOvertime({ show, onHide, checked, projectId }) {
   const [overtime, setOvertime] = useState({
      datetime: "",
      timein: "",
      timeout: "",
      type: overtimeType.EVERNINGS,
   });

   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const handleSave = () => {
      dispatch(
         createOvertime({
            payload: {
               ...overtime,
               datetime: new Date(overtime.datetime).getTime(),
               year: new Date(overtime.datetime).getFullYear(),
               month: new Date(overtime.datetime).getMonth() + 1,
               date: new Date(overtime.datetime).getDate(),
               timein: formatHourToSecond(overtime.timein),
               timeout: formatHourToSecond(overtime.timeout),
               userIds: checked,
               project: projectId,
            },
            setLoading,
            onHide,
            toast,
         })
      );
   };

   // -------------------------------- radio ---------------------------------
   // const [value, setValue] = useState(1);
   const onChange = (e) => {
      console.log("radio checked", e.target.value);
      setOvertime({ ...overtime, type: e.target.value });
   };
   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Cài đặt ca làm việc</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body>
            <div className="body-dialog">
               <span>Ngày tăng ca</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="date"
                     value={overtime.datetime}
                     onChange={(e) => setOvertime({ ...overtime, datetime: e.target.value })}
                  />
               </div>

               <span>Giờ vào</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={overtime.timein}
                     onChange={(e) => setOvertime({ ...overtime, timein: e.target.value })}
                  />
               </div>

               <span>Giờ ra</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={overtime.timeout}
                     onChange={(e) => setOvertime({ ...overtime, timeout: e.target.value })}
                  />
               </div>

               <span>Kiểu tăng ca:</span>
               <br />
               <Radio.Group onChange={onChange} value={overtime.type}>
                  {overtimeOpition?.map((item) => (
                     <Radio key={item?.value} value={item?.value}>
                        {item?.label}
                     </Radio>
                  ))}
               </Radio.Group>
               <div className="input-group m-b-30"></div>

               <span>Số lượng: {checked.length} người.</span>

               <div className="button-dialog">
                  <button className="primary" onClick={handleSave}>
                     Lưu
                  </button>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default memo(AddOvertime);
