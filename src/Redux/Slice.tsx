import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  Instance  from "../Config/Instance";

const initialState = {
    initialFormData: [],
    updatedFormData:[],
    error:[],
    status:'',
}

export const fetchForm: any = createAsyncThunk(
    "fetchForm",
    async () => {
      try {
        const res = await Instance.get("/form");
        return res;
      } catch (err) {
        return err;
      }
    }
  );
  export const updateForm: any = createAsyncThunk(
    "updateForm",
    async (body) => {
      try {
        const res = await Instance.post("/form",body);
        return res;
      } catch (err) {
        return err;
      }
    }
  );
  
  


export const formSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => 
    {
      builder.addCase(fetchForm.fulfilled, (state, action) => {
        state.initialFormData = action.payload;
       
      });
      builder.addCase(fetchForm.rejected, (state, action) => {
        state.error = action.payload;
        state.status="fail";
      });
      builder.addCase(fetchForm.pending, (state) => {
        state.status="pending";
      });

      builder.addCase(updateForm.fulfilled, (state, action) => {
        state.updatedFormData = action.payload;
       
      });
      builder.addCase(updateForm.rejected, (state, action) => {
        state.error = action.payload;
        state.status="fail";
      });
      builder.addCase(updateForm.pending, (state) => {
        state.status="pending";
      });
    }
    })

    export default formSlice.reducer;