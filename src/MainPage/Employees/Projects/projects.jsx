import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Editproject from "../../../_components/modelbox/Editproject";
// import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css"; // import styles

import "../../index.css";

import Addproject from "../../../_components/modelbox/Addproject";
import { useDispatch } from "react-redux";
import projectSclice, { listProjectByAllLevel } from "../../../redux/feature/projectSclice";
import { useSelector } from "react-redux";
import moment from "moment";
import { useLoading } from "../../../hook/useLoading";
import { prioritys, UserRoleType } from "../../../constant";
import DeleteProject from "../../../_components/modelbox/DeleteProject";
import { listEmployees } from "../../../redux/feature/employeesSclice";
import { listClient } from "../../../redux/feature/clientSclice";

const Projects = () => {
   const [modalShow, setModalShow] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);
   const [render, setRender] = useState(0);
   const [projectData, setProjectData] = useState({});
   const [priority, setPriority] = useState("all");
   const [text, setText] = useState("");
   const [load, setLoad] = useState(0);

   const { setLoading } = useLoading();
   const dispatch = useDispatch();

   const { projects } = useSelector((state) => state.project);

   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      if (user._id) {
         fetchProject();
      }

      // fetch employees
      dispatch(listEmployees({ setLoading }));
      dispatch(listClient({ setLoading }));
   }, [user._id, user.role, load]);

   const fetchProject = () => {
      if (user.role === UserRoleType.ADMIN) {
         dispatch(listProjectByAllLevel({ setLoading }));
      }

      if (user.role !== UserRoleType.ADMIN) {
         dispatch(listProjectByAllLevel({ query: { userId: user._id }, setLoading }));
      }
   };

   // filter search
   useEffect(() => {
      dispatch(projectSclice.actions.searchNameProject(text));
      dispatch(projectSclice.actions.filterPriority(priority));
   }, [priority, text]);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Projects - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>

         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Dự án</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={() => setModalShow(true)}>
                        <i className="fa fa-plus" /> Thêm dự án
                     </a>
                     {/* list project */}
                     <div className="view-icons">
                        <Link
                           to="/app/projects/project_dashboard"
                           className="grid-view btn btn-link active"
                        >
                           <i className="fa fa-th" />
                        </Link>
                        <Link to="/app/projects/projects-list" className="list-view btn btn-link">
                           <i className="fa fa-bars" />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input
                        type="text"
                        className="form-control floating"
                        onChange={(e) => setText(e.target.value)}
                     />
                     <label className="focus-label">Tên dự án</label>
                  </div>
               </div>

               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                     <select
                        value={priority}
                        className="form-control"
                        onChange={(e) => setPriority(e.target.value)}
                     >
                        <option value={"all"}>Tất cả</option>
                        {prioritys.map((item) => (
                           <option key={item.value} value={item.value}>
                              {item.label}
                           </option>
                        ))}
                     </select>
                     <label className="focus-label">Độ ưu tiên</label>
                  </div>
               </div>
            </div>
            {/* Search Filter */}
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
                                          ? "+" + (item?.workers?.length - item?.attendanceToDay)
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
                                 Leader :<span className="round-span background-info ms-2">1</span>
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
         {/* /Page Content */}
         {/* Create Project Modal */}
         <Addproject
            show={modalShow}
            onHide={() => setModalShow(false)}
            projectData={projectData}
            render={render}
            setLoad={setLoad}
         />
         {/* /Create Project Modal */}
         {/* Edit Project Modal */}
         <Editproject />
         {/* /Edit Project Modal */}
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

export default Projects;
