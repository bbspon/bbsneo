// HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Carousel,
  Modal,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import {
  FaHome,
  FaFire,
  FaListUl,
  FaTv,
  FaUser,
  FaMoon,
  FaSun,
  FaSearch,
} from "react-icons/fa";
import { PiPopcornDuotone } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { SiShortcut } from "react-icons/si";
import { SiYoutubestudio } from "react-icons/si";
import { FaFacebookMessenger } from "react-icons/fa";
import Sidebar from "../components/Sidebar";


import Logo from "../assets/logo.png";
// ---------- DEMO DATA ---------- //
const heroSlides = [
  {
    title: "Epic Adventure 1",
    subtitle: "Streaming now!",
    img: "https://wallpapercave.com/wp/wp1945939.jpg",
    previewUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Epic Adventure 2",
    subtitle: "Don't miss out!",
    img: "https://wallpaperaccess.com/full/3075770.jpg",
    previewUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const makeMovies = (prefix, count, genre) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: `${prefix} ${i + 1}`,
    img: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2022/08/AVATAR_RERLS_1SHT_DIGITAL_sRGB_V7.jpg",
    previewUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    genre,
  }));

const allContent = [
  ...makeMovies("Action", 8, "Action"),
  ...makeMovies("Drama", 8, "Drama"),
  ...makeMovies("Comedy", 8, "Comedy"),
];

