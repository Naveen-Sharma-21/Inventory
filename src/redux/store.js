import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import customerReducer from "../features/customer/customerSlice";
import vendorReducer from "../features/vendor/vendorSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customer: customerReducer,
    vendor: vendorReducer,
  },
});
