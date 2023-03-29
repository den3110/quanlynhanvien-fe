import { createSelector } from "@reduxjs/toolkit";
import { customText } from "../../constant";

export const searchNameEmployees = (state) => state.employees.searchName;
export const filterDepartment = (state) => state.employees.filterDepartment;

export const employeesSelector = (state) => state.employees;

export const employeesRemainingSelector = createSelector(
   employeesSelector,
   searchNameEmployees,
   filterDepartment,
   (clientList, nameText, department) => {
      return clientList?.employees?.filter((item) =>
         department === "all"
            ? customText(item?.name).includes(customText(nameText))
            : customText(item?.name).includes(customText(nameText)) &&
              item.department === department
      );
   }
);
