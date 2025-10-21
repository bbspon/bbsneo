// CommerceEvolution.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

// Mock data
const features = [
  {
    title: "Metaverse Malls (Persistent)",
    description:
      "OTT-hosted 3D malls that exist continuously in virtual worlds. Explore brand stores, live events, and immersive zones.",
    details:
      "Persistent virtual malls with interactive stores, AR/VR exploration, seasonal events, influencer meet-ups, and show tie-ins. Fully navigable across VR, mobile, and desktop.",
    image: "https://koala.sh/api/image/v2-3msv5-nsju7.jpg?width=1216&height=832&dream",
  },
  {
    title: "Virtual Merchandise",
    description:
      "Digital assets like skins, outfits, and collectibles tied to shows and usable across OTT games and virtual experiences.",
    details:
      "Includes NFT-backed collectibles, limited edition drops, cross-game integration, and displayable virtual wardrobe. Users can trade items in a secure marketplace.",
    image: "https://www.syte.ai/wp-content/uploads/2021/07/Guide-to-Visual-Merchandising_blog-1-1024x625.jpg",
  },
  {
    title: "Shoppable Avatars",
    description:
      "Character outfits that can be instantly purchased for both avatars and real-life wearables. Preview in AR/VR.",
    details:
      "Clickable avatar outfits with AR/VR preview. Supports brand collaborations, dynamic pricing, and seasonal fashion drops. Share your avatar styles socially.",
    image: "https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/77017/rpm-avatars-3.jpg?w=608&ar=default&fit=crop&crop=faces&auto=format&q=100&dpr=1",
  },
  {
    title: "OTT Currency",
    description:
      "A universal OTT-backed coin for purchasing virtual merchandise, avatars, and partner brand products. Top-up, spend, track rewards.",
    details:
      "Manage OTT currency wallet, redeem for digital/real-world items, earn loyalty bonuses, access exclusive drops, and track transaction history. Works cross-platform.",
    image: "https://tse4.mm.bing.net/th/id/OIP.GKU9cLh1dyLh1DsFBpmgzQHaFR?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Creator & Influencer Stores",
    description: "Exclusive virtual stores by creators and influencers inside OTT malls.",
    details:
      "Live auctions, limited edition items, creator events, and collaboration drops. Engage with your favorite creators directly in immersive spaces.",
    image: "https://a.storyblok.com/f/165154/1280x720/b995113760/05_leverage-influencer-marketing.jpg/m/",
  },
];

const advancedFeatures = [
  "AR/VR-based interactive shopping and try-on.",
  "AI-powered personalized recommendations and adaptive mall layouts.",
  "Gamified engagement: quests, leaderboards, and exclusive drops.",
  "Creator & influencer virtual stores, live auctions, and collaborations.",
  "User-to-user trading marketplace for collectibles.",
  "Event & seasonal campaigns inside virtual malls.",
  "Cross-platform integration with OTT services, gaming platforms, and social metaverse.",
  "Analytics dashboard for purchase trends and digital wardrobe.",
  "NFT-backed merchandise with secure ownership and wallet tracking.",
  "Loyalty rewards and bonus OTT currency for purchases.",
  "Social sharing of virtual merchandise and avatar outfits.",
];

const CommerceEvolution = () => {
  const [showMore, setShowMore] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">Commerce Evolution</h1>
        <p className="lead">
          Explore the future of OTT commerce: virtual malls, shoppable avatars, digital collectibles, and universal OTT currency.
        </p>
      </header>

      {/* Core Features */}
      <section className="row g-4 mb-5">
        {features.map((feature, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img src={feature.image} className="card-img-top" alt={feature.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{feature.title}</h5>
                <p className="card-text">{feature.description}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => setModalData(feature)}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Advanced / Future Features */}
      <section className="mb-5">
        <h2 className="fw-bold mb-3">Advanced Features & Future Enhancements</h2>
        <ul className="list-group list-group-flush">
          {advancedFeatures.slice(0, showMore ? advancedFeatures.length : 5).map((item, idx) => (
            <li key={idx} className="list-group-item">{item}</li>
          ))}
        </ul>
        {advancedFeatures.length > 5 && (
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="text-center my-5">
        <h3 className="fw-bold mb-3">Start Your Virtual Commerce Journey</h3>
        <p>Get access to virtual malls, exclusive merchandise, and OTT currency now.</p>
        <button className="btn btn-success btn-lg me-3">Invest Now</button>
        <button className="btn btn-outline-primary btn-lg">Learn More</button>
      </section>

      {/* User Journey */}
      <section className="mb-5">
        <h2 className="fw-bold mb-3">User Journey</h2>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item">Discover shoppable avatars or virtual merchandise while watching shows.</li>
          <li className="list-group-item">Engage with Metaverse Mall or product pages interactively.</li>
          <li className="list-group-item">Purchase using OTT currency or standard payments.</li>
          <li className="list-group-item">Use merchandise in games, avatars, or collectible displays.</li>
          <li className="list-group-item">Earn rewards, loyalty points, and exclusive drops to encourage repeat visits.</li>
          <li className="list-group-item">Share items socially and participate in trading marketplaces.</li>
        </ol>
      </section>

      {/* Footer / Linkages */}
      <footer className="text-center mt-5">
        <p className="text-muted">
          Linked Pages: Home, Content Pages, Wallet, Rewards, Passbook, Blog, Creator Stores
        </p>
      </footer>

      {/* Modal for Explore */}
      {modalData && (
        <Modal show={true} onHide={() => setModalData(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalData.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={modalData.image} className="img-fluid mb-3" alt={modalData.title} />
            <p>{modalData.details}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalData(null)}>Close</Button>
            <Button variant="primary">Invest / Purchase</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CommerceEvolution;
