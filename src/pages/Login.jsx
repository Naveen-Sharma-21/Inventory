import React from "react";
import logo from "../assets/yashfineart.png";

const Login = () => {
  return (
    <div className="account-pages mt-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="auth-head position-relative">
                <div className="bg-overlay-2" />
                <div className="text-primary position-relative text-center p-5">
                  <a href="index.html" className="logo logo-admin">
                    <img src={logo} height={100} alt="logo" />
                  </a>
                  <h5 className="f-20 mt-3">Welcome Back !</h5>
                  <p className="mb-0">Sign in to continue to Yash Fine Art.</p>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="p-3">
                  <form className="custom-form" action="index.html">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="form-password mb-3 auth-pass-inputgroup">
                      <label className="form-label" htmlFor="userpassword">
                        Password
                      </label>
                      <div className="position-relative">
                        <input
                          type="password"
                          className="form-control"
                          id="password-input"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          className="btn btn-link position-absolute h-100 end-0 top-0 shadow-none"
                          id="password-addon"
                        >
                          <i className="mdi mdi-eye-outline f-16 text-muted" />
                        </button>
                      </div>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customControlInline"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customControlInline"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-primary rounded-3 w-100"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                  {/* end form */}
                </div>
              </div>
              {/* end cardbody */}
            </div>
            {/* end card */}
            <div className="mt-3 text-center">
              <p>
                Don't have an account ?{" "}
                <a href="signup-2.html" className="fw-bold text-success">
                  {" "}
                  Signup now{" "}
                </a>{" "}
              </p>
              <p className="mb-0">
                © 2025 Yash Fine Art. Crafted with{" "}
                <i className="mdi mdi-heart text-danger" /> by N&S Software
                Solutions
              </p>
            </div>
          </div>
          {/* end col */}
        </div>
        {/* end row */}
      </div>
    </div>
  );
};

export default Login;
