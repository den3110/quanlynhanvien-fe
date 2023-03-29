import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createEmployees = createAsyncThunk(
   "employees/createEmployees",
   async ({ payload, toast, onHide, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.createEmployees(payload);
         toast.success("Thêm nhân viên thành công");
         empty();
         onHide();
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

export const listEmployees = createAsyncThunk(
   "employees/listEmployees",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listEmployees();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateEmployees = createAsyncThunk(
   "employees/updateEmployees",
   async ({ id, payload, toast, onHide, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.updateEmployees(id, payload);
         toast.success("Cập nhật nhân viên thành công");
         empty();
         onHide();
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

export const removeEmployees = createAsyncThunk(
   "employees/removeEmployees",
   async ({ id, onHide, setLoading, toast }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.remove(id);
         setLoading(false);
         onHide();
         toast.success(`Xóa nhân viên thành công`);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listEmployeesByUserId = createAsyncThunk(
   "employees/listEmployeesByUserId",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listEmployeesByUserId(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

// export const listEmployeesByWorker = createAsyncThunk(
//    "employees/listEmployeesByWorker",
//    async ({ id, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
// const { data } = await userAPI.listEmployeesByWorker(id);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

export const employeesProfile = createAsyncThunk(
   "worker/employeesProfile",
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

const employeesSclice = createSlice({
   name: "employees",
   initialState: {
      searchName: "",
      filterDepartment: "all",
      employee: {},
      employees: [],
      error: "",
      loading: false,
   },
   reducers: {
      searchNameEmployees: (state, action) => {
         state.searchName = action.payload;
      },

      filterDepartment: (state, action) => {
         state.filterDepartment = action.payload;
      },
   },
   extraReducers: {
      [createEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [createEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         state.employee = action.payload;
         state.employees.push(action.payload);
      },
      [createEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [listEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [listEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         state.employees = action.payload;
      },
      [listEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update
      [updateEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [updateEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         state.employee = action.payload;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.employees = state.employees.map((item) =>
               item._id === id ? action.payload : item
            );
         }
      },
      [updateEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // remove
      [removeEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [removeEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.employees = state.employees.filter((item) => item._id !== id);
         }
      },
      [removeEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by client
      [listEmployeesByUserId.pending]: (state, action) => {
         state.loading = true;
      },
      [listEmployeesByUserId.fulfilled]: (state, action) => {
         state.loading = false;
         state.employees = action.payload;
      },
      [listEmployeesByUserId.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list employees worker
      // [listEmployeesByWorker.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listEmployeesByWorker.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.employees = action.payload;
      // },
      // [listEmployeesByWorker.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      // list employees worker
      [employeesProfile.pending]: (state, action) => {
         state.loading = true;
      },
      [employeesProfile.fulfilled]: (state, action) => {
         state.loading = false;
         state.employee = action.payload;
      },
      [employeesProfile.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default employeesSclice;
