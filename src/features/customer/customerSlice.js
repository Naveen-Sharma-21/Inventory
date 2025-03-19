import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importing toastify

// REACT_APP_API_URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/customers`; // Replace with real API

// Fetch all customers
export const fetchCustomers = createAsyncThunk('fetchCustomers', async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
});

export const getCustomerDetail = createAsyncThunk('getCustomerDetail', async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
});

// Add a new customer
export const addCustomer = createAsyncThunk('addCustomer', async (customerData) => {
    const response = await axios.post(BASE_URL, customerData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
});

export const updateCustomer = createAsyncThunk('updateCustomer', async ({ id, customerData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, customerData);
    return response.data;
});

export const deleteCustomer = createAsyncThunk('deleteCustomer', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id; // Returning customer id to be used for filtering
});

// *Initial State*
const initialState = {
    customers: [],
    isLoading: false, // Single loading state for all actions
    error: null, // Single error state for all actions
};

// *Customers Slice*
const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // *Handles Pending State for all async actions*
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            // *Handles Fulfilled State for each operation*
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
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
                            state.customers = [...state.customers, action.payload];
                            toast.success(
                                `Customer with id: ${action.payload.id} added successfully!`
                            );
                            break;
                        case updateCustomer.fulfilled.type:
                            state.customers = state.customers.map((cust) =>
                                cust.id === action.payload.id ? action.payload : cust
                            );
                            toast.success(
                                `Customer with id: ${action.payload.id} updated successfully!`
                            );
                            break;
                        case deleteCustomer.fulfilled.type:
                            state.customers = state.customers.filter(
                                (cust) => cust.id !== action.payload
                            );
                            toast.success(
                                `Customer with id: ${action.payload} deleted successfully!`
                            );
                            break;
                        default:
                            break;
                    }
                }
            )
            // *Handles Rejected State for all async actions*
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message;
                    toast.error(`Error: ${action.error.message}`);
                }
            );
    },
});

// *Export Reducer*
export default customerSlice.reducer;
