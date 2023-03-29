import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";
import { workerProjectAPI } from "../../api/workerproject";

export const createWorkerProject = createAsyncThunk(
   "workerProject/createWorkerProject",
   async ({ payload, toast, setRender, setLoading, worker }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await workerProjectAPI.create(payload);
         toast.success("Thêm người lao động thành công");
         setLoading(false);
         setRender((prev) => prev + 1);
         return { ...data, user: worker };
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

export const listWorkerProjectByProject = createAsyncThunk(
   "workerProject/listWorkerProjectByProject",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await workerProjectAPI.listByProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const workerProjectSclice = createSlice({
   name: "workerProject",
   initialState: {
      workerProject: {},
      workerProjects: [],
      listWPByProject: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createWorkerProject.pending]: (state, action) => {
         state.loading = true;
      },
      [createWorkerProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.workerProject = action.payload;
         state.workerProjects.push(action.payload);
         state.listWPByProject.push(action.payload);
      },
      [createWorkerProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by id project
      [listWorkerProjectByProject.pending]: (state, action) => {
         state.loading = true;
      },
      [listWorkerProjectByProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.listWPByProject = action.payload;
      },
      [listWorkerProjectByProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default workerProjectSclice;
