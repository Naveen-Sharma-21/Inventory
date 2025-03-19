import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Customer from './component/customer/Customer';

import Dashboard from './component/Dashboard';
import { Counter } from './pages/Counter';
import AddCustomer from './component/customer/AddCustomer';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />,
                },
                {
                    path: '/counter',
                    element: <Counter />,
                },
                {
                    path: '/customer',
                    element: <Customer />,
                },
                {
                    path: '/addcustomer',
                    element: <AddCustomer />,
                },
                {
                    path: '/addcustomer/:id',
                    element: <AddCustomer />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
