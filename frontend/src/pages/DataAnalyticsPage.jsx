import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Nav,
  Table,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AiOutlineLineChart,
  AiOutlineDatabase,
  AiOutlineUser,
  AiOutlineAlert,
} from "react-icons/ai";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataAnalyticsPage = () => {
  const [qoeData, setQoeData] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [adsData, setAdsData] = useState(null);
  const [fraudData, setFraudData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching analytics data
    setTimeout(() => {
      setQoeData({ playerStart: 1.8, rebuffer: 0.15, apiLatency: 120 });
      setCreatorData([
        { name: "Creator A", views: 12000, revenue: 2500 },
        { name: "Creator B", views: 8500, revenue: 1800 },
      ]);
      setAdsData({ arpu: 35.5, ltv: 210, cac: 45, rpm: 10.2 });
      setFraudData({ botnets: 12, referralRings: 4, ivtTraffic: 3.5 });
      setLoading(false);
    }, 1000);
  }, []);

  const qoeChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Rebuffer %",
        data: [0.2, 0.18, 0.15, 0.2, 0.19, 0.17, 0.15],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
      {
        label: "Player Start (s)",
        data: [2, 1.9, 1.8, 2.1, 2, 1.85, 1.8],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
      },
    ],
  };

  const revenueChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [250, 300, 270, 320, 290, 310, 330],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  if (loading)
    return (
      <Container className="text-center my-5">
        <Spinner animation="grow" variant="primary" />
      </Container>
    );

  return (
    <Container fluid className="my-4">
      <h2 className="mb-4 text-dark text-center" style={{ fontWeight: "700" }}>
        Data & Analytics 
      </h2>

      {/* KPI Cards */}
      <Row className=" d-flex justify-content-center align-items-stretch my-4 g-4 ">
        {[
          { title: "Player Start (s)", value: qoeData.playerStart, icon: <AiOutlineLineChart size={50} /> },
          { title: "Rebuffer %", value: qoeData.rebuffer, icon: <AiOutlineLineChart size={30} /> },
          { title: "ARPU ($)", value: adsData.arpu, icon: <AiOutlineDatabase size={50} /> },
          { title: "LTV ($)", value: adsData.ltv, icon: <AiOutlineUser size={50} /> },
        ].map((item, idx) => (
          <Col md={3} key={idx}>
            <Card
              className="text-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
              }}
            >
              <Card.Body>
                <div className="mb-2">{item.icon}</div>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                  {item.title.includes("%") ? item.value * 100 + "%" : item.value}
                </Card.Text>
                {item.title === "Rebuffer %" && (
                  <ProgressBar
                    now={qoeData.rebuffer * 100}
                    variant="light"
                    style={{ height: "6px", borderRadius: "3px" }}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Styled Tabs */}
      <Tab.Container defaultActiveKey="qoe">
        <Nav
          variant="pills"
          className="mb-3 justify-content-center"
          style={{ cursor: "pointer" }}
        >
          {[
            { key: "qoe", label: "Playback QoE" },
            { key: "creators", label: "Creators" },
            { key: "ads", label: "Ads / Monetization" },
            { key: "fraud", label: "Fraud" },
          ].map((tab) => (
            <Nav.Item key={tab.key}>
              <Nav.Link
                eventKey={tab.key}
                style={{
                  fontWeight: "600",
                  color: "#333",
                  backgroundColor: "#e2e8f0",
                  margin: "0 5px",
                  borderRadius: "10px",
                }}
                activeStyle={{ backgroundColor: "#667eea", color: "#fff" }}
              >
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          {/* Playback QoE */}
          <Tab.Pane eventKey="qoe">
            <Card className="mb-4 shadow" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <h5 style={{ fontWeight: "600" }}>Playback & QoE Metrics</h5>
                <Line data={qoeChartData} options={{ responsive: true }} />
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Creators */}
          <Tab.Pane eventKey="creators">
            <Card className="mb-4 shadow" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <h5 style={{ fontWeight: "600" }}>Creators Performance</h5>
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Views</th>
                      <th>Revenue ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creatorData.map((creator, idx) => (
                      <tr key={idx}>
                        <td>{creator.name}</td>
                        <td>{creator.views}</td>
                        <td>{creator.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Ads / Monetization */}
          <Tab.Pane eventKey="ads">
            <Card className="mb-4 shadow" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <h5 style={{ fontWeight: "600" }}>Revenue Metrics</h5>
                <Line data={revenueChartData} options={{ responsive: true }} />
                <Row className="mt-3">
                  {[
                    { title: "CAC ($)", value: adsData.cac },
                    { title: "RPM ($)", value: adsData.rpm },
                    { title: "ARPU ($)", value: adsData.arpu },
                  ].map((metric, idx) => (
                    <Col md={4} key={idx}>
                      <Card
                        className="text-center shadow-sm"
                        style={{
                          background: "#f1f5f9",
                          borderRadius: "12px",
                          padding: "10px",
                        }}
                      >
                        <Card.Title>{metric.title}</Card.Title>
                        <Card.Text style={{ fontWeight: "600", fontSize: "1.3rem" }}>
                          {metric.value}
                        </Card.Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Fraud */}
          <Tab.Pane eventKey="fraud">
            <Card className="mb-4 shadow" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <h5 style={{ fontWeight: "600" }}>Fraud Metrics</h5>
                <Row>
                  {[
                    { title: "Botnets", value: fraudData.botnets },
                    { title: "Referral Rings", value: fraudData.referralRings },
                    { title: "IVT Traffic %", value: fraudData.ivtTraffic + "%" },
                  ].map((metric, idx) => (
                    <Col md={4} key={idx}>
                      <Card
                        className="text-center shadow-sm"
                        style={{
                          background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
                          color: "#fff",
                          borderRadius: "12px",
                          padding: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        <AiOutlineAlert size={30} className="mb-2" />
                        <Card.Title>{metric.title}</Card.Title>
                        <Card.Text style={{ fontWeight: "600", fontSize: "1.3rem" }}>
                          {metric.value}
                        </Card.Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default DataAnalyticsPage;
