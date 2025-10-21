// PlannerPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Tabs, Tab, Dropdown, Image, Modal, Form } from "react-bootstrap";
import { FaPlus, FaEllipsisH } from "react-icons/fa";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

// Holidays/Festivals
const holidays = [
  { date: "2025-10-02", name: "Gandhi Jayanti", type: "govt", image: "https://pngimg.com/uploads/mahatma_gandhi/mahatma_gandhi_PNG24.png" },
  { date: "2025-10-31", name: "Halloween", type: "festival", image: "https://www.thefactsite.com/wp-content/uploads/2024/09/why-carve-pumpkins-halloween-facts-1312x656.jpg" },
];

const initialPosts = [
  { id: 1, title: "New Product Launch", date: "2025-10-10", platform: "Facebook", type: "image", file: "" },
  { id: 2, title: "Instagram Reel", date: "2025-10-11", platform: "Instagram", type: "video", file: "" },
  { id: 3, title: "Marketing Campaign", date: "2025-10-12", platform: "Facebook", type: "image", file: "" },
];

const PlannerPage = () => {
  const [key, setKey] = useState("monthly");
  const [posts, setPosts] = useState(initialPosts);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postPlatform, setPostPlatform] = useState("Facebook");
  const [postFile, setPostFile] = useState(null);
  const [postType, setPostType] = useState("image");
  const [editPostId, setEditPostId] = useState(null);

  // Open modal for add/edit
  const handleAddPost = (date) => {
    setSelectedDate(date);
    setPostTitle("");
    setPostPlatform("Facebook");
    setPostFile(null);
    setPostType("image");
    setEditPostId(null);
    setShowModal(true);
  };

  const handleEditPost = (post) => {
    setSelectedDate(post.date);
    setPostTitle(post.title);
    setPostPlatform(post.platform);
    setPostType(post.type);
    setPostFile(null);
    setEditPostId(post.id);
    setShowModal(true);
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setPosts(posts.filter(p => p.id !== id));
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      }
    });
  };

  const submitPost = () => {
    if (!postTitle) {
      Swal.fire("Error", "Please enter a post title!", "error");
      return;
    }

    if (editPostId) {
      // Edit existing post
      setPosts(posts.map(p => 
        p.id === editPostId ? {
          ...p,
          title: postTitle,
          platform: postPlatform,
          type: postType,
          file: postFile ? URL.createObjectURL(postFile) : p.file
        } : p
      ));
      Swal.fire({ icon: 'success', title: 'Post updated successfully!', showConfirmButton: false, timer: 1500 });
    } else {
      // Add new post
      const newPost = {
        id: Date.now(),
        title: postTitle,
        date: selectedDate,
        platform: postPlatform,
        type: postType,
        file: postFile ? URL.createObjectURL(postFile) : "",
      };
      setPosts([newPost, ...posts]);
      Swal.fire({ icon: 'success', title: 'Post added successfully!', showConfirmButton: false, timer: 1500 });
    }

    setShowModal(false);
  };

  const renderPostsForDate = (date) => {
    const dayPosts = posts.filter((post) => post.date === date);
    const dayHoliday = holidays.find((h) => h.date === date);

    return (
      <>
        {dayHoliday && (
          <Card className="mb-2 shadow-sm border-warning holiday-card">
            <Card.Body className="p-2 d-flex align-items-center">
              <Image src={dayHoliday.image} roundedCircle width={30} className="me-2" />
              <strong>{dayHoliday.name}</strong>
              <span className={`badge ms-2 ${dayHoliday.type === "govt" ? "bg-danger" : "bg-success"}`}>
                {dayHoliday.type.toUpperCase()}
              </span>
            </Card.Body>
          </Card>
        )}
        {dayPosts.map((post) => (
          <Card key={post.id} className="mb-2 shadow-sm post-card">
            <Card.Body className="p-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div>
                  <strong>{post.title}</strong>
                  <div className="text-muted small">{post.platform}</div>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="light" size="sm">
                    <FaEllipsisH />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditPost(post)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeletePost(post.id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {post.file && (
                <div className="mt-2">
                  {post.type === "image" ? (
                    <Image src={post.file} fluid rounded />
                  ) : (
                    <video src={post.file} controls width="100%" />
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </>
    );
  };

  const generateGrid = (daysArray, viewType) => (
    <Row>
      {daysArray.map((day) => {
        const dateStr = `2025-10-${String(day).padStart(2, "0")}`;
        const headerClass =
          viewType === "daily" ? "calendar-header-daily" :
          viewType === "weekly" ? "calendar-header-weekly" :
          "calendar-header";

        return (
          <Col key={day} xs={12} sm={6} md={4} lg={3} className="mb-3 ">
            <Card className="h-100 calendar-card">
              <Card.Header className={`${headerClass} d-flex justify-content-between align-items-center`}>
                <span>{viewType === "monthly" ? `Oct ${day}` : new Date(dateStr).toDateString()}</span>
                <Button variant="light" size="sm" onClick={() => handleAddPost(dateStr)}>
                  <FaPlus />
                </Button>
              </Card.Header>
              <Card.Body className="p-2">{renderPostsForDate(dateStr)}</Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <Container fluid className="p-3 h-100">
      <h3 className="mb-3">Content Planner</h3>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="daily" title="Daily View">{generateGrid([10], "daily")}</Tab>
        <Tab eventKey="weekly" title="Weekly View">{generateGrid([6,7,8,9,10,11,12], "weekly")}</Tab>
        <Tab eventKey="monthly" title="Monthly View">{generateGrid(Array.from({length:31}, (_,i)=>i+1), "monthly")}</Tab>
      </Tabs>

      {/* Add/Edit Post Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editPostId ? "Edit Post" : "Add New Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Platform</Form.Label>
              <Form.Select value={postPlatform} onChange={(e) => setPostPlatform(e.target.value)}>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select value={postType} onChange={(e) => setPostType(e.target.value)}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>{postType === "image" ? "Select Image" : "Select Video"}</Form.Label>
              <Form.Control type="file" accept={postType === "image" ? "image/*" : "video/*"} onChange={(e) => setPostFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={submitPost}>{editPostId ? "Update Post" : "Add Post"}</Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .calendar-card { transition: transform 0.2s; }
        .calendar-card:hover { transform: translateY(-5px); }
        .calendar-header { background: linear-gradient(135deg, #6a11cb, #2575fc); color:white; font-weight:bold; border-bottom:none; }
        .calendar-header-weekly { background: linear-gradient(135deg, #fc5c7d, #6a82fb); color:white; font-weight:bold; border-bottom:none; }
        .calendar-header-daily { background: linear-gradient(135deg, #43cea2, #185a9d); color:white; font-weight:bold; border-bottom:none; }
        .holiday-card { background-color: #fff3cd !important; }
        .post-card { background-color: #f8f9fa; }
        @media (max-width: 768px) { .calendar-header, .calendar-header-weekly, .calendar-header-daily { font-size:0.85rem; } }
      `}</style>
    </Container>
  );
};

export default PlannerPage;
