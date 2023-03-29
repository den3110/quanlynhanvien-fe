import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { partTaskAPI } from "../../api/partTask";
import partSclice from "./partSclice";

export const createPartTask = createAsyncThunk(
   "part-task/create",
   async ({ payload, toast, setLoading, dispatch }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partTaskAPI.create(payload);
         // plus task
         dispatch(partSclice.actions.updateSize(payload?.part));
         // remove part not assign task
         dispatch(partSclice.actions.removePartNotAssignTask(payload?.part));
         // success
         toast.success(`Giao việc cho bộ phận thành công`);
         setLoading(false);
         return data;
      } catch (error) {
         console.log(error);
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

const partTaskSclice = createSlice({
   name: "partTask",
   initialState: {
      partTask: {},
      partTasks: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createPartTask.pending]: (state, action) => {
         state.loading = true;
      },
      [createPartTask.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [createPartTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default partTaskSclice;
