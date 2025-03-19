import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, updateCustomer } from '../../features/customer/customerSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCustomer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { customers } = useSelector((state) => state.customers);

    const [customerData, setCustomerData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCustomerData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const addCustomerDetails = async (e) => {
        e.preventDefault();
        try {
            let response = null;
            if (id) {
                response = await dispatch(updateCustomer({ id, customerData })).unwrap();
            } else {
                response = await dispatch(addCustomer(customerData)).unwrap();
            }
            if (response) {
                setTimeout(() => {
                    navigate('/customer');
                }, 2000);

                setCustomerData({
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                });
            }
        } catch (error) {
            console.log('🚀 ~ addCustomerDetails ~ error:', error);
            toast.error('Failed to add customer!'); // Show error toast
        }
    };

    useEffect(() => {
        if (id) {
            const customerData = customers?.find((data) => +data.id === +id);
            if (customerData) {
                setCustomerData({
                    name: customerData.name,
                    address: customerData.address,
                    phone: customerData.phone,
                    email: customerData.email,
                });
            }
        }
    }, [id, dispatch]);

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='form-container col-md-8 col-lg-6 border p-4 m-5 rounded'>
                    <h4 className='text-center mb-3'>{!id ? 'Add Customer' : 'Update Customer'}</h4>
                    <form
                        className='row g-3 needs-validation'
                        noValidate=''
                        onSubmit={(e) => addCustomerDetails(e)}
                    >
                        <div className='col-md-6'>
                            <label htmlFor='validationCustom01' className='form-label'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                className='form-control'
                                id='customerFirstName'
                                required=''
                                value={customerData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='col-md-6'>
                            <label htmlFor='validationCustom03' className='form-label'>
                                Mobile
                            </label>
                            <input
                                type='text'
                                name='phone'
                                className='form-control'
                                value={customerData.phone}
                                id='customerMobile'
                                required=''
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor='validationCustom03' className='form-label'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={customerData.email}
                                className='form-control'
                                id='customerEmail'
                                required=''
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='col-md-12'>
                            <label htmlFor='validationCustom03' className='form-label'>
                                Address
                            </label>
                            <textarea
                                rows={3}
                                name='address'
                                value={customerData.address}
                                id='customerAddress'
                                className='form-control'
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className='col-12 text-center'>
                            <button className='btn btn-primary' type='submit'>
                                {id ? 'Update Customer' : 'Create Customer'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;
