import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contractAPI } from "../../api/contract";

export const createOrUpdateContract = createAsyncThunk(
   "contract/createOrUpdateContract",
   async ({ payload, toast, setLoading, setRender }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractAPI.createOrUpdate(payload);
         toast.success("cập nhật thụ hưởng thành công");
         setLoading(false);
         setRender((prev) => prev + 1);
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

const contractSclice = createSlice({
   name: "contract",
   initialState: {
      contract: {},
      contracts: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createOrUpdateContract.pending]: (state, action) => {
         state.loading = true;
      },
      [createOrUpdateContract.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [createOrUpdateContract.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default contractSclice;
