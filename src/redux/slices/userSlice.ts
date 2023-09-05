import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const token = Cookies.get("token");
  console.log("arif: ", token);
  if (token) {
    const response = await axios.get(`/api/me/${token}`);
    return response.data;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    // You can define other reducers here if needed
    removeuser() {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // action.payload contains the fetched data, so you can update the state
      // by directly returning the payload as the new state
      return action.payload;
    });
  },
});
export const { removeuser } = usersSlice.actions;

export default usersSlice.reducer;
