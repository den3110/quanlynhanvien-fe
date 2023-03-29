import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { massageAPI } from "../../api/message";

export const listMessage = createAsyncThunk(
   "message/listMessage",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await massageAPI.chatDouble(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const notificationMessage = createAsyncThunk(
   "message/notificationMessage",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await massageAPI.notification(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const messageSclice = createSlice({
   name: "message",
   initialState: {
      message: {},
      messages: [],
      messageNotification: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      //list
      [listMessage.pending]: (state, action) => {
         state.loading = true;
      },
      [listMessage.fulfilled]: (state, action) => {
         state.loading = false;
         state.messages = action.payload;
      },
      [listMessage.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
      //notifycation
      [notificationMessage.pending]: (state, action) => {
         state.loading = true;
      },
      [notificationMessage.fulfilled]: (state, action) => {
         state.loading = false;
         state.messageNotification = action.payload;
      },
      [notificationMessage.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default messageSclice;
