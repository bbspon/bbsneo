// RevenueStreamsPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
  ListGroup,
  ButtonGroup,
  ProgressBar,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaAd, FaRegCreditCard, FaTicketAlt, FaShoppingCart, FaGift, FaCoins,
  FaHandshake, FaGlobe, FaInfoCircle
} from "react-icons/fa";

const initialStreams = [
  {
    id: "avod",
    name: "Ads (AVOD)",
    icon: <FaAd />,
    description: "Pre/mid/post-roll, overlays, sponsored shorts and dynamic ad insertion for live streams.",
    active: true,
    examples: ["Pre-roll", "Mid-roll", "Live DAI"],
    advanced: [
      "Contextual AI targeting",
      "Interactive ads (polls / CTA)",
      "AR/VR branded experiences",
    ],
  },
  {
    id: "svod",
    name: "Subscriptions & Memberships (SVOD)",
    icon: <FaRegCreditCard />,
    description: "Monthly/annual creator subscriptions, premium tiers, badges and exclusive communities.",
    active: false,
    examples: ["Monthly Pass", "Premium Channel Tier"],
    advanced: ["Family/student plans", "Recurring merch box subscriptions"],
  },
  {
    id: "ppv",
    name: "Pay-Per-View (PPV) Events",
    icon: <FaTicketAlt />,
    description: "Premieres, concerts, sports and paid workshops with ticketing + replay access.",
    active: false,
    examples: ["Live Concert", "Exclusive Premiere"],
    advanced: ["Bundle pricing", "Fan passes / VIP tiers", "Replay windows"],
  },
  {
    id: "commerce",
    name: "Commerce (BBSCART Marketplace)",
    icon: <FaShoppingCart />,
    description: "Creator merch, digital products, live commerce checkout, affiliate storefronts and marketplace listings.",
    active: true,
    examples: ["Merch", "Digital assets", "Live product drops"],
    advanced: ["Dropshipping integration", "Co-branded product collabs"],
  },
  {
    id: "tips",
    name: "Tips & Micro-payments",
    icon: <FaGift />,
    description: "Instant fan tipping in live and on uploads — super chats, digital stickers and small one-off payments.",
    active: true,
    examples: ["Live tip", "Post tipping"],
    advanced: ["Tokenized tips", "Tip tiers with collectibles"],
  },
  {
    id: "rewards",
    name: "Referral & Watch-to-Earn Rewards",
    icon: <FaCoins />,
    description: "Referral bonuses, loyalty points for watch hours, gamified missions with token/point rewards.",
    active: false,
    examples: ["Referral bonus", "Watch streak rewards"],
    advanced: ["NFT collectibles for milestones", "Regional ambassador programs"],
  },
  {
    id: "agentads",
    name: "Agent-Sold Ad Deals",
    icon: <FaHandshake />,
    description: "Regional agents sell ad inventory directly and creators receive campaign shares.",
    active: false,
    examples: ["Brand campaign", "Regional sponsorship"],
    advanced: ["Agency dashboard", "Contracted revenue splits"],
  },
  {
    id: "ambassador",
    name: "Ambassador / Regional Profit Share (BBS NEO)",
    icon: <FaGlobe />,
    description: "Local ambassadors earn a portion of regional profits to incentivize growth and marketing.",
    active: false,
    examples: ["Regional ambassador payout"],
    advanced: ["Performance-based tiers", "Local community fund"],
  },
];

