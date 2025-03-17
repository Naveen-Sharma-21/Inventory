import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a company focused on delivering excellent services to our
              clients. Our goal is to bring innovation and creativity to every
              project.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Dashboard 
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Customer
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Vendor
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Product
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Follow Us</h5>
            <a href="#" className="text-white me-3">
              <i className="bi bi-facebook"></i> Facebook
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-twitter"></i> Twitter
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-instagram"></i> Instagram
            </a>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <p>&copy; 2025 Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
