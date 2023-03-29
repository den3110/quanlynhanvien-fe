import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import {
   checkNotAssignPart,
   createPart,
   listPartByIdProject,
   precentPartByIdProject,
} from "../../redux/feature/partSclice";
import AddUserToPart from "../modelbox/actionPart/AddUser";
import AddSubBranch from "../modelbox/AddSubBranch";

function Part() {
   const [part, setPart] = useState({});
   const [modalShow, setModalShow] = useState(false);
   const [partItem, setPartItem] = useState({});
   const [load, setLoad] = useState(0);
   const { id } = useParams();
   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const [showAddBranch, setShowAddBranch] = useState(false);

   const handleClose = () => {
      setShowAddBranch(false);
      setPartItem({});
   };

   const handleShow = () => {
      setShowAddBranch(true);
      setLoad((prev) => prev + 1);
   };

   const { user } = useSelector((state) => state.auth);
   // ======================================== create updated part ===============================

   useEffect(() => {
      dispatch(listPartByIdProject({ id, setLoading }));
   }, [id]);

   const { parts } = useSelector((state) => state.part);
   // ======================================== create part ===============================

   // ========================================= modal =====================================
   const handleListUser = (item) => {
      setPart(item);
      setModalShow(true);
   };

   useEffect(() => {
      dispatch(checkNotAssignPart({ id, setLoading }));
   }, [id]);
   // ========================================= modal =======================================

   // ========================================= precent =====================================
   useEffect(() => {
      dispatch(precentPartByIdProject({ query: { project: id }, setLoading }));
   }, [id]);

   const { precentPart } = useSelector((state) => state.part);
   // ========================================= precent =====================================

   return (
      <>
         <div className="card">
            <div className="card-body">
               <div className="part-header">
                  <div className="card-title m-b-20">Bộ phận</div>
                  <div>
                     <a href="#" className="btn btn-white float-end ml-2 " onClick={handleShow}>
                        <i className="fa fa-plus" /> Thêm bộ phận
                     </a>
                  </div>
               </div>
               <div className="row">
                  {parts?.map((item) => (
                     <div key={item?._id} className="col-md-12 col-lg-6 col-xl-6 d-flex">
                        <div className="card flex-fill">
                           <div className="card-body">
                              <div className="part-header">
                                 <Link
                                    to={`/app/projects/part-owerview?project=${id}&part=${item?._id}&name=${item?.name}`}
                                    className="card-title text-blue"
                                 >
                                    {item?.name}
                                 </Link>
                                 <div className="dropdown kanban-action">
                                    <a href="#" data-bs-toggle="dropdown">
                                       <i className="fa fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => handleListUser(item)}
                                       >
                                          Thêm người lao động
                                       </a>
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => {
                                             handleShow();
                                             setPartItem(item);
                                             setLoad((prev) => prev + 1);
                                          }}
                                       >
                                          Thêm nhánh phụ
                                       </a>
                                       <a className="dropdown-item" href="#">
                                          Xóa
                                       </a>
                                    </div>
                                 </div>
                              </div>
                              <div className="statistics">
                                 <div className="row">
                                    <div className="col-md-6 col-6 text-center">
                                       <div className="stats-box mb-4">
                                          <p>Tổng công việc</p>
                                          <h3>{item?.size}</h3>
                                       </div>
                                    </div>
                                    <div className="col-md-6 col-6 text-center">
                                       <div className="stats-box mb-4">
                                          <p>Nhánh phụ</p>
                                          <h3>{item?.sizeChild}</h3>
                                       </div>
                                    </div>
                                    <div className="stats-box mb-4 text-center">
                                       <p>Tổng thành viên</p>
                                       <h3>{item?.joinpartEX?.length}</h3>
                                    </div>
                                 </div>
                              </div>
                              {precentPart?.map(
                                 (precent) =>
                                    precent?._id === item._id && (
                                       <div key={precent?._id}>
                                          <div className="progress mb-4">
                                             <div
                                                className="progress-bar bg-warning"
                                                role="progressbar"
                                                style={{
                                                   width: `${precent?.precentPerform}%`,
                                                }}
                                                aria-valuenow={30}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                             >
                                                {precent?.precentPerform || 0}%
                                             </div>
                                          </div>
                                          <div className="progress mb-4">
                                             <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: `${precent.precentFinish}%` }}
                                                aria-valuenow={30}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                             >
                                                {precent?.precentFinish || 0}%
                                             </div>
                                          </div>
                                          <div>
                                             <p>
                                                <i className="fa fa-dot-circle-o text-warning me-2" />
                                                Thực hiện{" "}
                                                <span className="float-end">
                                                   {precent?.performTrue}
                                                </span>
                                             </p>

                                             <p>
                                                <i className="fa fa-dot-circle-o text-success me-2" />
                                                Hoàn thành{" "}
                                                <span className="float-end">
                                                   {precent?.finishTrue}
                                                </span>
                                             </p>
                                          </div>
                                       </div>
                                    )
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <AddUserToPart
            show={modalShow}
            onHide={() => setModalShow(false)}
            part={part}
            id={id}
            setLoading={setLoading}
            user={user}
         />

         {/* add sub branch */}
         <AddSubBranch
            show={showAddBranch}
            onHide={handleClose}
            part={partItem}
            user={user}
            id={id}
            load={load}
         />
         {/* add sub branch */}
      </>
   );
}

export default memo(Part);
