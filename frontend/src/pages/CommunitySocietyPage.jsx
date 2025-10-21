// CommunitySocietyPage.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CommunitySocietyPage = () => {
  const features = [
    {
      title: "AI Fan-Made Content",
      description:
        "Fans can create shows, seasons, or interactive stories using AI tools. Earn royalties if adopted, participate in competitions, and climb leaderboards.",
      cta: "Create Content",
    },
    {
      title: "Geo OTT Hubs",
      description:
        "Discover local OTT-powered hubs for screenings, commerce, workshops, and community events. Book tickets, shop, and engage locally.",
      cta: "Find Hub",
    },
    {
      title: "Global OTT Festivals",
      description:
        "Attend planet-wide synchronized premieres, VR concerts, and interactive events. Participate in live polls, Q&A sessions, and social spaces.",
      cta: "Join Festival",
    },
    {
      title: "Civic Utility OTT",
      description:
        "Access educational content, healthcare info, and governance updates. Receive personalized location-based civic notifications and emergency alerts.",
      cta: "Explore Civic Channels",
    },
  ];

  const advancedFeatures = [
    "AI-curated fan content competitions & awards",
    "Blockchain-based content ownership & royalty tracking",
    "AR-enhanced local hubs & mixed-reality global festivals",
    "Personalized AI recommendations for civic, educational, or health content",
    "Dynamic location-based push notifications",
    "Gamified participation with points, badges, NFTs, and social leaderboards",
    "Advanced analytics for civic & local business engagement",
    "Offline/low-bandwidth access for civic content",
    "Voice-controlled navigation & VR/AR interaction",
    "AI-driven moderation and content safety for communities",
    "Multi-lingual accessibility & subtitle support",
    "Integration with Creator Economy for cross-platform monetization",
    "Interactive workshops and learning sessions within hubs",
    "Dynamic seasonal & cultural event campaigns",
    "Emergency response alert systems for natural disasters & public health",
  ];

  const additionalUsages = [
    "Data analytics for local businesses, city planners, and policymakers",
    "Monetization through local sponsors, event tickets, and microtransactions",
    "Seasonal and cultural event integration (festivals, holidays)",
    "Emergency alert systems and public health campaigns",
    "Educational content aligned with school/university curriculum",
    "Social campaigns, fundraising, or advocacy",
    "Gamification for community engagement and reward points",
    "VR/AR experience tie-ins for immersive participation",
    "Cross-platform content consumption (mobile, web, VR, smart TVs)",
  ];

  // Button handlers (currently placeholders for demonstration)
  const handleCTA = (feature) => {
    alert(`Action triggered for: ${feature}`);
  };

  return (
    <div className="container my-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1>Community & Society</h1>
        <p className="lead">
          OTT as a multi-dimensional ecosystem for fan content, local hubs,
          global festivals, and civic engagement.
        </p>
      </div>

      {/* Core Features */}
      <div className="row mb-5">
        {features.map((feature, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{feature.title}</h4>
                <p className="card-text flex-grow-1">{feature.description}</p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleCTA(feature.title)}
                >
                  {feature.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced / Future Features */}
      <div className="mb-5">
        <h3 className="mb-3">Advanced & Future Features</h3>
        <ul className="list-group list-group-flush">
          {advancedFeatures.map((item, idx) => (
            <li key={idx} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Usages */}
      <div className="mb-5">
        <h3 className="mb-3">Additional Usages</h3>
        <ul className="list-group list-group-flush">
          {additionalUsages.map((item, idx) => (
            <li key={idx} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* User Flow Illustration */}
      <div className="mb-5">
        <h3 className="mb-3">User Flow</h3>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item">Visit Community & Society page</li>
          <li className="list-group-item">
            Browse sections: Fan Content → Local Hub → Global Festival →
            Civic Channels
          </li>
          <li className="list-group-item">
            Create or interact with AI-generated content
          </li>
          <li className="list-group-item">
            Attend hubs, festivals, workshops
          </li>
          <li className="list-group-item">
            Receive personalized civic, educational, or health content
          </li>
          <li className="list-group-item">
            Interact socially: comments, ratings, shares, leaderboards
          </li>
          <li className="list-group-item">
            Optional monetization/rewards via royalties, tickets, or commerce
          </li>
        </ol>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-5">
        {["Join Hub", "Attend Festival", "Create Fan Content"].map(
          (btn, idx) => (
            <button
              key={idx}
              className={`btn btn-lg me-3 ${
                idx === 0 ? "btn-success" : idx === 1 ? "btn-warning" : "btn-primary"
              }`}
              onClick={() => alert(`CTA clicked: ${btn}`)}
            >
              {btn}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CommunitySocietyPage;
