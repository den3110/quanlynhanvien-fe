import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar_07 } from "../../Entryfile/imagepath";
import Editclient from "../../_components/modelbox/Editclient";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { useSelector } from "react-redux";
import AddClient from "../../_components/modelbox/AddClient";
import DeleteUser from "../../_components/modelbox/DeleteUser";
import { clientRemainingSelector } from "../../redux/selectors/clientSelector";
import clientSclice from "../../redux/feature/clientSclice";
import { useDispatch } from "react-redux";

const Clients = () => {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [render, setRender] = useState(0);
   const [EditClient, setEditClient] = useState({});
   const [modalDelete, setModalDelete] = useState(false);
   const [text, setText] = useState("");
   const [company, setCompany] = useState("all");
   const [optionCompany, setOptionCompany] = useState([]);
   const dispatch = useDispatch();

   const clients = useSelector(clientRemainingSelector);
   const state = useSelector((state) => state.client);

   useEffect(() => {
      let opition = state.clients?.map((item) => {
         return { value: item._id, label: item.company };
      });
      setOptionCompany(opition);
   }, [state]);

   useEffect(() => {
      dispatch(clientSclice.actions.searchNameClient(text));
      dispatch(clientSclice.actions.filterCompany(company));
   }, [text, company]);

   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to={`/app/profile/client-profile/${record?._id}`} className="avatar">
                  <img alt="" src={record.image} />
               </Link>
               <Link to={`/app/profile/client-profile/${record?._id}`}>{text}</Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Công ty",
         dataIndex: "company",
         sorter: (a, b) => a.company.length - b.company.length,
      },

      {
         title: "Lĩnh vực",
         dataIndex: "field",
         sorter: (a, b) => a.field.length - b.field.length,
      },
      {
         title: "Email",
         dataIndex: "email",
         sorter: (a, b) => a.email.length - b.email.length,
      },

      {
         title: "Điện thoại",
         dataIndex: "mobile",
         sorter: (a, b) => a.mobile - b.mobile,
      },
      {
         title: "Mã số thuế",
         dataIndex: "tax",
         sorter: (a, b) => a.tax - b.tax,
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
                        setEditClient(record);
                        handleShow(true);
                     }}
                  >
                     <i className="fa fa-pencil m-r-5" /> Sửa
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setEditClient(record);
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
            <title>Clients - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Khách hàng</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={handleShow}>
                        <i className="fa fa-plus" /> Thêm khách hàng
                     </a>
                     <div className="view-icons">
                        <Link to="/app/employees/clients" className="grid-view btn btn-link">
                           <i className="fa fa-th" />
                        </Link>
                        <Link
                           to="/app/employees/clients-list"
                           className="list-view btn btn-link active"
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
                     <label className="focus-label">Tên khách hàng</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                     <select
                        className="form-control floating"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                     >
                        <option value={"all"}>Tất cả</option>
                        {optionCompany?.map((item) => (
                           <option key={item.value} value={item?.value}>
                              {item?.label}
                           </option>
                        ))}
                     </select>
                     <label className="focus-label"> Công ty</label>
                  </div>
               </div>
            </div>
            {/* Search Filter */}
            <div className="row">
               <div className="col-md-12">
                  <div className="table-responsive">
                     <Table
                        className="table-striped"
                        pagination={{
                           total: clients.length,
                           showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={clients}
                        rowKey={(record) => record._id}
                        // onChange={console.log("change")}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Add Client Modal */}
         <AddClient show={show} handleClose={handleClose} editClient={EditClient} render={render} />
         {/* /Add Client Modal */}
         {/* Edit Client Modal */}
         <Editclient />
         {/* /Edit Client Modal */}
         {/* Delete Client Modal */}
         <DeleteUser
            show={modalDelete}
            onHide={() => setModalDelete(false)}
            userRemove={EditClient}
         />
         {/* /Delete Client Modal */}
      </div>
   );
};

export default Clients;
