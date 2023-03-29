import React, { memo, useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { timeCustom } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { sumWorkHourInMonthOfWorker } from "../../redux/feature/workerSclice";
const Tableavatar = ({ dateInMonth, allUserAttendance, setQuery }) => {
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { id } = useParams();

   useEffect(() => {
      dispatch(
         sumWorkHourInMonthOfWorker({
            query: {
               project: id,
               year: new Date().getFullYear(),
               month: new Date().getMonth() + 1,
            },
            setLoading,
         })
      );
   }, []);
   const { sumWorkHourInMonth } = useSelector((state) => state.worker);

   return (
      <>
         {allUserAttendance.items?.map((item) => {
            return (
               <tr key={item._id}>
                  <td>
                     <Link to={`/app/profile/worker-profile/${item?._id}`}>
                        <span className="ms-3 text-dark">{item?.name}</span>
                     </Link>
                  </td>

                  {/* Tableavatar */}
                  {item?.attendance?.length > 0
                     ? item?.attendance?.map((val, index) => (
                          <td key={index}>
                             {val.status === false && val.workhour > 0 ? (
                                <a
                                   href="#"
                                   className="fw-bold"
                                   data-bs-toggle="modal"
                                   data-bs-target={val.workhour !== 0 ? `#attendance_info` : ""}
                                   onClick={() =>
                                      setQuery({
                                         date: val?.date,
                                         month: val?.month,
                                         year: val?.year,
                                         user: item?._id,
                                      })
                                   }
                                   //   data-bs-target="#attendance_info"
                                >
                                   <span className="text-warning">{timeCustom(val?.workhour)}</span>
                                </a>
                             ) : val.status === true && val.workhour > 0 ? (
                                <a
                                   href="#"
                                   className="fw-bold"
                                   data-bs-toggle="modal"
                                   data-bs-target={val.workhour !== 0 ? `#attendance_info` : ""}
                                   onClick={() =>
                                      setQuery({
                                         date: val?.date,
                                         month: val?.month,
                                         year: val?.year,
                                         user: item?._id,
                                      })
                                   }
                                   //   data-bs-target="#attendance_info"
                                >
                                   <span>{timeCustom(val?.workhour)}</span>
                                </a>
                             ) : val.workhour < 0 ? (
                                <a
                                   href="#"
                                   className="fw-bold"
                                   data-bs-toggle="modal"
                                   data-bs-target={val.workhour !== 0 ? `#attendance_info` : ""}
                                   onClick={() =>
                                      setQuery({
                                         date: val?.date,
                                         month: val?.month,
                                         year: val?.year,
                                         user: item?._id,
                                      })
                                   }
                                   //   data-bs-target="#attendance_info"
                                >
                                   <i className="fa fa-close text-danger" />
                                </a>
                             ) : (
                                <i className="fa fa-close text-secondary" />
                             )}
                          </td>
                       ))
                     : dateInMonth?.map((val, index) => (
                          <td key={index}>
                             <a href="#">
                                <i className="fa fa-close text-secondary" />
                             </a>
                          </td>
                       ))}

                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td key={sum?._id} className="text-center bg-success text-light fw-bold">
                              {sum?.ratioWork || 0}
                           </td>
                        )
                  )}
                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td key={sum?._id} className="text-center text-primary fw-bold">
                              {timeCustom(sum?.totalShifts) || 0}
                           </td>
                        )
                  )}
                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td key={sum?._id} className="text-center text-primary fw-bold">
                              {timeCustom(sum?.totalOvertimeMorning) || 0}
                           </td>
                        )
                  )}
                  {sumWorkHourInMonth?.map(
                     (sum) =>
                        sum?._id === item?._id && (
                           <td key={sum?._id} className="text-center text-primary fw-bold">
                              {timeCustom(sum?.totalOvertimeEverming) || 0}
                           </td>
                        )
                  )}
               </tr>
            );
         })}

         {/* /Tableavatar */}
      </>
   );
};

export default memo(Tableavatar);
