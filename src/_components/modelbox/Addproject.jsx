import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { prioritys, statusProject } from "../../constant/index";
import { toast } from "react-toastify";
// import { Select } from "antd";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
import { createProject, updateProject } from "../../redux/feature/projectSclice";
import { useLoading } from "../../hook/useLoading";
import moment from "moment";
import { useMemo } from "react";

const Addproject = ({ show, onHide, projectData, render, setLoad }) => {
   const [project, setProject] = useState({
      name: "",
      priority: "",
      price: "",
      start: "",
      end: "",
      status: "",
      content: "",
      // team: [],
      // client: [],
      leader: "",
   });

   const animatedComponents = makeAnimated();

   const [teams, setTeams] = useState([]);
   const [client, setClient] = useState([]);
   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { employees } = useSelector((state) => state.employees);
   const { clients } = useSelector((state) => state.client);
   const [optionTeam, setOptionTeam] = useState([]);
   const [optionEmployees, setOptionEmployees] = useState([]);
   const [optionClient, setOptionClient] = useState([]);
   //edit
   const [isEdit, setIsEdit] = useState("");

   const empty = () => {
      setProject({
         name: "",
         priority: "",
         price: "",
         start: "",
         end: "",
         status: "",
         content: "",
      });

      setIsEdit("");
      setClient([]);
      setTeams([]);
   };

   const handleClose = () => {
      empty();
      onHide();
   };

   // select

   const options = [];
   const arrayOpitionClient = [];
   // filter value muti select
   let valueSelectClient = [];
   let valueSelectTeam = [];

   useMemo(() => {
      employees?.map((item) => options.push({ value: item._id, label: item.name }));
      clients?.map((item) => arrayOpitionClient.push({ value: item._id, label: item.name }));

      projectData?.clients?.map((item) =>
         arrayOpitionClient.filter((i) => {
            if (i.value === item._id) {
               valueSelectClient.push(i);
            }
         })
      );
      projectData?.employees?.map((item) =>
         options.filter((i) => {
            if (i.value === item._id) {
               valueSelectTeam.push(i);
            }
         })
      );
   }, [employees, clients, render]);

   useEffect(() => {
      if (projectData) {
         setClient(valueSelectClient);
         setTeams(valueSelectTeam);
      }
   }, [render]);

   // fetch muti select
   useEffect(() => {
      setProject({ ...projectData, leader: projectData?.leader?._id });
      setIsEdit(projectData._id);
   }, [render]);

   // load team && employees
   useEffect(() => {
      setOptionEmployees(employees);
      setOptionTeam(options);
      setOptionClient(arrayOpitionClient);
   }, [employees, render]);

   const changeLeader = (e) => {
      setProject({ ...project, leader: e.target.value });
      setOptionTeam(options.filter((item) => item.value !== e.target.value));
   };

   const changeTeam = (e) => {
      setTeams(e);
   };

   async function handleSave() {
      const isteam = teams.map((i) => i.value);
      const isclient = client.map((i) => i.value);

      if (!user._id) {
         toast.warn(`Làm ơn đăng nhập vào hệ thống`);
         return;
      }

      if (validatetion()) {
         dispatch(
            createProject({
               payload: {
                  ...project,
                  price: +project.price,
                  start: new Date(project.start).getTime(),
                  end: new Date(project.end).getTime(),
                  creator: user._id,
                  team: isteam,
                  client: isclient,
               },
               toast,
               onHide,
               setLoading,
               empty,
            })
         );
      }
   }

   const handleUpdate = () => {
      if (!user._id) {
         toast.warn(`Làm ơn đăng nhập vào hệ thống`);
         return;
      }

      if (!projectData._id) {
         toast.warn(`Dự án không tồn tại`);
         return;
      }

      const isteam = teams.map((i) => i.value);
      const isclient = client.map((i) => i.value);

      let payload = {
         ...project,
         price: +project.price,
         start: new Date(project.start).getTime(),
         end: new Date(project.end).getTime(),
         creator: user._id,
         team: isteam,
         client: isclient,
      };

      // no update payslip
      delete payload.payslip;

      if (validatetion()) {
         dispatch(
            updateProject({
               id: projectData._id,
               payload,
               toast,
               onHide,
               setLoading,
               project,
               setLoad,
            })
         );
      }
   };

   const validatetion = () => {
      if (!project.name) {
         toast.warn("Vui lòng nhập tên dự án");
         return false;
      }

      if (!project.start || !project.end) {
         toast.warn("Vui lòng chọn ngày bắt đầu và kết thúc");
         return false;
      }

      if (new Date(project.end).getTime() <= new Date(project.start).getTime()) {
         toast.warn("Ngày kết thúc phải lớn hơn ngày bắt đầu");
         return false;
      }

      if (!project.status) {
         toast.warn("Vui lòng chọn trạng thái của dự án");
         return false;
      }

      if (!project.leader) {
         toast.warn("Vui lòng chọn trưởng nhóm");
         return false;
      }

      if (teams.length === 0) {
         toast.warn("Vui lòng chọn nhân viên");
         return false;
      }

      if (client.length === 0) {
         toast.warn("Vui lòng chọn khách hàng");
         return false;
      }

      return true;
   };

   return (
      <>
         {/* Add Employee Modal */}
         <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            className="modal custom-modal fade"
            role="dialog"
         >
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">{isEdit ? "Chỉnh sửa dự án" : "Thêm dự án"}</h5>
                  <button type="button" className="close-x">
                     <span aria-hidden="true" onClick={handleClose}>
                        ×
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <div className="row">
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Tên dự án
                              <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              defaultValue={project.name}
                              onChange={(e) => setProject({ ...project, name: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Độ ưu tiên <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              value={project.priority}
                              onChange={(e) => setProject({ ...project, priority: e.target.value })}
                           >
                              <option>Chọn độ ưu tiên</option>
                              {prioritys?.map((item) => (
                                 <option key={item.value} value={item.value}>
                                    {item.label}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Ngày bắt đầu <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="datetime-local"
                              value={moment(project.start).format("YYYY-MM-DD HH:mm")}
                              onChange={(e) => setProject({ ...project, start: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Ngày kết thúc <span className="text-danger">*</span>
                           </label>{" "}
                           <br />
                           <input
                              className="form-control"
                              type="datetime-local"
                              value={moment(project?.end).format("YYYY-MM-DD HH:mm")}
                              onChange={(e) => setProject({ ...project, end: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              {" "}
                              Trạng thái <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              value={project?.status}
                              onChange={(e) => setProject({ ...project, status: e.target.value })}
                           >
                              <option>Chọn trạng thái</option>
                              {statusProject.map((item) => (
                                 <option key={item.value} value={item.value}>
                                    {item.label}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Cost <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="number"
                              defaultValue={project?.price}
                              onChange={(e) => setProject({ ...project, price: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="col-md-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Leader<span className="text-danger">*</span>
                           </label>{" "}
                           <br />
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              value={project?.leader}
                              onChange={changeLeader}
                           >
                              <option>Chọn leader</option>
                              {optionEmployees.map((item) => (
                                 <option key={item._id} value={item._id}>
                                    {item.name}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>

                     <div className="col-sm-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Team <span className="text-danger">*</span>
                           </label>

                           <Select
                              isMulti
                              value={teams}
                              onChange={changeTeam}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              options={optionTeam}
                           />
                        </div>
                     </div>

                     <div className="col-sm-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Khách hàng <span className="text-danger">*</span>
                           </label>

                           <Select
                              isMulti
                              value={client}
                              onChange={(e) => setClient(e)}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              options={optionClient}
                           />
                        </div>
                     </div>

                     <div className="col-sm-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Nội dung <span className="text-danger">*</span>
                           </label>
                           <textarea
                              defaultValue={project.content}
                              onChange={(e) => setProject({ ...project, content: e.target.value })}
                              rows={4}
                              cols={160}
                              className="form-control summernote"
                              placeholder="Enter your message here"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="submit-section">
                     {!isEdit ? (
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           Lưu
                        </button>
                     ) : (
                        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                           Cập nhật
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </Modal>
         {/* /Add Employee Modal */}
      </>
   );
};

export default Addproject;
