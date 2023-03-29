import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { assignTaskAPI } from "../../api/assignTask";

// export const createAssignTask = createAsyncThunk(
//    "assignTask/createAssignTask",
//    async ({ payload, toast, setLoading, assignTask }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await assignTaskAPI.createAssign(payload);
//          toast.success("Giao công việc thành công");
//          setLoading(false);
//          return { data, assignTask };
//       } catch (error) {
//          setLoading(false);
//          if (typeof error?.response?.data?.message === "string") {
//             toast.error(error?.response?.data?.message);
//          } else {
//             error?.response?.data?.message?.forEach((item) => {
//                toast.error(item);
//             });
//          }
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

export const listAssignTask = createAsyncThunk(
   "assignTask/listAssignTask",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.list();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listAssignByTask = createAsyncThunk(
   "assignTask/listAssignByTask",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.listByTask(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const checkNotAssignTask = createAsyncThunk(
   "assignTask/checkNotAssignTask",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.checkNotAssignTask(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listAssignTaskByProject = createAsyncThunk(
   "assignTask/listAssignTaskByProject",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.listByProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updatePerform = createAsyncThunk(
   "assignTask/updatePerform",
   async ({ id, payload, toast, setLoading, record }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.updatePerform(id, payload);
         setLoading(false);
         toast.success(`cập nhật trạng thái thực hiện thành công`);
         return { data, record };
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateFinish = createAsyncThunk(
   "assignTask/updateFinish",
   async ({ id, payload, toast, setLoading, record }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.updateFinish(id, payload);
         setLoading(false);
         toast.success(`cập nhật trạng thái hoàn thành thành công`);
         return { data, record };
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const performTrueByIdProject = createAsyncThunk(
   "assignTask/performTrueByIdProject",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.performTrueByIdProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const finishTrueByIdProject = createAsyncThunk(
   "assignTask/finishTrueByIdProject",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.finishTrueByIdProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const precentTaskPerfromTrue = createAsyncThunk(
   "assignTask/precentTaskPerfrom",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.precentTaskPerfrom(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const precentTaskFinishTrue = createAsyncThunk(
   "assignTask/precentTaskFinish",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.precentTaskFinish(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const precentFinishTrue = createAsyncThunk(
   "assignTask/precentFinishTrue",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.precentFinish(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

// export const createAssignTaskByPart = createAsyncThunk(
//    "assignTask/createAssignTaskByPart",
//    async ({ payload, toast, setLoading, assignTask, workers }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await assignTaskAPI.createAssignByPart(payload);
//          toast.success("Giao công việc thành công");
//          setLoading(false);
//          return { data, assignTask, task: payload.task, workers };
//       } catch (error) {
//          setLoading(false);
//          if (typeof error?.response?.data?.message === "string") {
//             toast.error(error?.response?.data?.message);
//          } else {
//             error?.response?.data?.message?.forEach((item) => {
//                toast.error(item);
//             });
//          }
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

const assignTaskSclice = createSlice({
   name: "assignTask",
   initialState: {
      assignTask: {},
      assignTasks: [],
      notAssignTask: [],
      assignTaskByTask: [],
      assignTaskPerformTrue: [],
      assignTaskFinishTrue: [],
      precentTaskPerfrom: [],
      precentTaskFinish: [],
      precentFinish: [],
      // partNotAssignTask: [],
      error: "",
      loading: false,
   },
   reducers: {
      // addAssignTasks: (state, action) => {
      //    state.assignTasks = [...state.assignTasks, ...action.payload];
      // },
   },
   extraReducers: {
      //assign
      // [createAssignTask.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [createAssignTask.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.notAssignTask = state.notAssignTask.filter(
      //       (item) => item._id !== action.payload.data.worker
      //    );
      //    state.assignTasks.push({ ...action.payload.assignTask, _id: action.payload.data._id });
      // },
      // [createAssignTask.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      //list
      [listAssignTask.pending]: (state, action) => {
         state.loading = true;
      },
      [listAssignTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTasks = action.payload;
      },
      [listAssignTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list by task
      [listAssignByTask.pending]: (state, action) => {
         state.loading = true;
      },
      [listAssignByTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTaskByTask = action.payload;
      },
      [listAssignByTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list by task
      [checkNotAssignTask.pending]: (state, action) => {
         state.loading = true;
      },
      [checkNotAssignTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.notAssignTask = action.payload;
      },
      [checkNotAssignTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by project
      [listAssignTaskByProject.pending]: (state, action) => {
         state.loading = true;
      },
      [listAssignTaskByProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTasks = action.payload;
      },
      [listAssignTaskByProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // updated by project
      [updatePerform.pending]: (state, action) => {
         state.loading = true;
      },
      [updatePerform.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: {
               id,
               payload: { verify },
            },
         } = action.meta;

         //update assigntasks
         state.assignTasks = state.assignTasks.map((item) =>
            item._id === id
               ? { ...item, perform: { status: verify, date: action.payload.data.perform?.date } }
               : item
         );

         // update assignTaskPerformtrue
         if (verify === false) {
            state.assignTaskPerformTrue = state.assignTaskPerformTrue.filter(
               (item) => item._id !== id
            );
         } else {
            state.assignTaskPerformTrue.push(action.payload.record);
         }
      },
      [updatePerform.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // updated by finish
      [updateFinish.pending]: (state, action) => {
         state.loading = true;
      },
      [updateFinish.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: {
               id,
               payload: { verify },
            },
         } = action.meta;

         // update assigntasks
         state.assignTasks = state.assignTasks.map((item) =>
            item._id === id
               ? { ...item, finish: { status: verify, date: action.payload.data?.finish?.date } }
               : item
         );

         // update assignTaskFinishtrue
         if (verify === false) {
            state.assignTaskFinishTrue = state.assignTaskFinishTrue.filter(
               (item) => item._id !== id
            );
         } else {
            state.assignTaskFinishTrue.push(action.payload.record);
         }
      },
      [updateFinish.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // get assign task at perform true by id project
      [performTrueByIdProject.pending]: (state, action) => {
         state.loading = true;
      },
      [performTrueByIdProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTaskPerformTrue = action.payload;
      },
      [performTrueByIdProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // get assign task at finish true by id project
      [finishTrueByIdProject.pending]: (state, action) => {
         state.loading = true;
      },
      [finishTrueByIdProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTaskFinishTrue = action.payload;
      },
      [finishTrueByIdProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // precent task perform = true
      [precentTaskPerfromTrue.pending]: (state, action) => {
         state.loading = true;
      },
      [precentTaskPerfromTrue.fulfilled]: (state, action) => {
         state.loading = false;
         state.precentTaskPerfrom = action.payload;
      },
      [precentTaskPerfromTrue.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // precent task finish = true
      [precentTaskFinishTrue.pending]: (state, action) => {
         state.loading = true;
      },
      [precentTaskFinishTrue.fulfilled]: (state, action) => {
         state.loading = false;
         state.precentTaskFinish = action.payload;
      },
      [precentTaskFinishTrue.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // precent finish = true
      [precentFinishTrue.pending]: (state, action) => {
         state.loading = true;
      },
      [precentFinishTrue.fulfilled]: (state, action) => {
         state.loading = false;
         state.precentFinish = action.payload;
      },
      [precentFinishTrue.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //assign by part
      // [createAssignTaskByPart.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [createAssignTaskByPart.fulfilled]: (state, action) => {
      //    state.loading = false;

      //    const {
      //       arg: {
      //          payload: { part },
      //       },
      //    } = action.meta;

      //    // remove part
      //    state.partNotAssignTask = state.partNotAssignTask.filter((item) => item._id !== part);

      //    // push new data
      //    state.assignTasks = [...state.assignTasks, ...action.payload.assignTask];

      //    // remove user dialog assign
      //    if (action.payload.workers.length > 0) {
      //       state.notAssignTask = state.notAssignTask.filter(
      //          (item) => !action.payload.workers?.includes(item?._id)
      //       );
      //    }
      // },
      // [createAssignTaskByPart.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },
   },
});

// export
export default assignTaskSclice;
