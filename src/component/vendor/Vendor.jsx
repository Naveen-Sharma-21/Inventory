import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteVendor, fetchVendors } from "../../features/vendor/vendorSlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Loading from "../../pages/Loading";
const Vendor = () => {
  // const { Vendor, isLoading, error } = useSelector(
  //   (state) => state.Vendor.Vendors
  // );
  const { vendors, isLoading } = useSelector((state) => state.vendor);
  console.log(vendors, isLoading, "Vendor, isLoading");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const handleDeleteVendor = async (e, id) => {
    e.preventDefault();
    dispatch(deleteVendor(id));
    dispatch(fetchVendors());
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Vendor List</h2>
        <Link to={"/addVendor"}>
          <button className="btn btn-success mb-4">+Add Vendor</button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
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
            {vendors ? (
              vendors.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        to={`/addVendor/${item.id}`}
                        className="btn btn-primary me-2"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDeleteVendor(e, item.id)}
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

export default Vendor;
