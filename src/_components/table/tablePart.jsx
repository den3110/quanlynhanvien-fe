import { Checkbox, Switch } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { avartarFAKE } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { itemRender, onShowSizeChange } from "../../MainPage/paginationfunction";
import {
   listAssignTaskByProject,
   updateFinish,
   updatePerform,
} from "../../redux/feature/assignTaskSclice";
import Table from "react-bootstrap/Table";

const TablePart = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const onPerform = (checked, record) => {
      dispatch(
         updatePerform({
            id: record._id,
            payload: { verify: checked },
            toast,
            setLoading,
            record: { ...record, perform: { status: checked, date: Date.now() } },
         })
      );
   };

   const onFinish = (checked, record) => {
      dispatch(
         updateFinish({
            id: record._id,
            payload: { verify: checked },
            toast,
            setLoading,
            record: { ...record, finish: { status: checked, date: Date.now() } },
         })
      );
   };

   // useEffect(() => {
   //    dispatch(listAssignTaskByProject({ id, setLoading }));
   // }, [id]);

   const { assignTasks } = useSelector((state) => state.assignTask);

   return (
      <div className="card-body">
         <div className="card-title m-b-20 title-between">
            <h4 className="card-title width-title">Công việc được giao bộ phận</h4>
            <div className="filter-table-checkbox">
               <Checkbox className="text-muted">Chưa thực hiện</Checkbox>
               <Checkbox className="text-muted">Đang thực hiện</Checkbox>
               <Checkbox className="text-muted">Hoàn thành</Checkbox>
            </div>
         </div>
         <div className="title-between">
            <div>
               <label className="text-muted">Từ ngày</label>
               <input type="date" className="input-custom" />
            </div>
            <div>
               <label className="text-muted">Đến ngày</label>
               <input type="date" className="input-custom" />
            </div>
            <div>
               <label className="text-muted">Lịch sử</label>
               <input type="text" className="input-custom" placeholder="Nhập tên người lao động" />
            </div>
         </div>
         <br />
         <div className="table-responsive">
            <Table striped>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Bộ phận</th>
                     <th>Công việc</th>
                     <th>Bàn giao</th>
                     <th>Deadline</th>
                     <th>Hoàn thành</th>
                     <th>Thực hiện</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>1</td>
                     <td>Mark</td>
                     <td>Otto</td>
                     <td>@mdo</td>
                     <td>@mdo</td>
                     <td>@mdo</td>
                     <td>@mdo</td>
                  </tr>
                  <tr>
                     <td>
                        <span style={{ width: "100%", marginLeft: "15%" }}>2</span>
                     </td>
                     <td>Jacob</td>
                     <td>Thornton</td>
                     <td>@fat</td>
                     <td>@mdo</td>
                     <td>@mdo</td>
                     <td>@fat</td>
                  </tr>
               </tbody>
            </Table>
         </div>
      </div>
   );
};

export default TablePart;
