// File: CreatorEconomyPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample Data (replace with API/fake data)
const creators = [
  { id: 1, name: "Creator One", stock: "12.5%", value: "$1250", img: "https://thumbs.dreamstime.com/b/icono-de-creador-aislado-en-fondo-blanco-ilustraci%C3%B3n-vectorial-234333912.jpg" },
  { id: 2, name: "Creator Two", stock: "8.3%", value: "$830", img: "https://thumbs.dreamstime.com/b/icono-de-creador-aislado-en-fondo-blanco-ilustraci%C3%B3n-vectorial-234333912.jpg" },
  { id: 3, name: "Creator Three", stock: "15.0%", value: "$1500", img: "https://thumbs.dreamstime.com/b/icono-de-creador-aislado-en-fondo-blanco-ilustraci%C3%B3n-vectorial-234333912.jpg" },
];

const daos = [
  { id: 1, name: "DAO Alpha", members: 1200, img: "https://tse4.mm.bing.net/th/id/OIP.ixT90jDjewwHII3l49AgEAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, name: "DAO Beta", members: 800, img: "https://tse4.mm.bing.net/th/id/OIP.ixT90jDjewwHII3l49AgEAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
];

const aiCreations = [
  { id: 1, title: "Alt Ending 1", creator: "Fan + AI", img: "https://pics.craiyon.com/2023-11-16/aReKNarUQj-ZCvLxyOGeTQ.webp" },
  { id: 2, title: "Spinoff Mini-Series", creator: "Fan + AI", img: "https://miro.medium.com/v2/resize:fit:1200/1*IREz_ajiP8-jqYUPEfnkcA.jpeg" },
];

const ipMarketplace = [
  { id: 1, name: "Script #1", price: "$500", img: "https://tse2.mm.bing.net/th/id/OIP.S9o0bxtfmE_2Hr-_XXdmowHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, name: "Character Rights", price: "$1200", img: "https://tse2.mm.bing.net/th/id/OIP.S9o0bxtfmE_2Hr-_XXdmowHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
];

const subscriptions = [
  { id: 1, tier: "Basic", perks: ["Access to content", "Fan badge"] },
  { id: 2, tier: "Premium", perks: ["Exclusive videos", "Merch discounts", "Direct chat"] },
  { id: 3, tier: "VIP", perks: ["One-on-one sessions", "Early access", "Special merch"] },
];

const CreatorEconomyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const handleInvestNow = (creator) => {
    setSelectedCreator(creator);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCreator(null);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#">Creator Economy 3.0</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#stock-market">Stock Market</Nav.Link>
              <Nav.Link href="#daos">DAOs</Nav.Link>
              <Nav.Link href="#ai-creations">AI Co-Creations</Nav.Link>
              <Nav.Link href="#ip-exchange">IP Exchange</Nav.Link>
              <Nav.Link href="#subscriptions">Subscriptions</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')", backgroundSize: 'cover' }}>
        <h1>Creator Economy 3.0</h1>
        <p>Invest, co-create, and trade with your favorite creators.</p>
        <Button variant="primary" size="lg">Explore Opportunities</Button>
      </div>

      <Container className="py-5">

        {/* Creator Stock Market */}
        <section id="stock-market" className="mb-5">
          <h2 className="mb-4">Creator Stock Market</h2>
          <Row>
            {creators.map((creator) => (
              <Col md={4} className="mb-4" key={creator.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={creator.img} />
                  <Card.Body>
                    <Card.Title>{creator.name}</Card.Title>
                    <Card.Text>Ownership: {creator.stock}</Card.Text>
                    <Card.Text>Current Value: {creator.value}</Card.Text>
                    <Button variant="success" onClick={() => handleInvestNow(creator)}>Invest Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Creator DAOs */}
        <section id="daos" className="mb-5">
          <h2 className="mb-4">Creator DAOs</h2>
          <Row>
            {daos.map((dao) => (
              <Col md={6} className="mb-4" key={dao.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={dao.img} />
                  <Card.Body>
                    <Card.Title>{dao.name}</Card.Title>
                    <Card.Text>Members: {dao.members}</Card.Text>
                    <Button variant="primary">Join DAO</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* AI Co-Creators */}
        <section id="ai-creations" className="mb-5">
          <h2 className="mb-4">AI Co-Creators & Licensed AI Actors</h2>
          <Row>
            {aiCreations.map((item) => (
              <Col md={6} className="mb-4" key={item.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>Created by: {item.creator}</Card.Text>
                    <Button variant="warning">Co-Create</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <p className="text-muted">Creators can now license AI actors (face/voice) for infinite auto-generated content.</p>
        </section>

        {/* Universal IP Exchange */}
        <section id="ip-exchange" className="mb-5">
          <h2 className="mb-4">Universal IP Exchange</h2>
          <Row>
            {ipMarketplace.map((ip) => (
              <Col md={4} className="mb-4" key={ip.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={ip.img} />
                  <Card.Body>
                    <Card.Title>{ip.name}</Card.Title>
                    <Card.Text>Price: {ip.price}</Card.Text>
                    <Button variant="info">Browse Marketplace</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Subscriptions & Merch */}
        <section id="subscriptions" className="mb-5">
          <h2 className="mb-4">Creator Subscriptions & Merch</h2>
          <Row>
            {subscriptions.map((sub) => (
              <Col md={4} className="mb-4" key={sub.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{sub.tier} Tier</Card.Title>
                    <Card.Text>
                      Perks:
                      <ul>
                        {sub.perks.map((perk, idx) => <li key={idx}>{perk}</li>)}
                      </ul>
                    </Card.Text>
                    <Button variant="primary">Subscribe</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <p className="text-muted mt-3">Also includes PPV events, direct merch stores, and auto-calculated revenue splits for creators.</p>
        </section>

      </Container>

      {/* Invest Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Invest in {selectedCreator?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the amount you want to invest in this creator:</p>
          <input type="number" className="form-control mb-3" placeholder="$100" />
          <p>Note: Future implementation will integrate wallet + transaction system.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="success" onClick={() => { alert(`Invested in ${selectedCreator?.name}!`); handleModalClose(); }}>Confirm Investment</Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 text-center">
        <p>&copy; 2025 Creator Economy 3.0. All rights reserved.</p>
        <p>Enhanced with AI, Blockchain, Fan Co-Creation, and Futuristic Creator Stock Exchange.</p>
      </footer>
    </>
  );
};

export default CreatorEconomyPage;
