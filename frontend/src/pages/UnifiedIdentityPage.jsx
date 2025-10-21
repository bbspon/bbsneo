// UnifiedIdentityPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Badge,
  ListGroup,
  ProgressBar,
  Table,
} from "react-bootstrap";
import {
  FaUserShield,
  FaFingerprint,
  FaMicrophone,
  FaGlobe,
  FaWallet,
  FaFileExport,
  FaCheckCircle,
  FaKey,
  FaBell,
} from "react-icons/fa";

const initialLinkedAccounts = [
  { id: "ott", name: "OTT Platform", connected: true },
  { id: "messaging", name: "Messaging", connected: true },
  { id: "shopping", name: "Shopping", connected: true },
  { id: "payments", name: "Payments", connected: false },
];

export default function UnifiedIdentityPage() {
  const [user, setUser] = useState({
    name: "Guest User",
    email: "",
    verified: false,
    hasDID: false,
    trustScore: 62,
    badges: ["Basic Profile"],
    region: "IN",
  });

  const [linkedAccounts, setLinkedAccounts] = useState(initialLinkedAccounts);
  const [selectedBiometrics, setSelectedBiometrics] = useState({
    fingerprint: false,
    face: false,
    voice: false,
    voicePassphrase: "",
  });
  const [didWallet, setDidWallet] = useState({
    did: "",
    exported: false,
    zkEnabled: false,
  });
  const [aiAlerts, setAiAlerts] = useState([
    { id: 1, severity: "high", text: "Possible deepfake attempt blocked", time: "3h ago" },
  ]);
  const [regulatory, setRegulatory] = useState({
    gdpr: true,
    ccpa: true,
    aadhaarLite: true,
    emiratesId: false,
  });

  const [showOnboard, setShowOnboard] = useState(false);
  const [showBiometrics, setShowBiometrics] = useState(false);
  const [showDIDModal, setShowDIDModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  // Create DID
  function createDID() {
    const newDid = `did:example:${Math.random().toString(36).substring(2, 12)}`;
    setDidWallet({ ...didWallet, did: newDid });
    setUser({ 
      ...user, 
      hasDID: true, 
      badges: [...new Set([...user.badges, "DID Holder"])], 
      trustScore: Math.min(100, user.trustScore + 5)
    });
    console.log("DID created:", newDid);
  }

  // Export DID
  function exportDID() {
    if (!didWallet.did) {
      console.warn("No DID to export");
      return;
    }
    setDidWallet({ ...didWallet, exported: true });
    console.log("DID exported:", didWallet.did);
  }

  // Toggle linked account
  function toggleLinkedAccount(id) {
    setLinkedAccounts(linkedAccounts.map(a => a.id === id ? { ...a, connected: !a.connected } : a));
    const acc = linkedAccounts.find(a => a.id === id);
    console.log(`${acc.name} is now ${acc.connected ? "disconnected" : "connected"}`);
  }

  // Toggle biometric
  function toggleBiometric(type) {
    setSelectedBiometrics({ ...selectedBiometrics, [type]: !selectedBiometrics[type] });
    console.log(`${type} biometric toggled to ${!selectedBiometrics[type]}`);
  }

  // Verify Government ID
  function simulateVerifyGovernment() {
    setUser({
      ...user,
      verified: true,
      badges: [...new Set([...user.badges, "Verified Govt ID"])],
      trustScore: Math.min(100, user.trustScore + 20)
    });
    setShowVerifyModal(false);
    console.log("Government ID verified for user:", user.name);
  }

  // ZKP Proof toggle
  function toggleZKP() {
    setDidWallet({ ...didWallet, zkEnabled: !didWallet.zkEnabled });
    console.log("ZKP enabled:", !didWallet.zkEnabled);
  }

  // Increase trust
  function increaseTrust(delta = 5) {
    setUser({ ...user, trustScore: Math.min(100, user.trustScore + delta) });
    console.log(`Trust score increased by ${delta}, now: ${Math.min(100, user.trustScore + delta)}`);
  }

  // Issue OTT Passport
  function issueOTTPassport() {
    if (!user.hasDID) {
      console.warn("Cannot issue OTT Passport: DID not created");
      return;
    }
    if (!user.badges.includes("OTT Passport")) {
      setUser({ ...user, badges: [...user.badges, "OTT Passport"] });
    }
    console.log("OTT Passport issued for user:", user.name);
  }

  // Revoke sessions
  function revokeSessions() {
    console.log("All active sessions revoked for user:", user.name);
    setUser({ ...user, trustScore: Math.max(0, user.trustScore - 10) });
  }

  // Generate Recovery Backup
  function generateRecoveryBackup() {
    const backupCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    console.log("Recovery backup code generated:", backupCode);
  }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Card className="mb-3">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={9}>
              <h4>
                <FaUserShield className="me-2" /> Unified Identity & Access
                <Badge bg="secondary" className="ms-2">Master</Badge>
              </h4>
              <div className="small text-muted mt-1">
                Single ID for OTT, Messaging, Shopping, Payments • DID • Biometrics • Cross-border KYC • AI Fraud
              </div>
            </Col>
            <Col xs={3} className="text-end">
              <Button variant="outline-primary" className="me-2" onClick={() => setShowOnboard(true)}>+ Onboard user</Button>
              <Button variant="primary" onClick={() => setShowDIDModal(true)}>
                {user.hasDID ? "Manage DID" : "Create DID"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        {/* Left Column */}
        <Col md={6}>
          {/* Profile */}
          <Card className="mb-3">
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              <h5>{user.name}</h5>
              <div><strong>Email:</strong> {user.email || <em>not set</em>}</div>
              <div><strong>Region:</strong> {user.region}</div>
              <div><strong>Badges:</strong> {user.badges.map((b,i)=><Badge bg="info" key={i} className="me-1">{b}</Badge>)}</div>
              <div>
                <strong>Trust score:</strong> {user.trustScore}
                <ProgressBar now={user.trustScore} className="mt-1"/>
              </div>
              <div className="d-flex gap-2 mt-3">
                <Button size="sm" variant="outline-success" onClick={()=>setShowBiometrics(true)}><FaFingerprint className="me-1"/>Biometrics</Button>
                <Button size="sm" variant="outline-secondary" onClick={()=>setShowVerifyModal(true)}><FaCheckCircle className="me-1"/>Verify Govt ID</Button>
                <Button size="sm" variant="outline-warning" onClick={()=>setShowRecoveryModal(true)}><FaKey className="me-1"/>Recovery Kit</Button>
              </div>
            </Card.Body>
          </Card>

          {/* Linked Accounts */}
          <Card className="mb-3">
            <Card.Header>Connected Modules</Card.Header>
            <ListGroup variant="flush">
              {linkedAccounts.map(acc=>(
                <ListGroup.Item key={acc.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{acc.name}</strong>
                    <div className="small text-muted">SingleID access</div>
                  </div>
                  <div>
                    <Badge bg={acc.connected?"success":"danger"} className="me-2">{acc.connected?"Connected":"Disconnected"}</Badge>
                    <Button size="sm" variant={acc.connected?"outline-danger":"outline-primary"} onClick={()=>toggleLinkedAccount(acc.id)}>{acc.connected?"Disconnect":"Connect"}</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          {/* DID Wallet */}
          <Card className="mb-3">
            <Card.Header>DID Wallet</Card.Header>
            <Card.Body>
              <div><strong>DID:</strong> {didWallet.did||<em>not created</em>}</div>
              <div className="mt-2 d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={()=>{createDID(); setShowDIDModal(true)}}><FaWallet className="me-1"/>Create DID</Button>
                <Button size="sm" variant="outline-secondary" onClick={exportDID}><FaFileExport className="me-1"/>Export DID</Button>
                <Button size="sm" variant={didWallet.zkEnabled?"success":"outline-dark"} onClick={toggleZKP}>ZKP {didWallet.zkEnabled?"On":"Off"}</Button>
              </div>
              <div className="small text-muted mt-2">DID allows verifiable credentials & portability.</div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col md={6}>
          {/* Adaptive Security & MFA */}
          <Card className="mb-3">
            <Card.Header>Adaptive Security & MFA</Card.Header>
            <Card.Body>
              <div className="mb-2">Risk-based verification: device trust, IP, geo.</div>
              <ListGroup variant="flush">
                <ListGroup.Item>Trusted devices: 3</ListGroup.Item>
                <ListGroup.Item>Geo-fencing: Enabled</ListGroup.Item>
                <ListGroup.Item>Passwordless: WebAuthn / Magic Links</ListGroup.Item>
              </ListGroup>
              <div className="mt-2 d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={()=>increaseTrust(3)}>Mark as Trusted</Button>
                <Button size="sm" variant="outline-danger" onClick={revokeSessions}>Revoke sessions</Button>
              </div>
            </Card.Body>
          </Card>

          {/* AI Alerts */}
          <Card className="mb-3">
            <Card.Header><FaBell className="me-2"/>AI Identity Guardian <Badge bg="danger">{aiAlerts.length}</Badge></Card.Header>
            <Card.Body>
              <div className="small text-muted mb-2">Monitors deepfake, liveness & unusual logins</div>
              <Table size="sm" responsive bordered>
                <thead>
                  <tr><th>Severity</th><th>Alert</th><th>Time</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {aiAlerts.map(a=>(
                    <tr key={a.id}>
                      <td>{a.severity}</td>
                      <td>{a.text}</td>
                      <td>{a.time}</td>
                      <td><Button size="sm" variant="outline-success">Acknowledge</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Regulatory & OTT Passport */}
          <Card className="mb-3">
            <Card.Header>Cross-border KYC & Compliance</Card.Header>
            <Card.Body>
              <div>GDPR / CCPA: {regulatory.gdpr && regulatory.ccpa?"Enabled":"Partial"}</div>
              <div>India Aadhaar-lite: {regulatory.aadhaarLite?"Enabled":"Pending"}</div>
              <div>UAE Emirates ID: {regulatory.emiratesId?"Enabled":"Pending"}</div>
              <Button size="sm" variant="outline-primary" className="mt-2" onClick={issueOTTPassport}>Issue OTT Passport</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={showOnboard} onHide={()=>setShowOnboard(false)} centered>
        <Modal.Header closeButton><Modal.Title>Onboard User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control placeholder="Enter full name"/></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Email</Form.Label><Form.Control placeholder="Enter email"/></Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Region</Form.Label>
              <Form.Select value={user.region} onChange={(e)=>setUser({...user, region:e.target.value})}>
                <option value="IN">India</option>
                <option value="UAE">UAE</option>
                <option value="US">US</option>
                <option value="EU">EU</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" onClick={()=>setShowOnboard(false)}>Onboard</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showBiometrics} onHide={()=>setShowBiometrics(false)} centered>
        <Modal.Header closeButton><Modal.Title>Enable Biometrics</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check type="checkbox" label={<><FaFingerprint className="me-2"/>Fingerprint</>} checked={selectedBiometrics.fingerprint} onChange={()=>toggleBiometric("fingerprint")}/>
            <Form.Check type="checkbox" label={<><FaUserShield className="me-2"/>Face</>} checked={selectedBiometrics.face} onChange={()=>toggleBiometric("face")}/>
            <Form.Check type="checkbox" label={<><FaMicrophone className="me-2"/>Voice</>} checked={selectedBiometrics.voice} onChange={()=>toggleBiometric("voice")}/>
            {selectedBiometrics.voice && <Form.Group className="mt-2"><Form.Label>Voice Passphrase</Form.Label><Form.Control type="text" value={selectedBiometrics.voicePassphrase} onChange={(e)=>setSelectedBiometrics({...selectedBiometrics, voicePassphrase:e.target.value})}/></Form.Group>}
            <Button className="mt-3" variant="primary" onClick={()=>setShowBiometrics(false)}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showVerifyModal} onHide={()=>setShowVerifyModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Verify Govt ID</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>Simulated verification flow</p>
          <Button variant="success" onClick={simulateVerifyGovernment}>Verify</Button>
        </Modal.Body>
      </Modal>

      <Modal show={showRecoveryModal} onHide={()=>setShowRecoveryModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Recovery Kit</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>Save backup codes & recovery options for SingleID</p>
          <Button variant="primary" onClick={generateRecoveryBackup}>Generate Backup</Button>
        </Modal.Body>
      </Modal>

      <Modal show={showDIDModal} onHide={()=>setShowDIDModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>DID Wallet</Modal.Title></Modal.Header>
        <Modal.Body>
          <div>DID: {didWallet.did||<em>Not created</em>}</div>
          <div className="mt-2 d-flex gap-2">
            <Button size="sm" variant="outline-primary" onClick={createDID}>Create DID</Button>
            <Button size="sm" variant="outline-secondary" onClick={exportDID}>Export DID</Button>
            <Form.Check type="switch" label="Enable ZKP proofs" checked={didWallet.zkEnabled} onChange={toggleZKP} className="mt-2"/>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
