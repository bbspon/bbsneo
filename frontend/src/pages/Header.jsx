import React, { useState, useEffect, useRef } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { MdOutlineMenuBook, MdCancel } from "react-icons/md";
import { FaSearch, FaArrowAltCircleDown, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Header({ isLoggedIn }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef();

  // Close user dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/search-recommendations?q=${encodeURIComponent(
        query
      )}`;
    } else {
      window.location.href = `/search-recommendations`;
    }
  };

  const handleDownload = () => {
    window.location.href = query.trim()
      ? `/downloads?q=${encodeURIComponent(query)}`
      : `/downloads`;
  };

  const handleUserDropdown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + 5, left: rect.left });
    setOpenUserDropdown((prev) => !prev);
  };

  return (
    <>
      <header className="header-wrapper">
        <Navbar className="custom-navbar shadow px-4" sticky="top">
          <Container
            fluid
            className="d-flex justify-content-between align-items-center"
          >
            <Navbar.Brand
              href="/Home"
              className="fw-bold text-uppercase brand-title"
            >
              BBS NEO
            </Navbar.Brand>

            <div className="d-flex align-items-center gap-2">
              <Button variant="dark" onClick={handleSearch}>
                <FaSearch size={20} />
              </Button>

              <Button variant="dark" onClick={() => setOpenMenu(true)}>
                <MdOutlineMenuBook size={25} />
              </Button>

              <div ref={menuRef} className="position-relative">
                <Button variant="dark" onClick={handleUserDropdown}>
                  <FaUserCircle size={25} />
                </Button>

                {openUserDropdown && (
                  <div
                    className="dropdown-menu show shadow"
                    style={{
                      position: "fixed",
                      top: menuPosition.top,
                      left: menuPosition.left,
                      minWidth: "120px",
                      zIndex: 999999, // ✅ higher priority
                    }}
                  >
                    <a href="/user-profile" className="dropdown-item">
                      Profile
                    </a>
                    <a href="/settings" className="dropdown-item">
                      Settings
                    </a>
                    <a href="/subscription" className="dropdown-item">
                      Subscription
                    </a>

                    {isLoggedIn && (
                      <a href="/logout" className="dropdown-item">
                        Logout
                      </a>
                    )}

                    <div className="dropdown-divider"></div>

                    <a href="/rewards" className="dropdown-item">
                      Rewards
                    </a>
                    <a href="/downloads" className="dropdown-item">
                      Downloads
                    </a>
                  </div>
                )}
              </div>

              <Button variant="dark" onClick={handleDownload}>
                <FaArrowAltCircleDown size={25} />
              </Button>
            </div>
          </Container>
        </Navbar>
      </header>

      <div className={`fullscreen-menu ${openMenu ? "show" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setOpenMenu(false)}
          aria-label="Close menu"
        >
          <MdCancel size={40} />
        </button>
        <nav className="fullscreen-links">
          <a href="/Home" onClick={() => setOpenMenu(false)}>
            Home
          </a>
          <a href="/live" onClick={() => setOpenMenu(false)}>
            Live TV
          </a>
          <a href="/media-pipeline" onClick={() => setOpenMenu(false)}>
            Media Pipeline
          </a>
          <a href="/data-analytics" onClick={() => setOpenMenu(false)}>
            Data Analytics
          </a>
          <a href="/security-safety" onClick={() => setOpenMenu(false)}>
            Security Safety
          </a>
          <a href="/Observability" onClick={() => setOpenMenu(false)}>
            Observability
          </a>
          <a href="/selltement-finance" onClick={() => setOpenMenu(false)}>
            Selltement Finance
          </a>
          <a href="/hybrid-delivery" onClick={() => setOpenMenu(false)}>
            Hybrid Delivery
          </a>
          <a href="/monetization" onClick={() => setOpenMenu(false)}>
            Monetization
          </a>
          <a href="/creator" onClick={() => setOpenMenu(false)}>
            Creator
          </a>
        </nav>
      </div>

      <style>{`
        .header-wrapper {
          width: 100%;
          background-color: #212c3a;
          position: relative;
          z-index: 9999; /* ✅ Keeps navbar above all content */
        }

        .custom-navbar {
          background-color: #251e1e !important;
          border-bottom: 2px solid #75797c;
        }

        .brand-title {
          font-family: "Josefin Sans", sans-serif;
          color: #dc3545;
          letter-spacing: 2px;
          font-size: 1.5rem;
        }

        .fullscreen-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: rgba(0,0,0,0.95);
          overflow: hidden;
          transition: height 0.4s ease;
          z-index: 10000; /* ✅ On top of everything */
        }

        .fullscreen-menu.show {
          height: 100%;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 30px;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .close-btn:hover {
          color: #dc3545;
        }

        .fullscreen-links {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .fullscreen-links a {
          color: #fff;
          font-size: 1.8rem;
          text-decoration: none;
        }

        .fullscreen-links a:hover {
          color: #dc3545;
        }
      `}</style>
    </>
  );
}

export default Header;
