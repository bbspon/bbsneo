// CommunityEngagementPagePremium.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal, ProgressBar } from "react-bootstrap";


// Dummy data
const curatorChannels = [
  { id: 1, name: "Top Sci-Fi Picks", creator: "Alice", views: 1200, revenue: 50, img: "https://tse4.mm.bing.net/th/id/OIP.3Op2uYkb0bLA8ffqhu6EBwHaDt?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, name: "Comedy Gold", creator: "Bob", views: 980, revenue: 30, img: "https://tse4.mm.bing.net/th/id/OIP.3Op2uYkb0bLA8ffqhu6EBwHaDt?rs=1&pid=ImgDetMain&o=7&rm=30" },
  { id: 3, name: "Thrillers & Suspense", creator: "Charlie", views: 750, revenue: 20, img: "https://tse4.mm.bing.net/th/id/OIP.3Op2uYkb0bLA8ffqhu6EBwHaDt?rs=1&pid=ImgDetMain&o=7&rm=3" },
];

const fanClubs = [
  { id: 1, name: "SuperFan Club", members: 120, price: 9.99, img: "https://tse1.mm.bing.net/th/id/OIP.bBQGSQ6px6LeT3P20bkYRgHaEU?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, name: "Behind the Scenes", members: 85, price: 14.99, img: "https://tse1.mm.bing.net/th/id/OIP.bBQGSQ6px6LeT3P20bkYRgHaEU?rs=1&pid=ImgDetMain&o=7&rm=3" },
];

const challenges = [
  { id: 1, title: "Meme Contest", participants: 50, img: "https://miro.medium.com/v2/resize:fit:1358/1*7Fbed3V-dKGSj8_SGzQxZg.jpeg" },
  { id: 2, title: "Fan Edit Challenge", participants: 30, img: "https://miro.medium.com/v2/resize:fit:1358/1*7Fbed3V-dKGSj8_SGzQxZg.jpeg" },
];

const localEvents = [
  { id: 1, title: "Fan Screening: Avengers", location: "Mumbai", date: "2025-10-05", img: "https://i.redd.it/nx3il8y6bdx01.jpg" },
  { id: 2, title: "Meetup: Stranger Things Fans", location: "Delhi", date: "2025-10-12", img: "https://i.redd.it/nx3il8y6bdx01.jpg" },
];

function CommunityEngagementPagePremium() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
   <>
        <Container fluid className="community-page bg-dark text-light p-5">
      <h2 className="mb-4 section-title">Community & Engagement</h2>

      {/* Curator Channels */}
      <h4 className="mb-3">Curator Channels</h4>
      <div className="carousel-container mb-5">
        {curatorChannels.map((channel) => (
          <Card
            key={channel.id}
            className="carousel-card bg-secondary text-light me-3"
            onClick={() => handleShowModal(`Viewing ${channel.name}`)}
          >
            <Card.Img variant="top" src={channel.img} />
            <Card.Body>
              <Card.Title>{channel.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">By {channel.creator}</Card.Subtitle>
              <Card.Text>
                Views: {channel.views} | Revenue: ${channel.revenue}
              </Card.Text>
              <Button variant="danger" className="w-100">
                View Playlist
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Fan Clubs */}
      <h4 className="mb-3">Fan Clubs</h4>
      <div className="carousel-container mb-5">
        {fanClubs.map((club) => (
          <Card key={club.id} className="carousel-card bg-secondary text-light me-3">
            <Card.Img variant="top" src={club.img} />
            <Card.Body>
              <Card.Title>{club.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{club.members} Members</Card.Subtitle>
              <Card.Text>${club.price}/month</Card.Text>
              <Button variant="warning" onClick={() => handleShowModal(`Joined ${club.name}`)} className="w-100">
                Join Club
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Community Challenges */}
      <h4 className="mb-3">Community Challenges</h4>
      <div className="carousel-container mb-5">
        {challenges.map((ch) => (
          <Card key={ch.id} className="carousel-card bg-secondary text-light me-3">
            <Card.Img variant="top" src={ch.img} />
            <Card.Body>
              <Card.Title>{ch.title}</Card.Title>
              <Card.Text>Participants: {ch.participants}</Card.Text>
              <Button variant="info" onClick={() => handleShowModal(`Participate in ${ch.title}`)} className="w-100">
                Participate
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Local Fan Events */}
      <h4 className="mb-3">Local Fan Events</h4>
      <div className="carousel-container mb-5">
        {localEvents.map((event) => (
          <Card key={event.id} className="carousel-card bg-secondary text-light me-3">
            <Card.Img variant="top" src={event.img} />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>
                Location: {event.location} <br />
                Date: {event.date}
              </Card.Text>
              <Button variant="success" onClick={() => handleShowModal(`RSVP for ${event.title}`)} className="w-100">
                RSVP
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
     
     <style>
    {`
    /* Dark theme + streaming-style carousel */
.community-page {
  background-color: #121212;
  color: #ffffff;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  border-left: 4px solid #e50914;
  padding-left: 10px;
}

.carousel-container {
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: none; /* Firefox */
}

.carousel-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.carousel-card {
  min-width: 250px;
  max-width: 250px;
  border: none;
  transition: transform 0.3s;
  cursor: pointer;
}

.carousel-card:hover {
  transform: scale(1.05);
  z-index: 2;
}

.carousel-card img {
  height: 140px;
  object-fit: cover;
}

.carousel-card .btn {
  font-weight: 600;
}
`}
 </style>
   </>
  );
}

export default CommunityEngagementPagePremium;
