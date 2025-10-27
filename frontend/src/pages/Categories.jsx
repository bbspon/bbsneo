import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";


function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          (import.meta?.env?.VITE_OTT_API || "http://127.0.0.1:3104") +
            "/categories?format=object"
        );
        if (!res.ok) throw new Error("bad status");
        const json = await res.json();
        if (
          !cancelled &&
          json?.success &&
          json?.data &&
          typeof json.data === "object"
        ) {
          setCategories(json.data);
        }
      } catch (_) {
        // stay on fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

      <style>{`
      .category-row { display:flex; gap:15px; overflow-x:auto; scrollbar-width:none; }
      .category-row::-webkit-scrollbar { display:none; }
      .poster-card { min-width:180px; height:260px; flex-shrink:0; border-radius:10px; overflow:hidden; position:relative; }
      .poster-card img { width:100%; height:100%; object-fit:cover; transition:transform .3s; }
      .poster-card:hover img { transform:scale(1.08); cursor:pointer; }
      .scroll-row { display:flex; gap:15px; overflow-x:auto; scrollbar-width:thin; }
      .scroll-row::-webkit-scrollbar { height:6px; }
      .scroll-row::-webkit-scrollbar-thumb { background:#666; border-radius:4px; }
    `}</style>
    </>
  );
}

export default CategoriesPage;
