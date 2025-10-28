// YoutubeHomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Nav,
  Offcanvas,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars, FaSearch, FaHome, FaFire, FaPlayCircle } from "react-icons/fa";
import { TbBrandMetabrainz } from "react-icons/tb";
import { Link } from "react-router-dom"; // ✅ Import Link
import { HiMiniUserGroup } from "react-icons/hi2";
import { SiCoinmarketcap, SiEventstore } from "react-icons/si";
import { FaAdversal } from "react-icons/fa";
import { SiShortcut } from "react-icons/si";
import { FaFacebookMessenger, FaTv } from "react-icons/fa";
import { FaBusinessTime } from "react-icons/fa6";
import { PiPopcornDuotone } from "react-icons/pi";

// === Live API integration (replaces dummy data) ===
const API_BASE = (
  import.meta?.env?.VITE_YSTUDIO_URL || "http://127.0.0.1:3106"
).replace(/\/+$/, "");

const yStudio = {
  list: async (params = {}) => {
    const qs = new URLSearchParams({
      limit: 50,
      ...params,
    }).toString();
    const r = await fetch(
      `${API_BASE}/ystudio${qs ? `?${qs}` : ""}`
    );
    if (!r.ok) throw new Error("Failed to load videos");
       const json = await r.json();
   // Support: either { items: [...] } or plain array
  return Array.isArray(json) ? { items: json } : json;
  },
};

const formatViews = (n) => {
  if (typeof n !== "number") return n ?? "0";
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
};
// === end API helper ===

const sidebarItems = [
  {
    name: "Y-Studio",
    icon: <FaHome />,
    subItems: [
      {
        name: "Creator Submodules",
        subItems: [
          { name: "Trending", icon: <FaFire />, path: "/trending" },
          { name: "Reel & Shorts", icon: <SiShortcut />, path: "/reel-short" },
          { name: "Live TV", icon: <FaTv />, path: "/live" },
          { name: "Event", icon: <SiEventstore />, path: "/event" },
        ],
      },
      {
        name: "Business / Tools",
        subItems: [
          { name: "Ad Manager", icon: <FaAdversal />, path: "/ad-manager" },
          {
            name: "Business Suite",
            icon: <FaBusinessTime />,
            path: "/business-suite",
          },
          { name: "Meta AI", icon: <TbBrandMetabrainz />, path: "/meta-ai" },
          {
            name: "Marketplace",
            icon: <SiCoinmarketcap />,
            path: "/marketplace",
          },
          { name: "Groups", icon: <HiMiniUserGroup />, path: "/groups" },
        ],
      },
    ],
  },
  // Optional main/global items
  { name: "Home", icon: <FaHome />, path: "/home" },
  { name: "Search", icon: <FaSearch />, path: "/search-recommendations" },
  { name: "Movies", icon: <PiPopcornDuotone />, path: "/movies" },
  { name: "Messenger", icon: <FaFacebookMessenger />, path: "/messenger" },
];

const filterOptions = ["All", "Trending", "Live", "Reels", "Shorts", "Music"];

const YoutubeHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Source list from API (was dummyVideos)
  const [sourceVideos, setSourceVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const reelRefs = useRef({});

  // Load from backend and map to existing UI keys
  useEffect(() => {
    (async () => {
      try {
        const data = await yStudio.list();
 const mapped = (data?.items || []).map((v) => {
   const id =
     typeof v._id === "string"
       ? v._id
       : v?._id?.$oid ?? v.id;
   const uiType = v.type || v.category || "Trending";
  const uiViews =
     typeof v.views === "number" ? formatViews(v.views)
     : typeof v.views === "string" ? v.views
    : "0";
  return {
    id,
     title: v.title,
    type: uiType,
     channel: v.channel || "Y-Studio",
     views: uiViews,
     duration: v.duration || "",
     thumbnail: v.thumbnail,
     videoUrl: v.videoUrl,
   };
 });
    setSourceVideos(mapped);
    setFilteredVideos(mapped);

      } catch (e) {
        // If API fails, keep empty to avoid mixing with placeholders
        setSourceVideos([]);
        setFilteredVideos([]);
        // console.warn("YStudio API fetch failed", e);
      }
    })();
  }, []);

  // Apply search + filter to the live list
  useEffect(() => {
    let videos = [...sourceVideos];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      videos = videos.filter((v) => v.title?.toLowerCase().includes(q));
    }
    if (activeFilter !== "All") {
      videos = videos.filter((v) => v.type === activeFilter);
    }
    setFilteredVideos(videos);
  }, [searchQuery, activeFilter, sourceVideos]);

  const handleMouseEnter = (id) => {
    Object.keys(reelRefs.current).forEach((vid) => {
      if (reelRefs.current[vid]) reelRefs.current[vid].pause();
    });
    const video = reelRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id) => {
    const video = reelRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleReelClick = (id) => {
    const video = reelRefs.current[id];
    if (video) {
      if (video.paused) video.play();
      else video.pause();
    }
  };

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <Row className="bg-dark text-white align-items-center py-2 sticky-top vw-100">
        <Col xs={2} className="d-flex align-items-center">
          <Button
            variant="dark"
            onClick={() =>
              window.innerWidth < 768
                ? setMobileSidebarOpen(true)
                : setSidebarOpen(!sidebarOpen)
            }
          >
            <FaBars size={25} className="text-white mx-3" />
          </Button>
        </Col>
        <Col xs={8} className="px-1">
          <InputGroup>
            <Form.Control
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row className="flex-nowrap">
        {/* Desktop Sidebar */}
        <Col
          style={{
            minHeight: "100vh",
            width: sidebarOpen ? "200px" : "60px",
            transition: "width 0.3s",
            backgroundColor: "#f8f9fa",
          }}
          className="d-none d-md-block p-0"
        >
          <Nav
            className="d-flex flex-column align-items-start  h-100 p-3 pt-5 bg-dark "
            style={{ gap: "1rem" }}
          >
            {sidebarItems.map((item) => (
              <div key={item.name} className="w-100">
                {!item.subItems ? (
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    key={item.name}
                    active={activeSidebar === item.name}
                    onClick={() => setActiveSidebar(item.name)}
                    className="d-flex align-items-end text-decoration-none text-white w-100"
                    style={{
                      justifyContent: sidebarOpen ? "flex-start" : "center",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                    {sidebarOpen && <span className="ms-2">{item.name}</span>}
                  </Nav.Link>
                ) : (
                  <div className="ms-2">
                    <div className="text-uppercase fw-bold text-light mt-2 mb-1">
                      {sidebarOpen && item.name}
                    </div>

                    {item.subItems.map((sub) => (
                      <div key={sub.name} className="ms-3">
                        {sub.subItems ? (
                          <>
                            <div className="text-info small fw-semibold mt-2">
                              {sidebarOpen && sub.name}
                            </div>
                            <div className="ms-3">
                              {sub.subItems.map((subsub) => (
                                <Nav.Link
                                  as={Link}
                                  to={subsub.path}
                                  key={subsub.name}
                                  active={activeSidebar === subsub.name}
                                  onClick={() => setActiveSidebar(subsub.name)}
                                  className="d-flex align-items-end text-decoration-none text-white w-100 py-1"
                                  style={{
                                    justifyContent: sidebarOpen
                                      ? "flex-start"
                                      : "center",
                                  }}
                                >
                                  <span style={{ fontSize: "1.1rem" }}>
                                    {subsub.icon}
                                  </span>
                                  {sidebarOpen && (
                                    <span className="ms-2">{subsub.name}</span>
                                  )}
                                </Nav.Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Nav.Link
                            as={Link}
                            to={sub.path}
                            key={sub.name}
                            active={activeSidebar === sub.name}
                            onClick={() => setActiveSidebar(sub.name)}
                            className="d-flex align-items-end text-decoration-none text-white w-100 py-1"
                            style={{
                              justifyContent: sidebarOpen
                                ? "flex-start"
                                : "center",
                            }}
                          >
                            <span style={{ fontSize: "1.1rem" }}>
                              {sub.icon}
                            </span>
                            {sidebarOpen && (
                              <span className="ms-2">{sub.name}</span>
                            )}
                          </Nav.Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={sidebarOpen ? 10 : 11} xs={12} className="p-3">
          {/* Filters */}
          <div className="mb-3 d-flex flex-wrap gap-2 overflow-auto">
            {filterOptions.map((filter) => (
              <Button
                key={filter}
                variant={
                  activeFilter === filter ? "primary" : "outline-primary"
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Reels */}
          <h5 className="mb-2">Reels</h5>
          <div className="d-flex overflow-auto mb-4 gap-2 pb-2">
            {filteredVideos
              .filter((v) => v.type === "Reels")
              .map((video) => (
                <div
                  key={video.id}
                  style={{ flex: "0 0 200px", cursor: "pointer" }}
                  onMouseEnter={() => handleMouseEnter(video.id)}
                  onMouseLeave={() => handleMouseLeave(video.id)}
                  onClick={() => handleReelClick(video.id)}
                >
                  <video
                    ref={(el) => (reelRefs.current[video.id] = el)}
                    src={video.videoUrl}
                    poster={video.thumbnail}
                    style={{ width: "100%", borderRadius: "8px" }}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="d-block"
                  />
                  <p
                    className="mt-1 text-truncate"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {video.title}
                  </p>
                </div>
              ))}
          </div>

          {/* Video Grid */}
          <Row>
            {filteredVideos
              .filter((v) => v.type !== "Reels")
              .map((video) => (
                <Col
                  key={video.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={video.thumbnail}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title
                        className="text-truncate"
                        style={{ fontSize: "1rem" }}
                      >
                        {video.title}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "0.85rem", color: "gray" }}>
                        {video.channel} • {video.views} views • {video.duration}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          size="sm"
                          variant="outline-dark"
                          onMouseEnter={() => handleMouseEnter(video.id)}
                          onMouseLeave={() => handleMouseLeave(video.id)}
                          onClick={() => handleReelClick(video.id)}
                        >
                          <FaPlayCircle className="me-1" />
                          Play
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => window.open(video.videoUrl, "_blank")}
                        >
                          Open
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>

      {/* Mobile Sidebar */}
      <Offcanvas
        show={mobileSidebarOpen}
        onHide={() => setMobileSidebarOpen(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {sidebarItems.map((item) => (
              <Nav.Link
                as={Link} // ✅ Use Link here too
                to={item.path} // ✅ Navigation works
                key={item.name}
                active={activeSidebar === item.name}
                onClick={() => {
                  setActiveSidebar(item.name);
                  setMobileSidebarOpen(false);
                }}
                className="d-flex align-items-center justify-content-start mb-2"
              >
                <span className="text-black me-2">{item.icon}</span>
                <span className="text-black text-">{item.name}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Custom scrollbar */}
      <style>{`
        .overflow-auto::-webkit-scrollbar {
          height: 6px;
        }
        .overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.3);
          border-radius: 3px;
        }
      `}</style>
    </Container>
  );
};

export default YoutubeHomePage;
