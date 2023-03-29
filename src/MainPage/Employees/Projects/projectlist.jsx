import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar_02 } from "../../../Entryfile/imagepath";

// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
import Editproject from "../../../_components/modelbox/Editproject";
import "../../index.css";
import Addproject from "../../../_components/modelbox/Addproject";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import moment from "moment";
import { prioritys, ProjectPriorityEnum, ProjectStatusEnum, UserRoleType } from "../../../constant";
import DeleteProject from "../../../_components/modelbox/DeleteProject";
import projectSclice, { listProjectByAllLevel } from "../../../redux/feature/projectSclice";
import { projectsRemainingSelector } from "../../../redux/selectors/projectSelector";
import { useDispatch } from "react-redux";
import { listEmployees } from "../../../redux/feature/employeesSclice";
import { listClient } from "../../../redux/feature/clientSclice";
import { useLoading } from "../../../hook/useLoading";

const ProjectList = () => {
   const onImageUpload = (fileList) => {
      const reader = new FileReader();
      // reader.onloadend = () => {
      //   ReactSummernote.insertImage(reader.result);
      // }
      reader.readAsDataURL(fileList[0]);
   };

   const [modalShow, setModalShow] = useState(false);
   const [render, setRender] = useState(0);
   const [projectData, setProjectData] = useState({});
   const [modalDelete, setModalDelete] = useState(false);
   const [priority, setPriority] = useState("all");
   const [text, setText] = useState("");
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const { user } = useSelector((state) => state.auth);
   const projects = useSelector(projectsRemainingSelector);

   // ----------------------------- fetch data ----------------------
   useEffect(() => {
      if (user._id) {
         fetchProject();
      }

      // fetch employees
      dispatch(listEmployees({ setLoading }));
      dispatch(listClient({ setLoading }));
   }, [user._id, user.role]);

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

   const columns = [
      {
         title: "Dự án",
         dataIndex: "name",
         sorter: (a, b) => a.name.length - b.name.length,
         render: (text, record) => (
            <Link to={"/app/projects/projects-view/" + record?._id}>{text}</Link>
         ),
      },

      {
         title: "Cost",
         dataIndex: "price",
         sorter: (a, b) => a.price - b.price,
      },

      {
         title: "Bắt đầu",
         dataIndex: "start",
         sorter: (a, b) => a.start - b.start,
         render: (date) => moment(date).format("DD/MM/YYYY"),
      },

      {
         title: "Kết thúc",
         dataIndex: "end",
         sorter: (a, b) => a.end - b.end,
         render: (date) => moment(date).format("DD/MM/YYYY"),
      },

      {
         title: "Độ ưu tiên",
         render: (array, record) => (
            <div className="dropdown action-label">
               <a href="#" className="text-dark" aria-expanded="false">
                  {record.priority === ProjectPriorityEnum.HIGH ? (
                     <>
                        {" "}
                        <i className="fa fa-dot-circle-o text-danger" /> Cao
                     </>
                  ) : record.priority === ProjectPriorityEnum.MEDIUM ? (
                     <>
                        {" "}
                        <i className="fa fa-dot-circle-o text-warning" /> Trung bình
                     </>
                  ) : record.priority === ProjectPriorityEnum.LOW ? (
                     <>
                        {" "}
                        <i className="fa fa-dot-circle-o text-success" /> Thấp
                     </>
                  ) : (
                     ""
                  )}
               </a>
            </div>
         ),
      },

      {
         title: "Trạng thái",
         render: (array, record) => (
            <div className="dropdown action-label">
               <a href="#" className="text-dark" aria-expanded="false">
                  {record.status === ProjectStatusEnum.NEWPROJECTS ? (
                     <>
                        {" "}
                        <i className="fa fa-dot-circle-o text-primary" /> Bắt đầu
                     </>
                  ) : record.status === ProjectStatusEnum.RUNNING ? (
                     <>
                        {" "}
                        <i className="fa fa-dot-circle-o text-danger" /> Đang chạy
                     </>
                  ) : record.status === ProjectStatusEnum.FINISHED ? (
                     <>
                        {" "}
                        <i className="fa fa-dot-circle-o text-success" /> Hoàn thành
                     </>
                  ) : (
                     ""
                  )}
               </a>
            </div>
         ),
      },

      {
         title: "Action",
         render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
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
                        setProjectData(record);
                        setModalShow(true);
                     }}
                  >
                     <i className="fa fa-pencil m-r-5" /> Sửa
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setProjectData(record);
                        setModalDelete(true);
                     }}
                  >
                     <i className="fa fa-trash-o m-r-5" /> Xóa
                  </a>
               </div>
            </div>
         ),
      },
   ];

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
            {/* /Search Filter */}
            <div className="row">
               <div className="col-md-12">
                  <div className="table-responsive">
                     <Table
                        className="table-striped"
                        pagination={{
                           total: projects?.length,
                           showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={projects}
                        rowKey={(record) => record._id}
                        // onChange={console.log("change")}
                     />
                  </div>
               </div>
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

export default ProjectList;
