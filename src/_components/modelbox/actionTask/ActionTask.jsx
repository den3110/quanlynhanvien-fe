import React, { useState } from "react";
import AssignPerson from "./AssignPerson";

const ActionTask = ({ item }) => {
   const [modalPerson, setModalPerson] = useState(false);
   const [task, setTask] = useState({});
   const [load, setLoad] = useState(0);

   const handlePerson = (e) => {
      e.stopPropagation();
      setTask(item);
      setLoad((prev) => prev + 1);
      setModalPerson(true);
   };
   return (
      <>
         <span className="action-circle large" title="Assign">
            <i className="material-icons" onClick={(e) => e.stopPropagation()}>
               edit
            </i>
         </span>
         <span className="action-circle large" title="Assign">
            <i className="material-icons" onClick={handlePerson}>
               person_add
            </i>
         </span>
         <span className="action-circle large delete-btn" title="Delete Task">
            <i className="material-icons" onClick={(e) => e.stopPropagation()}>
               delete
            </i>
         </span>

         <AssignPerson
            show={modalPerson}
            onHide={() => setModalPerson(false)}
            task={task}
            load={load}
         />
      </>
   );
};

export default ActionTask;
