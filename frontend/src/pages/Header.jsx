import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineMenuBook, MdCancel } from "react-icons/md";
import { FaSearch, FaArrowAltCircleDown, FaUserCircle ,} from "react-icons/fa";
function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchBoxRef = useRef(null);

  // Detect click outside of search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        // Outside click: close page (go back or redirect)
        if (window.location.pathname === "/search-recommendations") {
          window.history.back(); // or window.location.href = "/Home";
        }
      }
    };
    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleUser = () => {
    if (query.trim()) {
      window.location.href = `/user-profile?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = `/user-profile`;
    }
  };
  const handleDownload = () => {
    if (query.trim()) {
      window.location.href = `/downloads?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = `/downloads`;
    }
  };  

  const handleMessenger = () => {
    if (query.trim()) {
      window.location.href = `/messenger?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = `/messenger`;
    }
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
              <Button variant="dark" onClick={() => setOpen(true)}>
                <MdOutlineMenuBook size={25} />
              </Button>
         
              <Button variant="dark" onClick={handleUser}>
                <FaUserCircle size={25} />
              </Button>
                   <Button variant="dark" onClick={handleDownload}>
                <FaArrowAltCircleDown size={25} />
              </Button>
            </div>
          </Container>
        </Navbar>
      </header>

      {/* Full-screen menu */}
      <div className={`fullscreen-menu ${open ? "show" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <MdCancel size={40} />
        </button>
        <nav className="fullscreen-links">
          <a href="/Home" onClick={() => setOpen(false)}>
            Home
          </a>
          <a href="/live" onClick={() => setOpen(false)}>
            Live TV
          </a>
        
          <a href="/media-pipeline" onClick={() => setOpen(false)}>
            Media Pipeline
          </a>
          <a href="/data-analytics" onClick={() => setOpen(false)}>
            Data Analytics
          </a>
          <a href="/security-safety" onClick={() => setOpen(false)}>
            Security Safety
          </a>
          <a href="/Observability" onClick={() => setOpen(false)}>
            Observability
          </a>
          <a href=" /selltement-finance" onClick={() => setOpen(false)}>
            Selltement Finance
          </a>
          <a href="/hybrid-delivery" onClick={() => setOpen(false)}>
            Hybrid Delivery
          </a>
          <a href="/monetization" onClick={() => setOpen(false)}>
            Monetization
          </a>
          <a href="/creator" onClick={() => setOpen(false)}>
            Creator
          </a>
        </nav>
      </div>

      <style>{`
        .header-wrapper {
          width: 100%;
          background-color: #212c3a;
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
        .search-form {
          flex-grow: 1;
          max-width: 400px;
        }
        .search-input {
          background-color: #2f3845;
          border: 1px solid #444;
          color: #fff;
        }
        .search-input::placeholder {
          color: #bbb;
        }
        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          z-index: 1101;
        }
        .fullscreen-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: rgba(0, 0, 0, 0.95);
          overflow: hidden;
          transition: height 0.4s ease;
          z-index: 1100;
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
