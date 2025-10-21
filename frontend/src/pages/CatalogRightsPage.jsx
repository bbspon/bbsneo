// CatalogRightsPage.jsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Badge,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

// Mock content data
const mockContent = [
  {
    id: 1,
    title: "The Great Adventure",
    type: "Movie",
    genre: "Action",
    tags: ["Adventure", "Thrill"],
    people: ["John Doe", "Jane Smith"],
    ageRating: "13+",
    geoBlock: ["IN", "US"],
    expiry: "2025-12-31",
    poster: "https://wallpapercave.com/wp/wp10615942.jpg",
    status: "Live",
  },
  {
    id: 2,
    title: "Comedy Nights",
    type: "Series",
    genre: "Comedy",
    tags: ["Humor", "Drama"],
    people: ["Alice Johnson"],
    ageRating: "18+",
    geoBlock: ["IN"],
    expiry: "2025-10-15",
    poster: "https://wallpaperaccess.com/full/288748.jpg",
    status: "Upcoming",
  },
];

// Mock people list
const peopleList = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

const CatalogRightsPage = () => {
  const [contentList, setContentList] = useState(mockContent);
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  // Close modal
  const handleClose = () => {
    setEditingContent(null);
    setShowModal(false);
  };

  // Show modal for add/edit
  const handleShow = (content = null) => {
    if (content) {
      setEditingContent(content);
    } else {
      setEditingContent({
        title: "",
        type: "",
        genre: "",
        tags: [],
        people: [],
        ageRating: "",
        geoBlock: [],
        expiry: "",
        poster: "",
        status: "Draft",
      });
    }
    setShowModal(true);
  };

  // Save content (add or edit) with validation
  const handleSave = () => {
    const { title, type, genre, poster } = editingContent;

    if (!title || !type || !genre || !poster) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "Please fill in all required fields: Title, Type, Genre, Poster.",
      });
      return;
    }

    if (editingContent.id) {
      setContentList((prev) =>
        prev.map((item) =>
          item.id === editingContent.id ? editingContent : item
        )
      );
      Swal.fire("Saved!", "Content updated successfully.", "success");
    } else {
      setContentList((prev) => [
        ...prev,
        { ...editingContent, id: Date.now() },
      ]);
      Swal.fire("Saved!", "Content added successfully.", "success");
    }
    handleClose();
  };

  // Delete content
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the content permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setContentList((prev) => prev.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Content has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container-fluid p-0 d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "url(https://wallpapercave.com/wp/wp10615942.jpg)", // nice gradient BG
        padding: "40px",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Row className="mb-4 align-items-center">
          <Col>
            <h2>Catalog & Rights Management</h2>
          </Col>
          <Col className="text-end">
            <Button onClick={() => handleShow()} variant="primary">
              + Add New Content
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Type</th>
              <th>Genre</th>
              <th>Tags</th>
              <th>People</th>
              <th>Age</th>
              <th>Geo-blocks</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contentList.map((content) => (
              <tr key={content.id}>
                <td>
                  <img
                    src={content.poster}
                    alt="Poster"
                    width="60"
                    height="90"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                </td>
                <td>{content.title}</td>
                <td>{content.type}</td>
                <td>{content.genre}</td>
                <td>{content.tags.join(", ")}</td>
                <td>{content.people.join(", ")}</td>
                <td>{content.ageRating}</td>
                <td>{content.geoBlock.join(", ")}</td>
                <td>{content.expiry}</td>
                <td>
                  <Badge
                    bg={content.status === "Live" ? "success" : "secondary"}
                  >
                    {content.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-1"
                    onClick={() => handleShow(content)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(content.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for Add/Edit */}
        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingContent && editingContent.id
                ? "Edit Content"
                : "Add New Content"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editingContent && (
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingContent.title}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          title: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      value={editingContent.type}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Type</option>
                      <option>Movie</option>
                      <option>Series</option>
                      <option>Short</option>
                      <option>UGC</option>
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingContent.genre}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          genre: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label>Tags (comma separated)</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingContent.tags.join(", ")}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          tags: e.target.value
                            .split(",")
                            .map((t) => t.trim()),
                        })
                      }
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>People</Form.Label>
                    <Form.Select
                      multiple
                      value={editingContent.people}
                      onChange={(e) => {
                        const selected = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        setEditingContent({
                          ...editingContent,
                          people: selected,
                        });
                      }}
                    >
                      {peopleList.map((p, idx) => (
                        <option key={idx}>{p}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Age Rating</Form.Label>
                    <Form.Select
                      value={editingContent.ageRating}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          ageRating: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option>G</option>
                      <option>PG</option>
                      <option>13+</option>
                      <option>18+</option>
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Geo-blocks (comma separated ISO codes)</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingContent.geoBlock.join(", ")}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          geoBlock: e.target.value.split(",").map((t) => t.trim()),
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={editingContent.expiry}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          expiry: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Poster URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingContent.poster}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          poster: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={editingContent.status}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          status: e.target.value,
                        })
                      }
                    >
                      <option>Draft</option>
                      <option>Live</option>
                      <option>Upcoming</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CatalogRightsPage;
