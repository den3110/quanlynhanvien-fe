import { createSelector } from "@reduxjs/toolkit";
import { customText } from "../../constant";

export const searchName = (state) => state.worker.searchName;
export const searchField = (state) => state.worker.searchField;

export const workerSelector = (state) => state.worker;

export const workerRemainingSelector = createSelector(
   workerSelector,
   searchName,
   searchField,
   (workerList, nameText, fieldText) =>
      workerList?.workers?.filter((item) => {
         return (
            customText(item.name).includes(customText(nameText)) &&
            customText(item.field).includes(customText(fieldText))
         );
      })
);
