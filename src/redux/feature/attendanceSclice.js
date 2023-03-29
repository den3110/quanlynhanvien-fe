import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { attendanceAPI } from "../../api/attendance";

export const fetchWiffi = createAsyncThunk(
   "attendance/fetchWiffi",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.fetchWiffi();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const attendancePersonal = createAsyncThunk(
   "attendance/attendancePersonal",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.personal(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const todayAttendance = createAsyncThunk(
   "attendance/todayAttendance",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.today(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const userAttendance = createAsyncThunk(
   "attendance/userAttendance",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.userAttendance(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const createAttendance = createAsyncThunk(
   "attendance/createAttendance",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.createOrUpdate(payload);
         toast.success(`Đã chấm công wiffi ${payload?.wiffi}`);
         // onHide();
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

export const getAttendanceByUser = createAsyncThunk(
   "attendance/getAttendanceByUser",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.getAttendanceByUser(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const attendanceSclice = createSlice({
   name: "attendance",
   initialState: {
      attendance: {},
      attendances: [],
      allUserAttendance: [],
      wiffi: [],
      error: "",
      loading: false,
   },
   reducers: {
      learWiffi: (state, action) => {
         state.wiffi = [];
      },
   },
   extraReducers: {
      //list wiffi
      [fetchWiffi.pending]: (state, action) => {
         state.loading = true;
      },
      [fetchWiffi.fulfilled]: (state, action) => {
         state.loading = false;
         state.wiffi = action.payload;
      },
      [fetchWiffi.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
      //list wiffi
      [userAttendance.pending]: (state, action) => {
         state.loading = true;
      },
      [userAttendance.fulfilled]: (state, action) => {
         state.allUserAttendance = action.payload;
         state.loading = false;
      },
      [userAttendance.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //create wiffi
      [createAttendance.pending]: (state, action) => {
         state.loading = true;
      },
      [createAttendance.fulfilled]: (state, action) => {
         state.loading = false;
         // state.attendances.push(action.payload);
      },
      [createAttendance.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // get attendances personal
      [attendancePersonal.pending]: (state, action) => {
         state.loading = true;
      },
      [attendancePersonal.fulfilled]: (state, action) => {
         state.loading = false;
         state.attendances = action.payload;
      },
      [attendancePersonal.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // get attendances personal
      [todayAttendance.pending]: (state, action) => {
         state.loading = true;
      },
      [todayAttendance.fulfilled]: (state, action) => {
         state.loading = false;
         state.attendance = action.payload;
      },
      [todayAttendance.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // get attendances by user in date query
      [getAttendanceByUser.pending]: (state, action) => {
         state.loading = true;
      },
      [getAttendanceByUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.attendance = action.payload;
      },
      [getAttendanceByUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default attendanceSclice;
