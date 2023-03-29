import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salaryAPI } from "../../api/salary";

export const createSalary = createAsyncThunk(
   "salary/createSalary",
   async ({ payload, toast, onHide, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await salaryAPI.create(payload);
         toast.success("Thêm nhóm thụ hưởng thành công");
         setLoading(false);
         onHide();
         empty();
         return { ...data, projectEX: payload?.projectEX };
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

export const listSalary = createAsyncThunk(
   "salary/listSalary",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await salaryAPI.list();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateSalary = createAsyncThunk(
   "salary/updateSalary",
   async ({ id, payload, toast, onHide, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await salaryAPI.update(id, payload);
         toast.success("Chỉnh sửa nhóm thụ hưởng thành công");
         setLoading(false);
         onHide();
         empty();
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

export const removeSalary = createAsyncThunk(
   "salary/removeSalary",
   async ({ id, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await salaryAPI.remove(id);
         toast.success("xóa nhóm thụ hưởng thành công");
         setLoading(false);
         onHide();
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

const salarySclice = createSlice({
   name: "salary",
   initialState: {
      salary: {},
      salarys: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      // created salary
      [createSalary.pending]: (state, action) => {
         state.loading = true;
      },
      [createSalary.fulfilled]: (state, action) => {
         state.loading = false;
         state.salarys.push(action.payload);
      },
      [createSalary.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // created salary
      [listSalary.pending]: (state, action) => {
         state.loading = true;
      },
      [listSalary.fulfilled]: (state, action) => {
         state.loading = false;
         state.salarys = action.payload;
      },
      [listSalary.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // created salary
      [updateSalary.pending]: (state, action) => {
         state.loading = true;
      },
      [updateSalary.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: { id, payload },
         } = action.meta;

         state.salarys = state.salarys?.map((item) => (item._id === id ? { ...payload } : item));
      },
      [updateSalary.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // delete salary
      [removeSalary.pending]: (state, action) => {
         state.loading = true;
      },
      [removeSalary.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: { id },
         } = action.meta;

         state.salarys = state.salarys?.filter((i) => i._id !== id);
      },
      [removeSalary.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default salarySclice;
