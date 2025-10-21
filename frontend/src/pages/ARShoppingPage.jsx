import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Carousel,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample AR Products
const arProducts = [
  {
    id: 1,
    type: "Try-on",
    category: "Jewelry",
    title: "Diamond Ring",
    brand: "SparkleCo",
    description: "Try this stunning diamond ring in AR.",
    price: "₹4999",
    rating: 4.7,
    poster: "https://media.valigara.com/cl/267/images/main/CV1481561664VC/313707-ring-jewelry-white-gold-diamon-ring-f-vs2-dgi-142554919-2.jpg",
    device: ["Mobile", "Tablet"],
  },
  {
    id: 2,
    type: "Try-on",
    category: "Apparel",
    title: "Summer Dress",
    brand: "FashionHub",
    description: "See how this dress fits in AR.",
    price: "₹2999",
    rating: 4.5,
    poster: "https://images-cdn.ubuy.co.in/635e29037403ec6f010f8f6f-summer-dresses-for-women-2022-women-s.jpg",
    device: ["Mobile", "Tablet"],
  },
  {
    id: 3,
    type: "Room-view",
    category: "Furniture",
    title: "Modern Sofa",
    brand: "HomeComfort",
    description: "Place this sofa in your room via AR.",
    price: "₹15999",
    rating: 4.8,
    poster: "https://tse2.mm.bing.net/th/id/OIP.PJ9ILI0tVyvauLUAdXOCcgHaE9?rs=1&pid=ImgDetMain&o=7&rm=3",
    device: ["Mobile", "Tablet"],
  },
  {
    id: 4,
    type: "Room-view",
    category: "Electronics",
    title: "Smart TV 55\"",
    brand: "TechVision",
    description: "Visualize this TV in your living room in AR.",
    price: "₹45999",
    rating: 4.6,
    poster: "https://tse4.mm.bing.net/th/id/OIP.MHxEsc9T6pPbgLyC8QPa4AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    device: ["Mobile", "Tablet"],
  },
];

// Filters
const categories = ["Jewelry", "Apparel", "Makeup", "Furniture", "Electronics", "Décor"];
const ratings = [5, 4, 3, 2, 1];

const ARShoppingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const filteredProducts = arProducts.filter((item) => {
    return (
      (filterCategory === "" || item.category === filterCategory) &&
      (filterRating === "" || Math.floor(item.rating) === parseInt(filterRating))
    );
  });

  return (
    <Container fluid className="my-4">
      {/* Hero Carousel */}
      <Row>
        <Col>
          <Carousel>
            {arProducts.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block w-100"
                  src={item.poster}
                  alt={item.title}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(item)}
                  >
                    Try in AR
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Sidebar Filters */}
        <Col md={3}>
          <h5>Filters</h5>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="">All</option>
              {ratings.map((r, i) => (
                <option key={i} value={r}>
                  {r} Stars
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button
            variant="secondary"
            onClick={() => {
              setFilterCategory("");
              setFilterRating("");
            }}
          >
            Clear All
          </Button>
        </Col>

        {/* AR Product Cards */}
        <Col md={9}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredProducts.map((item) => (
              <Col key={item.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={item.poster}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.brand} | {item.category}
                    </Card.Subtitle>
                    <Card.Text>{item.description}</Card.Text>
                    <Badge bg="success" className="mb-2">
                      {item.price}
                    </Badge>{" "}
                    <Badge bg="info" className="mb-2">
                      {item.rating} ⭐
                    </Badge>
                    <br />
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(item)}
                      className="mt-2 me-2"
                    >
                      Try in AR
                    </Button>
                    <Button variant="outline-secondary" className="mt-2">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for AR Experience */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.poster}
                alt={selectedProduct.title}
                className="img-fluid mb-3"
              />
              <p>{selectedProduct.description}</p>
              <p>
                <strong>Price:</strong> {selectedProduct.price}
              </p>
              <p>
                <strong>Rating:</strong> {selectedProduct.rating} ⭐
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category}
              </p>
              <p>
                <strong>Supported Devices:</strong>{" "}
                {selectedProduct.device.join(", ")}
              </p>
              <Button variant="success" className="me-2">
                Try in AR
              </Button>
              <Button variant="outline-primary">Add to Wishlist</Button>
            </>
          )}
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default ARShoppingPage;
