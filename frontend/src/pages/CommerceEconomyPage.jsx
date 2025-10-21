// CommerceEconomyFixed.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Badge, Navbar, Nav, ProgressBar } from "react-bootstrap";
import ReactPlayer from "react-player"; // Real video player

// AI Recommendations
const aiProducts = [
  { id: 3, name: "VR Glasses", price: 14999, image: "https://m.media-amazon.com/images/I/51tzXi0e2RL._AC_SL1001_.jpg", rating: 4.7 },
  { id: 4, name: "Fitness Tracker", price: 7999, image: "https://m.media-amazon.com/images/I/51tzXi0e2RL._AC_SL1001_.jpg", rating: 4.3 },
];

// Live Deals
const liveDeals = [
  { id: 1, name: "Limited Edition Sneakers", discount: "20%", timer: 765 },
  { id: 2, name: "Gaming Laptop", discount: "15%", timer: 3920 },
];

export default function CommerceEconomyFixed() {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(20000);
  const [countdowns, setCountdowns] = useState(liveDeals.map(deal => deal.timer));

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(prev =>
        prev.map(time => (time > 0 ? time - 1 : 0))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => setCart([...cart, product]);

  const checkout = () => {
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    if (walletBalance >= total) {
      setWalletBalance(walletBalance - total);
      alert("Purchase successful!");
      setCart([]);
      setShowCartModal(false);
    } else {
      alert("Insufficient wallet balance!");
    }
  };

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  return (
    <Container fluid className="p-4">


      {/* Live Shoppable Video */}
      <h3 className="mb-3">Live Shoppable Video</h3>
      <Card className="mb-4">
        <ReactPlayer
          url="https://www.w3schools.com/html/mov_bbb.mp4"
          playing
          controls
          width="100%"
          height="300px"
        />
      </Card>

      {/* Live Deals */}
      <h3 className="mb-3">Live Deals & Flash Sales</h3>
      <Row className="mb-4">
        {liveDeals.map((deal, idx) => (
          <Col key={deal.id} md={6} className="mb-3">
            <Card className="h-100 border-danger shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{deal.name}</Card.Title>
                  <Card.Text>Discount: {deal.discount}</Card.Text>
                  <ProgressBar now={((deal.timer - countdowns[idx]) / deal.timer) * 100} className="mb-2" />
                  <Card.Text>Ends in: {formatTime(countdowns[idx])}</Card.Text>
                </div>
                <Button variant="danger" className="mt-2 w-100" onClick={() => addToCart({ id: deal.id, name: deal.name, price: 1000 })}>
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* AI Recommendations */}
      <h3 className="mb-3">AI-Powered Recommendations</h3>
      <Row className="mb-4">
        {aiProducts.map(p => (
          <Col key={p.id} md={3} sm={6} xs={12} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={p.image} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title style={{ fontSize: "14px" }}>{p.name}</Card.Title>
                  <Card.Text style={{ fontSize: "12px" }}>Recommended for you!</Card.Text>
                </div>
                <Button size="sm" className="mt-2 w-100" onClick={() => addToCart(p)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Metaverse Mall */}
      <h3 className="mb-3">Metaverse Mall (Coming Soon)</h3>
      <Card className="mb-4 text-center shadow-sm">
        <Card.Body>
          <Card.Text>3D/VR immersive shopping experience is under development.</Card.Text>
          <Button disabled variant="secondary">Enter Mall</Button>
        </Card.Body>
      </Card>

      {/* View Cart */}
      <div className="mb-3">
        <Button variant="primary" onClick={() => setShowCartModal(true)}>View Cart ({cart.length})</Button>
      </div>

      {/* Cart Modal */}
      <Modal show={showCartModal} onHide={() => setShowCartModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart & Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={7}>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom rounded">
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))
              )}
              {cart.length > 0 && (
                <div className="mt-3 fw-bold text-end">Total: ₹{cart.reduce((sum, p) => sum + p.price, 0)}</div>
              )}
            </Col>
            <Col md={5} className="border-start ps-3 d-flex flex-column align-items-stretch">
              <h5 className="mb-3">Wallet Balance: ₹{walletBalance}</h5>
              <Button variant="success" onClick={checkout} disabled={cart.length === 0} className="mb-3 w-100">
                Checkout Now
              </Button>
              <h6 className="mb-2">More Options</h6>
              <Button variant="outline-primary" size="sm" className="mb-2 w-100">Apply Promo Code</Button>
              <Button variant="outline-primary" size="sm" className="mb-2 w-100">Redeem Rewards</Button>
              <Button variant="outline-primary" size="sm" className="mb-2 w-100">Save for Later</Button>
              <Button variant="outline-primary" size="sm" className="mb-2 w-100">Gift This Product</Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCartModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
