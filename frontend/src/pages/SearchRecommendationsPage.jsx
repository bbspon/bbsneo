import React, { useState, useRef } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineMenuBook, MdCancel } from "react-icons/md";
import {
  FaSearch,
  FaMicrophone,
  FaPlay,
  FaPlus,
  FaHeart,
} from "react-icons/fa";

function SearchRecommendations() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // --- NEW: Filters state
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("All");
  const [filterMaturity, setFilterMaturity] = useState("All");

  const searchBoxRef = useRef(null);

  const resultsMock = [
    {
      id: 1,
      title: "Inception",
      genre: "Sci-Fi",
      year: 2010,
      language: "English",
      maturity: "13+",
      poster: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      description:
        "A thief who enters the dreams of others to steal secrets from their subconscious.",
    },
    {
      id: 2,
      title: "Interstellar",
      genre: "Sci-Fi",
      year: 2014,
      language: "English",
      maturity: "13+",
      poster:
        "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2021/08/19085635/gEU2QniE6E77NI6lCU6MxlNBvIx-scaled.jpg",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      id: 3,
      title: "Avatar",
      genre: "Adventure",
      year: 2009,
      language: "English",
      maturity: "13+",
      poster: "https://image.tmdb.org/t/p/w300/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
      description:
        "A marine on an alien planet becomes torn between following orders and protecting his new home.",
    },
    {
      id: 4,
      title: "Batman Begins",
      genre: "Action",
      year: 2005,
      language: "English",
      maturity: "16+",
      poster: "https://image.tmdb.org/t/p/w300/1P3ZyEq02wcTMd3iE4ebtLvncvH.jpg",
      description:
        "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City.",
    },
  ];

  const recommendations = [
    { id: 5, title: "Because you watched Dark Knight", genre: "Action" },
    { id: 6, title: "Feel-Good Playlist", genre: "AI-curated" },
  ];

  const trending = [
    "Inception",
    "KGF",
    "Breaking Bad",
    "Stranger Things",
    "A-Z",
  ];

  // Helpers
  const addToRecent = (term) => {
    if (!term) return;
    setRecentSearches((prev) => {
      const newList = [
        term,
        ...prev.filter((t) => t.toLowerCase() !== term.toLowerCase()),
      ];
      return newList.slice(0, 8);
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    addToRecent(query.trim());
  };

  const handleBadgeClick = (item) => {
    setQuery(item);
    addToRecent(item);
  };

  const isAZSearch = query.trim().toLowerCase() === "a-z";

  // ---- Filtering logic
  const filteredResults = resultsMock.filter((m) => {
    const textMatch = m.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const genreMatch = filterGenre === "All" || m.genre === filterGenre;
    const langMatch = filterLanguage === "All" || m.language === filterLanguage;
    const maturityMatch =
      filterMaturity === "All" || m.maturity === filterMaturity;
    return textMatch && genreMatch && langMatch && maturityMatch;
  });

  const displayResults = isAZSearch
    ? [...resultsMock]
        .filter((m) => {
          const genreMatch = filterGenre === "All" || m.genre === filterGenre;
          const langMatch =
            filterLanguage === "All" || m.language === filterLanguage;
          const maturityMatch =
            filterMaturity === "All" || m.maturity === filterMaturity;
          return genreMatch && langMatch && maturityMatch;
        })
        .sort((a, b) => a.title.localeCompare(b.title))
    : query.trim()
    ? filteredResults
    : resultsMock.filter((m) => {
        const genreMatch = filterGenre === "All" || m.genre === filterGenre;
        const langMatch =
          filterLanguage === "All" || m.language === filterLanguage;
        const maturityMatch =
          filterMaturity === "All" || m.maturity === filterMaturity;
        return genreMatch && langMatch && maturityMatch;
      });

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetail(true);
  };

  return (
    <>
      {/* HEADER */}
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

            <Form
              className="search-form d-none d-md-flex mx-auto"
              onSubmit={handleSearchSubmit}
            >
              <div
                ref={searchBoxRef}
                style={{ cursor: "pointer", width: "100%" }}
              >
                <InputGroup>
                  <FormControl
                    type="search"
                    placeholder="Keyword or semantic phrase…"
                    className="search-input"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    aria-label="Submit search"
                  >
                    <FaSearch />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => alert("Voice search coming soon!")}
                    aria-label="Voice search"
                  >
                    <FaMicrophone />
                  </Button>
                </InputGroup>
              </div>
            </Form>

            <button
              className={`menu-toggle ${open ? "open" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
            >
              <MdOutlineMenuBook size={34} className="text-white" />
            </button>
          </Container>
        </Navbar>
      </header>

      {/* FULLSCREEN MENU */}
      <div className={`fullscreen-menu ${open ? "show" : ""}`}>
        <button
          type="button"
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
          <a href="/social-community" onClick={() => setOpen(false)}>
            Social Community
          </a>
          <a href="/admin-compliance" onClick={() => setOpen(false)}>
            Admin Compliance
          </a>
          <a href="/unified-identity" onClick={() => setOpen(false)}>
            Unified Identity
          </a>
          <a href=" /ott-entertainment" onClick={() => setOpen(false)}>
            OTT Entertainment
          </a>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <Container fluid className="p-4 bg-dark text-light min-vh-100">
        {/* Filters */}
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <h5>🎯 Filters</h5>
            <div className="d-flex flex-wrap gap-3">
              <Form.Select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="bg-secondary text-light w-auto"
              >
                <option>All</option>
                <option>Action</option>
                <option>Adventure</option>
                <option>Sci-Fi</option>
              </Form.Select>

              <Form.Select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="bg-secondary text-light w-auto"
              >
                <option>All</option>
                <option>English</option>
                <option>Hindi</option>
              </Form.Select>

              <Form.Select
                value={filterMaturity}
                onChange={(e) => setFilterMaturity(e.target.value)}
                className="bg-secondary text-light w-auto"
              >
                <option>All</option>
                <option>13+</option>
                <option>16+</option>
                <option>18+</option>
              </Form.Select>
            </div>
          </Col>
        </Row>

        {/* Trending */}
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <h5>🔥 Trending Searches</h5>
            {trending.map((item, idx) => (
              <Badge
                bg="info"
                text="dark"
                key={idx}
                className="me-2 mb-2 p-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleBadgeClick(item)}
              >
                {item}
              </Badge>
            ))}
          </Col>
        </Row>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <Row className="mb-4">
            <Col md={8} className="mx-auto">
              <h5>🕓 Recent Searches</h5>
              {recentSearches.map((item, idx) => (
                <Badge
                  bg="secondary"
                  text="light"
                  key={idx}
                  className="me-2 mb-2 p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleBadgeClick(item)}
                >
                  {item}
                </Badge>
              ))}
            </Col>
          </Row>
        )}

        {/* Search Results */}
        <Row className="mb-5">
          <Col md={8} className="mx-auto">
            <h5>
              {isAZSearch
                ? "🔠 A–Z Movie List"
                : query
                ? `🎬 Results for "${query}"`
                : "🎬 All Movies"}
            </h5>
            <Row>
              {displayResults.length > 0 ? (
                displayResults.map((item) => (
                  <Col md={6} lg={4} key={item.id} className="mb-3">
                    <Card
                      className="h-100 bg-secondary text-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCardClick(item)}
                    >
                      <Card.Img
                        variant="top"
                        src={item.poster}
                        alt={item.title}
                      />
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          {item.genre} • {item.language} • {item.maturity} •{" "}
                          {item.year}
                        </Card.Text>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="light" type="button">
                            <FaPlay /> Play
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-light"
                            type="button"
                          >
                            <FaPlus /> Watchlist
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            type="button"
                          >
                            <FaHeart /> Like
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No movies found.</p>
              )}
            </Row>
          </Col>
        </Row>

        {/* Recommendations */}
        <Row>
          <Col md={8} className="mx-auto">
            <h5>✨ Recommendations for You</h5>
            <ListGroup>
              {recommendations.map((rec) => (
                <ListGroup.Item
                  key={rec.id}
                  className="bg-dark text-light d-flex justify-content-between align-items-center"
                >
                  {rec.title}
                  <Badge bg="secondary">{rec.genre}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>

      {/* Movie Detail Modal */}
      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        size="lg"
        centered
      >
        {selectedMovie && (
          <>
            <Modal.Header closeButton className="bg-dark text-light">
              <Modal.Title>{selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="img-fluid mb-3 rounded"
              />
              <p>
                <strong>Genre:</strong> {selectedMovie.genre}
              </p>
              <p>
                <strong>Language:</strong> {selectedMovie.language}
              </p>
              <p>
                <strong>Maturity:</strong> {selectedMovie.maturity}
              </p>
              <p>
                <strong>Year:</strong> {selectedMovie.year}
              </p>
              <p>{selectedMovie.description}</p>
            </Modal.Body>
          </>
        )}
      </Modal>

      <style>{`
        .header-wrapper { width: 100%; background-color: #212c3a; }
        .custom-navbar { background-color: #251e1e !important; border-bottom: 2px solid #75797c; }
        .brand-title { font-family: "Josefin Sans", sans-serif; color: #dc3545; letter-spacing: 2px; font-size: 1.5rem; }
        .search-form { flex-grow: 1; max-width: 400px; }
        .search-input { background-color: #2f3845; border: 1px solid #444; color: #fff; }
        .search-input::placeholder { color: #bbb; }
        .menu-toggle { background: none; border: none; cursor: pointer; display: flex; z-index: 1101; }
        .fullscreen-menu { position: fixed; top: 0; left: 0; width: 100%; height: 0; background: rgba(0, 0, 0, 0.95); overflow: hidden; transition: height 0.4s ease; z-index: 1100; }
        .fullscreen-menu.show { height: 100%; }
        .close-btn { position: absolute; top: 20px; right: 30px; background: none; border: none; color: #fff; cursor: pointer; }
        .close-btn:hover { color: #dc3545; }
        .fullscreen-links { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 2rem; }
        .fullscreen-links a { color: #fff; font-size: 1.8rem; text-decoration: none; }
        .fullscreen-links a:hover { color: #dc3545; }
      `}</style>
    </>
  );
}

export default SearchRecommendations;
