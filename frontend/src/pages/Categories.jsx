import React from "react";
import { Container } from "react-bootstrap";


// Dummy data for categories
const categories = {
  "Trending Now": [
    "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    "https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "https://source.boomplaymusic.com/buzzgroup1/M00/32/AE/rBEevGHXumKAKqbrAAGqmG-A7hY70.jpeg",
    "https://source.boomplaymusic.com/buzzgroup1/M00/32/AE/rBEevGHXumKAKqbrAAGqmG-A7hY70.jpeg",
    "https://source.boomplaymusic.com/buzzgroup1/M00/32/AE/rBEevGHXumKAKqbrAAGqmG-A7hY70.jpeg",
    "https://source.boomplaymusic.com/buzzgroup1/M00/32/AE/rBEevGHXumKAKqbrAAGqmG-A7hY70.jpeg",
    "https://source.boomplaymusic.com/buzzgroup1/M00/32/AE/rBEevGHXumKAKqbrAAGqmG-A7hY70.jpeg",
    "https://source.boomplaymusic.com/buzzgroup1/M00/32/AE/rBEevGHXumKAKqbrAAGqmG-A7hY70.jpeg",
    
    
    
  ],
  "Top 10 in India Today": [
    "https://technosports.co.in/wp-content/uploads/2024/02/viduthalai-part-1-review-megathread-v0-coxush7vh0ra1-727x1024.webp",
    "https://3.bp.blogspot.com/-gHb2oBy0VfQ/Tq_6tPbGusI/AAAAAAAACas/Fdrq6SxppzA/s1600/Karikalan-Poster-Stills-004.jpg",
    "https://image.tmdb.org/t/p/w300/t7EUMSlfUN3jUSZUJOLURAzJzZs.jpg",
  ],
  "New Releases": [
    "https://image.tmdb.org/t/p/w300/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    "https://collider.com/wp-content/uploads/2019/04/thriller-netflix-movie-poster.png",
    "https://image.tmdb.org/t/p/w300/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
  ],
  "Comedy Movies": [
    "https://s.yimg.com/ny/api/res/1.2/4UgrKxcj80LAq5A5ySJPeg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk0OA--/https://media.zenfs.com/en/seventeen_632/690652f9350c9b6b6adfb24b54bff79a",
    "https://image.tmdb.org/t/p/w300/w2nFc2Rsm93PDkvjY4LTn17ePO0.jpg",
    "https://image.tmdb.org/t/p/w300/rXsh4MI6uyVgZBSSzXCfitJnVPy.jpg",
  ],
  "Romantic Hits": [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/98cb6c46716867.58613561cab2f.jpg",
    "https://wallpapers.com/images/hd/romantic-pictures-lf8emyyprqdgb5ml.jpg",
    "https://i.pinimg.com/736x/89/fe/3e/89fe3ed33f7b71f098f4b753f1fadca7.jpg",
  ],
};

function CategoriesPage() {
  return (
   <>
    <Container fluid className="bg-dark text-light p-5">
      <h2 className="mb-4">Browse Categories</h2>

      {Object.entries(categories).map(([categoryName, movies]) => (
        <div key={categoryName} className="mb-5">
          <h4 className="mb-3">{categoryName}</h4>
          <div className="category-row scroll-row ">
            {movies.map((poster, idx) => (
              <div key={idx} className="poster-card">
                <img src={poster} alt={categoryName} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>

    <style>
        {`
        .category-row {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}
.category-row::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.poster-card {
  min-width: 180px;
  height: 260px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.poster-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.poster-card:hover img {
  transform: scale(1.08);
  cursor: pointer;
}
.scroll-row {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scrollbar-width: thin;
}
.scroll-row::-webkit-scrollbar {
  height: 6px;
}
.scroll-row::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 4px;
}

        `}
    </style>
   </>
  );
}

export default CategoriesPage;
