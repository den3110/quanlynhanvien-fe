import { createSelector } from "@reduxjs/toolkit";
import { customText } from "../../constant";

export const searchNameProject = (state) => state.project.searchName;
export const filterPriority = (state) => state.project.filterPriority;

export const projectsSelector = (state) => state.project;

export const projectsRemainingSelector = createSelector(
   projectsSelector,
   searchNameProject,
   filterPriority,

   (projectList, nameText, priority) => {
      return projectList?.projects?.filter((item) =>
         priority !== "all"
            ? customText(item?.name).includes(customText(nameText)) && item.priority === +priority
            : customText(item?.name).includes(customText(nameText))
      );
   }
);
