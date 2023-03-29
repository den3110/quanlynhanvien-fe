import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { rulesAPI } from "../../api/rules";

export const createRules = createAsyncThunk(
   "rules/createRules",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await rulesAPI.create(payload);
         toast.success("Cài đặt chấm công thành công");
         setLoading(false);
         onHide();
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

export const findRulesByIdProject = createAsyncThunk(
   "rules/findRulesByIdProject",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await rulesAPI.findOneByIdProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateRules = createAsyncThunk(
   "rules/updateRules",
   async ({ id, payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await rulesAPI.update(id, payload);
         toast.success("Cài đặt chấm công thành công");
         setLoading(false);
         onHide();
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

const rulesSclice = createSlice({
   name: "rules",
   initialState: {
      rule: {},
      rules: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      // created rules
      [createRules.pending]: (state, action) => {
         state.loading = true;
      },
      [createRules.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [createRules.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // fetch rules by id project
      [findRulesByIdProject.pending]: (state, action) => {
         state.loading = true;
      },
      [findRulesByIdProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.rule = action.payload;
      },
      [findRulesByIdProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update rules
      [updateRules.pending]: (state, action) => {
         state.loading = true;
      },
      [updateRules.fulfilled]: (state, action) => {
         state.loading = false;
         state.rule = action.payload;
      },
      [updateRules.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default rulesSclice;
