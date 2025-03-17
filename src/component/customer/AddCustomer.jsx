import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomer,
  getCustomerDetail,
} from "../../features/customer/customerSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddCustomer = () => {
  const isEmpty = (obj) => Object.keys(obj).length === 0;
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer.customers);

  //const customerFilter = customer.filter((item) => item.id == id.id);
  console.log(customer);

  const [customerData, setCustomerData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCustomerData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addCustomerDetails = (e) => {
    e.preventDefault();
    dispatch(addCustomer(customerData));
    console.log(dispatch(addCustomer(customerData)));

    setCustomerData({
      name: "",
      address: "",
      phone: "",
      email: "",
    });

    navigate("/customer");
  };

  useEffect(() => {
    dispatch(getCustomerDetail(id.id));
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-container col-md-8 col-lg-6 border p-4 m-5 rounded">
          <h4 className="text-center mb-3">
            {isEmpty(id) ? "Add Customer" : "Update Customer"}
          </h4>
          <form
            className="row g-3 needs-validation"
            noValidate=""
            onSubmit={(e) => addCustomerDetails(e)}
          >
            <div className="col-md-6">
              <label htmlFor="validationCustom01" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="customerFirstName"
                required=""
                value={customerData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="validationCustom03" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={customerData.phone}
                id="customerMobile"
                required=""
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="validationCustom03" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={customerData.email}
                className="form-control"
                id="customerEmail"
                required=""
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="validationCustom03" className="form-label">
                Address
              </label>
              <textarea
                rows={3}
                name="address"
                value={customerData.address}
                id="customerAddress"
                className="form-control"
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="col-12 text-center">
              <button className="btn btn-primary" type="submit">
                Create Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
