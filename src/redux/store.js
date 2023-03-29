import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSclice from "./feature/clientSclice";
import employeesSclice from "./feature/employeesSclice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSclice from "./feature/authSclice";
import projectSclice from "./feature/projectSclice";
import workerSclice from "./feature/workerSclice";
import payslipSclice from "./feature/payslipSclice";
import workerProjectSclice from "./feature/workerProjectSclice";
import taskSclice from "./feature/taskSclice";
import assignTaskSclice from "./feature/assignTaskSclice";
import initSclice from "./feature/initSclice";
import messageSclice from "./feature/messageSclice";
import partSclice from "./feature/partSclice";
import joinProjectSclice from "./feature/joinProjectSclice";
import partTaskSclice from "./feature/partTaskSclice";
import attendanceSclice from "./feature/attendanceSclice";
import rulesSclice from "./feature/rulesSclice";
import salarySclice from "./feature/salarySclice";
import contractSclice from "./feature/contractSclice";
import overtimeSclice from "./feature/overtimeSclice";

const persistConfig = {
   key: "root",
   storage,
};

const reducer = combineReducers({
   auth: authSclice.reducer,
   client: clientSclice.reducer,
   employees: employeesSclice.reducer,
   project: projectSclice.reducer,
   worker: workerSclice.reducer,
   payslip: payslipSclice.reducer,
   workerProject: workerProjectSclice.reducer,
   task: taskSclice.reducer,
   assignTask: assignTaskSclice.reducer,
   init: initSclice.reducer,
   message: messageSclice.reducer,
   part: partSclice.reducer,
   joinProject: joinProjectSclice.reducer,
   partTask: partTaskSclice.reducer,
   attendance: attendanceSclice.reducer,
   rules: rulesSclice.reducer,
   salary: salarySclice.reducer,
   contract: contractSclice.reducer,
   overtime: overtimeSclice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export const persistor = persistStore(store);
export default store;