// ---------- COMPONENT ---------- //
const HomePage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
const [showMessenger, setShowMessenger] = useState(false);
  // --- Search Overlay ---
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = allContent.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  // --- Genre Filter ---
  const genres = ["All", "Action", "Drama", "Comedy"];
  const [selectedGenre, setSelectedGenre] = useState("All");

  // --- Continue Watching ---
  const [continueWatching, setContinueWatching] = useState(
    JSON.parse(localStorage.getItem("continue")) || []
  );

  const addToWatchlist = (item) => {
    if (!watchlist.find((w) => w.id === item.id)) {
      setWatchlist([...watchlist, item]);
      Swal.fire({
        icon: "success",
        title: `${item.title} added!`,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const updateProgress = (item) => {
    const updated = [
      ...continueWatching.filter((i) => i.id !== item.id),
      { ...item, time: Date.now() },
    ];
    localStorage.setItem("continue", JSON.stringify(updated));
    setContinueWatching(updated);
    Swal.fire("Saved!", `${item.title} progress saved.`, "success");
  };

  // Filtered list for main grid
  const visibleContent =
    selectedGenre === "All"
      ? allContent
      : allContent.filter((c) => c.genre === selectedGenre);

  return (
    <>
      <div
        className={`homepage ${collapsed ? "sidebar-collapsed" : ""} ${
          darkMode ? "dark" : "light"
        }`}
      >
        {/* ---------- Sidebar ---------- */}
        {/* <aside
          className={`sidebar d-flex flex-column align-items-center ${
            collapsed ? "collapsed" : ""
          }`}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <Nav className="flex-column sidebar-nav align-items-start px-2 justify-content-center w-100 text-center">
            <Nav.Link
              as={Link}
              to="/home"
              className="d-flex align-items-center justify-content-center"
               onClick={() => window.location.reload()}
            >
              <FaHome className="me-2" /> <span>Home</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/search-recommendations"
              className="d-flex align-items-center justify-content-center"
            >
              <FaSearch className="me-2" /> <span>Search</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/movies"
              className="d-flex align-items-center justify-content-center"
            >
              <PiPopcornDuotone className="me-2" /> <span>Movies</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/movies"
              className="d-flex align-items-center justify-content-center"
            >
              <FaFire className="me-2" /> <span>Trending</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/reel-short"
              className="d-flex align-items-center justify-content-center"
            >
              <SiShortcut className="me-2" /> <span>Reel & Shorts</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/live"
              className="d-flex align-items-center justify-content-center"
            >
              <FaTv className="me-2" /> <span>Live TV</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/categories"
              className="d-flex align-items-center justify-content-center"
            >
              <BiCategory className="me-2" /> <span>Categories</span>
            </Nav.Link>

             <Nav.Link
              as={Link}
              to="/ystudio"
              className="d-flex align-items-center justify-content-center"
            >
              <SiYoutubestudio  className="me-2" /> <span>Y-Studio</span>
            </Nav.Link>

             
             <Nav.Link
              as={Link}
              to="/messenger"
              className="d-flex align-items-center justify-content-center"
            >
              <FaFacebookMessenger  className="me-2" /> <span>Messenger</span>
            </Nav.Link>
            <Nav.Link
              className="d-flex align-items-center justify-content-center"
              onClick={() => setDarkMode((d) => !d)}
            >
          
              {darkMode ? (
                <FaSun className="me-2" />
              ) : (
                <FaMoon className="me-2" />
              )}
              <span>Theme</span>
            </Nav.Link>
          </Nav>
        </aside> */}
    <aside
  className={`sidebar d-flex flex-column align-items-center ${collapsed ? "collapsed" : ""}`}
  onMouseEnter={() => setCollapsed(false)}
  onMouseLeave={() => setCollapsed(true)}
>
  <Sidebar
    collapsed={collapsed}
    onToggleTheme={() => setDarkMode((d) => !d)}
  />
</aside>

        {/* ---------- Main Content ---------- */}
        <div className="main-content">
          {/* Hero Carousel */}
          <Carousel fade interval={4000}>
            {heroSlides.map((slide, idx) => (
              <Carousel.Item key={idx}>
                <div
                  className="hero-slide"
                  style={{
                    backgroundImage: `url(${slide.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "550px",
                  }}
                >
                  <div className="hero-overlay">
                    <h1>{slide.title}</h1>
                    <p>{slide.subtitle}</p>
                    <Button
                      variant="danger"
                      className="hero-btn"
                      onClick={() => updateProgress(slide)}
                    >
                      Play Now
                    </Button>
                    <Button
                      variant="secondary"
                      className="hero-btn"
                      onClick={() => addToWatchlist(slide)}
                    >
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <Container fluid className="content-container">
            {/* ---------- Continue Watching Row ---------- */}
            {continueWatching.length > 0 && (
              <div className="content-row">
                <h4 className="row-title">Continue Watching</h4>
                <Row className="row-scroll">
                  {continueWatching.map((item) => (
                    <Col key={item.id} xs={6} sm={4} md={3} lg={2}>
                      <Card className="content-card">
                        <Card.Img variant="top" src={item.img} />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => updateProgress(item)}
                          >
                            Resume
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* ---------- Genre Filter Bar ---------- */}
            <div className="genre-bar mb-3">
              {genres.map((g) => (
                <Button
                  key={g}
                  variant={selectedGenre === g ? "danger" : "secondary"}
                  className="me-2 mb-2"
                  onClick={() => setSelectedGenre(g)}
                >
                  {g}
                </Button>
              ))}
            </div>

            {/* ---------- Main Grid ---------- */}
            <Row>
              {visibleContent.map((item) => (
                <Col key={item.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                  <Card className="content-card">
                    <div className="preview-wrapper">
                      <Card.Img variant="top" src={item.img} />
                      <video
                        className="preview-video"
                        src={item.previewUrl}
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <div className="card-buttons">
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => updateProgress(item)}
                        >
                          Play
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => addToWatchlist(item)}
                        >
                          Watchlist
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      {/* ---------- Search Modal ---------- */}
      <Modal show={searchOpen} onHide={() => setSearchOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Search movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSearchOpen(false);
                  updateProgress(item);
                }}
              >
                {item.title}
              </div>
            ))}
            {query && filtered.length === 0 && <p>No results found.</p>}
          </div>
        </Modal.Body>
      </Modal>

      {/* ---------- Styles ---------- */}
      <style>{`
        body { background: #0a0a0a; color: #fff; }
        .homepage.light { background:#fafafa; color:#000; }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          width: 220px;
          background: #111;
          color: #fff;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          z-index: 1000;
        }
        .sidebar-collapsed .sidebar { width: 70px; }
        .sidebar-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px;
          border-bottom: 1px solid #222;
        }
        .sidebar-header .logo { font-weight: 700; color: #ff3f3f; margin:0; }
        .collapse-btn {
          background:none; border:none; color:#fff;
          cursor:pointer; font-size:1.2rem;
        }
        .sidebar-nav { padding-top: 20px; flex-grow:1; }
        .sidebar-nav .nav-link {
          color: #bbb;
          padding: 12px 20px;
          display:flex;
          align-items:center;
          gap:12px;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar-nav .nav-link:hover {
          background: #222;
          color: #ff3f3f;
        }
        .sidebar-collapsed .sidebar-nav .nav-link span { display: none; }
        .sidebar-collapsed .sidebar-nav .nav-link { justify-content: center; }

        /* Main Content shifts right of sidebar */
        .main-content {
          margin-left: 220px;
          transition: margin-left 0.3s ease;
        }
        .sidebar-collapsed .main-content {
          margin-left: 70px;
        }

        /* Hero Carousel */
        .hero-slide { position: relative; display: flex; align-items: center; justify-content: center; }
        .hero-overlay {
          background: rgba(0,0,0,0.4);
          padding: 50px;
          border-radius: 10px;
          color: #fff;
          max-width: 500px;
        }

        .content-container { padding: 30px 20px; }
        .row-title { margin-bottom: 15px; color: #ff3f3f; font-weight: 700; font-size: 1.4rem; }
        .row-scroll { overflow-x: auto; display: flex; flex-wrap: nowrap; gap: 15px; padding-bottom: 8px; }

        .content-card {
          border: none;
          border-radius: 10px;
          background: #1b1b1b;
          color: #fff;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .homepage.light .content-card { background:#fff; color:#000; }
        .content-card:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(255,63,63,0.5); }

        .preview-wrapper {
          position: relative;
          width: 100%;
          padding-top: 50%;
          overflow: hidden;
          border-radius: 12px;
        }
        .preview-wrapper img,
        .preview-wrapper .preview-video {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: opacity 0.4s ease;
        }
        .preview-video { opacity: 0; pointer-events: none; }
        .content-card:hover .preview-video { opacity: 1; }
        .content-card:hover img { opacity: 0; }

        .genre-bar { display:flex; flex-wrap:wrap; }
            .collapse-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          justify-content: center; /* center horizontally */
          align-items: center;     /* center vertically */
        }

        .collapse-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
          margin-left:10px;
        }


      `}</style>
    </>
  );
};

export default HomePage;
