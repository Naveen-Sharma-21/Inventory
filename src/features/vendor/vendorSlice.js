import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//REACT_APP_API_URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/vendors`; // Replace with real API

// Fetch all vendors
export const fetchVendors = createAsyncThunk(BASE_URL, async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const getVendorDetail = createAsyncThunk(BASE_URL, async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

// Add a new vendors
export const addVendor = createAsyncThunk(BASE_URL, async (vendorData) => {
  const response = await axios.post(BASE_URL, vendorData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const updateVendor = createAsyncThunk(
  BASE_URL,
  async ({ id, VendorData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, VendorData);
    return response.data;
  }
);

export const deleteVendor = createAsyncThunk(BASE_URL, async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  // Returning deleted Vendor's ID
});

// *Initial State*
const initialState = {
  Vendors: [],
  isLoading: false, // Single loading state for all actions
  error: null, // Single error state for all actions
};

// *Vendors Slice*
const VendorSlice = createSlice({
  name: "Vendors",
  initialState,
  reducers: {}, // No regular reducers needed since all operations are async
  extraReducers: (builder) => {
    builder
      // *Handles Pending State for all async actions*
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null; // Reset error when a new request starts
        }
      )
      // *Handles Fulfilled State for each operation*
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.isLoading = false;

          switch (action.type) {
            case fetchVendors.fulfilled.type:
              state.Vendors = action.payload;
              break;
            case getVendorDetail.fulfilled.type:
              state.Vendors = action.payload;
              break;
            case addVendor.fulfilled.type:
              state.Vendors.push(action.payload);
              break;
            case updateVendor.fulfilled.type:
              state.Vendors = state.Vendors.map((cust) =>
                cust.id === action.payload.id ? action.payload : cust
              );
              break;
            case deleteVendor.fulfilled.type:
              state.Vendors = state.Vendors.filter(
                (cust) => cust.id !== action.payload
              );
              break;
            default:
              break;
          }
        }
      )
      // *Handles Rejected State for all async actions*
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

// *Export Reducer*
export default VendorSlice.reducer;
