import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { performTrueByIdProject, updatePerform } from "../../redux/feature/assignTaskSclice";
import { useLoading } from "../../hook/useLoading";
import { useSelector } from "react-redux";
import { Switch } from "antd";
import { toast } from "react-toastify";
const PerfromTab = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(performTrueByIdProject({ id, setLoading }));
   }, [id]);

   const { assignTaskPerformTrue } = useSelector((state) => state.assignTask);

   // update status perform
   const onPerform = (checked, item) => {
      dispatch(
         updatePerform({
            id: item._id,
            payload: { verify: checked },
            toast,
            setLoading,
            record: { ...item, perform: { status: checked, date: Date.now() } },
         })
      );
   };

   return (
      <div className="tab-pane" id="pending_tasks">
         <div className="m-b-30">
            <ul className="list-group notification-list">
               {assignTaskPerformTrue.map((item) => (
                  <li key={item?._id} className="list-group-item">
                     <span className="text-start text-secondary">
                        {item?.name}
                        &nbsp; <span>đang thực hiện công việc</span>
                        &nbsp;
                        <span className="text-warning"> {item?.taskName}</span>
                     </span>
                     <div className="status-toggle">
                        <Switch
                           defaultChecked={item?.perform?.status}
                           onChange={(e) => onPerform(e, item)}
                        />
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default PerfromTab;
