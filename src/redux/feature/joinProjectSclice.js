import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { joinProjectAPI } from "../../api/join-project";
import projectSclice from "./projectSclice";
import workerSclice from "./workerSclice";

export const createJoinProject = createAsyncThunk(
   "joinProject/createJoinProject",
   async ({ payload, toast, dispatch, setLoading, worker }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await joinProjectAPI.create(payload);
         // remove worker
         dispatch(workerSclice.actions.removeUser(worker._id));
         // add user join project
         dispatch(projectSclice.actions.addUserJoinProject(worker));

         // success
         toast.success("Thêm người lao động thành công");
         setLoading(false);
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

const joinProjectSclice = createSlice({
   name: "joinProject",
   initialState: {
      joinProject: {},
      joinProjects: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createJoinProject.pending]: (state, action) => {
         state.loading = true;
      },
      [createJoinProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.joinProjects.push(action.payload);
      },
      [createJoinProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default joinProjectSclice;
