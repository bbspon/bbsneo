// CreateAd.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ProgressBar,
  Image,
} from "react-bootstrap";
import { FaUpload, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";

const CreateAd = () => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    objective: "",
    budget: "",
    schedule: "",
    audience: {},
    placements: [],
    creatives: [],
    boost: false,
  });

  const objectives = [
    "Brand Awareness",
    "Reach",
    "Traffic",
    "Engagement",
    "App Installs",
    "Video Views",
    "Lead Generation",
    "Conversions",
    "Catalog Sales",
    "Store Visits",
  ];

  const placements = [
    "Facebook Feed",
    "Instagram Feed",
    "Stories",
    "Messenger",
    "Reels",
    "Audience Network",
  ];

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 6));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (field, value) => {
    setCampaignData({ ...campaignData, [field]: value });
  };

  const handleAddCreative = (file) => {
    setCampaignData({
      ...campaignData,
      creatives: [...campaignData.creatives, URL.createObjectURL(file)],
    });
  };

  const handlePlacementToggle = (placement) => {
    const current = campaignData.placements;
    if (current.includes(placement)) {
      setCampaignData({
        ...campaignData,
        placements: current.filter((p) => p !== placement),
      });
    } else {
      setCampaignData({
        ...campaignData,
        placements: [...current, placement],
      });
    }
  };

  const renderCreativePreview = () =>
    campaignData.creatives.map((src, idx) => (
      <Card key={idx} className="mb-2">
        <Card.Img src={src} alt={`Creative ${idx}`} />
      </Card>
    ));

  const handlePublish = () => {
    // Simple validation
    if (!campaignData.name || !campaignData.objective || !campaignData.budget) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all required fields before publishing!",
      });
      return;
    }

    // Simulate publish / boost logic
    if (campaignData.boost) {
      Swal.fire({
        icon: "success",
        title: "Boosted Successfully!",
        text: `Your post "${campaignData.name}" has been boosted.`,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Ad Created Successfully!",
        text: `Your ad "${campaignData.name}" has been submitted.`,
      });
    }

    // Reset form after submission
    setStep(1);
    setCampaignData({
      name: "",
      objective: "",
      budget: "",
      schedule: "",
      audience: {},
      placements: [],
      creatives: [],
      boost: false,
    });
  };

  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col>
          <h3>Create Ad</h3>
          <ProgressBar now={(step / 6) * 100} label={`Step ${step} of 6`} />
        </Col>
      </Row>

      <Row>
        <Col md={8} lg={9}>
          <Card className="p-3 mb-3">
            {/* Step 1: Campaign Objective */}
            {step === 1 && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter campaign name"
                    value={campaignData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Campaign Objective</Form.Label>
                  <Form.Select
                    value={campaignData.objective}
                    onChange={(e) => handleChange("objective", e.target.value)}
                  >
                    <option value="">Select Objective</option>
                    {objectives.map((obj, idx) => (
                      <option key={idx} value={obj}>
                        {obj}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Budget ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter budget"
                    value={campaignData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Boost Post"
                    checked={campaignData.boost}
                    onChange={(e) => handleChange("boost", e.target.checked)}
                  />
                </Form.Group>
              </Form>
            )}

            {/* Step 2: Audience & Placements */}
            {step === 2 && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Target Audience</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., age 18-35, interests, locations"
                    value={campaignData.audience?.description || ""}
                    onChange={(e) =>
                      setCampaignData({
                        ...campaignData,
                        audience: { description: e.target.value },
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Placements</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {placements.map((p, idx) => (
                      <Button
                        key={idx}
                        variant={
                          campaignData.placements.includes(p)
                            ? "primary"
                            : "outline-secondary"
                        }
                        onClick={() => handlePlacementToggle(p)}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
              </Form>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Schedule</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., start and end dates"
                    value={campaignData.schedule}
                    onChange={(e) => handleChange("schedule", e.target.value)}
                  />
                </Form.Group>
              </Form>
            )}

            {/* Step 4: Creatives */}
            {step === 4 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Creatives</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) =>
                      Array.from(e.target.files).forEach((file) =>
                        handleAddCreative(file)
                      )
                    }
                  />
                </Form.Group>

                <div className="d-flex flex-wrap">{campaignData.creatives.map((src, idx) => (
                  <Card key={idx} className="mb-2 me-2" style={{ width: "120px" }}>
                    <Card.Img src={src} alt={`Creative ${idx}`} />
                  </Card>
                ))}</div>
              </>
            )}

            {/* Step 5: Preview */}
            {step === 5 && (
              <Card className="p-3 bg-light mb-3">
                <h5>Preview & AI Suggestions</h5>
                <p>AI suggests headlines, copy, and optimal placements for your objective.</p>
                <div className="d-flex flex-wrap">{renderCreativePreview()}</div>
              </Card>
            )}

            {/* Step 6: Review & Publish */}
            {step === 6 && (
              <Card className="p-3 bg-light mb-3">
                <h5>Review Campaign</h5>
                <p><strong>Name:</strong> {campaignData.name}</p>
                <p><strong>Objective:</strong> {campaignData.objective}</p>
                <p><strong>Budget:</strong> ${campaignData.budget}</p>
                <p><strong>Audience:</strong> {campaignData.audience?.description || "-"}</p>
                <p><strong>Placements:</strong> {campaignData.placements.join(", ") || "-"}</p>
                <p><strong>Schedule:</strong> {campaignData.schedule || "-"}</p>
                <p><strong>Boost:</strong> {campaignData.boost ? "Yes" : "No"}</p>
                <div className="d-flex flex-wrap">{renderCreativePreview()}</div>
                <Button className="mt-3 w-100" variant="success" onClick={handlePublish}>
                  {campaignData.boost ? "Boost Post" : "Publish Ad"}
                </Button>
              </Card>
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mb-5">
            <Button
              variant="secondary"
              disabled={step === 1}
              onClick={handleBack}
            >
              <FaArrowLeft /> Back
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={step === 6}
            >
              Next <FaArrowRight />
            </Button>
          </div>
        </Col>

        {/* Sidebar / Tips */}
        <Col md={4} lg={3} className="d-none d-md-block">
          <Card className="p-3 sticky-top" style={{ top: "12px" }}>
            <h5>Tips & Help</h5>
            <ul>
              <li>Use high-quality images/videos</li>
              <li>Keep text concise</li>
              <li>Check placement recommendations</li>
              <li>Enable AI suggestions for better results</li>
              <li>Preview all ad formats before publishing</li>
              <li>Boost your top-performing posts for more reach</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAd;
