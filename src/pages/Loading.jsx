import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-3">Loading, please wait...</h4>
      </div>
    </div>
  );
};

export default Loading;
