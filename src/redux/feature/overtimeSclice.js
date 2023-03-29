import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { overtimeAPI } from "../../api/overtime";

export const createOvertime = createAsyncThunk(
   "overtime/createOvertime",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await overtimeAPI.create(payload);
         toast.success("Thêm tăng ca thành công");
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

const overtimeSclice = createSlice({
   name: "overtime",
   initialState: {
      overtime: {},
      overtimes: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createOvertime.pending]: (state, action) => {
         state.loading = true;
      },
      [createOvertime.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [createOvertime.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default overtimeSclice;