export default function RevenueStreamsPage() {
  const [streams, setStreams] = useState(initialStreams);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSettlement, setShowSettlement] = useState(false);

  function toggleStream(id) {
    setStreams((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  }

  function openDetail(stream) {
    setSelected(stream);
    setShowDetail(true);
  }

  const saveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Swal.fire({
        title: "✅ Saved!",
        text: "Your settings were saved successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    }, 700);
  };

  // Replace all alerts with SweetAlert2
  const showRedirect = (msg) => {
    Swal.fire({
      title: "ℹ️ Redirect",
      text: msg,
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  function summaryEarnings() {
    const activeCount = streams.filter((s) => s.active).length || 1;
    return streams.map((s) => ({
      id: s.id,
      name: s.name,
      value: s.active ? Math.round(100 / activeCount) : 0,
    }));
  }

  const earnings = summaryEarnings();

  return (
    <Container className="py-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2 className="mb-0">Revenue Streams We Cover</h2>
          <small className="text-muted d-block">
            All settlements are Net of taxes, serving fees, and invalid traffic adjustments.
          </small>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={() => setShowSettlement(true)}>
            Settlement Note <FaInfoCircle className="ms-2" />
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={8}>
          <Row className="g-3">
            {streams.map((s) => (
              <Col md={6} key={s.id}>
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">
                          <Badge bg={s.active ? "success" : "secondary"} className="me-2">
                            {s.icon}
                          </Badge>
                          {s.name}
                        </h5>
                        <p className="mb-1 text-muted small">{s.description}</p>
                        <div className="small text-muted">Examples: {s.examples.join(", ")}</div>
                      </div>
                      <div className="text-end">
                        <Button
                          size="sm"
                          variant={s.active ? "outline-danger" : "outline-success"}
                          onClick={() => toggleStream(s.id)}
                          className="mb-2"
                        >
                          {s.active ? "Disable" : "Enable"}
                        </Button>
                        <div>
                          <Button size="sm" variant="link" onClick={() => openDetail(s)}>Configure</Button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="mt-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Quick Actions</h5>
                  <div className="small text-muted">Shortcuts to related pages and tools</div>
                </div>
                <div>
                  <ButtonGroup>
                    <Button variant="outline-primary" onClick={() => showRedirect("Go to Creator Dashboard (placeholder)")}>Dashboard</Button>
                    <Button variant="outline-secondary" onClick={() => showRedirect("Go to Monetization Settings (placeholder)")}>Monetization Settings</Button>
                    <Button variant="outline-secondary" onClick={() => showRedirect("Open Commerce / BBSCART (placeholder)")}>Commerce</Button>
                    <Button variant="outline-secondary" onClick={() => showRedirect("Open Events / PPV (placeholder)")}>Events</Button>
                    <Button variant="outline-secondary" onClick={() => showRedirect("Open Settlements (placeholder)")}>Settlements</Button>
                  </ButtonGroup>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Simulated Earnings Breakdown</h6>
                  <small className="text-muted">(Distribution across active monetization streams)</small>
                </div>
                <div>
                  <Button size="sm" onClick={() => setStreams(initialStreams)}>Reset</Button>
                  <Button size="sm" className="ms-2" onClick={saveSettings} disabled={saving}>
                    {saving ? "Saving..." : "Save Settings"}
                  </Button>
                </div>
              </div>

              <Row className="mt-3">
                <Col md={6}>
                  <ListGroup>
                    {earnings.map((e) => (
                      <ListGroup.Item key={e.id} className="d-flex justify-content-between align-items-center">
                        <div>{streams.find(s => s.id === e.id)?.name}</div>
                        <Badge bg="primary">{e.value}%</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center">
                  <small className="text-muted">Top active streams visual</small>
                  {earnings.map((e) => (
                    <div key={e.id} className="mb-2">
                      <div className="d-flex justify-content-between small">
                        <div>{streams.find(s => s.id === e.id)?.name}</div>
                        <div>{e.value}%</div>
                      </div>
                      <ProgressBar now={e.value} />
                    </div>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-1">Why diversify?</h5>
              <p className="small text-muted">Multiple revenue streams reduce volatility, increase lifetime value, and improve creator independence.</p>
              <ul className="small">
                <li>Mix of recurring & transactional revenue</li>
                <li>Fan-first monetization (tips, memberships)</li>
                <li>Brand & commerce partnerships for higher ticket revenue</li>
              </ul>

              <hr />

              <h6 className="mb-1">Future Enhancements</h6>
              <ListGroup variant="flush" className="small">
                <ListGroup.Item>Tokenized economy & NFT passes</ListGroup.Item>
                <ListGroup.Item>AI-driven contextual ads</ListGroup.Item>
                <ListGroup.Item>BNPL & early payouts for creators</ListGroup.Item>
                <ListGroup.Item>Interactive AR/VR ad experiences</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h6 className="mb-1">Notes & Policies</h6>
              <small className="text-muted d-block">All settlements are net of taxes, serving fees, and invalid traffic adjustments. Final payout details appear on the Settlements page.</small>
              <div className="mt-2">
                <Button variant="link" size="sm" onClick={() => showRedirect("Open Help / FAQ (placeholder)")}>Help & FAQ</Button>
                <Button variant="link" size="sm" onClick={() => showRedirect("Open Agreement terms (placeholder)")}>Agreement terms</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detail Modal */}
      <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Configure: {selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div>
              <p className="text-muted">{selected.description}</p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enable / Disable</Form.Label>
                  <div>
                    <Button
                      variant={selected.active ? "danger" : "success"}
                      onClick={() => {
                        toggleStream(selected.id);
                        setSelected({ ...selected, active: !selected.active });
                      }}
                    >
                      {selected.active ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Examples</Form.Label>
                  <div className="small text-muted">{selected.examples.join(", ")}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Advanced / Future Features</Form.Label>
                  <ListGroup>
                    {selected.advanced.map((a, i) => (
                      <ListGroup.Item key={i} className="small">{a}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Regional Settings</Form.Label>
                  <Form.Select defaultValue="global">
                    <option value="global">Global (default)</option>
                    <option value="in">India</option>
                    <option value="us">United States</option>
                    <option value="eu">Europe</option>
                  </Form.Select>
                  <div className="small text-muted mt-2">Set regional splits, agent pipelines, and ambassador rules per region.</div>
                </Form.Group>
              </Form>

              <hr />

              <h6>Integration Links</h6>
              <div className="d-flex gap-2 flex-wrap">
                <Button size="sm" variant="outline-primary" onClick={() => showRedirect("Open Creator Dashboard (placeholder)")}>Creator Dashboard</Button>
                <Button size="sm" variant="outline-secondary" onClick={() => showRedirect("Open Commerce (placeholder)")}>Commerce</Button>
                <Button size="sm" variant="outline-secondary" onClick={() => showRedirect("Open Events (placeholder)")}>Events</Button>
                <Button size="sm" variant="outline-secondary" onClick={() => showRedirect("Open Settlements (placeholder)")}>Settlements</Button>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(false)}>Close</Button>
          <Button variant="primary" onClick={() => { saveSettings(); setShowDetail(false); }}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Settlement Note Modal */}
      <Modal show={showSettlement} onHide={() => setShowSettlement(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settlement Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="small text-muted">All settlements are calculated net of:</p>
          <ul>
            <li>Applicable taxes (per jurisdiction)</li>
            <li>Serving & processing fees</li>
            <li>Invalid traffic adjustments (fraud protection)</li>
          </ul>
          <p className="small text-muted">Detailed payout reports appear on the Settlements page with timestamps, adjustment reasons and transaction-level breakdown.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSettlement(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
