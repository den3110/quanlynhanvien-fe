import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import workerSclice, { listWorkerAttendanceToday } from "../../../redux/feature/workerSclice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { timeCustom } from "../../../constant";
import { Checkbox } from "antd";
import AddOvertime from "../../../_components/modelbox/AddOvertime";

const ToDayWork = () => {
   const [checked, setChecked] = useState([]);
   const [checkedAll, setCheckedAll] = useState(false);
   const [show, setShow] = useState(false);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { search } = useLocation();
   const query = new URLSearchParams(search);

   const project = query.get("project");
   const status = query.get("status");

   useEffect(() => {
      dispatch(workerSclice.actions.lear());
      dispatch(
         listWorkerAttendanceToday({
            query: {
               project,
               status,
               year: new Date().getFullYear(),
               month: new Date().getMonth() + 1,
               date: new Date().getDate(),
            },
            setLoading,
         })
      );
   }, [project, status]);

   const { workers } = useSelector((state) => state.worker);

   // ------------------------------- checked -----------------------------------

   const handleChangeAll = (e) => {
      setCheckedAll(!checkedAll);
      setChecked(workers?.map((i) => i._id));
      if (checkedAll) {
         setChecked([]);
      }
   };

   useMemo(() => {
      if (checked?.length === workers.length && workers.length > 0) {
         setCheckedAll(true);
      }
   }, [checked, workers]);

   const handleChange = (e, item) => {
      setChecked([...checked, item._id]);

      if (!e.target.checked) {
         setCheckedAll(false);
         setChecked(checked.filter((i) => i !== item._id));
      }
   };

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Chấm công hôm nay</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">
                        {status === "true"
                           ? "Số lượng người đi làm hôm nay"
                           : "Số lượng người nghĩ hôm nay"}
                     </h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     {checked.length > 0 && (
                        <>
                           <a
                              href="#"
                              className="btn btn-danger ml-2 me-2"
                              onClick={() => setShow(true)}
                           >
                              <span>Cài đặt ca làm việc</span>
                           </a>
                        </>
                     )}
                  </div>
               </div>
            </div>
            {/* /Page Header */}

            <div className="row">
               <div className="col-md-12">
                  <div className="table-responsive">
                     <table className="table table-striped custom-table table-nowrap mb-0">
                        <thead>
                           <tr>
                              <th>
                                 <Checkbox onChange={handleChangeAll} checked={checkedAll} />
                              </th>
                              <th>Người lao động</th>
                              <th>Số điện thoại</th>
                              <th>Chuyên môn</th>
                              <th>Ngày</th>
                           </tr>
                        </thead>
                        <tbody>
                           {workers?.map((item, index) => (
                              <tr key={index}>
                                 <td>
                                    <Checkbox
                                       checked={checked?.includes(item?._id)}
                                       onChange={(e) => handleChange(e, item)}
                                    />
                                 </td>
                                 <td>{item?.name}</td>
                                 <td>{item?.mobile}</td>
                                 <td>{item?.field}</td>
                                 <td>{moment(item?.attendance?.datetime).format("DD/MM/YYYY")}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         {/* add overtime */}
         <AddOvertime
            show={show}
            onHide={() => setShow(false)}
            checked={checked}
            projectId={project}
         />
      </div>
   );
};

export default ToDayWork;
