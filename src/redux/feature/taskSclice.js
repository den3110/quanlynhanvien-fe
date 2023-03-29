import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payslipAPI } from "../../api/payslip";
import { taskAPI } from "../../api/task";
import { userAPI } from "../../api/user";

export const createTask = createAsyncThunk(
   "task/createTask",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await taskAPI.create(payload);
         toast.success("Thêm nhiệm vụ thành công");
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

export const listTaskByProject = createAsyncThunk(
   "task/listTaskByProject",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await taskAPI.listByProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const taskSclice = createSlice({
   name: "task",
   initialState: {
      task: {},
      tasks: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createTask.pending]: (state, action) => {
         state.loading = true;
      },
      [createTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.task = action.payload;
         state.tasks.push(action.payload);
      },
      [createTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      [listTaskByProject.pending]: (state, action) => {
         state.loading = true;
      },
      [listTaskByProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.tasks = action.payload;
      },
      [listTaskByProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default taskSclice;
