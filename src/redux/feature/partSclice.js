import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { partAPI } from "../../api/part";

export const createPart = createAsyncThunk(
   "part/createPart",
   async ({ payload, toast, empty, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.create(payload);
         empty();
         toast.success("Thêm bộ phận thành công");
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

export const listPartByIdProject = createAsyncThunk(
   "part/listPart",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.listByIdProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const checkNotAssignPart = createAsyncThunk(
   "part/checkNotAssignPart",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.checkNotAssignPart(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const addUserToPart = createAsyncThunk(
   "part/addUserToPart",
   async (
      { payload, toast, setLoading, userData, joinpartEX, setJoinpartEX },
      { rejectWithValue }
   ) => {
      try {
         setLoading(true);
         const { data } = await partAPI.createUserJoinPart(payload);
         // add hoinpartEx
         setJoinpartEX([
            ...joinpartEX,
            { ...userData, userId: userData._id, joinpartId: data._id },
         ]);

         toast.success(`Thêm người lao động vào bộ phận`);
         setLoading(false);
         return { data, userData };
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

export const precentPartByIdProject = createAsyncThunk(
   "part/precentPartByIdProject",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.precentPartByIdProject(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const removeUserInPart = createAsyncThunk(
   "part/removeUserInPart",
   async ({ id, setLoading, toast, user, setJoinpartEX, joinpartEX }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.removeUserInPart(id);
         // delete join part
         setJoinpartEX(joinpartEX.filter((i) => i.joinpartId !== id));
         toast.success(`removed a user in part ${data?.name}`);
         setLoading(false);
         return { data, user };
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

export const child = createAsyncThunk(
   "part/child",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.child(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const checkPartNotAssignTask = createAsyncThunk(
   "assignTask/checkPartNotAssignTask",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.checkPartNotAssignTask(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

const partSclice = createSlice({
   name: "part",
   initialState: {
      part: {},
      parts: [],
      userNotAssignPart: [],
      partNotAssignTask: [],
      precentPart: [],
      error: "",
      loading: false,
   },
   reducers: {
      updateSize: (state, action) => {
         state.parts = state.parts?.map((item) =>
            item?._id === action.payload ? { ...item, size: +item?.size + 1 } : item
         );
      },
      removePartNotAssignTask: (state, action) => {
         state.partNotAssignTask = state.partNotAssignTask.filter(
            (item) => item._id !== action.payload
         );
      },
   },
   extraReducers: {
      // create part
      [createPart.pending]: (state, action) => {
         state.loading = true;
      },
      [createPart.fulfilled]: (state, action) => {
         state.loading = false;

         // page part parent
         state.parts = state.parts?.map((item) =>
            item._id === action.payload?.parent
               ? { ...item, sizeChild: +item?.sizeChild + 1 }
               : item
         );
      },
      [createPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list part by id project
      [listPartByIdProject.pending]: (state, action) => {
         state.loading = true;
      },
      [listPartByIdProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.parts = action.payload;
      },
      [listPartByIdProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // load user not assign part
      [checkNotAssignPart.pending]: (state, action) => {
         state.loading = true;
      },
      [checkNotAssignPart.fulfilled]: (state, action) => {
         state.loading = false;
         state.userNotAssignPart = action.payload;
      },
      [checkNotAssignPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // add user to part
      [addUserToPart.pending]: (state, action) => {
         state.loading = true;
      },
      [addUserToPart.fulfilled]: (state, action) => {
         state.loading = false;

         const {
            arg: {
               payload: { joinor, part },
            },
         } = action.meta;

         // delete user
         state.userNotAssignPart = state.userNotAssignPart.filter((item) => item._id !== joinor);

         // update userEX
         state.parts = state.parts?.map((item) =>
            item._id === part
               ? { ...item, joinpartEX: [...item.joinpartEX, action.payload.userData] }
               : item
         );
      },
      [addUserToPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // load user not assign part
      [precentPartByIdProject.pending]: (state, action) => {
         state.loading = true;
      },
      [precentPartByIdProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.precentPart = action.payload;
      },
      [precentPartByIdProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // remove user in part
      [removeUserInPart.pending]: (state, action) => {
         state.loading = true;
      },
      [removeUserInPart.fulfilled]: (state, action) => {
         state.loading = false;

         const { joinor, part } = action.payload.data;

         // remove user in part
         state.parts = state.parts?.map((item) =>
            item._id === part
               ? { ...item, joinpartEX: item.joinpartEX.filter((i) => i.userId !== joinor) }
               : item
         );

         state.userNotAssignPart = [
            ...state.userNotAssignPart,
            { ...action.payload.user, _id: joinor },
         ];
      },
      [removeUserInPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // load part child
      [child.pending]: (state, action) => {
         state.loading = true;
      },
      [child.fulfilled]: (state, action) => {
         state.loading = false;
         state.parts = action.payload;
      },
      [child.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // precent finish = true
      [checkPartNotAssignTask.pending]: (state, action) => {
         state.loading = true;
      },
      [checkPartNotAssignTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.partNotAssignTask = action.payload;
      },
      [checkPartNotAssignTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default partSclice;
