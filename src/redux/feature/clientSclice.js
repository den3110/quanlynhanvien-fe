import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createClient = createAsyncThunk(
   "client/createClient",
   async ({ payload, toast, handleClose, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.createClient(payload);
         toast.success("Thêm khách hàng thành công");
         handleClose();
         setLoading(false);
         empty();
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

export const listClient = createAsyncThunk(
   "client/listClient",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listClient();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listClientByEmployees = createAsyncThunk(
   "client/listClientByEmployees",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listClientByEmployees(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateClient = createAsyncThunk(
   "client/updateClient",
   async ({ id, payload, toast, handleClose, setLoading, empty }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.updateClient(id, payload);
         toast.success("Cập nhật khách hàng thành công");
         handleClose();
         setLoading(false);
         empty();
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

export const removeClient = createAsyncThunk(
   "client/removeClient",
   async ({ id, onHide, setLoading, toast }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.remove(id);
         setLoading(false);
         onHide();
         toast.success(`Xóa khách hàng thành công`);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const clientProfile = createAsyncThunk(
   "worker/clientProfile",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.profile(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const clientSclice = createSlice({
   name: "client",
   initialState: {
      searchName: "",
      filterCompany: "",
      client: {},
      clients: [],
      error: "",
      loading: false,
   },
   reducers: {
      searchNameClient: (state, action) => {
         state.searchName = action.payload;
      },

      filterCompany: (state, action) => {
         state.filterCompany = action.payload;
      },
   },
   extraReducers: {
      [createClient.pending]: (state, action) => {
         state.loading = true;
      },
      [createClient.fulfilled]: (state, action) => {
         state.loading = false;
         state.client = action.payload;
         state.clients.push(action.payload);
      },
      [createClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      [listClient.pending]: (state, action) => {
         state.loading = true;
      },
      [listClient.fulfilled]: (state, action) => {
         state.loading = false;
         state.clients = action.payload;
      },
      [listClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update
      [updateClient.pending]: (state, action) => {
         state.loading = true;
      },
      [updateClient.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.clients = state.clients.map((item) => (item._id === id ? action.payload : item));
         }
      },
      [updateClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // remove
      [removeClient.pending]: (state, action) => {
         state.loading = true;
      },
      [removeClient.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.clients = state.clients.filter((item) => item._id !== id);
         }
      },
      [removeClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list client by employees
      [listClientByEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [listClientByEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         state.clients = action.payload;
      },
      [listClientByEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //  client profile
      [clientProfile.pending]: (state, action) => {
         state.loading = true;
      },
      [clientProfile.fulfilled]: (state, action) => {
         state.loading = false;
         state.client = action.payload;
      },
      [clientProfile.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default clientSclice;
