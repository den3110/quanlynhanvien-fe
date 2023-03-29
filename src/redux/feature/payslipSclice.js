import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payslipAPI } from "../../api/payslip";
import { userAPI } from "../../api/user";

export const createPayslip = createAsyncThunk(
   "paySlip/createPayslip",
   async ({ payload, toast, history, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.createPayslip(payload);
         toast.success("Thêm dự án thành công");
         setLoading(false);
         history.push("/app/projects/phieu-luong");
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

export const listPayslip = createAsyncThunk(
   "paySlip/listPayslip",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.list();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listPayslipByUser = createAsyncThunk(
   "paySlip/listPayslipByUser",
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await payslipAPI.ListByUser(id);
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   }
);

// export const listPayslipByEmployees = createAsyncThunk(
//    "paySlip/listPayslipByEmployees",
//    async ({ id, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await payslipAPI.listByEmployees(id);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

export const listPayslipByUserId = createAsyncThunk(
   "paySlip/listPayslipByUserId",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.findByUserId(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

// export const listPayslipByWorker = createAsyncThunk(
//    "paySlip/listPayslipByWorker",
//    async ({ id, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await payslipAPI.listByWorker(id);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

export const payslipDetail = createAsyncThunk(
   "paySlip/payslipDetail",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.detail(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const payslipById = createAsyncThunk(
   "paySlip/payslipById",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.findOne(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updatePayslip = createAsyncThunk(
   "paySlip/updatePayslip",
   async ({ id, payload, toast, history, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.updatePayslip(id, payload);
         toast.success("Cập nhật dự án thành công");
         setLoading(false);
         history.push("/app/projects/phieu-luong");
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

export const removePayslip = createAsyncThunk(
   "paySlip/removePayslip",
   async ({ id, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.remove(id);
         onHide();
         toast.success(`Xóa phiếu lương thành công`);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const payslipSclice = createSlice({
   name: "payslip",
   initialState: {
      payslip: {},
      detail: [],
      payslips: [],
      error: "",
      loading: false,
   },
   reducers: {
      payslipDetail: (state, action) => {
         state.payslip = state.payslips.find((i) => i._id === action.payload);
      },
   },
   extraReducers: {
      [createPayslip.pending]: (state, action) => {
         state.loading = true;
      },
      [createPayslip.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslip = action.payload;
         state.payslips.push(action.payload);
      },
      [createPayslip.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [listPayslip.pending]: (state, action) => {
         state.loading = true;
      },
      [listPayslip.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslips = action.payload;
      },
      [listPayslip.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by user
      [listPayslipByUser.pending]: (state, action) => {
         state.loading = true;
      },
      [listPayslipByUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslips = action.payload;
      },
      [listPayslipByUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by employees
      // [listPayslipByEmployees.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listPayslipByEmployees.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.payslips = action.payload;
      // },
      // [listPayslipByEmployees.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      // list by employees
      [listPayslipByUserId.pending]: (state, action) => {
         state.loading = true;
      },
      [listPayslipByUserId.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslips = action.payload;
      },
      [listPayslipByUserId.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // // list by worker
      // [listPayslipByWorker.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listPayslipByWorker.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.payslips = action.payload;
      // },
      // [listPayslipByWorker.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      // payslip by detail
      [payslipDetail.pending]: (state, action) => {
         state.loading = true;
      },
      [payslipDetail.fulfilled]: (state, action) => {
         state.loading = false;
         state.detail = action.payload;
      },
      [payslipDetail.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // payslip by id
      [payslipById.pending]: (state, action) => {
         state.loading = true;
      },
      [payslipById.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslip = action.payload;
      },
      [payslipById.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update payslip
      [updatePayslip.pending]: (state, action) => {
         state.loading = true;
      },
      [updatePayslip.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.payslips = state.payslips.map((item) =>
               item._id === id ? action.payload : item
            );
         }
      },
      [updatePayslip.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // remove payslip
      [removePayslip.pending]: (state, action) => {
         state.loading = true;
      },
      [removePayslip.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.payslips = state.payslips.filter((item) => item._id !== id);
         }
      },
      [removePayslip.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default payslipSclice;
