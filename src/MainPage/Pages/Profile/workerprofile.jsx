/**
 * TermsCondition Page
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar_02 } from "../../../Entryfile/imagepath";
import { profileWorker } from "../../../redux/feature/workerSclice";
import { useLoading } from "../../../hook/useLoading";
import { useSelector } from "react-redux";
import moment from "moment";
import Adduser from "../../../_components/modelbox/Adduser";
import Addproject from "../../../_components/modelbox/Addproject";
import DeleteProject from "../../../_components/modelbox/DeleteProject";
import { listProjectByAllLevel } from "../../../redux/feature/projectSclice";
import { UserRoleType } from "../../../constant";

const WorkerProfile = () => {
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   const [modalShow, setModalShow] = useState(false);
   const [render, setRender] = useState(0);
   const [modalProject, setModalProject] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);
   const [load, setLoad] = useState(0);
   const [projectData, setProjectData] = useState({});

   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      // fetch profile
      dispatch(profileWorker({ id, setLoading }));
   }, [id]);

   const { worker } = useSelector((state) => state.worker);

   useEffect(() => {
      fetchProject();
   }, [id]);

   const fetchProject = () => {
      dispatch(listProjectByAllLevel({ query: { userId: id }, setLoading }));
   };

   const { projects } = useSelector((state) => state.project);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Employee Profile - HRMS admin Template</title>
            <meta name="description" content="Reactify Blank Page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row">
                  <div className="col-sm-12">
                     <h3 className="page-title">Trang cá nhân</h3>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            <div className="card mb-0">
               <div className="card-body">
                  <div className="row">
                     <div className="col-md-12">
                        <div className="profile-view">
                           <div className="profile-img-wrap">
                              <div className="profile-img">
                                 <a href="#">
                                    <img alt="" src={Avatar_02} />
                                 </a>
                              </div>
                           </div>
                           <div className="profile-basic">
                              <div className="row">
                                 <div className="col-md-5">
                                    <div className="profile-info-left">
                                       <h3 className="user-name m-t-0 mb-0">{worker?.name}</h3>
                                       <h6 className="text-muted">{worker?.field}</h6>
                                       <small className="text-muted">Người lao động</small>
                                       {/* <small className="text-muted">Web Designer</small> */}
                                       <div className="staff-id">Employee ID : FT-0001</div>
                                       <div className="small doj text-muted">
                                          Ngày tham gia :{" "}
                                          {moment(worker?.createdAt).format("DD/MM/YYYY")}
                                       </div>
                                       <div className="staff-msg">
                                          <Link
                                             onClick={() =>
                                                localStorage.setItem("minheight", "true")
                                             }
                                             className="btn btn-custom"
                                             to={`/conversation/chat/${id}`}
                                          >
                                             Gửi tin nhắn
                                          </Link>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-md-7">
                                    <ul className="personal-info">
                                       <li>
                                          <div className="title">Điện thoại:</div>
                                          <div className="text">
                                             <a href="">{worker?.mobile}</a>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Email:</div>
                                          <div className="text">
                                             <a href="">{worker?.email}</a>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Ngày sinh:</div>
                                          <div className="text">
                                             {moment(worker?.date).format("DD/MM/YYYY")}
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Địa chỉ:</div>
                                          <div className="text">
                                             {worker?.address || "chưa có thông tin"}
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Giới tính:</div>
                                          <div className="text">
                                             {worker?.gender || "chưa có thông tin"}
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Căn cước công dân:</div>
                                          <div className="text">
                                             {worker?.cccd || "chưa có thông tin"}
                                          </div>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                           <div className="pro-edit">
                              <a
                                 className="edit-icon"
                                 href="#"
                                 onClick={() => {
                                    setRender((prev) => prev + 1);
                                    setModalShow(true);
                                 }}
                              >
                                 <i className="fa fa-pencil" />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="card tab-box">
               <div className="row user-tabs">
                  <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                     <ul className="nav nav-tabs nav-tabs-bottom">
                        <li className="nav-item">
                           <a href="#emp_profile" data-bs-toggle="tab" className="nav-link active">
                              Thông tin
                           </a>
                        </li>
                        <li className="nav-item">
                           <a href="#emp_projects" data-bs-toggle="tab" className="nav-link">
                              Dự án
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="tab-content">
               {/* Profile Info Tab */}
               <div id="emp_profile" className="pro-overview tab-pane fade show active">
                  <div className="row">
                     <div className="col-md-6 d-flex">
                        <div className="card profile-box flex-fill">
                           <div className="card-body">
                              <h3 className="card-title">Học vấn </h3>
                              <div className="experience-box">
                                 <ul className="experience-list">
                                    <li>
                                       <div className="experience-user">
                                          <div className="before-circle" />
                                       </div>
                                       <div className="experience-content">
                                          <div className="timeline-content">
                                             <a href="/" className="name">
                                                International College of Arts and Science (UG)
                                             </a>
                                             <div>Bsc Computer Science</div>
                                             <span className="time">2000 - 2003</span>
                                          </div>
                                       </div>
                                    </li>
                                    <li>
                                       <div className="experience-user">
                                          <div className="before-circle" />
                                       </div>
                                       <div className="experience-content">
                                          <div className="timeline-content">
                                             <a href="/" className="name">
                                                International College of Arts and Science (PG)
                                             </a>
                                             <div>Msc Computer Science</div>
                                             <span className="time">2000 - 2003</span>
                                          </div>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6 d-flex">
                        <div className="card profile-box  ">
                           <div className="card-body">
                              <h3 className="card-title">Kinh nghiệm làm việc </h3>
                              <div className="experience-box">
                                 <ul className="personal-info">
                                    <li>
                                       <div className="text">
                                          {worker?.fieldContent || "chưa có thông tin"}
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* /Profile Info Tab */}
               {/* Projects Tab */}
               <div className="tab-pane fade" id="emp_projects">
                  <div className="row">
                     {projects?.map((item) => (
                        <div key={item?._id} className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                           <div className="card">
                              <div className="card-body">
                                 <div className="dropdown dropdown-action profile-action">
                                    <a
                                       href="#"
                                       className="action-icon dropdown-toggle"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false"
                                    >
                                       <i className="material-icons">more_vert</i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => {
                                             setRender((prev) => prev + 1);
                                             setProjectData(item);
                                             setModalShow(true);
                                          }}
                                       >
                                          <i className="fa fa-pencil m-r-5" /> Sửa
                                       </a>
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => {
                                             setProjectData(item);
                                             setModalDelete(true);
                                          }}
                                       >
                                          <i className="fa fa-trash-o m-r-5" /> Xóa
                                       </a>
                                    </div>
                                 </div>
                                 <h4 className="project-title">
                                    <Link to={"/app/projects/projects-view/" + item?._id}>
                                       {item?.name}
                                    </Link>
                                 </h4>
                                 <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">1</span>{" "}
                                    <span className="text-muted">open tasks, </span>
                                    <span className="text-xs">9</span>{" "}
                                    <span className="text-muted">tasks completed</span>
                                 </small>
                                 {/* <p className="text-muted">{item?.content}</p> */}
                                 <div className="pro-deadline m-b-15 d-flex">
                                    <div className="sub-title">Tổng số:</div>
                                    <span className="text-muted ms-2">
                                       {item?.workers?.length + " Người"}
                                    </span>
                                 </div>
                                 <div className="pro-deadline m-b-15">
                                    <div className="sub-title">
                                       Số lượng làm:
                                       <Link
                                          to={`/app/projects/today-worker?project=${item?._id}&status=true`}
                                       >
                                          <span className="round-span bg-success ms-2">
                                             {item?.attendanceToDay > 0
                                                ? "+" + item?.attendanceToDay
                                                : item?.attendanceToDay}
                                          </span>
                                       </Link>
                                    </div>
                                 </div>
                                 <div className="pro-deadline m-b-15">
                                    <div className="sub-title">
                                       Số lượng nghỉ:
                                       <Link
                                          to={`/app/projects/today-worker?project=${item?._id}&status=false`}
                                       >
                                          <span className="round-span bg-danger ms-2">
                                             {item?.workers?.length - item?.attendanceToDay > 0
                                                ? "+" +
                                                  (item?.workers?.length - item?.attendanceToDay)
                                                : item?.workers?.length - item?.attendanceToDay}
                                          </span>
                                       </Link>
                                    </div>
                                 </div>
                                 <div className="pro-deadline m-b-15">
                                    <div className="sub-title">
                                       Số lượng tăng ca:
                                       <Link to={`/app/projects/overtime?project=${item?._id}`}>
                                          <span className="round-span bg-warning ms-2">
                                             {item?.overtimeToDay > 0
                                                ? "+" + item?.overtimeToDay
                                                : item?.overtimeToDay}
                                          </span>
                                       </Link>
                                    </div>
                                 </div>
                                 <div className="pro-deadline m-b-15 d-flex">
                                    <div className="sub-title">Deadline:</div>
                                    <span className="text-muted ms-2">
                                       {moment(item?.end).format("DD-MM-YYYY")}
                                    </span>
                                 </div>
                                 <div className="project-members m-b-15">
                                    <div className="sub-title">
                                       Leader :
                                       <span className="round-span background-info ms-2">1</span>
                                    </div>
                                 </div>
                                 <div className="pro-deadline m-b-15">
                                    <div className="sub-title">
                                       Team:
                                       <span className="round-span background-info ms-2">
                                          +{item?.employees?.length}
                                       </span>
                                       {/* <span className="round-span ms-2 btn btn-outline-warning text-danger">
                                    <LoginOutlined />
                                 </span> */}
                                    </div>
                                 </div>
                                 <p className="m-b-5">
                                    Progress <span className="text-success float-end">40%</span>
                                 </p>
                                 <div className="progress progress-xs mb-0">
                                    <div
                                       className="progress-bar bg-success"
                                       role="progressbar"
                                       data-bs-toggle="tooltip"
                                       title="40%"
                                       style={{ width: "40%" }}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               {/* /Projects Tab */}
            </div>
         </div>
         {/* /Page Content */}
         {/* Profile Modal */}
         <div id="profile_info" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Profile Information</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="row">
                           <div className="col-md-12">
                              <div className="profile-img-wrap edit-img">
                                 <img className="inline-block" src={Avatar_02} alt="user" />
                                 <div className="fileupload btn">
                                    <span className="btn-text">edit</span>
                                    <input className="upload" type="file" />
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>First Name</label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          defaultValue="John"
                                       />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Last Name</label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          defaultValue="Doe"
                                       />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Birth Date</label>
                                       <div>
                                          <input
                                             className="form-control datetimepicker"
                                             type="date"
                                             defaultValue="05/06/1985"
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Gender</label>
                                       <select className="select form-control">
                                          <option value="male selected">Male</option>
                                          <option value="female">Female</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-12">
                              <div className="form-group">
                                 <label>Address</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    defaultValue="4487 Snowbird Lane"
                                 />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>State</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    defaultValue="New York"
                                 />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Country</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    defaultValue="United States"
                                 />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Pin Code</label>
                                 <input type="text" className="form-control" defaultValue={10523} />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Phone Number</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    defaultValue="631-889-3206"
                                 />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>
                                    Department <span className="text-danger">*</span>
                                 </label>
                                 <select className="select">
                                    <option>Select Department</option>
                                    <option>Web Development</option>
                                    <option>IT Management</option>
                                    <option>Marketing</option>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>
                                    Designation <span className="text-danger">*</span>
                                 </label>
                                 <select className="select">
                                    <option>Select Designation</option>
                                    <option>Web Designer</option>
                                    <option>Web Developer</option>
                                    <option>Android Developer</option>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>
                                    Reports To <span className="text-danger">*</span>
                                 </label>
                                 <select className="select">
                                    <option>-</option>
                                    <option>Wilmer Deluna</option>
                                    <option>Lesley Grauer</option>
                                    <option>Jeffery Lalor</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         {/* /Profile Modal */}
         {/* Personal Info Modal */}
         <div id="personal_info_modal" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Personal Information</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="row">
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Passport No</label>
                                 <input type="text" className="form-control" />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Passport Expiry Date</label>
                                 <div>
                                    <input className="form-control datetimepicker" type="date" />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Tel</label>
                                 <input className="form-control" type="text" />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>
                                    Nationality <span className="text-danger">*</span>
                                 </label>
                                 <input className="form-control" type="text" />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Religion</label>
                                 <div>
                                    <input className="form-control" type="date" />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>
                                    Marital status <span className="text-danger">*</span>
                                 </label>
                                 <select className="select form-control">
                                    <option>-</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>Employment of spouse</label>
                                 <input className="form-control" type="text" />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label>No. of children </label>
                                 <input className="form-control" type="text" />
                              </div>
                           </div>
                        </div>
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         {/* /Personal Info Modal */}
         {/* Family Info Modal */}
         <div id="family_info_modal" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title"> Family Informations</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="form-scroll">
                           <div className="card">
                              <div className="card-body">
                                 <h3 className="card-title">
                                    Family Member{" "}
                                    <a href="" className="delete-icon">
                                       <i className="fa fa-trash-o" />
                                    </a>
                                 </h3>
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Name <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Relationship <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Date of birth <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Phone <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-body">
                                 <h3 className="card-title">
                                    Education Informations{" "}
                                    <a href="" className="delete-icon">
                                       <i className="fa fa-trash-o" />
                                    </a>
                                 </h3>
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Name <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Relationship <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Date of birth <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group">
                                          <label>
                                             Phone <span className="text-danger">*</span>
                                          </label>
                                          <input className="form-control" type="text" />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="add-more">
                                    <a href="">
                                       <i className="fa fa-plus-circle" /> Add More
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         {/* /Family Info Modal */}
         {/* Emergency Contact Modal */}
         <div id="emergency_contact_modal" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Personal Information</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="card">
                           <div className="card-body">
                              <h3 className="card-title">Primary Contact</h3>
                              <div className="row">
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>
                                          Name <span className="text-danger">*</span>
                                       </label>
                                       <input type="text" className="form-control" />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>
                                          Relationship <span className="text-danger">*</span>
                                       </label>
                                       <input className="form-control" type="text" />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>
                                          Phone <span className="text-danger">*</span>
                                       </label>
                                       <input className="form-control" type="text" />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Phone 2</label>
                                       <input className="form-control" type="text" />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="card">
                           <div className="card-body">
                              <h3 className="card-title">Primary Contact</h3>
                              <div className="row">
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>
                                          Name <span className="text-danger">*</span>
                                       </label>
                                       <input type="text" className="form-control" />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>
                                          Relationship <span className="text-danger">*</span>
                                       </label>
                                       <input className="form-control" type="text" />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>
                                          Phone <span className="text-danger">*</span>
                                       </label>
                                       <input className="form-control" type="text" />
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Phone 2</label>
                                       <input className="form-control" type="text" />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         {/* /Emergency Contact Modal */}
         {/* Education Modal */}
         <div id="education_info" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title"> Education Informations</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="form-scroll">
                           <div className="card">
                              <div className="card-body">
                                 <h3 className="card-title">
                                    Education Informations{" "}
                                    <a href="" className="delete-icon">
                                       <i className="fa fa-trash-o" />
                                    </a>
                                 </h3>
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="Oxford University"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Institution</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="Computer Science"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Subject</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <div>
                                             <input
                                                type="date"
                                                defaultValue="01/06/2002"
                                                className="form-control floating datetimepicker"
                                             />
                                          </div>
                                          <label className="focus-label">Starting Date</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <div>
                                             <input
                                                type="date"
                                                defaultValue="31/05/2006"
                                                className="form-control floating datetimepicker"
                                             />
                                          </div>
                                          <label className="focus-label">Complete Date</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="BE Computer Science"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Degree</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="Grade A"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Grade</label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-body">
                                 <h3 className="card-title">
                                    Education Informations{" "}
                                    <a href="" className="delete-icon">
                                       <i className="fa fa-trash-o" />
                                    </a>
                                 </h3>
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="Oxford University"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Institution</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="Computer Science"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Subject</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <div>
                                             <input
                                                type="date"
                                                defaultValue="01/06/2002"
                                                className="form-control floating datetimepicker"
                                             />
                                          </div>
                                          <label className="focus-label">Starting Date</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <div>
                                             <input
                                                type="date"
                                                defaultValue="31/05/2006"
                                                className="form-control floating datetimepicker"
                                             />
                                          </div>
                                          <label className="focus-label">Complete Date</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="BE Computer Science"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Degree</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus focused">
                                          <input
                                             type="text"
                                             defaultValue="Grade A"
                                             className="form-control floating"
                                          />
                                          <label className="focus-label">Grade</label>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="add-more">
                                    <a href="">
                                       <i className="fa fa-plus-circle" /> Add More
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         {/* /Education Modal */}
         {/* Experience Modal */}
         <div id="experience_info" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Experience Informations</h5>
                     <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="form-scroll">
                           <div className="card">
                              <div className="card-body">
                                 <h3 className="card-title">
                                    Experience Informations{" "}
                                    <a href="" className="delete-icon">
                                       <i className="fa fa-trash-o" />
                                    </a>
                                 </h3>
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <input
                                             type="text"
                                             className="form-control floating"
                                             defaultValue="Digital Devlopment Inc"
                                          />
                                          <label className="focus-label">Company Name</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <input
                                             type="text"
                                             className="form-control floating"
                                             defaultValue="United States"
                                          />
                                          <label className="focus-label">Location</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <input
                                             type="text"
                                             className="form-control floating"
                                             defaultValue="Web Developer"
                                          />
                                          <label className="focus-label">Job Position</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <div>
                                             <input
                                                type="date"
                                                className="form-control floating datetimepicker"
                                                defaultValue="01/07/2007"
                                             />
                                          </div>
                                          <label className="focus-label">Period From</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <div>
                                             <input
                                                type="date"
                                                className="form-control floating datetimepicker"
                                                defaultValue="08/06/2018"
                                             />
                                          </div>
                                          <label className="focus-label">Period To</label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-body">
                                 <h3 className="card-title">
                                    Experience Informations{" "}
                                    <a href="" className="delete-icon">
                                       <i className="fa fa-trash-o" />
                                    </a>
                                 </h3>
                                 <div className="row">
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <input
                                             type="text"
                                             className="form-control floating"
                                             defaultValue="Digital Devlopment Inc"
                                          />
                                          <label className="focus-label">Company Name</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <input
                                             type="text"
                                             className="form-control floating"
                                             defaultValue="United States"
                                          />
                                          <label className="focus-label">Location</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <input
                                             type="text"
                                             className="form-control floating"
                                             defaultValue="Web Developer"
                                          />
                                          <label className="focus-label">Job Position</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <div>
                                             <input
                                                type="date"
                                                className="form-control floating datetimepicker"
                                                defaultValue="01/07/2007"
                                             />
                                          </div>
                                          <label className="focus-label">Period From</label>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="form-group form-focus">
                                          <div>
                                             <input
                                                type="date"
                                                className="form-control floating datetimepicker"
                                                defaultValue="08/06/2018"
                                             />
                                          </div>
                                          <label className="focus-label">Period To</label>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="add-more">
                                    <a href="">
                                       <i className="fa fa-plus-circle" /> Add More
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="submit-section">
                           <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         {/* /Experience Modal */}
         {/* Add User Modal */}
         <Adduser
            show={modalShow}
            onHide={() => setModalShow(false)}
            editWorker={worker}
            render={render}
         />
         {/* /Add User Modal */}

         {/* Create Project Modal */}
         <Addproject
            show={modalProject}
            onHide={() => setModalProject(false)}
            projectData={projectData}
            render={load}
         />
         {/* /Create Project Modal */}
         {/* Delete Project Modal */}
         <DeleteProject
            show={modalDelete}
            onHide={() => setModalDelete(false)}
            project={projectData}
         />
         {/* /Delete Project Modal */}
      </div>
   );
};
export default WorkerProfile;
