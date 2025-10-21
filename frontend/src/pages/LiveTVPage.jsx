import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Form,
  InputGroup,
  FormControl,
  Button,
  Card,
  Badge,
  Modal,
  ListGroup,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock channels
const CHANNELS = [
  {
    id: 1,
    name: "World News",
    category: "News",
    lang: "EN",
    premium: false,
    rating: 4,
    logo: "https://static2.bigstockphoto.com/2/8/1/large1500/182808667.jpg",
    streamUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    now: "Live: Global Headlines",
    next: "09:30 - Market Update",
  },
  {
    id: 2,
    name: "Sports 24",
    category: "Sports",
    lang: "EN",
    premium: true,
    rating: 5,
    logo: "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/6b6f9e97-d381-4fdf-8586-e1eb24218314/4080296199/live-football-tv-sports-a0b-screenshot.png",
    streamUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    now: "Live: Football Highlights",
    next: "10:00 - Live Match",
  },
  {
    id: 3,
    name: "Kids Zone",
    category: "Kids",
    lang: "EN",
    premium: false,
    rating: 3,
    logo: "https://thumbs.dreamstime.com/z/kids-zone-banner-design-children-playground-area-poster-concept-group-little-boys-girls-laying-together-vector-141007727.jpg",
    streamUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    now: "Live: Cartoon Marathon",
    next: "11:00 - Learning Hour",
  },
  {
    id: 4,
    name: "Regional Music",
    category: "Music",
    lang: "HI",
    premium: false,
    rating: 4,
    logo: "https://static.vecteezy.com/system/resources/previews/021/991/178/large_2x/colorful-music-notes-background-with-sheet-music-disc-and-treble-clef-illustration-ai-generative-free-photo.jpg",
    streamUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    now: "Live: Top Hits",
    next: "12:00 - New Releases",
  },
];

