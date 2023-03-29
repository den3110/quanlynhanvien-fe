import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { avartarFAKE, EmployeeDepartmentOpition } from "../../../constant/index";
import Addemployee from "../../../_components/modelbox/Addemployee";
import Editemployee from "../../../_components/modelbox/Editemployee";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Header from "../../../initialpage/Sidebar/header";
import { useDispatch } from "react-redux";
import employeesSclice, {
   listEmployees,
   listEmployeesByUserId,
} from "../../../redux/feature/employeesSclice";
import { useSelector } from "react-redux";
import { EmployeeDepartmentType, UserRoleType } from "../../../constant";
import { useLoading } from "../../../hook/useLoading";
import DeleteUser from "../../../_components/modelbox/DeleteUser";
import { employeesRemainingSelector } from "../../../redux/selectors/employeesSelector";

const AllEmployees = () => {
   const [menu, setMenu] = useState(false);
   const [modalShow, setModalShow] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);
   const [employee, setEmployee] = useState({});
   const [render, setRender] = useState(0);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
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

   const employees = useSelector(employeesRemainingSelector);
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      fetchEmployees();
   }, [user]);

   function fetchEmployees() {
      if (user.role === UserRoleType.ADMIN || user.role === UserRoleType.EMPLOYEE) {
         dispatch(listEmployees({ setLoading }));
      }

      if (user?.role === UserRoleType.CLIENT || user?.role === UserRoleType.WORKER) {
         dispatch(listEmployeesByUserId({ id: user._id, setLoading }));
      }
   }
   const [text, setText] = useState("");

   const [department, setDepartment] = useState("all");

   useEffect(() => {
      dispatch(employeesSclice.actions.searchNameEmployees(text));
      dispatch(employeesSclice.actions.filterDepartment(department));
   }, [text, department]);

   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={() => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Employee - HRMS Admin Template</title>
               <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
               {/* Page Header */}
               <div className="page-header">
                  <div className="row align-items-center">
                     <div className="col">
                        <h3 className="page-title"> Nhân viên</h3>
                     </div>
                     <div className="col-auto float-end ml-auto">
                        {(user?.role === UserRoleType.ADMIN ||
                           user?.role === UserRoleType.EMPLOYEE) && (
                           <a href="#" className="btn add-btn" onClick={() => setModalShow(true)}>
                              <i className="fa fa-plus" /> Thêm nhân viên
                           </a>
                        )}
                        <div className="view-icons">
                           <Link
                              to="/app/employee/allemployees"
                              className="grid-view btn btn-link active"
                           >
                              <i className="fa fa-th" />
                           </Link>
                           <Link
                              to="/app/employee/employees-list"
                              className="list-view btn btn-link"
                           >
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
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                        />
                        <label className="focus-label">Tên nhân viên</label>
                     </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                     <div className="form-group form-focus select-focus">
                        <select
                           className="form-control floating"
                           value={department}
                           onChange={(e) => setDepartment(e.target.value)}
                        >
                           <option value={"all"}>Tất cả</option>
                           {EmployeeDepartmentOpition?.map((item) => (
                              <option key={item?.label} value={item?.value}>
                                 {item?.label}
                              </option>
                           ))}
                        </select>
                        <label className="focus-label">Vị trí</label>
                     </div>
                  </div>
               </div>
               {/* Search Filter */}
               <div className="row staff-grid-row">
                  {employees.map((item) => (
                     <div key={item?._id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                           <div className="profile-img">
                              <Link
                                 to={`/app/profile/employee-profile/${item._id}`}
                                 className="avatar"
                              >
                                 <img src={item?.avartar || avartarFAKE} alt={item?.name} />
                              </Link>
                           </div>
                           <div className="dropdown profile-action">
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
                                       setEmployee(item);
                                       setModalShow(true);
                                    }}
                                 >
                                    <i className="fa fa-pencil m-r-5" /> Sửa
                                 </a>
                                 <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                       setEmployee(item);
                                       setModalDelete(true);
                                    }}
                                 >
                                    <i className="fa fa-trash-o m-r-5" /> Xóa
                                 </a>
                              </div>
                           </div>
                           <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                              <Link to={`/app/profile/employee-profile/${item._id}`}>
                                 {item?.name}
                              </Link>
                           </h4>
                           <div className="small text-muted">
                              {item?.department === EmployeeDepartmentType.BUSSINESS
                                 ? "Kinh doanh"
                                 : item.department === EmployeeDepartmentType.ACCOUNTANT
                                 ? "Kế toán"
                                 : item.department === EmployeeDepartmentType.RECRUIT
                                 ? "Tuyen Dung"
                                 : item.department === EmployeeDepartmentType.MARKETING
                                 ? "Maketing"
                                 : ""}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            {/* /Page Content */}
            {/* Add Employee Modal */}
            <Addemployee
               show={modalShow}
               onHide={() => setModalShow(false)}
               employee={employee}
               render={render}
            />
            {/* /Add Employee Modal */}
            {/* Edit Employee Modal */}
            <Editemployee />
            {/* /Edit Employee Modal */}
            {/* Delete Employee Modal */}
            <DeleteUser
               show={modalDelete}
               onHide={() => setModalDelete(false)}
               userRemove={employee}
            />
            {/* /Delete Employee Modal */}
         </div>
      </div>
   );
};

export default AllEmployees;
