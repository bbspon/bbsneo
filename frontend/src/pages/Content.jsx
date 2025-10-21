import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Table,
  Form,
  InputGroup,
  Dropdown,
  Modal,
  Spinner,
  Badge,
  Nav,
  Image,
} from "react-bootstrap";
import { FaBars, FaSearch, FaPen, FaTrash, FaPlus, FaFilter, FaImage, FaVideo } from "react-icons/fa";

// Mock data generator with media
function generatePosts(count = 20) {
  const now = Date.now();
  const types = ["Text", "Image", "Video"];
  const categories = ["Posts & Reels", "Stories", "A/B Tests", "Feed & Grid", "Mentions & Tags", "Clips"];
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    content: `Sample post content #${i + 1}`,
    type: types[i % 3],
    category: categories[i % categories.length],
    mediaUrl: types[i % 3] === "Text" ? null : `https://picsum.photos/seed/${i + 1}/200/150`,
    publishedDate: new Date(now - i * 86400000).toISOString().split("T")[0],
    reach: Math.floor(Math.random() * 1000),
    clicks: Math.floor(Math.random() * 500),
    engagement: Math.floor(Math.random() * 200),
  }));
}

export default function PublishedPostsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("Posts & Reels");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortKey, setSortKey] = useState("publishedDate");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPosts(generatePosts());
      setLoading(false);
    }, 500);
  }, []);

  const filteredPosts = useMemo(() => {
    let data = posts.filter(p => p.category === activeCategory);
    if (filterType !== "All") data = data.filter(p => p.type === filterType);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(p => p.content.toLowerCase().includes(q));
    }
    // sort
    data = data.sort((a, b) => {
      if (sortKey === "publishedDate") {
        return sortAsc ? a.publishedDate.localeCompare(b.publishedDate) : b.publishedDate.localeCompare(a.publishedDate);
      } else {
        return sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
      }
    });
    return data;
  }, [posts, filterType, search, activeCategory, sortKey, sortAsc]);

  const openEditModal = (post = null) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const savePost = (edited) => {
    if (selectedPost) {
      setPosts(prev => prev.map(p => (p.id === edited.id ? edited : p)));
    } else {
      setPosts(prev => [{ ...edited, id: `post-${Date.now()}` }, ...prev]);
    }
    setShowModal(false);
  };

  const deletePost = (id) => setPosts(prev => prev.filter(p => p.id !== id));

  const sidebarItems = ["Posts & Reels", "Stories", "A/B Tests", "Feed & Grid", "Mentions & Tags", "Clips"];

  const summary = useMemo(() => {
    const total = filteredPosts.length;
    const totalReach = filteredPosts.reduce((sum, p) => sum + p.reach, 0);
    const totalClicks = filteredPosts.reduce((sum, p) => sum + p.clicks, 0);
    const totalEngagement = filteredPosts.reduce((sum, p) => sum + p.engagement, 0);
    return { total, totalReach, totalClicks, totalEngagement };
  }, [filteredPosts]);

  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0">
      {/* Topbar */}
      <Row className="bg-light border-bottom align-items-center p-2 sticky-top" style={{ zIndex: 10 }}>
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </Button>
        </Col>
        <Col>
          <h5 className="mb-0">{activeCategory}</h5>
        </Col>
        <Col xs="auto">
          <InputGroup size="sm">
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <FaFilter /> {filterType}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["All", "Text", "Image", "Video"].map(type => (
                <Dropdown.Item key={type} active={filterType === type} onClick={() => setFilterType(type)}>
                  {type}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Button variant="primary" size="sm" onClick={() => openEditModal()}>
            <FaPlus /> Create Post
          </Button>
        </Col>
      </Row>

      <Row className="flex-grow-1 m-0" style={{ overflowY: "auto", flex: "1 1 auto" }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <Col xs={12} md={2} lg={2} className="border-end bg-white p-3">
            <Nav className="flex-column" variant="pills">
              {sidebarItems.map(item => (
                <Nav.Link key={item} active={activeCategory === item} onClick={() => setActiveCategory(item)} className="mb-2">
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Col>
        )}

        {/* Main Content */}
        <Col xs={12} md={sidebarOpen ? 10 : 12} lg={sidebarOpen ? 10 : 12} className="p-3">
          {/* Summary Cards */}
          <Row className="mb-3">
            <Col xs={6} md={3}><Card className="p-2 text-center"><strong>{summary.total}</strong><div>Total Posts</div></Card></Col>
            <Col xs={6} md={3}><Card className="p-2 text-center"><strong>{summary.totalReach}</strong><div>Total Reach</div></Card></Col>
            <Col xs={6} md={3}><Card className="p-2 text-center"><strong>{summary.totalClicks}</strong><div>Total Clicks</div></Card></Col>
            <Col xs={6} md={3}><Card className="p-2 text-center"><strong>{summary.totalEngagement}</strong><div>Total Engagement</div></Card></Col>
          </Row>

          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-5 text-muted">No posts found</div>
          ) : (
            <>
              {/* Desktop/Table view */}
              <div className="d-none d-md-block" style={{ overflowX: "auto" }}>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Content</th>
                      <th>Media</th>
                      <th>Type</th>
                      <th>Published</th>
                      <th>Reach</th>
                      <th>Clicks</th>
                      <th>Engagement</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map(post => (
                      <tr key={post.id}>
                        <td>{post.content}</td>
                        <td>
                          {post.mediaUrl ? (
                            post.type === "Image" ? <Image src={post.mediaUrl} thumbnail width={80} /> :
                            <video src={post.mediaUrl} width={120} controls />
                          ) : <Badge bg="secondary">No Media</Badge>}
                        </td>
                        <td>{post.type}</td>
                        <td>{post.publishedDate}</td>
                        <td>{post.reach}</td>
                        <td>{post.clicks}</td>
                        <td>{post.engagement}</td>
                        <td>
                          <Button size="sm" variant="outline-primary" onClick={() => openEditModal(post)}><FaPen /></Button>{" "}
                          <Button size="sm" variant="outline-danger" onClick={() => deletePost(post.id)}><FaTrash /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Mobile/Card view */}
              <div className="d-block d-md-none">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="mb-3 shadow-sm">
                    <Card.Body>
                      <Card.Text>{post.content}</Card.Text>
                      {post.mediaUrl && (post.type === "Image" ?
                        <Image src={post.mediaUrl} thumbnail className="mb-2" /> :
                        <video src={post.mediaUrl} controls className="mb-2 w-100" />
                      )}
                      <div className="d-flex justify-content-between small text-muted mb-2">
                        <span>{post.type}</span>
                        <span>{post.publishedDate}</span>
                      </div>
                      <div className="d-flex justify-content-between flex-wrap">
                        <Badge bg="info" className="mb-1">Reach: {post.reach}</Badge>
                        <Badge bg="success" className="mb-1">Clicks: {post.clicks}</Badge>
                        <Badge bg="warning" className="mb-1">Engagement: {post.engagement}</Badge>
                      </div>
                      <div className="mt-2 d-flex gap-2">
                        <Button size="sm" variant="outline-primary" onClick={() => openEditModal(post)}><FaPen /></Button>
                        <Button size="sm" variant="outline-danger" onClick={() => deletePost(post.id)}><FaTrash /></Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost ? "Edit Post" : "Create Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const form = e.target;
              const newPost = {
                id: selectedPost?.id || `post-${Date.now()}`,
                content: form.content.value,
                type: form.type.value,
                category: activeCategory,
                mediaUrl: form.mediaUrl.value || null,
                publishedDate: form.publishedDate.value,
                reach: selectedPost?.reach || 0,
                clicks: selectedPost?.clicks || 0,
                engagement: selectedPost?.engagement || 0,
              };
              savePost(newPost);
            }}
          >
            <Form.Group className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3} defaultValue={selectedPost?.content || ""} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" defaultValue={selectedPost?.type || "Text"}>
                <option>Text</option>
                <option>Image</option>
                <option>Video</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Media URL</Form.Label>
              <Form.Control type="text" name="mediaUrl" defaultValue={selectedPost?.mediaUrl || ""} placeholder="Paste image/video URL" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Published Date</Form.Label>
              <Form.Control type="date" name="publishedDate" defaultValue={selectedPost?.publishedDate || ""} required />
            </Form.Group>
            <div className="mt-3 text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>{" "}
              <Button variant="primary" type="submit">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
