import React, { useMemo } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import payslipSclice, { payslipDetail } from "../../../redux/feature/payslipSclice";
import { useLoading } from "../../../hook/useLoading";
import { formatMoneyVND } from "../../../constant";

const Payslip = () => {
   // get query
   const { search } = useLocation();
   const query = useMemo(() => new URLSearchParams(search), [search]);
   const payslipId = query.get("payslip");
   const projectId = query.get("project");
   const salaryId = query.get("salary");

   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(
         payslipDetail({
            query: { payslip: payslipId, project: projectId, salary: salaryId },
            setLoading,
         })
      );
   }, [payslipId, projectId]);

   const { detail } = useSelector((state) => state.payslip);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Phiếu lương</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title"> Phiếu lương</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <div className="btn-group btn-group-sm">
                        <button className="btn btn-white">Cập nhật phiếu lương</button>
                        <button className="btn btn-white">CSV</button>
                        <button className="btn btn-white">PDF</button>
                        <button className="btn btn-white">
                           <i className="fa fa-print fa-lg" /> Print
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            <div className="row">
               <div className="col-md-12">
                  <div className="card">
                     <div className="card-body">
                        <h4 className="payslip-title">{detail[0]?.name}</h4>
                        <div className="row">
                           <div className="col-sm-12">
                              <div>
                                 <h4 className="m-b-10">
                                    <strong>Phúc lợi</strong>
                                 </h4>
                                 <table className="table table-bordered">
                                    <tbody>
                                       <tr>
                                          <td>
                                             <span>Nghỉ phép</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.leave} ngày/năm
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Thưởng lể/tết</span>{" "}
                                             <span className="float-end">
                                                {formatMoneyVND(detail[0]?.reward)}
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Lương tháng 13</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.bonus} tháng/năm
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Làm ngoài giờ</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.overtime}%
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Làm chủ nhật</span>{" "}
                                             <span className="float-end">{detail[0]?.sunday}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Làm lể tết</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.holiday}%
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Phí dịch vụ</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.service}%
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Lương đóng BHXH</span>{" "}
                                             <span className="float-end">
                                                {formatMoneyVND(detail[0]?.salary_paid_social)}
                                             </span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           {projectId && (
                              <div className="col-sm-6">
                                 <div>
                                    <h4 className="m-b-10">
                                       <strong>Lương và phụ cấp</strong>
                                    </h4>
                                    <table className="table table-bordered">
                                       <tbody>
                                          <tr>
                                             <td>
                                                <span>Phụ cấp đi lại</span>{" "}
                                                <span className="float-end">
                                                   {formatMoneyVND(detail[0]?.salary?.go)}
                                                </span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <span>Phụ cấp nhà ở</span>{" "}
                                                <span className="float-end">
                                                   {formatMoneyVND(detail[0]?.salary?.home)}
                                                </span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <span>Phụ cấp nặng nhọc/ độc hại</span>{" "}
                                                <span className="float-end">
                                                   {formatMoneyVND(detail[0]?.salary?.toxic)}
                                                </span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <span>Chuyên cần</span>{" "}
                                                <span className="float-end">
                                                   {formatMoneyVND(detail[0]?.salary?.diligence)}{" "}
                                                   VND
                                                </span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <span>Phụ cấp ăn uống</span>{" "}
                                                <span className="float-end">
                                                   {formatMoneyVND(detail[0]?.salary?.eat)}
                                                </span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <span className="fw-bold">Lương</span>{" "}
                                                <span className="float-end fw-bold">
                                                   {formatMoneyVND(detail[0]?.salary?.salary)}
                                                </span>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           )}

                           <div className={`${!projectId ? "col-sm-12" : "col-sm-6"}`}>
                              <div>
                                 <h4 className="m-b-10">
                                    <strong>Bảo hiểm</strong>
                                 </h4>
                                 <table className="table table-bordered">
                                    <tbody>
                                       <tr>
                                          <td>
                                             <span>Bảo Hiểm Xã Hội</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.society}%
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Bảo Hiểm Y Tế</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.medican}%
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Bảo Hiểm Thất Nghiệp</span>{" "}
                                             <span className="float-end">
                                                {detail[0]?.unemployment}%
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Công Đoàn</span>{" "}
                                             <span className="float-end">{detail[0]?.union}%</span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>{" "}
                        <hr />
                        {/* <div className="row">
                           <div className="col-sm-12">
                              <h4 className="m-b-10">
                                 <strong>Phụ cấp khác</strong>
                              </h4>
                           </div>
                           <div>
                              <label htmlFor="">sss</label>
                              <input type="text" className="input-custom" />
                              <label htmlFor="">sss</label>
                              <input type="text" className="input-custom" />
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
      </div>
   );
};

export default Payslip;
