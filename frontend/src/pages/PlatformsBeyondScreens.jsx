// PlatformsBeyondScreens.jsx
import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";


const platformsData = [
  {
    id: 1,
    title: "Holographic OTT",
    description:
      "Content projected onto glass walls, mixed-reality rooms, and hologram pods. Experience streaming like never before.",
    video: "https://tse4.mm.bing.net/th/id/OIP.pIHokdN5vBz4SG0eFzTGIgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    cta: "Try Holo Experience",
    advanced: [
      "AI Recommendations for holographic content",
      "Interactive AR/3D demos",
      "Social sharing & gamification",
    ],
  },
  {
    id: 2,
    title: "Brain–Computer Interface (BCI) OTT",
    description:
      "Full neural streaming: browse, play, and shop with thought. Experience next-gen neural interaction.",
    video: "https://th.bing.com/th/id/R.0b6922ffc323343cb8ce4c44ccb0b4cd?rik=ihb1v7tvPh1gpA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fMovies-Free-Captain-America-Images.jpg&ehk=TR29DLvBB6nTNIQjNCqBDH74fhkBU42QUkxQuVFfOZ8%3d&risl=&pid=ImgRaw&r=0",
    cta: "Join BCI Beta Program",
    advanced: [
      "Thought-based content navigation",
      "Predictive AI suggestions",
      "Beta program access & achievements",
    ],
  },
  {
    id: 3,
    title: "Multi-Sensory OTT",
    description:
      "Haptic suits, scent diffusers, and temperature control for 4D streaming experiences.",
    video: "https://images.hdqwalls.com/wallpapers/captain-america-with-flag-4k-g9.jpg",
    cta: "Get Multi-Sensory Kit",
    advanced: [
      "VR + haptics + scent interactive demos",
      "AI-based personalized experiences",
      "Gamified exploration and sharing",
    ],
  },
  {
    id: 4,
    title: "Space OTT",
    description:
      "Optimized streaming for Moon/Mars colonies, satellites, and space tourism with low-latency and offline caching.",
    video: "https://tse4.mm.bing.net/th/id/OIP.-5ciiw7hmV1sMuMHWZ7o1QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    cta: "Subscribe to Space OTT",
    advanced: [
      "AI suggested space content",
      "Edge caching for low bandwidth",
      "Exclusive space content packages",
    ],
  },
];

const PlatformsBeyondScreens = () => {
  return (
  <>
    <div className="platforms-beyond-screens">
      {/* Hero Section */}
      <section className="hero bg-dark text-light text-center p-5">
        <h1 className="display-4">Streaming Beyond Screens</h1>
        <p className="lead">
          Explore Holographic, Neural, Multi-Sensory, and Space OTT experiences.
        </p>
        <Button variant="primary" size="lg">
          Explore Experiences
        </Button>
      </section>

      {/* Platforms Sections */}
      <Container className="my-5">
        {platformsData.map((platform, idx) => (
          <Row
            key={platform.id}
            className={`align-items-center my-5 ${
              idx % 2 === 0 ? "" : "flex-row-reverse"
            }`}
          >
            <Col md={6} className="mb-3">
              <img
                src={platform.video}
                alt={`${platform.title} Demo`}
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>{platform.title}</h2>
              <p>{platform.description}</p>
              <ul>
                {platform.advanced.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Button variant="success">{platform.cta}</Button>
            </Col>
          </Row>
        ))}
      </Container>

      {/* Interactive AI Suggestions Carousel */}
      <section className="bg-light py-5">
        <Container>
          <h3 className="text-center mb-4">AI-Powered Recommendations</h3>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://eskipaper.com/images/captain-america-13.jpg"
                alt="Holographic AI Suggestion"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://th.bing.com/th/id/R.342c5986cef7696b6d96a8028596a6de?rik=PtUggDxUIHV2iw&riu=http%3a%2f%2fwww.fond-ecran.net%2ffonds%2fcaptain_america_005.jpg&ehk=wv0A9TTv8Qcrr10SXXBWdMTwOq%2bV9fNldZNDE4nb%2buw%3d&risl=&pid=ImgRaw&r=0"
                alt="BCI AI Suggestion"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.hdqwalls.com/wallpapers/captain-america-hammer-4k-2020-ex.jpg"
                alt="Multi-Sensory AI Suggestion"
              />
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* Community / Beta Section */}
      <section className="text-center p-5 bg-secondary text-light">
        <h3>Join Our Beta Programs</h3>
        <p>
          Be among the first to experience futuristic OTT. Participate in
          beta-tests, share experiences, and earn rewards.
        </p>
        <Button variant="light">Join Beta Program</Button>
      </section>
    </div>
    <style>
        {`
        .platforms-beyond-screens .hero {
  background-image: url('https://images.thedirect.com/media/article_full/avatar-4-change-explained-disney.jpg');
  background-size: cover;
  background-position: center;
}

.platforms-beyond-screens ul {
  list-style-type: disc;
  padding-left: 20px;
}

.platforms-beyond-screens section {
  transition: all 0.3s ease-in-out;
}

.platforms-beyond-screens section:hover {
  transform: translateY(-5px);
}

        `}
    </style>
  </>
  );
};

export default PlatformsBeyondScreens;
