// InsightsPageAdvanced.jsx
import React from "react";
import { Container, Row, Col, Card, Badge, ProgressBar } from "react-bootstrap";
import { FaChartLine, FaUsers, FaEnvelope, FaAd, FaDollarSign, FaFileAlt } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// --- MOCK DATA ---
const mockData = {
  overview: {
    reach: 12345,
    engagement: 6789,
    impressions: 23456,
    followers: 5432,
    growth: { reach: 5, engagement: -2, impressions: 8, followers: 3 },
  },
  audience: [
    { segment: "18-24", percent: 40 },
    { segment: "25-34", percent: 35 },
    { segment: "35-44", percent: 15 },
    { segment: "45+", percent: 10 },
  ],
  content: [
    {
      type: "Feed",
      engagement: 5000,
      likes: 2000,
      comments: 500,
      shares: 300,
      thumbnail: "https://th.bing.com/th/id/OIP.4ov2dpkIFCUqQuOl-kZQCQHaEK?w=318&h=180&c=7&r=0&o=7&cb=12&pid=1.7&rm=3    ",   },
    {
      type: "Stories",
      engagement: 3000,
      likes: 1200,
      comments: 300,
      shares: 150,
      thumbnail: "https://th.bing.com/th/id/OIP.4ov2dpkIFCUqQuOl-kZQCQHaEK?w=318&h=180&c=7&r=0&o=7&cb=12&pid=1.7&rm=3",
    },
    {
      type: "Reels",
      engagement: 7000,
      likes: 4000,
      comments: 700,
      shares: 500,
      thumbnail: "https://th.bing.com/th/id/OIP.4ov2dpkIFCUqQuOl-kZQCQHaEK?w=318&h=180&c=7&r=0&o=7&cb=12&pid=1.7&rm=3",
    },
    {
      type: "Videos",
      engagement: 4000,
      likes: 1500,
      comments: 400,
      shares: 250,
      thumbnail: "https://th.bing.com/th/id/OIP.4ov2dpkIFCUqQuOl-kZQCQHaEK?w=318&h=180&c=7&r=0&o=7&cb=12&pid=1.7&rm=3",
    },
  ],
  ads: [
    { campaign: "Summer Sale", impressions: 12000, ctr: "3.5%", growth: 5 },
    { campaign: "New Launch", impressions: 8000, ctr: "2.8%", growth: -2 },
  ],
  earnings: { adRevenue: 1200, inStream: 300, subscriptions: 150 },
};

// --- CHART DATA ---
const overviewChartData = {
  labels: ["Reach", "Engagement", "Impressions", "Followers"],
  datasets: [
    {
      label: "Metrics",
      data: [
        mockData.overview.reach,
        mockData.overview.engagement,
        mockData.overview.impressions,
        mockData.overview.followers,
      ],
      backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
    },
  ],
};

const audienceChartData = {
  labels: mockData.audience.map((a) => a.segment),
  datasets: [
    {
      label: "% Audience",
      data: mockData.audience.map((a) => a.percent),
      backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
    },
  ],
};

const contentChartData = {
  labels: mockData.content.map((c) => c.type),
  datasets: [
    {
      label: "Engagement",
      data: mockData.content.map((c) => c.engagement),
      backgroundColor: ["#17a2b8", "#6f42c1", "#fd7e14", "#20c997"],
    },
  ],
};

// --- COMPONENT ---
const InsightsPageAdvanced = () => {
  return (
    <Container fluid className="p-4">
      {/* --- Overview Section --- */}
      <h4 className="mb-3">Overview</h4>
      <Row className="mb-4">
        {Object.keys(mockData.overview)
          .filter((key) => key !== "growth")
          .map((key, idx) => (
            <Col md={6} lg={3} key={idx} className="mb-3">
              <Card className="shadow-sm border-0 text-center hover-shadow">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-uppercase text-muted">{key}</span>
                    <FaChartLine size={20} />
                  </div>
                  <h3>{mockData.overview[key]}</h3>
                  <small
                    className={
                      mockData.overview.growth[key] >= 0 ? "text-success" : "text-danger"
                    }
                  >
                    {mockData.overview.growth[key] >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(mockData.overview.growth[key])}%
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Card className="mb-4">
        <Card.Body style={{ height: "150px" }}>
          <Bar
            data={overviewChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </Card.Body>
      </Card>

      {/* --- Audience Section --- */}
      <h4 className="mb-3">Audience</h4>
      <Row className="mb-4">
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body style={{ height: "150px" }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-uppercase text-muted">Audience Distribution</span>
                <FaUsers size={20} />
              </div>
              <Pie
                data={audienceChartData}
                height={150}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        {mockData.audience.map((aud, idx) => (
          <Col md={6} lg={2} key={idx} className="mb-3">
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                <h5>{aud.segment}</h5>
                <h3>{aud.percent}%</h3>
                <ProgressBar now={aud.percent} className="mt-2" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- Content Section --- */}
      <h4 className="mb-3">Content Analytics</h4>
      <Row className="mb-4">
        {mockData.content.map((item, idx) => (
          <Col md={6} lg={3} key={idx} className="mb-3">
            <Card className="shadow-sm border-0 text-center hover-shadow">
              <Card.Img
                variant="top"
                src={item.thumbnail}
                style={{ height: "100px", objectFit: "cover" }}
              />
              <Card.Body>
                <h5>{item.type}</h5>
                <p className="text-muted mb-1">Engagement: {item.engagement}</p>
                <div className="d-flex justify-content-between small mb-2">
                  <span>Likes: {item.likes}</span>
                  <span>Comments: {item.comments}</span>
                  <span>Shares: {item.shares}</span>
                </div>
                <ProgressBar
                  now={Math.min((item.engagement / 10000) * 100, 100)}
                  className="mb-1"
                />
                <small className="text-success">
                  Growth: +{Math.floor(Math.random() * 20)}%
                </small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Card className="mb-4">
        <Card.Body style={{ height: "120px" }}>
          <Bar
            data={contentChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </Card.Body>
      </Card>

      {/* --- Ads Section --- */}
      <h4 className="mb-3">Ads</h4>
      <Row className="mb-4">
        {mockData.ads.map((ad, idx) => (
          <Col md={6} lg={3} key={idx} className="mb-3">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <FaAd size={20} className="mb-2" />
                <h5>{ad.campaign}</h5>
                <p>Impressions: {ad.impressions}</p>
                <Badge bg={ad.growth >= 0 ? "success" : "danger"}>
                  {ad.growth >= 0 ? "↑" : "↓"} {Math.abs(ad.growth)}%
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- Earnings Section --- */}
      <h4 className="mb-3">Earnings</h4>
      <Row>
        {Object.keys(mockData.earnings).map((key, idx) => (
          <Col md={4} key={idx} className="mb-3">
            <Card className="shadow-sm border-0 text-center hover-shadow">
              <Card.Body>
                <FaDollarSign size={20} className="mb-2" />
                <h5 className="text-uppercase">{key}</h5>
                <h3>${mockData.earnings[key]}</h3>
                <ProgressBar
                  now={Math.min((mockData.earnings[key] / 2000) * 100, 100)}
                  className="mt-2"
                />
                <small className="text-muted">Target: $2000</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InsightsPageAdvanced;
