import React, { useState } from "react";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { Carousel } from "react-bootstrap";

// Sample movie data with genres
const moviesData = [
  {
    id: 1,
    title: "Avengers: Endgame",
    img: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    genre: "Action",
  },
  {
    id: 2,
    title: "KGF Chapter 2",
    img: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    genre: "Action",
  },
  {
    id: 3,
    title: "RRR",
    img: "https://image.tmdb.org/t/p/w500/6ELCZlTA5lGUops70hKdB83WJxH.jpg",
    genre: "Drama",
  },
  {
    id: 4,
    title: "Doctor Strange",
    img: "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
    genre: "Fantasy",
  },
  {
    id: 5,
    title: "Brahmastra",
    img: "https://image.tmdb.org/t/p/w500/vjnLXptqdxnpNJer5fWgj2OIGhL.jpg",
    genre: "Fantasy",
  },
  {
    id: 6,
    title: "Pushpa",
    img: "https://m.media-amazon.com/images/M/MV5BNWU1ZWFhNGQtZDhlZC00ZWFlLTlmNmEtN2VmYmZiN2Y5ZmQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    genre: "Drama",
  },
  {
    id: 7,
    title: "Spider-Man: No Way Home",
    img: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    genre: "Action",
  },
  {
    id: 8,
    title: "The Batman",
    img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    genre: "Thriller",
  },
];

const genres = ["All", "Action", "Drama", "Fantasy", "Thriller"];

const MoviesPageBootstrap = () => {
  const [hovered, setHovered] = useState(null);
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  // ✅ Filter movies by search + genre
  const filteredMovies = moviesData.filter((movie) => {
    const matchGenre =
      activeGenre === "All" || movie.genre === activeGenre;
    const matchSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchGenre && matchSearch;
  });

  // ✅ Watchlist toggle
  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      {/* -------- Featured Carousel -------- */}
      <Carousel fade>
        {moviesData.slice(0, 3).map((movie) => (
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
          <form
            className="d-flex"
            onSubmit={(e) => e.preventDefault()}
          >
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
