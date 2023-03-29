import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import { listToDayOvertime, listWorkerAttendanceToday } from "../../../redux/feature/workerSclice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { timeCustom } from "../../../constant";
import { Checkbox } from "antd";
import AddOvertime from "../../../_components/modelbox/AddOvertime";
import axios from "axios";

const ListOvertime = () => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { search } = useLocation();
   const query = new URLSearchParams(search);

   const project = query.get("project");

   useEffect(() => {
      dispatch(
         listToDayOvertime({
            query: {
               project,
               year: new Date().getFullYear(),
               month: new Date().getMonth() + 1,
               date: new Date().getDate(),
            },
            setLoading,
         })
      );
   }, [project]);

   const { workers } = useSelector((state) => state.worker);

   // okoxb
   const [data, setDate] = useState([]);

   // useEffect(() => {
   //    test();
   // }, []);

   // async function test() {
   //    const { data } = await axios.get("join-part/");
   //    setDate(data);
   // }

   // console.log("workers");

   const sum = data.reduce((a, b) => {
      return a + b.result;
   }, 0);

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
                     <h3 className="page-title"> Số lượng người tăng ca</h3>
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
                              <th>Người lao động</th>
                              <th>Số điện thoại</th>
                              <th>Giờ vào</th>
                              <th>Giờ ra</th>
                              <th>Ngày</th>
                           </tr>
                        </thead>
                        <tbody>
                           {workers?.map((item, index) => (
                              <tr key={index}>
                                 <td>{item?.name}</td>
                                 <td>{item?.mobile}</td>
                                 <td>{timeCustom(item?.overtime?.timein)}</td>
                                 <td>{timeCustom(item?.overtime?.timeout)}</td>
                                 <td>{moment(item?.overtime?.datetime).format("DD/MM/YYYY")}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ListOvertime;
