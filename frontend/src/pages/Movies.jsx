import React, { useState, useEffect } from "react";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { Carousel } from "react-bootstrap";

const genres = ["All", "Action", "Drama", "Fantasy", "Thriller"];

const MoviesPageBootstrap = () => {
  const [hovered, setHovered] = useState(null);
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]); // ← Add this line

  // ✅ Filter movies by search + genre
const safeStr = (v) => (typeof v === "string" ? v : "");
const filteredMovies = (movies || []).filter((movie) => {
  const title = safeStr(movie.title);
  const genre = safeStr(movie.genre);
  const matchGenre = activeGenre === "All" || genre === activeGenre;
  const matchSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
  return matchGenre && matchSearch;
});


  // ✅ Watchlist toggle
const toggleWatchlist = (id) => {
  setWatchlist((prev) =>
    prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
  );
};

useEffect(() => {
  async function loadMovies() {
    // Resolve base URL:
    // 1) VITE_OTT_URL (prod: https://bbsneo.com/api/ott)
    // 2) local fallback for dev
    const base = (
      import.meta.env?.VITE_OTT_URL || "http://127.0.0.1:3104"
    ).replace(/\/+$/, "");

    // Optional: simple 10s timeout
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 10000);

    try {
      const res = await fetch(`${base}/movies`, {
        headers: { Accept: "application/json" },
        signal: ctrl.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (json?.success && Array.isArray(json.data)) {
        const safe = (v) => (typeof v === "string" ? v : "");
        const cleaned = json.data.map((m) => ({
          id: m.id ?? m._id ?? crypto.randomUUID(),
          title: safe(m.title),
          img: safe(m.img),
          genre: safe(m.genre) || "Action",
        }));
        setMovies(cleaned);
      } else {
        setMovies([]);
      }
    } catch (e) {
      console.error("Movies fetch failed", e);
      setMovies([]);
    } finally {
      clearTimeout(t);
    }
  }
  loadMovies();
}, []);



  return (
    <div className="bg-dark text-white min-vh-100">
      {/* -------- Featured Carousel -------- */}
      <Carousel fade>
        {(movies || []).slice(0, 3).map((movie) => (
          <Carousel.Item key={movie.id}>
            <div
              className="d-flex align-items-end"
              style={{
                height: "60vh",
                backgroundImage: `url(${movie.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-dark bg-opacity-75 p-4 w-100">
                <h2>{movie.title}</h2>
                <button className="btn btn-light me-2">
                  <FaPlay /> Watch
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleWatchlist(movie.id)}
                >
                  {watchlist.includes(movie.id) ? (
                    <>
                      <FaCheck /> Added
                    </>
                  ) : (
                    <>
                      <FaPlus /> Watchlist
                    </>
                  )}
                </button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* -------- Genre Filter + Search -------- */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <ul className="nav nav-pills mb-2">
            {genres.map((g) => (
              <li key={g} className="nav-item">
                <button
                  className={`nav-link ${activeGenre === g ? "active" : ""}`}
                  onClick={() => setActiveGenre(g)}
                >
                  {g}
                </button>
              </li>
            ))}
          </ul>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* -------- Movie Grid -------- */}
      <div className="container">
        <div className="row g-3">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              onMouseEnter={() => setHovered(movie.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="position-relative">
                <div
                  style={{
                    width: "100%",
                    paddingTop: "150%", // 2:3 aspect ratio
                    backgroundImage: `url(${movie.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                  }}
                ></div>
                {hovered === movie.id && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex flex-column justify-content-center align-items-center rounded">
                    <button className="btn btn-light btn-sm mb-2">
                      <FaPlay /> Play
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => toggleWatchlist(movie.id)}
                    >
                      {watchlist.includes(movie.id) ? (
                        <>
                          <FaCheck /> Added
                        </>
                      ) : (
                        <>
                          <FaPlus /> Add
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
              <p className="text-center mt-2 small">{movie.title}</p>
            </div>
          ))}
          {filteredMovies.length === 0 && (
            <p className="text-center text-muted">No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPageBootstrap;