export default function LiveTVPage() {
  const [channels, setChannels] = useState(CHANNELS);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("live_watchlist")) || []; } catch { return []; }
  });
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("live_favorites")) || []; } catch { return []; }
  });
  const [showEPG, setShowEPG] = useState(false);
  const [parentalLock, setParentalLock] = useState(false);
  const [pincode, setPincode] = useState("");
  const [showChat, setShowChat] = useState(false);

  // Persist watchlist/favorites
  useEffect(() => { localStorage.setItem("live_watchlist", JSON.stringify(watchlist)); }, [watchlist]);
  useEffect(() => { localStorage.setItem("live_favorites", JSON.stringify(favorites)); }, [favorites]);

  // Filtered channels
  const filtered = channels.filter(c => {
    const matchesQuery = `${c.name} ${c.category} ${c.lang}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
    const matchesLanguage = langFilter === "All" || c.lang === langFilter;
    const parentalBlocked = parentalLock && c.category === "Adult"; 
    return matchesQuery && matchesCategory && matchesLanguage && !parentalBlocked;
  });

  function openPlayer(ch) {
    if(ch.premium && !window.confirm("Premium channel! Subscribe to watch?")) return;
    setActiveChannel(ch);
    setShowPlayer(true);
  }

  function toggleWatchlist(id) { setWatchlist(prev => prev.includes(id) ? prev.filter(x => x!==id) : [...prev,id]); }
  function toggleFavorite(id) { setFavorites(prev => prev.includes(id) ? prev.filter(x => x!==id) : [...prev,id]); }
  function addReminder(ch) {
    const reminders = JSON.parse(localStorage.getItem("live_reminders")) || [];
    reminders.push({ channelId: ch.id, at: new Date().toISOString() });
    localStorage.setItem("live_reminders", JSON.stringify(reminders));
    alert(`Reminder set for ${ch.name}`);
  }
  function handleLockToggle() {
    if (!parentalLock) {
      const code = prompt("Set a 4-digit PIN for parental lock:");
      if (code && code.length === 4) { setPincode(code); setParentalLock(true); alert("Parental lock enabled"); }
    } else {
      const code = prompt("Enter PIN to disable parental lock:");
      if (code === pincode) { setParentalLock(false); setPincode(""); alert("Parental lock disabled"); }
      else alert("Incorrect PIN");
    }
  }
  function openEPGFor(channel) { setActiveChannel(channel); setShowEPG(true); }
  function recordChannel(ch) {
    const recordings = JSON.parse(localStorage.getItem("live_recordings")) || [];
    recordings.push({ id: ch.id, name: ch.name, time: new Date().toISOString() });
    localStorage.setItem("live_recordings", JSON.stringify(recordings));
    alert(`${ch.name} scheduled for recording.`);
  }

  // Channel card
  function ChannelCard({ ch }) {
    const isFav = favorites.includes(ch.id);
    const inWatch = watchlist.includes(ch.id);
    return (
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={ch.logo} style={{ objectFit: "cover", height: 110 }} />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <Card.Title className="h6 mb-0">{ch.name}</Card.Title>
              <small className="text-muted">{ch.now}</small>
              <div className="mt-1">
                {Array.from({length:5}).map((_,i)=>(
                  <span key={i} style={{color: i<ch.rating?'gold':'#ccc'}}>★</span>
                ))}
              </div>
            </div>
            <div className="text-end">
              {ch.premium && <Badge bg="warning" text="dark">Premium</Badge>}
            </div>
          </div>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <div>
              <Button size="sm" variant="primary" onClick={() => openPlayer(ch)}>Watch</Button>{" "}
              <Button size="sm" variant="outline-secondary" onClick={() => openEPGFor(ch)}>EPG</Button>
            </div>
            <div>
              <Button variant={inWatch ? "success" : "outline-success"} size="sm" onClick={() => toggleWatchlist(ch.id)} className="me-1">
                {inWatch ? "In Watchlist" : "+ Watchlist"}
              </Button>
              <Button size="sm" variant={isFav ? "danger" : "outline-danger"} onClick={() => toggleFavorite(ch.id)}>
                {isFav ? "♥" : "♡"}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold text-danger">LIVE TV</Navbar.Brand>
          <Navbar.Toggle aria-controls="lv-nav" />
          <Navbar.Collapse id="lv-nav">
            <Form className="d-flex me-2" onSubmit={e => e.preventDefault()} style={{ position:'relative' }}>
              <InputGroup>
                <FormControl placeholder="Search channels..." value={query} onChange={e=>setQuery(e.target.value)}/>
                <Button variant="outline-secondary" onClick={()=>setQuery("")}>Clear</Button>
              </InputGroup>
              {query && (
                <ListGroup style={{ position:'absolute', top:'38px', width:'100%', zIndex:1050 }}>
                  {channels.filter(c=>c.name.toLowerCase().includes(query.toLowerCase())).map(c=>(
                    <ListGroup.Item key={c.id} action onClick={()=>openPlayer(c)}>{c.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Form>
            <ButtonGroup className="me-2">
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle variant="outline-primary">{categoryFilter}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setCategoryFilter("All")}>All</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setCategoryFilter("News")}>News</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setCategoryFilter("Sports")}>Sports</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setCategoryFilter("Kids")}>Kids</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setCategoryFilter("Music")}>Music</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle variant="outline-primary">Lang: {langFilter}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setLangFilter("All")}>All</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setLangFilter("EN")}>English</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setLangFilter("HI")}>Hindi</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant={parentalLock?"danger":"outline-danger"} onClick={handleLockToggle}>
                {parentalLock?"Parental Lock On":"Parental Lock"}
              </Button>
            </ButtonGroup>
            <Button variant="outline-success" onClick={()=>setShowChat(s=>!s)} className="me-2">{showChat?'Hide Chat':'Show Chat'}</Button>
            <Button variant="success" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}>Top</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="py-4">
        <Row className="mb-3">
          <Col xs={12} lg={8}>
            <div className="p-3 rounded shadow-sm bg-white">
              <h5 className="mb-3">Featured Live Now</h5>
              <Row>
                <Col md={6}>
                  <Card className="mb-3">
                    <div style={{position:"relative"}}>
                      <Card.Img src={channels[0].logo} style={{height:220, objectFit:"cover"}}/>
                      <Badge bg="danger" style={{position:"absolute", top:8, left:8}}>LIVE</Badge>
                    </div>
                    <Card.Body>
                      <Card.Title>Featured: {channels[0].name}</Card.Title>
                      <Card.Text>{channels[0].now}</Card.Text>
                      <Button onClick={()=>openPlayer(channels[0])}>Watch Now</Button>{" "}
                      <Button variant="outline-secondary" onClick={()=>addReminder(channels[0])}>Remind Me</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <div className="d-flex gap-2 flex-wrap">
                    {channels.slice(1).map(c=>(
                      <Card key={c.id} style={{width:"48%"}} className="mb-2">
                        <Card.Img src={c.logo} style={{height:100, objectFit:"cover"}}/>
                        <Card.Body>
                          <Card.Title className="small mb-1">{c.name}</Card.Title>
                          <small className="text-muted">{c.now}</small>
                          <div className="mt-2">
                            <Button size="sm" onClick={()=>openPlayer(c)}>Watch</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mt-3 p-3 rounded shadow-sm bg-white">
              <h6>Channel Guide</h6>
              <Row xs={1} sm={2} md={3} lg={4} className="g-3 mt-1">
                {filtered.map(ch=>(
                  <Col key={ch.id}>
                    <ChannelCard ch={ch} />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          <Col xs={12} lg={4} className="mt-3 mt-lg-0">
            <div className="p-3 rounded shadow-sm bg-white mb-3">
              <h6>Now & Next</h6>
              <ListGroup variant="flush">
                {channels.map(c=>(
                  <ListGroup.Item key={c.id} className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-bold">{c.name}</div>
                      <div className="small text-muted">{c.now}</div>
                    </div>
                    <div className="text-end">
                      <div className="small">{c.next}</div>
                      <Button size="sm" variant="link" onClick={()=>openPlayer(c)}>Live</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            <div className="p-3 rounded shadow-sm bg-white mb-3">
              <h6>Quick Actions</h6>
              <div className="d-grid gap-2">
                <Button onClick={()=>setShowEPG(s=>!s)}>Toggle EPG</Button>
                <Button variant="outline-primary" onClick={()=>alert('Open subscriptions modal (mock)')}>Manage Subscriptions</Button>
                <Button variant="outline-success" onClick={()=>alert('Buy Pass / PPV (mock)')}>Buy Pass / PPV</Button>
              </div>
            </div>

            <div className="p-3 rounded shadow-sm bg-white">
              <h6>Favorites</h6>
              <ListGroup variant="flush">
                {favorites.length===0 && <div className="small text-muted">No favorites yet</div>}
                {favorites.map(id=>{
                  const ch = channels.find(c=>c.id===id);
                  if(!ch) return null;
                  return (
                    <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
                      <div>{ch.name}</div>
                      <div><Button size="sm" onClick={()=>openPlayer(ch)}>Watch</Button></div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Player Modal */}
      <Modal size="xl" show={showPlayer} onHide={()=>setShowPlayer(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{activeChannel ? activeChannel.name : "Player"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeChannel && (
            <Row>
              <Col lg={8}>
                <div className="player-wrapper mb-2" style={{background:'#000'}} id="main-player">
                  <video
                    controls
                    autoPlay
                    onEnded={()=>{
                      const idx = channels.findIndex(c=>c.id===activeChannel.id);
                      const nextChannel = channels[(idx+1)%channels.length];
                      openPlayer(nextChannel);
                    }}
                    style={{width:"100%", maxHeight:'70vh', background:'#000'}}
                  >
                    <source src={activeChannel.streamUrl} type="video/mp4"/>
                  </video>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <Button onClick={()=>alert('Rewind mocked')}>Rewind</Button>{" "}
                    <Button onClick={()=>alert('Start-over mocked')}>Start Over</Button>{" "}
                    <Button onClick={()=>alert('Quality selector mocked')}>Quality</Button>{" "}
                    <Button onClick={()=>{
                      const video = document.querySelector("#main-player video");
                      if(video.requestFullscreen) video.requestFullscreen();
                    }}>Fullscreen</Button>
                  </div>
                  <div>
                    <Button variant="outline-primary" onClick={()=>addReminder(activeChannel)}>Remind</Button>{" "}
                    <Button variant="outline-secondary" onClick={()=>toggleWatchlist(activeChannel.id)}>
                      {watchlist.includes(activeChannel.id) ? 'In Watchlist' : '+ Watchlist'}
                    </Button>{" "}
                    <Button variant="outline-warning" onClick={()=>recordChannel(activeChannel)}>Record</Button>
                  </div>
                </div>
                <div className="mt-3">
                  <h6>About this channel</h6>
                  <p className="small text-muted">{activeChannel.now} • Next: {activeChannel.next}</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className="p-2 border rounded bg-light" style={{maxHeight:'60vh', overflowY:'auto'}}>
                  <h6>Live Chat (mock)</h6>
                  <ListGroup variant="flush">
                    <ListGroup.Item>👤 User1: Love this show!</ListGroup.Item>
                    <ListGroup.Item>👤 User2: Amazing content!</ListGroup.Item>
                    <ListGroup.Item>👤 User3: Great quality stream.</ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
