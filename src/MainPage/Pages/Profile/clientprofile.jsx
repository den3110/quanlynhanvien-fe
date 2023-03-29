/**
 * TermsCondition Page
 */
import moment from "moment";
import React, { Component, useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { avartarFAKE } from "../../../constant";
import {
   Avatar_01,
   Avatar_02,
   Avatar_11,
   Avatar_12,
   Avatar_13,
   Avatar_16,
} from "../../../Entryfile/imagepath";
import { useLoading } from "../../../hook/useLoading";
import { clientProfile } from "../../../redux/feature/clientSclice";
import { listProjectByAllLevel } from "../../../redux/feature/projectSclice";
import Addproject from "../../../_components/modelbox/Addproject";
import DeleteProject from "../../../_components/modelbox/DeleteProject";

const ClientProfile = () => {
   const [modalShow, setModalShow] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);
   const [render, setRender] = useState(0);
   const [projectData, setProjectData] = useState({});
   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const { id } = useParams();

   useEffect(() => {
      fetchClient();
   }, [id]);

   const fetchClient = () => {
      dispatch(clientProfile({ id, setLoading }));
   };

   const { client } = useSelector((state) => state.client);

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
            <title>Client Profile - HRMS admin Template</title>
            <meta name="description" content="Reactify Blank Page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row">
                  <div className="col-sm-12">
                     <h3 className="page-title">Khách hàng</h3>
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
                                 <a href="">
                                    <img src={client?.avartar || avartarFAKE} alt={client?.name} />
                                 </a>
                              </div>
                           </div>
                           <div className="profile-basic">
                              <div className="row">
                                 <div className="col-md-5">
                                    <div className="profile-info-left">
                                       <h3 className="user-name m-t-0">{client?.name}</h3>
                                       <h5 className="company-role m-t-0 mb-0">
                                          Công ty: {client?.company}
                                       </h5>
                                       {/* <small className="text-muted">CEO</small> */}
                                       <div className="staff-id">Lĩnh vực : {client?.field}</div>
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
                                             <a href="">{client?.mobile}</a>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Email:</div>
                                          <div className="text">
                                             <a href="">{client?.email}</a>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Ngày sinh:</div>
                                          <div className="text">
                                             {moment(client?.date).format("DD/MM/YYYY")}
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Địa chỉ:</div>
                                          <div className="text">
                                             {client?.address || "chưa có thông tin"}
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Giới tính:</div>
                                          <div className="text">
                                             {client?.gender || "chưa có thông tin"}
                                          </div>
                                       </li>
                                       <li>
                                          <div className="title">Căn cước công dân:</div>
                                          <div className="text">
                                             {client?.cccd || "chưa có thông tin"}
                                          </div>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
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
                        <li className="nav-item col-sm-3">
                           <a className="nav-link active" data-bs-toggle="tab" href="#myprojects">
                              Dự án
                           </a>
                        </li>
                        <li className="nav-item col-sm-3">
                           <a className="nav-link" data-bs-toggle="tab" href="#tasks">
                              Công việc
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
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
export default ClientProfile;
