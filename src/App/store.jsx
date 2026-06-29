import { configureStore } from "@reduxjs/toolkit";

import staffReducer from "../features/staff/staffSlice"

export const store = configureStore({
  reducer: {
    staff: staffReducer,
  },
});