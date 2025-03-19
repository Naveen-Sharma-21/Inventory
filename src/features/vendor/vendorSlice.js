import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toastify

// REACT_APP_API_URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/vendors`; // Replace with real API

// Fetch all Vendors
export const fetchVendors = createAsyncThunk("fetchVendors", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const getVendorDetail = createAsyncThunk(
  "getVendorDetail",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }
);

// Add a new Vendor
export const addVendor = createAsyncThunk("addVendor", async (vendorData) => {
  const response = await axios.post(BASE_URL, vendorData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const updateVendor = createAsyncThunk(
  "updateVendor",
  async ({ id, vendorData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, vendorData);
    return response.data;
  }
);

export const deleteVendor = createAsyncThunk("deleteVendor", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id; // Returning Vendor id to be used for filtering
});

// *Initial State*
const initialState = {
  vendors: [],
  isLoading: false, // Single loading state for all actions
  error: null, // Single error state for all actions
};

// *Vendors Slice*
const Vendorslice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // *Handles Pending State for all async actions*
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      // *Handles Fulfilled State for each operation*
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.isLoading = false;

          switch (action.type) {
            case fetchVendors.fulfilled.type:
              state.vendors = action.payload;
              break;
            case getVendorDetail.fulfilled.type:
              state.vendors = action.payload;
              break;
            case addVendor.fulfilled.type:
              state.vendors = [...state.vendors, action.payload];
              toast.success(
                `Vendor with id: ${action.payload.id} added successfully!`
              );
              break;
            case updateVendor.fulfilled.type:
              state.vendors = state.vendors.map((cust) =>
                cust.id === action.payload.id ? action.payload : cust
              );
              toast.success(
                `Vendor with id: ${action.payload.id} updated successfully!`
              );
              break;
            case deleteVendor.fulfilled.type:
              state.vendors = state.vendors.filter(
                (cust) => cust.id !== action.payload
              );
              toast.success(
                `Vendor with id: ${action.payload} deleted successfully!`
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
          toast.error(`Error: ${action.error.message}`);
        }
      );
  },
});

// *Export Reducer*
export default Vendorslice.reducer;
