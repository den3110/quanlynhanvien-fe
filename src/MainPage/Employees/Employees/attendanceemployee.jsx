import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { WifiOutlined } from "@ant-design/icons";
import AddAttendance from "../../../_components/modelbox/AddAttendance";
import attendanceSclice, {
   attendancePersonal,
   todayAttendance,
} from "../../../redux/feature/attendanceSclice";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import { useSelector } from "react-redux";
import moment from "moment";
import { timeCustom } from "../../../constant";

const AttendanceEmployee = () => {
   const [menu, setMenu] = useState(false);
   const [showAttendance, setShowAttendance] = useState(false);

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

   // ------------------------- close modal attedance ----------
   const dispatch = useDispatch();

   const handleCloseAttendance = () => {
      dispatch(attendanceSclice.actions.learWiffi());
      setShowAttendance(false);
   };

   // ------------------------- fetch attendance ----------------
   const { setLoading } = useLoading();
   const { id } = useParams();
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(attendancePersonal({ query: { project: id, user: user._id }, setLoading }));
      dispatch(
         todayAttendance({
            query: {
               project: id,
               user: user._id,
               date: new Date().getDate(),
               month: new Date().getMonth() + 1,
               year: new Date().getFullYear(),
            },
            setLoading,
         })
      );
   }, [id, user]);

   const { attendances } = useSelector((state) => state.attendance);
   const { attendance } = useSelector((state) => state.attendance);

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
                           className="btn btn-white float-end ml-2"
                           onClick={() => setShowAttendance(true)}
                        >
                           <WifiOutlined /> Chấm công
                        </a>
                     </div>
                  </div>
               </div>
               {/* /Page Header */}
               <div className="row">
                  <div className="col-md-4">
                     <div className="card punch-status">
                        <div className="card-body">
                           <h5 className="card-title">
                              Thời gian biểu{" "}
                              <small className="text-muted">
                                 {moment(Date.now()).format("DD/MM/YYYY")}
                              </small>
                           </h5>
                           <div className="punch-det">
                              <h6>Giờ vào</h6>

                              <p>
                                 Wed, {moment(Date.now()).format("DD/MM/YYYY")}{" "}
                                 {attendance.date === new Date().getDate() &&
                                    timeCustom(attendance?.timein || 0)}
                              </p>
                              {/* <p>Wed, 11th Mar 2019 10.00 AM</p> */}
                           </div>
                           <div className="punch-info">
                              <div className="punch-hours">
                                 <span>3.45 hrs</span>
                              </div>
                           </div>
                           <div className="punch-btn-section">
                              <button type="button" className="btn btn-primary punch-btn">
                                 Punch Out
                              </button>
                           </div>
                           <div className="statistics">
                              <div className="row">
                                 <div className="col-md-6 col-6 text-center">
                                    <div className="stats-box">
                                       <p>Break</p>
                                       <h6>1.21 hrs</h6>
                                    </div>
                                 </div>
                                 <div className="col-md-6 col-6 text-center">
                                    <div className="stats-box">
                                       <p>Overtime</p>
                                       <h6>3 hrs</h6>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="card att-statistics">
                        <div className="card-body">
                           <h5 className="card-title">Số liệu thống kê</h5>
                           <div className="stats-list">
                              <div className="stats-info">
                                 <p>
                                    Today{" "}
                                    <strong>
                                       3.45 <small>/ 8 hrs</small>
                                    </strong>
                                 </p>
                                 <div className="progress">
                                    <div
                                       className="progress-bar bg-primary"
                                       role="progressbar"
                                       style={{ width: "31%" }}
                                       aria-valuenow={31}
                                       aria-valuemin={0}
                                       aria-valuemax={100}
                                    />
                                 </div>
                              </div>
                              <div className="stats-info">
                                 <p>
                                    This Week{" "}
                                    <strong>
                                       28 <small>/ 40 hrs</small>
                                    </strong>
                                 </p>
                                 <div className="progress">
                                    <div
                                       className="progress-bar bg-warning"
                                       role="progressbar"
                                       style={{ width: "31%" }}
                                       aria-valuenow={31}
                                       aria-valuemin={0}
                                       aria-valuemax={100}
                                    />
                                 </div>
                              </div>
                              <div className="stats-info">
                                 <p>
                                    This Month{" "}
                                    <strong>
                                       90 <small>/ 160 hrs</small>
                                    </strong>
                                 </p>
                                 <div className="progress">
                                    <div
                                       className="progress-bar bg-success"
                                       role="progressbar"
                                       style={{ width: "62%" }}
                                       aria-valuenow={62}
                                       aria-valuemin={0}
                                       aria-valuemax={100}
                                    />
                                 </div>
                              </div>
                              <div className="stats-info">
                                 <p>
                                    Remaining{" "}
                                    <strong>
                                       90 <small>/ 160 hrs</small>
                                    </strong>
                                 </p>
                                 <div className="progress">
                                    <div
                                       className="progress-bar bg-danger"
                                       role="progressbar"
                                       style={{ width: "62%" }}
                                       aria-valuenow={62}
                                       aria-valuemin={0}
                                       aria-valuemax={100}
                                    />
                                 </div>
                              </div>
                              <div className="stats-info">
                                 <p>
                                    Overtime <strong>4</strong>
                                 </p>
                                 <div className="progress">
                                    <div
                                       className="progress-bar bg-info"
                                       role="progressbar"
                                       style={{ width: "22%" }}
                                       aria-valuenow={22}
                                       aria-valuemin={0}
                                       aria-valuemax={100}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="card recent-activity">
                        <div className="card-body">
                           <h5 className="card-title">Hoạt động hôm nay</h5>
                           {attendance?.date === new Date().getDate() && (
                              <ul className="res-activity-list">
                                 <li>
                                    <p className="mb-0">Giờ vào</p>
                                    <p className="res-activity-time">
                                       <i className="fa fa-clock-o" />{" "}
                                       {timeCustom(attendance?.timein || 0)}
                                    </p>
                                 </li>
                                 <li>
                                    <p className="mb-0">Giờ ra</p>
                                    <p className="res-activity-time">
                                       <i className="fa fa-clock-o" />{" "}
                                       {timeCustom(attendance?.timeout || 0)}
                                    </p>
                                 </li>
                              </ul>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               {/* Search Filter */}
               <div className="row filter-row">
                  <div className="col-sm-3">
                     <div className="form-group form-focus select-focus">
                        <div>
                           <input type="date" className="form-control floating datetimepicker" />
                        </div>
                        <label className="focus-label">Date</label>
                     </div>
                  </div>
                  <div className="col-sm-3">
                     <div className="form-group form-focus select-focus">
                        <select className="select floating">
                           <option>-</option>
                           <option>Jan</option>
                           <option>Feb</option>
                           <option>Mar</option>
                           <option>Apr</option>
                           <option>May</option>
                           <option>Jun</option>
                           <option>Jul</option>
                           <option>Aug</option>
                           <option>Sep</option>
                           <option>Oct</option>
                           <option>Nov</option>
                           <option>Dec</option>
                        </select>
                        <label className="focus-label">Select Month</label>
                     </div>
                  </div>
                  <div className="col-sm-3">
                     <div className="form-group form-focus select-focus">
                        <select className="select floating">
                           <option>-</option>
                           <option>2019</option>
                           <option>2018</option>
                           <option>2017</option>
                           <option>2016</option>
                           <option>2015</option>
                        </select>
                        <label className="focus-label">Select Year</label>
                     </div>
                  </div>
                  <div className="col-sm-3">
                     <a href="#" className="btn btn-success btn-block w-100">
                        {" "}
                        Search{" "}
                     </a>
                  </div>
               </div>
               {/* /Search Filter */}
               <div className="row">
                  <div className="col-lg-12">
                     <div className="table-responsive">
                        <table className="table table-striped custom-table mb-0">
                           <thead>
                              <tr>
                                 <th>#</th>
                                 <th>Ngày </th>
                                 <th>Giờ vào</th>
                                 <th>Giờ ra</th>
                                 <th>Giờ làm</th>
                              </tr>
                           </thead>
                           <tbody>
                              {attendances?.map((item, index) => (
                                 <tr key={item?._id}>
                                    <td>{index + 1}</td>
                                    <td>{moment(item?.datetime).format("DD/MM/YYYY")}</td>
                                    {/* hour in */}
                                    <td>{timeCustom(item?.timeinShifts || item?.timein)} </td>
                                    <td>{item?._id}</td>
                                    {/* hour out */}
                                    <td>{timeCustom(item?.timeoutShifts)} </td>
                                    {/* hour work */}
                                    {/* <td>
                                       {timeCustom(
                                          item?.timeout - item?.timein < 0
                                             ? 0
                                             : item?.timeout - item?.timein
                                       )}{" "}
                                    </td> */}
                                    <td>{timeCustom(item?.workHour)} </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Content */}
            {/* modale attendance */}
            <AddAttendance show={showAttendance} onHide={handleCloseAttendance} />
            {/* modale attendance */}
         </div>
      </div>
   );
};

export default AttendanceEmployee;
