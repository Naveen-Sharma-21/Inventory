import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVendor, updateVendor } from "../../features/vendor/vendorSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddVendor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendors } = useSelector((state) => state.vendor);

  const [vendorData, setVendorData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setVendorData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addVendorDetails = async (e) => {
    e.preventDefault();
    try {
      let response = null;
      if (id) {
        response = await dispatch(updateVendor({ id, vendorData })).unwrap();
      } else {
        response = await dispatch(addVendor(vendorData)).unwrap();
      }
      if (response) {
        setTimeout(() => {
          navigate("/vendor");
        }, 2000);

        setVendorData({
          name: "",
          address: "",
          phone: "",
          email: "",
        });
      }
    } catch (error) {
      console.log("🚀 ~ addVendorDetails ~ error:", error);
      toast.error("Failed to add Vendor!"); // Show error toast
    }
  };

  useEffect(() => {
    if (id) {
      const vendorData = vendors?.find((data) => +data.id === +id);
      if (vendorData) {
        setVendorData({
          name: vendorData.name,
          address: vendorData.address,
          phone: vendorData.phone,
          email: vendorData.email,
        });
      }
    }
  }, [id, dispatch, vendors]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-container col-md-8 col-lg-6 border p-4 m-5 rounded">
          <h4 className="text-center mb-3">
            {!id ? "Add Vendor" : "Update Vendor"}
          </h4>
          <form
            className="row g-3 needs-validation"
            noValidate=""
            onSubmit={(e) => addVendorDetails(e)}
          >
            <div className="col-md-6">
              <label htmlFor="validationCustom01" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="VendorFirstName"
                required=""
                value={vendorData.name}
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
                value={vendorData.phone}
                id="VendorMobile"
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
                value={vendorData.email}
                className="form-control"
                id="VendorEmail"
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
                value={vendorData.address}
                id="VendorAddress"
                className="form-control"
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="col-12 text-center">
              <button className="btn btn-primary" type="submit">
                {id ? "Update Vendor" : "Create Vendor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;
