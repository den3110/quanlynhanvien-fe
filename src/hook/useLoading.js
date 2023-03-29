import { useContext } from "react";
import { loadingContext } from "../context/loadingContext";

export const useLoading = () => {
   return useContext(loadingContext);
};
