import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import AddAllowance from "../../../_components/modelbox/AddAllowance";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import { listSalary, removeSalary } from "../../../redux/feature/salarySclice";
import { formatMoney } from "../../../constant";
import Delete from "../../../_components/modelbox/DeleteAllowance";
import { toast } from "react-toastify";

const Allowance = () => {
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   // ----------------------------------- use --------------------------------------
   const [show, setShow] = useState(false);
   const [load, setLoad] = useState(0);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   // ----------------------------------- list -------------------------------------
   const [isSalary, setIsSalary] = useState({});
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const [hide, setHide] = useState(false);
   const [item, setItem] = useState({});

   useEffect(() => {
      dispatch(listSalary({ setLoading }));
   }, []);

   const { salarys } = useSelector((state) => state.salary);

   const handleRemove = () => {
      dispatch(removeSalary({ id: item?._id, toast, onHide: setHide, setLoading }));
   };

   const columns = [
      {
         title: "Nhóm thụ hưởng",
         dataIndex: "beneficiary",
         sorter: (a, b) => a.beneficiary.length - b.beneficiary.length,
      },
      {
         title: "Đi lại",
         dataIndex: "go",
         sorter: (a, b) => a.go.length - b.go.length,
         render: (text, record) => formatMoney(text),
      },

      {
         title: "Nhà ở",
         dataIndex: "home",
         sorter: (a, b) => a.home.length - b.home.length,
         render: (text, record) => formatMoney(text),
      },

      {
         title: "Nặng nhọc/ độc hại",
         dataIndex: "toxic",
         sorter: (a, b) => a.toxic.length - b.toxic.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Ăn uống",
         dataIndex: "eat",
         sorter: (a, b) => a.eat.length - b.eat.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Chuyên cần",
         dataIndex: "diligence",
         sorter: (a, b) => a.diligence.length - b.diligence.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Lương",
         dataIndex: "salary",
         sorter: (a, b) => a.salary.length - b.salary.length,
         render: (text, record) => formatMoney(text),
      },
      {
         title: "Dự án",
         dataIndex: "projectEX.name",
         render: (text, record) => record?.projectEX?.name,
         sorter: (a, b) => a.projectEX.name.length - b.projectEX.name.length,
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
                        handleShow();
                        setIsSalary(record);
                        setLoad((prev) => prev + 1);
                     }}
                  >
                     <i className="fa fa-pencil m-r-5" /> Chỉnh sửa
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setHide(true);
                        setItem(record);
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
            <title>Salary - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Lương và phụ cấp</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={handleShow}>
                        <i className="fa fa-plus" /> Thêm nhóm thụ hưởng
                     </a>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label">Tên</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                  <div className="form-group form-focus select-focus">
                     <select className="select floating">
                        <option value> -- Select -- </option>
                        <option value>Employee</option>
                        <option value={1}>Manager</option>
                     </select>
                     <label className="focus-label">Role</label>
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
                           total: salarys.length,
                           showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={salarys}
                        rowKey={(record) => record._id}
                        // onChange={this.handleTableChange}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Add Salary Modal */}
         <AddAllowance show={show} handleClose={handleClose} isSalary={isSalary} load={load} />
         {/* /Add Salary Modal */}
         {/* Delete Salary Modal */}
         <Delete
            handleRemove={handleRemove}
            name={item?.beneficiary}
            title={"Nhóm thụ hưởng"}
            show={hide}
            onHide={() => setHide(false)}
         />
         {/* /Delete Salary Modal */}
      </div>
   );
};

export default Allowance;
