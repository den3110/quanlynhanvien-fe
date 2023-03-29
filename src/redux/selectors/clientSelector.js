import { createSelector } from "@reduxjs/toolkit";
import { customText } from "../../constant";

export const searchNameClient = (state) => state.client.searchName;
export const filterCompanyClient = (state) => state.client.filterCompany;

export const clientSelector = (state) => state.client;

export const clientRemainingSelector = createSelector(
   clientSelector,
   searchNameClient,
   filterCompanyClient,
   (clientList, nameText, company) => {
      return clientList?.clients?.filter((item) =>
         company === "all"
            ? customText(item?.name).includes(customText(nameText))
            : customText(item?.name).includes(customText(nameText)) && item._id === company
      );
   }
);
