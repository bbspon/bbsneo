// ReelShortPage.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Button,
  Badge,
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaPlay,
  FaPause,
  FaWhatsapp,
  FaInstagram,
  FaLink,
  FaReply,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";

const demoReelsData = [
  {
    id: "r1",
    title: "Amazing Nature",
    description: "Relaxing nature reel 🌲 #nature #relax",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 120,
    comments: [
      { user: "Alice", text: "Beautiful scenery!", likes: 3, replies: [] },
      { user: "Bob", text: "So relaxing 😍", likes: 2, replies: [] },
    ],
    shares: 5,
    creator: "NatureLover",
  },
  {
    id: "r2",
    title: "Funny Cat",
    description: "Hilarious cat video 🐱 #funny #cat",
    src: "https://www.w3schools.com/html/movie.mp4",
    likes: 300,
    comments: [],
    shares: 20,
    creator: "CatWorld",
  },
  {
    id: "r3",
    title: "Travel Vlog",
    description: "Exploring the mountains 🏔️ #travel #vlog",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 220,
    comments: [],
    shares: 15,
    creator: "TravelGuy",
  },
];

export default function ReelShortPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reels, setReels] = useState(demoReelsData);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [openReplyIndex, setOpenReplyIndex] = useState(null);

  const reelRefs = useRef([]);
  const currentUser = "You";

  const togglePlayPause = () => {
    const video = reelRefs.current[currentIndex];
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
    setIsPlaying(true);
    setLiked(false);
    setShowCommentBox(false);
    setOpenReplyIndex(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
    setIsPlaying(true);
    setLiked(false);
    setShowCommentBox(false);
    setOpenReplyIndex(null);
  };

  const handleLike = () => {
    const updatedReels = [...reels];
    if (!liked) updatedReels[currentIndex].likes += 1;
    else updatedReels[currentIndex].likes -= 1;
    setReels(updatedReels);
    setLiked(!liked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const updatedReels = [...reels];
    updatedReels[currentIndex].comments.push({
      user: currentUser,
      text: commentText.trim(),
      likes: 0,
      replies: [],
    });
    setReels(updatedReels);
    setCommentText("");
  };

  const handleAddReply = (commentIndex, replyText) => {
    if (!replyText.trim()) return;
    const updatedReels = [...reels];
    updatedReels[currentIndex].comments[commentIndex].replies.push({
      user: currentUser,
      text: replyText.trim(),
      likes: 0,
    });
    setReels(updatedReels);
  };

  const toggleCommentLike = (commentIndex, replyIndex = null) => {
    const updatedReels = [...reels];
    if (replyIndex === null) {
      updatedReels[currentIndex].comments[commentIndex].likes += 1;
    } else {
      updatedReels[currentIndex].comments[commentIndex].replies[
        replyIndex
      ].likes += 1;
    }
    setReels(updatedReels);
  };

  // Share Function
  const reelLink = window.location.href;

  const handleShare = (platform) => {
    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(reelLink)}`,
          "_blank"
        );
        break;
      case "instagram":
        window.open(
          `instagram://share?text=${encodeURIComponent(reelLink)}`,
          "_blank"
        );
        break;

      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            reelLink
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            reelLink
          )}&text=Check this out!`,
          "_blank"
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=Check this Reel&body=${encodeURIComponent(
          reelLink
        )}`;
        break;
      case "link":
        navigator.clipboard.writeText(reelLink).then(() => {
          alert("✅ Link copied to clipboard!");
        });
        break;
      default:
        break;
    }
    setShowShareModal(false);
  };

  useEffect(() => {
    reelRefs.current.forEach((v, i) => {
      if (v) {
        if (i === currentIndex && isPlaying) v.play();
        else v.pause();
      }
    });
  }, [currentIndex, isPlaying]);

  return (
    <Container
      fluid
      className="p-0"
      style={{ height: "100vh", overflow: "hidden", background: "black" }}
    >
      <div className="position-relative w-100 h-100">
        {/* Videos */}
        {reels.map((reel, idx) => (
          <video
            key={reel.id}
            ref={(el) => (reelRefs.current[idx] = el)}
            src={reel.src}
            className={`w-100 h-100 position-absolute top-0 start-0 ${
              idx === currentIndex ? "d-block" : "d-none"
            }`}
            style={{ objectFit: "cover" }}
            loop
            muted
            playsInline
          />
        ))}

        {/* Overlay Info */}
        <div
          className="position-absolute bottom-0 start-0 text-white p-3"
          style={{ width: "65%", textShadow: "0 0 5px black" }}
        >
          <h5>{reels[currentIndex].title}</h5>
          <p style={{ margin: 0 }}>{reels[currentIndex].description}</p>
          <p style={{ margin: 0 }}>
            Creator: <strong>{reels[currentIndex].creator}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="position-absolute d-flex flex-column align-items-center text-white"
          style={{ right: "20px", bottom: "120px" }}
        >
          <Button
            variant="link"
            className="text-white mb-3 d-flex flex-column align-items-center"
            onClick={handleLike}
          >
            <FaHeart size={28} color={liked ? "red" : "white"} />
            <Badge bg="danger" pill>
              {reels[currentIndex].likes}
            </Badge>
          </Button>

          <Button
            variant="link"
            className="text-white mb-3 d-flex flex-column align-items-center"
            onClick={() => setShowCommentBox((s) => !s)}
          >
            <FaComment size={28} />
            <Badge bg="info" pill>
              {reels[currentIndex].comments.length}
            </Badge>
          </Button>

          <Button
            variant="link"
            className="text-white mb-3 d-flex flex-column align-items-center"
            onClick={() => setShowShareModal(true)}
          >
            <FaShare size={28} />
            <Badge bg="secondary" pill>
              {reels[currentIndex].shares}
            </Badge>
          </Button>

          <Button
            variant="none"
            className=" mt-3 "
            onClick={togglePlayPause}
          >
            {isPlaying ? <FaPause size={25} /> : <FaPlay  size={25}/>}
          </Button>
        </div>

        {/* Comment Section */}
        {showCommentBox && (
          <div
            className="position-absolute start-0 bottom-0 w-50 bg-dark bg-opacity-75 p-3"
            style={{ maxHeight: "50%", overflowY: "auto" }}
          >
            <Form onSubmit={handleAddComment} className="d-flex mb-2">
              <Form.Control
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button type="submit" variant="primary" className="ms-2">
                Send
              </Button>
            </Form>

            {reels[currentIndex].comments.map((c, ci) => (
              <div key={ci} className="mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <strong className="text-white">{c.user}</strong>
                  <div>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-white p-0 me-2 text-decoration-none"
                      onClick={() => toggleCommentLike(ci)}
                    >
                      <FaHeart /> {c.likes}
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-white p-0 text-decoration-none"
                      onClick={() =>
                        setOpenReplyIndex(openReplyIndex === ci ? null : ci)
                      }
                    >
                      <FaReply />
                    </Button>
                  </div>
                </div>
                <p className="text-white mb-1">{c.text}</p>

                {c.replies.map((r, ri) => (
                  <div key={ri} className="ms-3 mb-1">
                    <div className="d-flex align-items-center justify-content-between">
                      <strong className="text-white">{r.user}</strong>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-white p-0 text-decoration-none"
                        onClick={() => toggleCommentLike(ci, ri)}
                      >
                        <FaHeart /> {r.likes}
                      </Button>
                    </div>
                    <p className="text-white mb-0">{r.text}</p>
                  </div>
                ))}

                {openReplyIndex === ci && (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddReply(ci, e.target[0].value);
                      e.target[0].value = "";
                      setOpenReplyIndex(null);
                    }}
                    className="d-flex mt-1"
                  >
                    <Form.Control placeholder="Reply..." />
                    <Button type="submit" variant="secondary" className="ms-2">
                      Reply
                    </Button>
                  </Form>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <Button
          variant="none"
          className="position-absolute top-50 start-0 translate-middle-y rounded-circle"
          style={{ opacity: 0.7 }}
          onClick={handlePrev}
        >
          <IoMdArrowDropleftCircle className="text-white" size={40}/>
        </Button>
        <Button
          variant="none"
          className="position-absolute top-50 end-0 translate-middle-y rounded-circle"
          style={{ opacity: 0.7 }}
          onClick={handleNext}
        >
          <IoMdArrowDroprightCircle className="text-white" size={40} />
        </Button>

        {/* Share Modal */}
        <Modal
          show={showShareModal}
          onHide={() => setShowShareModal(false)}
          centered
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Share this Reel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-wrap gap-2">
              <OverlayTrigger
                overlay={<Tooltip>Share on WhatsApp</Tooltip>}
                placement="top"
              >
                <Button
                  variant="success"
                  className="d-flex flex-column align-items-center p-3"
                  onClick={() => handleShare("whatsapp")}
                >
                  <FaWhatsapp size={28} />
                  <small>WhatsApp</small>
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={<Tooltip>Share on Instagram</Tooltip>}
                placement="top"
              >
                <Button
                  variant="danger"
                  className="d-flex flex-column align-items-center p-3"
                  onClick={() => handleShare("instagram")}
                >
                  <FaInstagram size={28} />
                  <small>Instagram</small>
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={<Tooltip>Share on Facebook</Tooltip>}
                placement="top"
              >
                <Button
                  variant="primary"
                  className="d-flex flex-column align-items-center p-3"
                  onClick={() => handleShare("facebook")}
                >
                  <FaFacebook size={28} />
                  <small>Facebook</small>
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={<Tooltip>Share on Twitter (X)</Tooltip>}
                placement="top"
              >
                <Button
                  variant="info"
                  className="d-flex flex-column align-items-center p-3 text-white"
                  onClick={() => handleShare("twitter")}
                >
                  <FaTwitter size={28} />
                  <small>Twitter</small>
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={<Tooltip>Share via Email</Tooltip>}
                placement="top"
              >
                <Button
                  variant="secondary"
                  className="d-flex flex-column align-items-center p-3"
                  onClick={() => handleShare("email")}
                >
                  <FaEnvelope size={28} />
                  <small>Email</small>
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={<Tooltip>Copy Reel Link</Tooltip>}
                placement="top"
              >
                <Button
                  variant="dark"
                  className="d-flex flex-column align-items-center p-3"
                  onClick={() => handleShare("link")}
                >
                  <FaLink size={28} />
                  <small>Copy Link</small>
                </Button>
              </OverlayTrigger>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-light d-flex justify-content-between">
            <small className="text-muted">
              Pro tip: Sharing increases engagement 🚀
            </small>
            <Button
              variant="outline-secondary"
              onClick={() => setShowShareModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}
