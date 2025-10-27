import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ToggleButton, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const plansData = {
  monthly: [
    { name: "Basic", price: 99, features: ["HD available", "Watch on 1 device", "Limited content"], popular: false },
    { name: "Premium", price: 159, features: ["Full HD / 4K", "3 devices", "All content", "Ad-free"], popular: true },
    { name: "Annual", price: 199, features: ["Full HD / 4K", "5 devices", "All content", "Ad-free", "Bonus content"], popular: false },
  ],
  yearly: [
    { name: "Basic", price: 599, features: ["HD available", "1 device", "Limited content"], popular: false },
    { name: "Premium", price: 699, features: ["Full HD / 4K", "3 devices", "All content", "Ad-free"], popular: true },
    { name: "Annual", price: 8999, features: ["Full HD / 4K", "5 devices", "All content", "Ad-free", "Bonus content"], popular: false },
  ],
};

function SubscriptionPage() {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.name); // store selected plan by name
  };

  return (
    <div className="subscription-hero">
      <Container className="py-5">
        <h1 className="text-center text-white mb-4">Choose Your OTT Plan</h1>
        <div className="d-flex justify-content-center mb-5">
          <ButtonGroup>
            <ToggleButton
              id="monthly"
              type="radio"
              variant={billing === "monthly" ? "light" : "outline-light"}
              name="billing"
              value="monthly"
              checked={billing === "monthly"}
              onChange={(e) => setBilling(e.currentTarget.value)}
            >
              Monthly
            </ToggleButton>
            <ToggleButton
              id="yearly"
              type="radio"
              variant={billing === "yearly" ? "light" : "outline-light"}
              name="billing"
              value="yearly"
              checked={billing === "yearly"}
              onChange={(e) => setBilling(e.currentTarget.value)}
            >
              Yearly
            </ToggleButton>
          </ButtonGroup>
        </div>
        <Row className="g-4 justify-content-center">
          {plansData[billing].map((plan, idx) => (
            <Col key={idx} xs={12} md={6} lg={4}>
              <Card
                className={`plan-card h-100 shadow ${plan.popular ? "popular" : ""} ${selectedPlan === plan.name ? "selected" : ""}`}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.popular && <div className="ribbon">Most Popular</div>}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center display-6">{plan.name}</Card.Title>
                  <Card.Subtitle className="text-center mb-3 display-5 text-primary">
                    ₹{plan.price} <span className="text-muted fs-6">/{billing === "monthly" ? "month" : "year"}</span>
                  </Card.Subtitle>
                  <ul className="list-unstyled flex-grow-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="mb-2">
                        ✔ {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "primary" : "outline-primary"}
                    onClick={() => alert(`Subscribed to ${plan.name}`)}
                    className="mt-auto"
                  >
                    Subscribe
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .subscription-hero {
          background: linear-gradient(135deg, #121212 0%, #1f1f1f 100%);
          min-height: 100vh;
          padding-top: 50px;
        }
        .plan-card {
          border-radius: 15px;
          transition: transform 0.3s, box-shadow 0.3s, border 0.3s;
          position: relative;
          overflow: hidden;
          background-color: #1e1e1e;
          cursor: pointer;
        }
        .plan-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.7);
        }
        .plan-card.selected {
          border: 3px solid #00ffcc; /* highlight color */
        }
        .popular {
          border: 2px solid #ffd700;
        }
        .ribbon {
          position: absolute;
          top: 10px;
          right: -40px;
          background: #ffd700;
          color: #000;
          padding: 5px 50px;
          transform: rotate(45deg);
          font-weight: bold;
        }
        ul li {
          font-size: 1rem;
          color: #ffffff;
        }
        .card-title, .card-subtitle {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default SubscriptionPage;
