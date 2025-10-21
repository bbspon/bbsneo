import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import {
  FaChartLine,
  FaServer,
  FaCodeBranch,
  FaBug,
  FaLock,
  FaRobot,
  FaUsersCog,
  FaDatabase,
} from "react-icons/fa";

export default function ObservabilityReliabilityPage() {
  const sections = [
    {
      title: "Monitoring Stack",
      icon: <FaChartLine className="me-2 text-primary" />,
      items: [
        "OpenTelemetry collectors for distributed tracing",
        "Prometheus metrics for real-time KPIs",
        "Grafana dashboards with live visualization",
        "Service health KPIs: latency, error rates, active sessions",
        "Synthetic monitoring for user journeys",
        "Automated SLO tracking and burn-rate alerts",
      ],
    },
    {
      title: "Centralized Logging",
      icon: <FaServer className="me-2 text-success" />,
      items: [
        "Loki / ELK pipeline for unified logs",
        "PII/PHI scrubbing and encryption at rest",
        "Log-based metrics & anomaly detection",
        "Immutable audit log streams for compliance",
      ],
    },
    {
      title: "Deployment Controls",
      icon: <FaCodeBranch className="me-2 text-warning" />,
      items: [
        "Canary rollout & progressive delivery",
        "Auto-rollback on SLO breach",
        "Blue/Green deployments and feature-flag toggles",
        "Shadow traffic testing before production cutover",
        "Automated config drift detection",
      ],
    },
    {
      title: "Testing & Reliability",
      icon: <FaBug className="me-2 text-danger" />,
      items: [
        "Automated load testing (≥1M concurrent sessions)",
        "Chaos engineering: kill pods, node drains, region failover",
        "Client-side chaos simulations (network drops, throttling)",
        "Long-duration soak & memory-leak detection",
        "Disaster-recovery drill scheduler",
      ],
    },
    {
      title: "Alerting & Incident Ops",
      icon: <FaUsersCog className="me-2 text-info" />,
      items: [
        "Threshold & anomaly-based alerts",
        "Integration with PagerDuty, Slack, MS Teams",
        "On-call schedule display & runbook links",
        "Real-time collaboration via ChatOps",
        "Post-incident auto-report generation",
      ],
    },
    {
      title: "Security & Compliance",
      icon: <FaLock className="me-2 text-secondary" />,
      items: [
        "Audit trails & tamper-evident logs",
        "Data retention policies & GDPR/CCPA readiness",
        "Real-time security event correlation (SIEM hooks)",
        "Tokenization of sensitive session data",
      ],
    },
    {
      title: "Data & Storage Observability",
      icon: <FaDatabase className="me-2 text-success" />,
      items: [
        "Database query performance & slow-query tracking",
        "Cache hit/miss metrics (Redis/Memcached)",
        "Storage capacity forecasting & cost analytics",
      ],
    },
  ];

  const advancedFeatures = [
    "AI/ML anomaly detection & predictive scaling",
    "Automated root-cause analysis and remediation",
    "Observability cost dashboards (metrics/log volume, cloud spend)",
    "Real-time revenue impact correlation with errors",
    "Cross-cloud failover & latency-aware global traffic steering",
    "Dynamic user-segmentation during incidents (VIP protection)",
    "Tenant-aware dashboards for partner studios/creators",
    "Role-based data access controls with fine-grained policies",
    "IDE-integrated trace explorers & auto post-mortem reports",
    "Energy-efficiency metrics for green operations",
    "Synthetic regional traffic replays for capacity planning",
    "AIOps-driven scaling of Kubernetes nodes",
    "Automated service dependency mapping & blast-radius analysis",
    "In-flight traffic mirroring for zero-downtime upgrades",
  ];

  return (
    <Container fluid className="p-4 bg-light">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold text-center mb-2">
            Observability &amp; Reliability
          </h1>
          <p className="lead text-center">
            Unified command center for monitoring, diagnostics, and resilience
            of the OTT platform.
          </p>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {sections.map((sec, idx) => (
          <Col key={idx}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="d-flex align-items-center mb-3">
                  {sec.icon}
                  <span>{sec.title}</span>
                </Card.Title>
                <ListGroup variant="flush">
                  {sec.items.map((item, i) => (
                    <ListGroup.Item key={i} className="border-0 ps-0">
                      • {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="fw-bold mb-3 text-center">
            <FaRobot className="me-2 text-primary" />
            Advanced & Future Enhancements
          </h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Expanded Roadmap</Accordion.Header>
              <Accordion.Body>
                <ul className="mb-0">
                  {advancedFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center text-muted">
          <small>
            Linked Modules: Admin &amp; Compliance, Media Pipeline, Hybrid
            Delivery/CDN Ops, Settlement &amp; Finance, Authentication &amp;
            Device Management, Notifications &amp; Live TV.
          </small>
        </Col>
      </Row>
    </Container>
  );
}
