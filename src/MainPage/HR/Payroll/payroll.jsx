import React, { useMemo } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { payslipDetail } from "../../../redux/feature/payslipSclice";
import { useLoading } from "../../../hook/useLoading";
import { formatMoneyVND } from "../../../constant";
import { payrollByWorker } from "../../../redux/feature/workerSclice";

const Payroll = () => {
   // get query
   const { search } = useLocation();
   const query = useMemo(() => new URLSearchParams(search), [search]);
   const payslipId = query.get("payslip");
   const projectId = query.get("project");
   const salaryId = query.get("salary");
   const user = query.get("user");
   const contract = query.get("contract");

   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(
         payrollByWorker({
            query: { payslip: payslipId, project: projectId, salary: salaryId, user, contract },
            setLoading,
         })
      );
   }, [payslipId, projectId]);

   const { payroll } = useSelector((state) => state.worker);

   console.log(payroll);

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
                        <h4 className="payslip-title">Phiếu lương</h4>
                        <div className="row">
                           <div className="col-sm-12">
                              <div>
                                 <table className="table table-bordered table-striped ">
                                    <tbody>
                                       <tr>
                                          <td>
                                             <span>Họ và tên</span>
                                             <span className="float-end">{payroll?.name}</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Chức vụ</span>
                                             <span className="float-end">{payroll?.field}</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Số Tài Khoản</span>
                                             <span className="float-end"></span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Tên Ngân hàng</span>
                                             <span className="float-end"> </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Thu nhập thoả thuận</span>
                                             <span className="float-end">
                                                {formatMoneyVND(payroll?.salary)}
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Lương đóng BHXH</span>
                                             <span className="float-end">
                                                {formatMoneyVND(payroll?.salary_paid_social)}
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Ngày công tính lương</span>
                                             <span className="float-end">
                                                {payroll?.workMain} Ngày
                                             </span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <table className="table table-bordered table-striped">
                                 <tbody>
                                    <tr>
                                       <td>
                                          <span className="fw-bold">CÁC KHOẢN THU NHẬP</span>
                                          <span className="float-end fw-bold">
                                             {formatMoneyVND(payroll?.income)}
                                          </span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>1. Thu nhập từ ngày công</span>
                                          <span className="float-end">
                                             {formatMoneyVND(payroll?.moneyMain)}
                                          </span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>2. Lương tăng ca</span>
                                          <span className="float-end">
                                             {formatMoneyVND(payroll?.moneyOvertime)}
                                          </span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>3. Phụ cấp</span>
                                          <span className="float-end">
                                             {formatMoneyVND(payroll?.allowance)}
                                          </span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>4. Cộng khác</span>
                                          <span className="float-end">{formatMoneyVND(0)}</span>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>

                           <div className={`${!projectId ? "col-sm-12" : "col-sm-6"}`}>
                              <table className="table table-bordered table-striped">
                                 <tbody>
                                    <tr>
                                       <td>
                                          <span className="fw-bold">CÁC KHOẢN TRỪ VÀO LƯƠNG</span>
                                          <span className="float-end fw-bold">
                                             {formatMoneyVND(payroll?.deduct)}
                                          </span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>
                                             1. Bảo hiểm bắt buộc ({payroll?.precent_insurance}%)
                                          </span>
                                          <span className="float-end">
                                             {formatMoneyVND(payroll?.insurance)}
                                          </span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>2. Thuế TNCN</span>
                                          <span className="float-end">{formatMoneyVND(0)}</span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>3. Tạm ứng</span>
                                          <span className="float-end">{formatMoneyVND(0)}</span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td>
                                          <span>4. Trừ khác</span>
                                          <span className="float-end">{formatMoneyVND(0)}</span>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>{" "}
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
                        <div className="row">
                           <div className="col-sm-12">
                              <div>
                                 <table className="table table-bordered table-striped ">
                                    <tbody>
                                       <tr>
                                          <td className="fw-bold text-primary">
                                             <span className="me-5">THỰC LÃNH</span>
                                             <span>{formatMoneyVND(payroll?.receive_real)}</span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                                 <p>
                                    Bằng chữ: Sáu triệu ba trăm năm mươi lăm ngàn ba trăm tám mươi
                                    bốn đồng chẵn.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
      </div>
   );
};

export default Payroll;
