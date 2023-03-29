import { createContext } from "react";
const init = {
   loading: false,
   setLoading: () => {},
};
export const loadingContext = createContext(init);
