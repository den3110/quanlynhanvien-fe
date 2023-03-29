import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth";
import { jwtManager } from "../../helpers/jwtManager";

// fix regeneratorRuntime is not defined
import "regenerator-runtime"; // no delete
import { UserRoleType } from "../../constant";

export const login = createAsyncThunk(
   "auth/login",
   async ({ payload, toast, props }, { rejectWithValue }) => {
      try {
         const { data } = await authAPI.login(payload);
         jwtManager.set(data.access_token);
         toast.success("Đăng nhập thành công");

         if (data?.user?.role === UserRoleType.ADMIN) {
            props.history.push("/app/main/dashboard");
         }

         if (data?.user?.role === UserRoleType.CLIENT) {
            props.history.push("/app/main/client-dashboard");
         }

         if (data?.user?.role === UserRoleType.EMPLOYEE) {
            props.history.push("/app/main/employee-dashboard");
         }

         if (data?.user?.role === UserRoleType.WORKER) {
            props.history.push("/app/projects/project_dashboard");
         }
         return data;
      } catch (error) {
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

export const registerUser = createAsyncThunk(
   "auth/registerUser",
   async ({ payload, toast, history, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await authAPI.registerUser(payload);
         toast.success("Đăng ký tài khoản thành công");
         history.push("/login");
         setLoading(false);
         return data;
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

export const currentUser = createAsyncThunk(
   "auth/currentUser",
   async ({ setLoading, history }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await authAPI.me();
         setLoading(false);
         return data;
      } catch (error) {
         console.log(error);
         setLoading(false);
         if (location.pathname !== "/login" && location.pathname !== "/register-user") {
            history.push("/login");
         }
         return rejectWithValue(error.response.data);
      }
   }
);

// export const listClient = createAsyncThunk("client/listClient", async (_, { rejectWithValue }) => {
//    try {
//       const { data } = await userAPI.listClient();
//       return data;
//    } catch (error) {
//       return rejectWithValue(error.response.data);
//    }
// });

const authSclice = createSlice({
   name: "auth",
   initialState: {
      user: {},
      token: "",
      error: "",
      loading: false,
   },
   reducers: {
      logout: (state, action) => {
         jwtManager.clear();
         state.user = {};
      },
   },
   extraReducers: {
      [login.pending]: (state, action) => {
         state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
         state.loading = false;
         state.user = action.payload.user;
         state.token = action.payload.access_token;
      },
      [login.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //current user
      [currentUser.pending]: (state, action) => {
         state.loading = true;
      },
      [currentUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.user = action.payload;
      },
      [currentUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //register user
      [registerUser.pending]: (state, action) => {
         state.loading = true;
      },
      [registerUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.user = action.payload;
      },
      [registerUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default authSclice;
