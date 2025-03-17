import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//REACT_APP_API_URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/customers`; // Replace with real API

// Fetch all customers
export const fetchCustomers = createAsyncThunk(BASE_URL, async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const getCustomerDetail = createAsyncThunk(BASE_URL, async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

// Add a new customer
export const addCustomer = createAsyncThunk(BASE_URL, async (customerData) => {
  const response = await axios.post(BASE_URL, customerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const updateCustomer = createAsyncThunk(
  BASE_URL,
  async ({ id, customerData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, customerData);
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(BASE_URL, async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  // Returning deleted customer's ID
});

// *Initial State*
const initialState = {
  customers: [],
  isLoading: false, // Single loading state for all actions
  error: null, // Single error state for all actions
};

// *Customers Slice*
const customerSlice = createSlice({
  name: "customers",
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
            case fetchCustomers.fulfilled.type:
              state.customers = action.payload;
              break;
            case getCustomerDetail.fulfilled.type:
              state.customers = action.payload;
              break;
            case addCustomer.fulfilled.type:
              state.customers.push(action.payload);
              break;
            case updateCustomer.fulfilled.type:
              state.customers = state.customers.map((cust) =>
                cust.id === action.payload.id ? action.payload : cust
              );
              break;
            case deleteCustomer.fulfilled.type:
              state.customers = state.customers.filter(
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
export default customerSlice.reducer;
