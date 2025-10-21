// WalletTokenSystemPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Modal,
  Badge,
  Accordion,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";

const WalletTokenSystemPage = () => {
  // State
  const [walletBalance, setWalletBalance] = useState(1200);
  const [tokens, setTokens] = useState(450);
  const [holdbacks, setHoldbacks] = useState([{ id: 1, amount: 100, reason: "Pending Refund", date: "2025-10-04" }]);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Payout", amount: 500, status: "Completed", date: "2025-10-06" },
    { id: 2, type: "Token Redemption", amount: 200, status: "Completed", date: "2025-10-05" },
  ]);
  const [showCashoutModal, setShowCashoutModal] = useState(false);
  const [showP2PModal, setShowP2PModal] = useState(false);
  const [cashoutAmount, setCashoutAmount] = useState("");
  const [redeemTokens, setRedeemTokens] = useState("");
  const [p2pRecipient, setP2pRecipient] = useState("");
  const [p2pAmount, setP2pAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [scheduleDate, setScheduleDate] = useState("");

  const CASHOUT_THRESHOLD_CREATOR = 500;
  const CASHOUT_THRESHOLD_VIEWER = 200;

  const conversionRates = { INR: 1, USD: 0.012, AED: 0.044 }; // Example rates

  const showAlert = (title, text, icon = "info") => {
    Swal.fire({ title, text, icon, confirmButtonColor: "#3085d6" });
  };

  // Cashout handler
  const handleCashout = () => {
    let amount = parseFloat(cashoutAmount);
    if (isNaN(amount) || amount <= 0) return showAlert("Invalid Amount", "Enter a valid cashout amount", "warning");
    if (amount > walletBalance) return showAlert("Insufficient Balance", "You do not have enough balance", "error");
    if (amount < CASHOUT_THRESHOLD_VIEWER) return showAlert("Cashout Threshold", `Minimum cashout is ₹${CASHOUT_THRESHOLD_VIEWER}`, "warning");

    if (scheduleDate) {
      setTransactions([{ id: transactions.length + 1, type: "Scheduled Cashout", amount, status: "Scheduled", date: scheduleDate }, ...transactions]);
      showAlert("Cashout Scheduled", `Cashout of ₹${amount} scheduled on ${scheduleDate}`, "success");
    } else {
      setWalletBalance(walletBalance - amount);
      setTransactions([{ id: transactions.length + 1, type: "Cashout", amount, status: "Processing", date: new Date().toISOString().split("T")[0] }, ...transactions]);
      showAlert("Cashout Initiated", `Cashout of ₹${amount} is processing`, "success");
    }

    setCashoutAmount("");
    setScheduleDate("");
    setShowCashoutModal(false);
  };

  // Token redeem handler
  const handleTokenRedeem = () => {
    let redeem = parseFloat(redeemTokens) || tokens;
    if (redeem <= 0 || redeem > tokens) return showAlert("Invalid Token Amount", "Check token amount", "warning");

    const convertedAmount = redeem * conversionRates[currency];
    setWalletBalance(walletBalance + convertedAmount);
    setTransactions([{ id: transactions.length + 1, type: "Token Redemption", amount: convertedAmount, status: "Completed", date: new Date().toISOString().split("T")[0] }, ...transactions]);
    setTokens(tokens - redeem);
    showAlert("Tokens Redeemed", `Redeemed ${redeem} tokens → ${currency} ${convertedAmount.toFixed(2)}`, "success");
    setRedeemTokens("");
  };

  // P2P Transfer handler
  const handleP2PTransfer = () => {
    const amount = parseFloat(p2pAmount);
    if (!p2pRecipient || amount <= 0 || amount > walletBalance) return showAlert("Invalid Transfer", "Check recipient and amount", "error");

    setWalletBalance(walletBalance - amount);
    setTransactions([{ id: transactions.length + 1, type: `P2P Transfer to ${p2pRecipient}`, amount, status: "Completed", date: new Date().toISOString().split("T")[0] }, ...transactions]);
    showAlert("Transfer Successful", `Transferred ₹${amount} to ${p2pRecipient}`, "success");

    setP2pRecipient("");
    setP2pAmount("");
    setShowP2PModal(false);
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Wallet & Token System</h2>

      {/* Wallet & Token Summary */}
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Wallet Balance</Card.Title>
              <h3>{currency} {walletBalance.toFixed(2)}</h3>
              <Button variant="success" onClick={() => setShowCashoutModal(true)}>Cashout</Button>{" "}
              <Button variant="secondary" onClick={() => setShowP2PModal(true)}>P2P Transfer</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Universal Tokens</Card.Title>
              <h3>{tokens} <Badge bg="info">Tokens</Badge></h3>
              <Form className="d-flex mt-2">
                <Form.Control type="number" placeholder="Tokens to redeem" value={redeemTokens} onChange={(e) => setRedeemTokens(e.target.value)} />
                <Button variant="primary" className="ms-2" onClick={handleTokenRedeem}>Redeem</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Holdbacks</Card.Title>
              {holdbacks.length === 0 ? <p>No holdbacks</p> : holdbacks.map(h => <p key={h.id}>₹{h.amount} - {h.reason} ({h.date})</p>)}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Transaction History */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Transaction History</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id}>
                      <td>{tx.id}</td><td>{tx.type}</td><td>{tx.amount}</td><td>{tx.status}</td><td>{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Advanced Features Accordion */}
      <Row>
        <Col>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Advanced / Future Features</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Multi-currency support (INR, USD, AED)</li>
                  <li>Auto-conversion: Token → Cash</li>
                  <li>Scheduled payouts (weekly/monthly)</li>
                  <li>Partial token redemption</li>
                  <li>Gamified rewards & achievements</li>
                  <li>AI-driven insights for optimal cashout</li>
                  <li>BNPL / Micro-credit integration</li>
                  <li>Social gifting / P2P gifting</li>
                  <li>Tiered rewards system</li>
                  <li>Smart holdbacks based on user behavior</li>
                  <li>API integration for third-party payments</li>
                  <li>Voice command support for wallet operations</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      {/* Cashout Modal */}
      <Modal show={showCashoutModal} onHide={() => setShowCashoutModal(false)}>
        <Modal.Header closeButton><Modal.Title>Cashout</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter amount</Form.Label>
              <Form.Control type="number" value={cashoutAmount} onChange={(e) => setCashoutAmount(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Schedule Date (optional)</Form.Label>
              <Form.Control type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="AED">AED</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" onClick={handleCashout}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* P2P Modal */}
      <Modal show={showP2PModal} onHide={() => setShowP2PModal(false)}>
        <Modal.Header closeButton><Modal.Title>P2P Transfer</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Recipient</Form.Label>
              <Form.Control type="text" value={p2pRecipient} onChange={(e) => setP2pRecipient(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" value={p2pAmount} onChange={(e) => setP2pAmount(e.target.value)} />
            </Form.Group>
            <Button variant="success" onClick={handleP2PTransfer}>Send</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default WalletTokenSystemPage;
