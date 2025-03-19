import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCustomer, fetchCustomers } from '../../features/customer/customerSlice';
import { Link, Links } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import Loading from '../../pages/Loading';
const Customer = () => {
    // const { customer, isLoading, error } = useSelector(
    //   (state) => state.customer.customers
    // );
    const { customers, isLoading } = useSelector((state) => state.customers);
    console.log(customers, isLoading, 'customer, isLoading');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCustomers());
    }, []);

    const handleDeleteCustomer = async (e, id) => {
        e.preventDefault();
        dispatch(deleteCustomer(id));
        dispatch(fetchCustomers());
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className='container my-5'>
            <div className='d-flex justify-content-between'>
                <h2 className='mb-4'>Customer List</h2>
                <Link to={'/addcustomer'}>
                    <button className='btn btn-success mb-4'>+Add Customer</button>
                </Link>
            </div>
            <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Mobile No.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers ? (
                            customers.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <div className='d-flex'>
                                            <Link
                                                to={`/addcustomer/${item.id}`}
                                                className='btn btn-primary me-2'
                                            >
                                                <FaEdit size={18} />
                                            </Link>
                                            <button
                                                className='btn btn-danger'
                                                onClick={(e) => handleDeleteCustomer(e, item.id)}
                                            >
                                                <MdDeleteOutline size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>No data available</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customer;
