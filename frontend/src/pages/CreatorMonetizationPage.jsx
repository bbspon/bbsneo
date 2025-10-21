import React from "react";
import { Container, Row, Col, Card, Button, Badge, Accordion, ListGroup } from "react-bootstrap";
import { FaStar, FaGift, FaDollarSign, FaTicketAlt, FaChartLine, FaShoppingCart, FaCoins, FaUserFriends, FaVideo, FaMedal } from "react-icons/fa";

const tiers = [
  { name: "Basic", price: "₹199", perks: ["Ad-free", "Early Access"] },
  { name: "Premium", price: "₹499", perks: ["Ad-free", "Bonus Videos", "Behind-the-scenes"] },
  { name: "VIP", price: "₹999", perks: ["All Perks + Exclusive Q&A", "Merch Discounts", "VIP Events"] },
];

const merch = [
  { name: "Limited Edition T-Shirt", price: "₹999" },
  { name: "Collector's Mug", price: "₹499" },
  { name: "Signed Poster", price: "₹1299" },
];

const ppvEvents = [
  { name: "Stand-up Comedy Show", price: "₹299" },
  { name: "Film Premiere", price: "₹499" },
  { name: "Live Concert", price: "₹699" },
];

const fanEngagement = [
  "Live Q&A Sessions",
  "Polls & Voting",
  "Fan Leaderboards",
  "Virtual Meet & Greets",
];

const futureFeatures = [
  "Creator DAOs for fan voting",
  "AI-Powered Personalized Rewards",
  "Cross-Platform Creator Economy",
  "Fan-to-Fan Trading",
  "Predictive Revenue Analytics",
  "Micro-Monetization (clips/shorts)",
  "Global Expansion Support",
  "AI-Curated Recommendations",
  "AR/VR Interactive Experiences",
  "Social Commerce & Affiliate Sales",
];

function CreatorMonetizationPage() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">OTT Creator Monetization</h1>

      {/* Subscriptions */}
      <h3 className="mb-3">Subscriptions</h3>
      <Row className="mb-5">
        {tiers.map((tier, idx) => (
          <Col md={4} key={idx} className="mb-3">
            <Card className="h-100 shadow-sm border-primary">
              <Card.Body>
                <Card.Title>{tier.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{tier.price}/month</Card.Subtitle>
                <ListGroup variant="flush" className="mb-3">
                  {tier.perks.map((perk, i) => (
                    <ListGroup.Item key={i}><FaStar className="text-warning me-2" /> {perk}</ListGroup.Item>
                  ))}
                </ListGroup>
                <Button variant="primary" className="w-100">Subscribe</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Merch Stores */}
      <h3 className="mb-3">Merch Store</h3>
      <Row className="mb-5">
        {merch.map((item, idx) => (
          <Col md={4} key={idx} className="mb-3">
            <Card className="h-100 shadow-sm border-success">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Price: {item.price}</Card.Subtitle>
                <Button variant="success" className="w-100"><FaShoppingCart /> Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pay-Per-View Events */}
      <h3 className="mb-3">Pay-Per-View Events</h3>
      <Row className="mb-5">
        {ppvEvents.map((event, idx) => (
          <Col md={4} key={idx} className="mb-3">
            <Card className="h-100 shadow-sm border-warning">
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Price: {event.price}</Card.Subtitle>
                <Button variant="warning" className="w-100"><FaTicketAlt /> Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Revenue Splits */}
      <h3 className="mb-3">Revenue Splits</h3>
      <Card className="mb-5 shadow-sm border-info">
        <Card.Body>
          <p><strong>Smart Contract Revenue Splits:</strong> Automated distribution between creators, platform, partners, and investors. Transparent analytics dashboard included.</p>
          <Button variant="info" className="me-2"><FaChartLine /> View Analytics</Button>
          <Button variant="secondary"><FaDollarSign /> Earnings Details</Button>
        </Card.Body>
      </Card>

      {/* Creator Investments */}
      <h3 className="mb-3">Creator Investments</h3>
      <Card className="mb-5 shadow-sm border-success">
        <Card.Body>
          <p>Fans can micro-invest in creators’ future projects. Earnings shared as dividends or platform credits. Blockchain-secured.</p>
          <Button variant="success"><FaCoins /> Invest Now</Button>
        </Card.Body>
      </Card>

      {/* Creator Tokens & Loyalty */}
      <h3 className="mb-3">Creator Tokens & Loyalty</h3>
      <Card className="mb-5 shadow-sm border-dark">
        <Card.Body>
          <p>Optional loyalty tokens for superfans. Unlock exclusive content, merch discounts, VIP events, and gamified leaderboards.</p>
          <Button variant="dark"><FaGift /> Claim Token</Button>
        </Card.Body>
      </Card>

      {/* Fan Engagement */}
      <h3 className="mb-3">Fan Engagement</h3>
      <Row className="mb-5">
        {fanEngagement.map((item, idx) => (
          <Col md={3} key={idx} className="mb-3">
            <Card className="h-100 shadow-sm border-secondary text-center">
              <Card.Body>
                <FaUserFriends size={30} className="mb-2" />
                <Card.Title>{item}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Future Enhancements */}
      <h3 className="mb-3">Future Enhancements & OTT Features</h3>
      <Accordion defaultActiveKey="0" className="mb-5">
        {futureFeatures.map((feature, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={idx}>
            <Accordion.Header>{feature}</Accordion.Header>
            <Accordion.Body>
              Integration roadmap for "{feature}" in OTT ecosystem including AR/VR, social commerce, AI-driven insights, cross-platform monetization, and fan-to-fan interactions.
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default CreatorMonetizationPage;
