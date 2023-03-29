import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
   finishTrueByIdProject,
   performTrueByIdProject,
   updateFinish,
} from "../../redux/feature/assignTaskSclice";
import { useLoading } from "../../hook/useLoading";
import { useSelector } from "react-redux";
import { Switch } from "antd";
import { toast } from "react-toastify";
const FinishTab = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(finishTrueByIdProject({ id, setLoading }));
   }, [id]);

   const { assignTaskFinishTrue } = useSelector((state) => state.assignTask);

   // update status finnish
   const onFinish = (checked, item) => {
      dispatch(
         updateFinish({
            id: item._id,
            payload: { verify: checked },
            toast,
            setLoading,
            record: { ...item, finish: { status: checked, date: Date.now() } },
         })
      );
   };

   return (
      <div className="tab-pane" id="completed_tasks">
         <div className="m-b-30">
            <ul className="list-group notification-list">
               {assignTaskFinishTrue.map((item) => (
                  <li key={item?._id} className="list-group-item">
                     <span className="text-start text-secondary">
                        {item?.name}
                        &nbsp; <span>đã hoàn thành công việc</span>
                        &nbsp;
                        <span className="text-warning"> {item?.taskName}</span>
                     </span>
                     <div className="status-toggle">
                        <Switch
                           defaultChecked={item?.finish?.status}
                           onChange={(e) => onFinish(e, item)}
                        />
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default FinishTab;
