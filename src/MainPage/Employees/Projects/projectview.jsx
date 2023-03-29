import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
   avartarFAKE,
   EmployeeDepartmentType,
   ProjectPriorityEnum,
   ProjectStatusEnum,
   TaskStatusType,
   UserRoleType,
} from "../../../constant";
import { useLoading } from "../../../hook/useLoading";
import { listPayslipByUser } from "../../../redux/feature/payslipSclice";
import { projectDetail } from "../../../redux/feature/projectSclice";
import { listWorkerProjectByProject } from "../../../redux/feature/workerProjectSclice";
import AssignUser from "../../../_components/modelbox/assignUser";
import Editproject from "../../../_components/modelbox/Editproject";
import LinkProject from "../../../_components/modelbox/linkProject";
import { Collapse } from "antd";
import { listTaskByProject } from "../../../redux/feature/taskSclice";
import ActionTask from "../../../_components/modelbox/actionTask/ActionTask";
import CreateTask from "../../../_components/modelbox/assignUserTask";
import Addproject from "../../../_components/modelbox/Addproject";
import PerfromTab from "../../../_components/tabs/perform";
import FinishTab from "../../../_components/tabs/finish";
import Part from "../../../_components/part/part";
const { Panel } = Collapse;

const ProjectView = () => {
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });
   const [modalShow, setModalShow] = useState(false);
   const [addWorker, setAddWorker] = useState(false);
   const [modalAssign, setModalAssign] = useState(false);
   const [render, setRender] = useState(0);
   const [projectData, setProjectData] = useState({});
   const [modalProject, setModalProject] = useState(false);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const { id } = useParams();
   const { user } = useSelector((state) => state.auth);
   const [load, setLoad] = useState(0);

   useEffect(() => {
      //project detail {}
      // dispatch(projectSclice.actions.projectDetail(id));
      dispatch(projectDetail({ id, setLoading }));

      if (user._id) {
         listByUser();
      }
   }, [id, load]);

   useEffect(() => {
      // worker-project by id project
      dispatch(listWorkerProjectByProject({ id, setLoading }));

      // task by id project
      dispatch(listTaskByProject({ id, setLoading }));
   }, [id]);

   function listByUser() {
      dispatch(listPayslipByUser({ id: user?._id }));
   }

   const { project } = useSelector((state) => state.project);

   const { listWPByProject } = useSelector((state) => state.workerProject);
   const { tasks } = useSelector((state) => state.task);

   const Action = ({ item }) => <ActionTask item={item} />;

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Dự án</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Dự Án</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     {user.role === UserRoleType.ADMIN && (
                        <Link
                           to={`/app/projects/attendance/${id}`}
                           className="btn btn-primary me-3 boreder border-primary background-blue text-light"
                        >
                           Chấm công
                        </Link>
                     )}
                     {user.role === UserRoleType.EMPLOYEE ||
                        (user.role === UserRoleType.WORKER && (
                           <Link
                              to={`/app/projects/attendance-employee/${id}`}
                              className="btn btn-primary me-3 boreder border-primary background-blue text-light"
                           >
                              Chấm công
                           </Link>
                        ))}

                     <a
                        href="#"
                        className="btn btn-warning me-3"
                        onClick={() => {
                           setRender((prev) => prev + 1);
                           setProjectData(project);
                           setModalProject(true);
                        }}
                     >
                        Chỉnh sửa
                     </a>

                     <Link
                        to={`/app/projects/task-board/${id}`}
                        className="btn btn-white float-end m-r-10"
                        data-bs-toggle="tooltip"
                        title="Task Board"
                     >
                        <i className="fa fa-bars" />
                     </Link>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            <div className="row">
               <div className="col-lg-8 col-xl-9">
                  <div className="card">
                     <div className="card-body">
                        <div className="project-title">
                           <h5 className="card-title">{project?.name}</h5>
                           <small className="block text-ellipsis m-b-15">
                              <span className="text-xs">
                                 {
                                    tasks?.filter((item) => item?.status === TaskStatusType.START)
                                       .length
                                 }
                              </span>{" "}
                              <span className="text-muted">công việc </span>
                              <span className="text-xs">
                                 {
                                    tasks?.filter(
                                       (item) => item?.status === TaskStatusType.COMPLETED
                                    ).length
                                 }
                              </span>{" "}
                              <span className="text-muted">hoàn thành</span>
                           </small>
                        </div>
                        <p>{project?.content}</p>
                     </div>
                  </div>
                  {/* part project */}
                  <Part />
                  {/* part project */}
                  {/* assign work */}
                  <div className="project-task">
                     <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                        <li className="nav-item">
                           <a
                              className="nav-link active"
                              href="#all_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="true"
                           >
                              Công việc
                           </a>
                        </li>
                        <li className="nav-item">
                           <a
                              className="nav-link"
                              href="#pending_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                           >
                              Đang thực hiện
                           </a>
                        </li>
                        <li className="nav-item">
                           <a
                              className="nav-link"
                              href="#completed_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                           >
                              Hoàn thành
                           </a>
                        </li>
                        <li className="nav-item">
                           <a
                              className="nav-link"
                              href="#completed_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                           >
                              Báo cáo
                           </a>
                        </li>
                     </ul>
                     <div className="tab-content">
                        <div className="tab-pane show active" id="all_tasks">
                           <div className="task-wrapper">
                              <div className="task-list-container">
                                 <div className="task-list-body">
                                    <ul id="task-list">
                                       {/* <MainTask /> */}
                                       <li className="task">
                                          <Collapse
                                             style={{ fontWeight: "bold" }}
                                             defaultActiveKey={["1"]}
                                             expandIconPosition="start"
                                             collapsible="disabled"
                                          >
                                             {tasks?.map((item) => (
                                                <Panel
                                                   showArrow={false}
                                                   key={item?._id}
                                                   header={item?.name}
                                                   extra={Action({ item })}
                                                >
                                                   {/* <div>{item?.content}</div> */}
                                                </Panel>
                                             ))}
                                          </Collapse>
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="task-list-footer">
                                    <div className="new-task-wrapper">
                                       <textarea
                                          id="new-task"
                                          placeholder="Enter new task here. . ."
                                          defaultValue={""}
                                       />
                                       <span className="error-message hidden">
                                          You need to enter a task first
                                       </span>
                                       <span className="add-new-task-btn btn" id="add-task">
                                          Add Task
                                       </span>
                                       <span className="btn" id="close-task-panel">
                                          Close
                                       </span>
                                    </div>
                                 </div>

                                 <div
                                    className="assign-button bg-primary"
                                    onClick={() => setModalAssign(true)}
                                 >
                                    <span className="button-circle">
                                       <span className="plus-assign">Thêm công việc</span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* tab */}
                        <PerfromTab />
                        <FinishTab />
                     </div>
                  </div>
                  <br /> <br />
                  {/* table assign task */}
                  {/* <AssignTask /> */}
                  {/* table assign task */}
               </div>
               <div className="col-lg-4 col-xl-3">
                  <div className="card">
                     <div className="card-body">
                        <h6 className="card-title m-b-15">Chi tiết dự án</h6>
                        <table className="table table-striped table-border">
                           <tbody>
                              <tr>
                                 <td>Cost:</td>
                                 <td className="text-end">${project?.price}</td>
                              </tr>
                              <tr>
                                 <td>Phiếu lương:</td>
                                 <td className="text-end">
                                    {project?.payslip?.length > 0 && (
                                       <a
                                          href={`/app/payroll/salary-view/${project?.payslip[0]?._id}`}
                                       >
                                          {project?.payslip[0]?.name}
                                       </a>
                                    )}
                                 </td>
                              </tr>
                              <tr>
                                 <td>Bắt đầu:</td>
                                 <td className="text-end">
                                    {moment(project?.start).format("DD/MM/YYYY")}
                                 </td>
                              </tr>
                              <tr>
                                 <td>Kết thúc:</td>
                                 <td className="text-end">
                                    {moment(project?.end).format("DD/MM/YYYY")}
                                 </td>
                              </tr>
                              <tr>
                                 <td>Ưu tiên:</td>
                                 <td className="text-end">
                                    <div className="btn-group">
                                       <a
                                          href="#"
                                          className={
                                             project?.priority === ProjectPriorityEnum.HIGH
                                                ? "badge badge-danger dropdown-toggle"
                                                : project?.priority === ProjectPriorityEnum.LOW
                                                ? "badge badge-primary dropdown-toggle"
                                                : project?.priority === ProjectPriorityEnum.MEDIUM
                                                ? "badge badge-warning dropdown-toggle"
                                                : ""
                                          }
                                          data-bs-toggle="dropdown"
                                       >
                                          {project?.priority === ProjectPriorityEnum.HIGH
                                             ? "Cao"
                                             : project?.priority === ProjectPriorityEnum.LOW
                                             ? "Thấp"
                                             : project?.priority === ProjectPriorityEnum.MEDIUM
                                             ? "Trung bình"
                                             : ""}
                                       </a>
                                       <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-danger" />{" "}
                                             Highest priority
                                          </a>
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-info" /> High
                                             priority
                                          </a>
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-primary" />{" "}
                                             Normal priority
                                          </a>
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-success" /> Low
                                             priority
                                          </a>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Người tạo:</td>
                                 <td className="text-end">
                                    <Link to="/app/profile/employee-profile">
                                       {project?.creator?.name || "Admin"}
                                    </Link>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Trạng thái:</td>
                                 <td className="text-end">
                                    {project?.status === ProjectStatusEnum.CANCEL
                                       ? "Hủy"
                                       : project?.status === ProjectStatusEnum.NEWPROJECTS
                                       ? "Bắt đầu"
                                       : project?.status === ProjectStatusEnum.RUNNING
                                       ? "Đang chạy"
                                       : project?.status === ProjectStatusEnum.ONHOLD
                                       ? "Tạm dừng"
                                       : project?.status === ProjectStatusEnum.FINISHED
                                       ? "Hoàn thành"
                                       : ""}
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                        <p className="m-b-5">
                           Tiến độ <span className="text-success float-end">40%</span>
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
                  {user?.role === UserRoleType.CLIENT && (
                     <div className="card project-user">
                        <div className="card-body content-center">
                           <button
                              type="button"
                              className="float-end btn btn-primary btn-sm"
                              onClick={() => setModalShow(true)}
                           >
                              {project?.payslip?.length > 0
                                 ? "Thay đổi phiếu lương"
                                 : "Liên kết phiếu lương"}
                           </button>
                        </div>
                        {project?.payslip?.length > 0 && (
                           <a
                              href={`/app/payroll/salary-view/${project?.payslip[0]?._id}`}
                              className="payslip-link"
                           >
                              {project?.payslip[0]?.name}
                           </a>
                        )}
                     </div>
                  )}
                  <div className="card project-user">
                     <div className="card-body">
                        <h6 className="card-title m-b-5 worker-name text-center text-primary">
                           <i className="la la-users" /> Khách hàng{" "}
                        </h6>
                        <ul className="list-box">
                           {project?.clients?.map((item) => (
                              <li key={item?._id}>
                                 <Link to="#">
                                    <div className="list-item">
                                       <div className="list-left">
                                          <span className="avatar">
                                             <img
                                                alt={item?.name}
                                                src={item?.avartar || avartarFAKE}
                                             />
                                          </span>
                                       </div>
                                       <div className="list-body">
                                          <span className="message-author">{item?.name}</span>
                                          <div className="clearfix" />
                                          <span className="message-content">{item?.company}</span>
                                       </div>
                                    </div>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                        <br />
                        {/* lead */}
                        <h6 className="card-title m-b-5 worker-name text-center text-primary">
                           <i className="la la-users" /> Leader{" "}
                        </h6>
                        <ul className="list-box">
                           {project?.userEX?.map(
                              (item) =>
                                 item?.role === UserRoleType.LEADER && (
                                    <li>
                                       <Link to="#">
                                          <div className="list-item">
                                             <div className="list-left">
                                                <span className="avatar">
                                                   <img
                                                      alt={project?.leaderEX?.name}
                                                      src={
                                                         project?.leaderEX?.avartar || avartarFAKE
                                                      }
                                                   />
                                                </span>
                                             </div>
                                             <div className="list-body">
                                                <span className="message-author">
                                                   {project?.leaderEX?.name}
                                                </span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                   {project?.leaderEX?.department}
                                                </span>
                                             </div>
                                          </div>
                                       </Link>
                                    </li>
                                 )
                           )}
                        </ul>
                        <br />

                        {/* nhan vien */}
                        <h6 className="card-title m-b-5 worker-name text-center text-primary">
                           <i className="la la-users" /> Nhân viên
                        </h6>
                        <ul className="list-box">
                           {project?.employees?.map((item) => (
                              <li key={item?._id}>
                                 <Link to="#">
                                    <div className="list-item">
                                       <div className="list-left">
                                          <span className="avatar">
                                             <img
                                                alt={item?.name}
                                                src={item?.avartar || avartarFAKE}
                                             />
                                          </span>
                                       </div>
                                       <div className="list-body">
                                          <span className="message-author">{item?.name}</span>
                                          <div className="clearfix" />
                                          <span className="message-content">
                                             {item?.department === EmployeeDepartmentType.BUSSINESS
                                                ? "Kinh doanh"
                                                : item?.department ===
                                                  EmployeeDepartmentType.MARKETING
                                                ? "Marketing"
                                                : item?.department ===
                                                  EmployeeDepartmentType.ACCOUNTANT
                                                ? "Kế toán"
                                                : item?.department ===
                                                  EmployeeDepartmentType.RECRUIT
                                                ? "Tuyển dụng"
                                                : ""}
                                          </span>
                                       </div>
                                    </div>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  <div className="card project-user">
                     <div className="card-body">
                        <h6 className="card-title m-b-20 worker-name">
                           Người lao động
                           <button
                              type="button"
                              className="float-end btn btn-primary btn-sm"
                              onClick={() => setAddWorker(true)}
                           >
                              Thêm
                           </button>
                        </h6>
                        <ul className="list-box">
                           {project?.workers?.map((item, index) => (
                              <li key={index}>
                                 <Link to="/app/profile/employee-profile">
                                    <div className="list-item">
                                       <div className="list-left">
                                          <span className="avatar">
                                             <img
                                                alt={item?.name}
                                                src={item?.avartar || avartarFAKE}
                                             />
                                          </span>
                                       </div>
                                       <div className="list-body">
                                          <span className="message-author">{item?.name}</span>
                                          <div className="clearfix" />
                                          <span className="message-content">{item?.field}</span>
                                       </div>
                                    </div>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Assign Leader Modal */}
         <LinkProject show={modalShow} onHide={() => setModalShow(false)} />
         {/* /Assign Leader Modal */}
         {/* Assign User Modal */}
         <AssignUser show={addWorker} onHide={() => setAddWorker(false)} />
         {/* /Assign User Modal */}
         <CreateTask show={modalAssign} onHide={() => setModalAssign(false)} />
         {/* Edit Project Modal */}
         <Editproject />
         <Addproject
            show={modalProject}
            onHide={() => setModalProject(false)}
            projectData={projectData}
            render={render}
            setLoad={setLoad}
         />
         {/* /Edit Project Modal */}
      </div>
   );
};

export default ProjectView;
