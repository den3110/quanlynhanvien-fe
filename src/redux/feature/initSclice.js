import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const initUser = createAsyncThunk(
   "init/user",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.profile(id);
         setLoading(false);
         return data;
      } catch (error) {
         console.log(error);
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const workerProjectClient = createAsyncThunk(
   "init/workerProjectClient",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.workerProjectClient(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const initSclice = createSlice({
   name: "init",
   initialState: {
      initUser: {},
      socket: {},
      notificationWorker: [],
      error: "",
      loading: false,
   },
   reducers: {
      setSocket: (state, action) => {
         state.socket = action.payload;
      },
   },
   extraReducers: {
      //list
      [initUser.pending]: (state, action) => {
         state.loading = true;
      },
      [initUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.initUser = action.payload;
      },
      [initUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      [workerProjectClient.pending]: (state, action) => {
         state.loading = true;
      },
      [workerProjectClient.fulfilled]: (state, action) => {
         state.loading = false;
         state.notificationWorker = action.payload;
      },
      [workerProjectClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default initSclice;
