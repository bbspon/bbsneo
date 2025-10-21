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
import { FaFacebookMessenger } from "react-icons/fa";
import { FaBusinessTime } from "react-icons/fa6";
// Dummy video data
const dummyVideos = [
  {
    id: 1,
    title: "React Tutorial for Beginners",
    type: "Trending",
    channel: "Code Academy",
    views: "1.2M",
    duration: "12:34",
    thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: 2,
    title: "Learn JavaScript in 1 Hour",
    type: "Live",
    channel: "JS Mastery",
    views: "900K",
    duration: "1:02:12",
    thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: 3,
    title: "Top 10 CSS Tricks You Must Know",
    type: "Reels",
    channel: "Design Hub",
    views: "500K",
    duration: "8:45",
    thumbnail: "https://i.ytimg.com/vi/1Rs2ND1ryYc/hqdefault.jpg",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: 4,
    title: "Best Music Mix 2025",
    type: "Music",
    channel: "Music Channel",
    views: "2.3M",
    duration: "3:45:12",
    thumbnail: "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: 5,
    title: "Funny Shorts Compilation",
    type: "Shorts",
    channel: "Comedy Central",
    views: "3.1M",
    duration: "5:12",
    thumbnail: "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
];


const sidebarItems = [
  { name: "Home", icon: <FaHome />, path: "/home" },
   { name: "Business Suite", icon: <FaBusinessTime />, path: "/business-suite" },
  { name: "Trending", icon: <FaFire />, path: "/trending" },
  { name: "Meta AI", icon: <TbBrandMetabrainz />, path: "/meta-ai" },
  { name: "Groups", icon:  <HiMiniUserGroup />, path: "/groups" },
  { name: "Marketplace", icon: <SiCoinmarketcap />, path: "/marketplace" },
  { name: "Event", icon: <SiEventstore />, path: "/event"},
  { name: "Ad Manager", icon:<FaAdversal /> , path: "/ad-manager"},   
  { name: "Reels", icon:<SiShortcut /> , path: "/reel-short"},    
   { name: "Messenger", icon:<FaFacebookMessenger />, path:"/messenger"},    
];

const filterOptions = ["All", "Trending", "Live", "Reels", "Shorts", "Music"];

const YoutubeHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredVideos, setFilteredVideos] = useState(dummyVideos);
  const reelRefs = useRef({});

  useEffect(() => {
    let videos = dummyVideos;
    if (searchQuery) {
      videos = videos.filter((v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeFilter !== "All") {
      videos = videos.filter((v) => v.type === activeFilter);
    }
    setFilteredVideos(videos);
  }, [searchQuery, activeFilter]);

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
              <Nav.Link
                as={Link}          // ✅ Use Link
                to={item.path}     // ✅ Path from sidebarItems
                key={item.name}
                active={activeSidebar === item.name}
                onClick={() => setActiveSidebar(item.name)}
                className="d-flex align-items-end text-decoration-none text-white  w-100"
                style={{ justifyContent: sidebarOpen ? "flex-start" : "center" }}
              >
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                {sidebarOpen && <span className="ms-2">{item.name}</span>}
              </Nav.Link>
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
                variant={activeFilter === filter ? "primary" : "outline-primary"}
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
                  <p className="mt-1 text-truncate" style={{ fontSize: "0.85rem" }}>
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
                      <Card.Title className="text-truncate" style={{ fontSize: "1rem" }}>
                        {video.title}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "0.85rem", color: "gray" }}>
                        {video.channel} • {video.views} views • {video.duration}
                      </Card.Text>
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
                as={Link}             // ✅ Use Link here too
                to={item.path}        // ✅ Navigation works
                key={item.name}
                active={activeSidebar === item.name}
                onClick={() => {
                  setActiveSidebar(item.name);
                  setMobileSidebarOpen(false);
                }}
                className="d-flex align-items-center mb-2"
              >
                <span className="me-2">{item.icon}</span>
                <span>{item.name}</span>
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
