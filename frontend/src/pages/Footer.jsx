import React from "react";
import { Container, Nav } from "react-bootstrap";
import Google from "../assets/googleplay.png";
import Apple from "../assets/app.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-black text-light pt-5 pb-3">
        <div className=" ">
          <div className="container">
            <div className="row px-4 px-lg-5">
              {/* Company */}
              <div className="col-6 col-md-3 mb-4">
                <h5 className="fw-bold">Company</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      to="/home"
                      className="text-light text-decoration-none"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about-us"
                      className="text-light text-decoration-none"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careers"
                      className="text-light text-decoration-none"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-light text-decoration-none"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Website Languages */}
              <div className="col-6 col-md-3 mb-4">
                <h5 className="fw-bold">View Website in</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      English
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      Spanish
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      French
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      German
                    </a>
                  </li>
                </ul>
              </div>

              {/* Help */}
              <div className="col-6 col-md-3 mb-4">
                <h5 className="fw-bold">Need Help</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/help-center" className="text-light text-decoration-none">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="/feedback" className="text-light text-decoration-none">
                      Feedback
                    </a>
                  </li>
           
                 <li>
                    <a href="/faq" className="text-light text-decoration-none">
                      FAQ
                    </a>
                  </li>

                         <li>
                    <a href="/help-settings" className="text-light text-decoration-none">
                      Setting & Help
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div className="col-6 col-md-3 mb-4">
                <h5 className="fw-bold">Connect with Us</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-light text-decoration-none">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="border-secondary" />

            {/* Bottom Section */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-4 px-lg-5">
              <div>
                <p className="mb-2 mb-md-0">
                  &copy; 2025 BBSNEO All rights reserved.
                </p>

                {/* Footer Links */}
                <nav className="mb-2 mb-md-0">
                  <a href="/terms-of-use" className="text-light text-decoration-none me-3">
                    Terms
                  </a>
                  <a href="/privacy-policy" className="text-light text-decoration-none me-3">
                    Privacy
                  </a>         
                  <a href="#" className="text-light text-decoration-none">
                    Follow Us
                  </a>
                </nav>
              </div>

              {/* App Store Badges */}
              <div className="d-flex align-items-center">
                <img
                  src={Google}
                  alt="Google Play"
                  className="me-3"
                  style={{ height: "60px", width: "auto" }}
                />
                <img
                  src={Apple}
                  alt="App Store"
                  style={{ height: "50px", width: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
