import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectAPI } from "../../api/project";

export const createProject = createAsyncThunk(
   "project/createProject",
   async ({ payload, toast, onHide, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await projectAPI.createProject(payload);
         toast.success("Thêm dự án thành công");
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

export const updateProjectPayslip = createAsyncThunk(
   "project/updateProjectPayslip",
   async ({ id, payload, toast, onHide, setLoading, payslip }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await projectAPI.updateProjectPayslip(id, payload);
         toast.success("Liên kết phiếu lương thành công");
         onHide();
         setLoading(false);
         return { data, payslip };
      } catch (error) {
         setLoading(false);
         console.log(error);
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

export const listProject = createAsyncThunk(
   "project/listProject",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await projectAPI.list();
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const listProjectByAllLevel = createAsyncThunk(
   "project/listProjectByAllLevel",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await projectAPI.listByAllLever(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

// export const listProjectByClient = createAsyncThunk(
//    "project/listProjectByClient",
//    async ({ id, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await projectAPI.listByClient(id);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

// export const listProjectByEmployees = createAsyncThunk(
//    "project/listProjectByEmployees",
//    async ({ id, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await projectAPI.listByEmployees(id);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

// export const listProjectByUser = createAsyncThunk(
//    "project/listProjectByUser",
//    async ({ id, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await projectAPI.listByUser(id);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

export const projectDetail = createAsyncThunk(
   "project/projectDetail",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await projectAPI.detail(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateProject = createAsyncThunk(
   "project/updateProject",
   async ({ id, payload, toast, onHide, setLoading, project, setLoad }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await projectAPI.updateProject(id, payload);
         toast.success("Cập nhật dự án thành công");
         onHide();
         setLoading(false);

         if (setLoad) {
            setLoad((prev) => prev + 1);
         }
         return { data, project };
      } catch (error) {
         setLoading(false);
         console.log(error);
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

export const deleteProject = createAsyncThunk(
   "project/deleteProject",
   async ({ id, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await projectAPI.deleteProject(id);
         toast.success("Xóa dự án thành công");
         onHide();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

const projectSclice = createSlice({
   name: "project",
   initialState: {
      searchName: "",
      filterPriority: "",
      project: {},
      projects: [],
      error: "",
      loading: false,
   },
   reducers: {
      projectDetail: (state, action) => {
         state.project = state.projects.find((item) => item._id === action.payload);
      },
      searchNameProject: (state, action) => {
         state.searchName = action.payload;
      },
      filterPriority: (state, action) => {
         state.filterPriority = action.payload;
      },
      addUserJoinProject: (state, action) => {
         state.project?.userEX?.push(action.payload);
      },
   },
   extraReducers: {
      [createProject.pending]: (state, action) => {
         state.loading = true;
      },
      [createProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.project = action.payload;
         state.projects.unshift(action.payload);
      },
      [createProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update
      [updateProjectPayslip.pending]: (state, action) => {
         state.loading = true;
      },
      [updateProjectPayslip.fulfilled]: (state, action) => {
         state.loading = false;
         state.project.payslip = [action.payload.payslip];
      },
      [updateProjectPayslip.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // get by id
      [projectDetail.pending]: (state, action) => {
         state.loading = true;
      },
      [projectDetail.fulfilled]: (state, action) => {
         state.loading = false;
         state.project = action.payload[0];
      },
      [projectDetail.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [listProject.pending]: (state, action) => {
         state.loading = true;
      },
      [listProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.projects = action.payload;
      },
      [listProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by client
      // [listProjectByClient.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listProjectByClient.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.projects = action.payload;
      // },
      // [listProjectByClient.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      // list by admin
      [listProjectByAllLevel.pending]: (state, action) => {
         state.loading = true;
      },
      [listProjectByAllLevel.fulfilled]: (state, action) => {
         state.loading = false;
         state.projects = action.payload;
      },
      [listProjectByAllLevel.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update
      [updateProject.pending]: (state, action) => {
         state.loading = true;
      },
      [updateProject.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.projects = state.projects.map((item) =>
               item._id === id ? action.payload.data : item
            );
         }
      },
      [updateProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // delete
      [deleteProject.pending]: (state, action) => {
         state.loading = true;
      },
      [deleteProject.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.projects = state.projects.filter((item) => item._id !== id);
         }
      },
      [deleteProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by worker
      // [listProjectByUser.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listProjectByUser.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.projects = action.payload;
      // },
      // [listProjectByUser.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      // list by employees
      // [listProjectByEmployees.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listProjectByEmployees.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.projects = action.payload;
      // },
      // [listProjectByEmployees.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },
   },
});

// export
export default projectSclice;
