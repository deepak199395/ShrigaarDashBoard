import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStaffAPI,
  addStaffAPI,
  updateStaffAPI,
  deleteStaffAPI,
} from "./staffAPI";

const initialState = {
  staffList: [],
  loading: false,
  error: null,
};
// FETCH STAFF
export const fetchStaff = createAsyncThunk("staff/fetchStaff", async () => {
  return await fetchStaffAPI();
});
// ADD STAFF
export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async (staffData) => {
    return await addStaffAPI(staffData);
  },
);
// UPDATE STAFF
export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ id, updatedData }) => {
    return await updateStaffAPI({ id, updatedData });
  },
);
// DELETE STAFF
export const deleteStaff = createAsyncThunk("staff/deleteStaff", async (id) => {
  return await deleteStaffAPI(id);
});

const staffSlice = createSlice({
  name: "staff",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // FETCH STAFF
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })

      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // ADD STAFF
    builder
      .addCase(addStaff.pending, (state) => {
        state.loading = true;
      })

      .addCase(addStaff.fulfilled, (state, action) => {
        state.loading = false;

        state.staffList.push(action.payload);
      })

      .addCase(addStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // UPDATE STAFF
    builder.addCase(updateStaff.fulfilled, (state, action) => {
      const index = state.staffList.findIndex(
        (staff) => staff._id === action.payload._id,
      );

      if (index !== -1) {
        state.staffList[index] = action.payload;
      }
    });

    // DELETE STAFF
    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.staffList = state.staffList.filter(
        (staff) => staff._id !== action.payload,
      );
    });
  },
});

export default staffSlice.reducer;
