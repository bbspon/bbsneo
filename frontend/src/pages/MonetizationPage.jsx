// MonetizationPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
  Modal,
  Table,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCoins, FaGift, FaShoppingCart, FaAd, FaLink, FaUsers } from "react-icons/fa";

const mockAPIs = {
  getWalletBalance: () =>
    Promise.resolve({ balance: 120.5, tokens: 50, earned: 200 }),
  postAdsDecision: () => Promise.resolve({ ad: "Video Ad #1", impressions: 1200 }),
  postPaymentCheckout: (item) => Promise.resolve({ success: true, item }),
  getEngagementLeaderboard: () =>
    Promise.resolve([
      { user: "Alice", tokens: 120 },
      { user: "Bob", tokens: 100 },
      { user: "Charlie", tokens: 90 },
    ]),
};

const MonetizationPage = () => {
  const [wallet, setWallet] = useState({ balance: 0, tokens: 0, earned: 0 });
  const [ads, setAds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [engagementLeaderboard, setEngagementLeaderboard] = useState([]);
  const [sceneSKU, setSceneSKU] = useState([
    { scene: "Intro Scene", sku: "Product-101" },
    { scene: "Action Scene", sku: "Product-102" },
  ]);
  const [referralPercent, setReferralPercent] = useState(10); // Example

  useEffect(() => {
    // Fetch wallet balance
    mockAPIs.getWalletBalance().then((res) => setWallet(res));
    // Fetch ads decision
    mockAPIs.postAdsDecision().then((res) => setAds([res]));
    // Fetch engagement leaderboard
    mockAPIs.getEngagementLeaderboard().then((res) => setEngagementLeaderboard(res));
  }, []);

  const handlePayment = (item) => {
    setSelectedPayment(item);
    mockAPIs.postPaymentCheckout(item).then((res) => {
      if (res.success) setShowModal(true);
    });
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">OTT Monetization</h2>

      {/* Wallet & Tokens */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3">
            <h5>
              <FaCoins /> Wallet Balance
            </h5>
            <p>₹ {wallet.balance}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>
              <FaGift /> Watch-to-Earn Tokens
            </h5>
            <p>{wallet.tokens} tokens</p>
            <ProgressBar now={(wallet.tokens / 100) * 100} label={`${wallet.tokens}%`} />
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Earnings History</h5>
            <p>₹ {wallet.earned} earned from engagement & referrals</p>
          </Card>
        </Col>
      </Row>

      {/* Ads Section */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <h5>
              <FaAd /> AVOD & SSAI Ads
            </h5>
            <ListGroup>
              {ads.map((ad, idx) => (
                <ListGroup.Item key={idx}>
                  {ad.ad} - {ad.impressions} impressions
                  <Button size="sm" variant="outline-primary" className="ml-2">
                    View Analytics
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Subscriptions & Premium */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3">
            <h5>Free (Ad-supported)</h5>
            <p>Access free content with ads.</p>
            <Button variant="outline-success">Upgrade to Premium</Button>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Premium (Ad-free)</h5>
            <p>Enjoy uninterrupted premium content.</p>
            <Button variant="success">Subscribe ₹299/mo</Button>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>SVOD Subscriptions</h5>
            <p>Monthly & Annual Plans</p>
            <Button variant="info">Manage Subscription</Button>
          </Card>
        </Col>
      </Row>

      {/* Transactions & Shoppable Video */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaShoppingCart /> Pay-per-view & Micro-tips
            </h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Content</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Exclusive Movie 1</td>
                  <td>PPV</td>
                  <td>
                    <Button
                      onClick={() => handlePayment("Exclusive Movie 1")}
                      variant="primary"
                    >
                      Buy
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Creator Tip</td>
                  <td>Micro-tip</td>
                  <td>
                    <Button onClick={() => handlePayment("Tip")} variant="success">
                      Tip ₹50
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h5>Shoppable Video</h5>
            <p>Buy products featured in scenes:</p>
            <ListGroup>
              {sceneSKU.map((item, idx) => (
                <ListGroup.Item key={idx}>
                  Scene: <b>{item.scene}</b> → SKU: {item.sku}{" "}
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handlePayment(item.sku)}
                  >
                    Buy Product
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Referral & Engagement Pool */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaLink /> Referral Program
            </h5>
            <p>Invite friends & earn rewards: {referralPercent}% of friend spend</p>
            <Button variant="secondary">View Referral Stats</Button>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaUsers /> Engagement Pool Leaderboard
            </h5>
            <ListGroup>
              {engagementLeaderboard.map((user, idx) => (
                <ListGroup.Item key={idx}>
                  {user.user} → {user.tokens} tokens
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Payment Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully completed the transaction for:{" "}
          <b>{selectedPayment}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MonetizationPage;
