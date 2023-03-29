import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createWorker = createAsyncThunk(
   "worker/createWorker",
   async ({ payload, toast, onHide, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.createWorker(payload);
         toast.success("Thêm người lao động thành công");
         onHide();
         empty();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         if (typeof error?.response?.data?.message === "string") {
            toast.error(error?.response?.data?.message);
         } else {
            error?.response?.data?.message?.forEach((item) => {
               toast.error(item);
            });
         }
         return rejectWithValue(error.response.data);
      }
   }
);

export const listWorker = createAsyncThunk(
   "worker/listWorker",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listWorker();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listWorkerByClient = createAsyncThunk(
   "worker/listWorkerByClient",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listWorkerByClient(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

// export const listWorkerByEmployees = createAsyncThunk(
//    "worker/listWorkerByEmployees",
//    async ({ id, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await userAPI.listWorkerByEmployees(id);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

export const listWorkerAttendanceToday = createAsyncThunk(
   "worker/listWorkerAttendanceToday",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listTodayAttendance(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const profileWorker = createAsyncThunk(
   "worker/profileWorker",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.profile(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateWorker = createAsyncThunk(
   "worker/updateWorker",
   async ({ id, payload, toast, onHide, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.updateWorker(id, payload);
         toast.success("Cập nhật người lao động thành công");
         onHide();
         empty();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         if (typeof error?.response?.data?.message === "string") {
            toast.error(error?.response?.data?.message);
         } else {
            error?.response?.data?.message?.forEach((item) => {
               toast.error(item);
            });
         }
         return rejectWithValue(error.response.data);
      }
   }
);

export const workerNoAssign = createAsyncThunk(
   "worker/workerNoAssign",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.workerNoAssign();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const removeWorker = createAsyncThunk(
   "worker/removeWorker",
   async ({ id, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.remove(id);
         setLoading(false);
         onHide();
         toast.success(`Xóa người lao động thành công`);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listHeador = createAsyncThunk(
   "worker/listHeador",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listWorkerExcellent();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listUserSalary = createAsyncThunk(
   "worker/listUserSalary",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listUserSalary();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listToDayOvertime = createAsyncThunk(
   "worker/listToDayOvertime",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listTodayOvertime(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const sumWorkHourInMonthOfWorker = createAsyncThunk(
   "worker/sumWorkHourInMonthOfWorker",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.sumWorkHourInMonthOfWorker(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const payrollByWorker = createAsyncThunk(
   "worker/payrollByWorker",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.payroll(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const workerSclice = createSlice({
   name: "worker",
   initialState: {
      searchName: "",
      searchField: "",
      worker: {},
      workers: [],
      headors: [],
      payroll: {},
      sumWorkHourInMonth: [],
      error: "",
      loading: false,
   },
   reducers: {
      searchName: (state, action) => {
         state.searchName = action.payload;
      },

      searchField: (state, action) => {
         state.searchField = action.payload;
      },

      removeUser: (state, action) => {
         state.workers = state.workers.filter((i) => {
            console.log(i);
            return i._id !== action.payload;
         });
      },
      lear: (state) => {
         state.workers = [];
      },
   },
   extraReducers: {
      [createWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [createWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.worker = action.payload;
         state.workers.unshift(action.payload);
      },
      [createWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [listWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [listWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.workers = action.payload;
      },
      [listWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // profile
      [profileWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [profileWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.worker = action.payload;
      },
      [profileWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update
      [updateWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [updateWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.worker = action.payload;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.workers = state.workers.map((item) => (item._id === id ? action.payload : item));
         }
      },
      [updateWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // delete
      [removeWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [removeWorker.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.workers = state.workers.filter((item) => item._id !== id);
         }
      },
      [removeWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // worker no assign
      [workerNoAssign.pending]: (state, action) => {
         state.loading = true;
      },
      [workerNoAssign.fulfilled]: (state, action) => {
         state.loading = false;
         state.workers = action.payload;
      },
      [workerNoAssign.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // worker by client
      [listWorkerByClient.pending]: (state, action) => {
         state.loading = true;
      },
      [listWorkerByClient.fulfilled]: (state, action) => {
         state.loading = false;
         state.workers = action.payload;
      },
      [listWorkerByClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // worker by employees
      // [listWorkerByEmployees.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listWorkerByEmployees.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.workers = action.payload;
      // },
      // [listWorkerByEmployees.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      // list heador
      [listHeador.pending]: (state, action) => {
         state.loading = true;
      },
      [listHeador.fulfilled]: (state, action) => {
         state.loading = false;
         state.headors = action.payload;
      },
      [listHeador.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list user salary
      [listUserSalary.pending]: (state, action) => {
         state.loading = true;
      },
      [listUserSalary.fulfilled]: (state, action) => {
         state.loading = false;
         state.workers = action.payload;
      },
      [listUserSalary.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list user attendance
      [listWorkerAttendanceToday.pending]: (state, action) => {
         state.loading = true;
      },
      [listWorkerAttendanceToday.fulfilled]: (state, action) => {
         state.loading = false;
         state.workers = action.payload;
      },
      [listWorkerAttendanceToday.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list user overtime
      [listToDayOvertime.pending]: (state, action) => {
         state.loading = true;
      },
      [listToDayOvertime.fulfilled]: (state, action) => {
         state.loading = false;
         state.workers = action.payload;
      },
      [listToDayOvertime.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list user sum Work Hour In Month
      [sumWorkHourInMonthOfWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [sumWorkHourInMonthOfWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.sumWorkHourInMonth = action.payload;
      },
      [sumWorkHourInMonthOfWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // payrollByWorker
      [payrollByWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [payrollByWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.payroll = action.payload;
      },
      [payrollByWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default workerSclice;
