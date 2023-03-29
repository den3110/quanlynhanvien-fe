import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Tableavatar from "../../../_components/tableavatar/tableavatar";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Header from "../../../initialpage/Sidebar/header";
import { WifiOutlined } from "@ant-design/icons";
import AddWiffi from "../../../_components/modelbox/AddWiffi";
import { useDispatch, useSelector } from "react-redux";
import attendanceSclice, {
   getAttendanceByUser,
   userAttendance,
} from "../../../redux/feature/attendanceSclice";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "../../../hook/useLoading";
import { Pagination } from "antd";
import moment from "moment";
import { timeCustom } from "../../../constant";

const AttendanceAdmin = () => {
   const [menu, setMenu] = useState(false);
   const [show, setShow] = useState(false);
   const day = new Date().getDate();
   const [dateInMonth, setDateInMonth] = useState([]);
   const { id } = useParams();
   const { setLoading } = useLoading();
   const [limit] = useState(10);
   const [page, setPage] = useState(1);
   const [count, setCount] = useState(0);
   const [query, setQuery] = useState({
      date: "",
      month: "",
      year: "",
      user: "",
   });

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   // use
   const dispatch = useDispatch();

   const handleClose = () => {
      dispatch(attendanceSclice.actions.learWiffi());
      setShow(false);
   };

   // ------------------------------ get date in month ---------------------------
   useMemo(() => {
      const getDaysInMonth = (month, year) =>
         new Array(31)
            .fill("")
            .map((v, i) => new Date(year, month - 1, i + 1))
            .filter((v) => v.getMonth() === month - 1);

      const dateArray = getDaysInMonth(new Date().getMonth() + 1, new Date().getFullYear());

      const days = dateArray?.map((item) => new Date(item).getDate());

      setDateInMonth(days);
   }, [day]);

   // ------------------------------ get date in month ---------------------------
   useEffect(() => {
      dispatch(
         userAttendance({
            query: {
               project: id,
               dateStringify: JSON.stringify(dateInMonth),
               limit: limit,
               page: page,
            },
            setLoading,
         })
      );
   }, [id, page, limit]);

   const { allUserAttendance } = useSelector((state) => state.attendance);

   useMemo(() => {
      setCount(allUserAttendance?.paginate?.count);
   }, [allUserAttendance]);

   // ------------------------------- paging -------------------------------------
   const itemRender = (_, type, originalElement) => {
      if (type === "prev") {
         return <a>Previous</a>;
      }
      if (type === "next") {
         return <a>Next</a>;
      }
      return originalElement;
   };

   const handlePaging = (page) => {
      setPage(page);
   };

   useEffect(() => {
      if (query.date) {
         dispatch(getAttendanceByUser({ query: { ...query, project: id }, setLoading }));
      }
   }, [query]);

   const { attendance } = useSelector((state) => state.attendance);

   console.log(query);

   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Attendance - HRMS Admin Template</title>
               <meta name="description" content="Login page" />
            </Helmet>
            <div className="content container-fluid">
               {/* Page Header */}
               <div className="page-header">
                  <div className="row align-items-center">
                     <div className="col">
                        <h3 className="page-title">Chấm công</h3>
                     </div>
                     <div className="col-auto float-end ml-auto">
                        <a
                           href="#"
                           className="btn btn-success float-end ml-2 me-2"
                           onClick={() => setShow(true)}
                        >
                           <WifiOutlined /> Cập nhật wiffi chấm công
                        </a>
                     </div>
                  </div>
               </div>
               {/* /Page Header */}
               {/* Search Filter */}
               <div className="row filter-row">
                  <div className="col-sm-6 col-md-3">
                     <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">Employee Name</label>
                     </div>
                  </div>
               </div>
               {/* /Search Filter */}
               <div className="row">
                  <div className="col-lg-12">
                     <div className="table-responsive">
                        <table className="table table-striped custom-table table-nowrap mb-0">
                           <thead>
                              <tr>
                                 <th>
                                    <span className="ms-3">Người lao động</span>
                                 </th>
                                 {dateInMonth?.map((day) => (
                                    <th key={day}>{day}</th>
                                 ))}
                                 <th>Công làm</th>
                                 <th>Ca gãy</th>
                                 <th>Tăng ca sáng</th>
                                 <th>Tăng ca tối</th>
                              </tr>
                           </thead>
                           <tbody>
                              <Tableavatar
                                 allUserAttendance={allUserAttendance}
                                 dateInMonth={dateInMonth}
                                 setQuery={setQuery}
                              />
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            <Pagination
               total={count}
               defaultPageSize={limit}
               itemRender={itemRender}
               onChange={handlePaging}
               // onShowSizeChange={(current, size) => handlePaging(current, size)}
            />
            {/* /Page Content */}
            {/* Attendance Modal */}
            <div className="modal custom-modal fade" id="attendance_info" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title">Chi tiết</h5>
                        <button
                           type="button"
                           className="close-x"
                           data-bs-dismiss="modal"
                           aria-label="Close"
                        >
                           <span aria-hidden="true">×</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <div className="row">
                           <div className="col-md-6">
                              <div className="card punch-status">
                                 <div className="card-body">
                                    <h5 className="card-title">
                                       Timesheet
                                       <small className="text-muted ms-2">
                                          {`${
                                             attendance?.date < 10
                                                ? "0" + attendance.date
                                                : attendance.date
                                          }/${
                                             attendance?.month < 10
                                                ? "0" + attendance?.month
                                                : attendance.month
                                          }/${attendance?.year}`}
                                       </small>
                                    </h5>
                                    <div className="punch-det">
                                       <h6>Chấm công vào</h6>
                                       <p>
                                          {`${
                                             attendance?.date < 10
                                                ? "0" + attendance.date
                                                : attendance.date
                                          }/${
                                             attendance?.month < 10
                                                ? "0" + attendance?.month
                                                : attendance.month
                                          }/${attendance?.year}`}
                                          <span className="ms-2">
                                             {attendance?.times
                                                ? timeCustom(attendance?.times[0])
                                                : ""}
                                          </span>
                                       </p>
                                    </div>
                                    <div className="punch-info">
                                       <div className="punch-hours">
                                          <span>{timeCustom(attendance?.totalWorkHour)}</span>
                                       </div>
                                    </div>
                                    <div className="punch-det">
                                       <h6>Chấm công ra</h6>
                                       <p>
                                          {`${
                                             attendance?.date < 10
                                                ? "0" + attendance.date
                                                : attendance.date
                                          }/${
                                             attendance?.month < 10
                                                ? "0" + attendance?.month
                                                : attendance.month
                                          }/${attendance?.year}`}
                                          <span className="ms-2">
                                             {attendance?.times
                                                ? timeCustom(
                                                     attendance?.times[
                                                        attendance?.times?.length - 1
                                                     ]
                                                  )
                                                : ""}
                                          </span>
                                       </p>
                                    </div>
                                    <div className="statistics">
                                       <div className="row">
                                          <div className="col-md-6 col-6 text-center">
                                             <div className="stats-box">
                                                <p>Tăng ca sáng</p>
                                                <h6>{timeCustom(attendance?.overtimeMorning)}</h6>
                                             </div>
                                          </div>
                                          <div className="col-md-6 col-6 text-center">
                                             <div className="stats-box">
                                                <p>Tăng ca tối</p>
                                                <h6>{timeCustom(attendance?.overtimeEvernings)}</h6>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="card recent-activity">
                                 <div className="card-body">
                                    <h5 className="card-title">Hoạt động</h5>
                                    <ul className="res-activity-list">
                                       {attendance?.times?.map((item, index) => (
                                          <li key={index}>
                                             <p className="mb-0">
                                                {index % 2 ? `Giờ ra` : "Giờ vào"}
                                             </p>
                                             <p className="res-activity-time">
                                                <i className="fa fa-clock-o me-2" />
                                                {timeCustom(item)}
                                             </p>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Attendance Modal */}
            {/* created wiffi attendance */}
            <AddWiffi show={show} onHide={handleClose} />
            {/* created wiffi attendance */}
         </div>
      </div>
   );
};

export default AttendanceAdmin;
