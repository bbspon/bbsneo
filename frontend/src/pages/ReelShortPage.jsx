// ReelShortPage.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

// ======================
// Config
// ======================
const API_BASE = "http://127.0.0.1:3107"; // OTT service
const PLACEHOLDER_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

// Optional: if you store a JWT
const authHeader = () => {
  const t = localStorage.getItem("bbsneo_token");
  return t ? { Authorization: `Bearer ${t}` } : {};
};


const ReelShortPage = () => {
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(true);
  const [commentText, setCommentText] = useState("");

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchReels = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/reels?limit=20`, {
          headers: { ...authHeader() },
        });

        if (cancelled) return;

        const list = Array.isArray(data) ? data : [];
        const mapped = list.map((r) => ({
          id: r._id,
          title: r.title || "Untitled",
          description: r.description || "",
          src: r.src || PLACEHOLDER_VIDEO,
          creator: r.creator || "Creator",
          likes: typeof r.likes === "number" ? r.likes : 0,
          shares: typeof r.shares === "number" ? r.shares : 0,
          comments: Array.isArray(r.comments) ? r.comments : [],
        }));

        // Only override demo data if API returned at least one item
        if (mapped.length > 0) setReels(mapped);
      } catch {
        // Keep demo silently on any error
      }
    };

    fetchReels();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto play/pause when index changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [currentIndex, muted]);

  // Simple scroll navigation (wheel up/down)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (e.deltaY > 0) nextReel();
      else prevReel();
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [currentIndex, reels.length]);

  const nextReel = () => {
    setCurrentIndex((i) => (i + 1 < reels.length ? i + 1 : i));
    setLiked(false);
  };
  const prevReel = () => {
    setCurrentIndex((i) => (i - 1 >= 0 ? i - 1 : i));
    setLiked(false);
  };

  const current = reels[currentIndex] || {};

  // ======================
  // Actions (optimistic)
  // ======================
  const handleToggleMute = () => setMuted((m) => !m);

  const handleLike = async () => {
    if (!current.id) return;

    // compute next state to avoid stale reads
    const nextLiked = !liked;

    // optimistic
    setLiked(nextLiked);
    setReels((prev) => {
      const copy = [...prev];
      const r = { ...(copy[currentIndex] || {}) };
      r.likes = Math.max(0, (r.likes || 0) + (nextLiked ? 1 : -1));
      copy[currentIndex] = r;
      return copy;
    });

    try {
      const url = `${API_BASE}/reels/${current.id}/${
        nextLiked ? "like" : "unlike"
      }`;
      await axios.post(url, {}, { headers: { ...authHeader() } });
    } catch {
      // rollback
      setLiked(!nextLiked);
      setReels((prev) => {
        const copy = [...prev];
        const r = { ...(copy[currentIndex] || {}) };
        r.likes = Math.max(0, (r.likes || 0) + (nextLiked ? -1 : 1));
        copy[currentIndex] = r;
        return copy;
      });
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !current.id) return;

    const draft = {
      user: "You",
      text: commentText.trim(),
      likes: 0,
      replies: [],
    };

    // optimistic
    setReels((prev) => {
      const copy = [...prev];
      const r = { ...(copy[currentIndex] || {}) };
      r.comments = Array.isArray(r.comments) ? r.comments.slice() : [];
      r.comments.push(draft);
      copy[currentIndex] = r;
      return copy;
    });
    setCommentText("");

    try {
      await axios.post(`${API_BASE}/reels/${current.id}/comments`, draft, {
        headers: { "Content-Type": "application/json", ...authHeader() },
      });
    } catch {
      // ignore; UI already shows comment
    }
  };

  const handleShare = async () => {
    if (!current.id) return;

    // optimistic bump
    setReels((prev) => {
      const copy = [...prev];
      const r = { ...(copy[currentIndex] || {}) };
      r.shares = (r.shares || 0) + 1;
      copy[currentIndex] = r;
      return copy;
    });

    try {
      await axios.post(
        `${API_BASE}/reels/${current.id}/share`,
        {},
        { headers: { ...authHeader() } }
      );
    } catch {
      // ignore
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video area */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          ref={videoRef}
          src={current.src || PLACEHOLDER_VIDEO}
          style={{ maxHeight: "100vh", maxWidth: "100vw", objectFit: "cover" }}
          loop
          muted={muted}
          playsInline
          controls={false}
          onError={(e) => {
            // fallback if bad URL
            e.currentTarget.src = PLACEHOLDER_VIDEO;
            e.currentTarget.play().catch(() => {});
          }}
          autoPlay
        />

        {/* Left bottom: title and description */}
        <div
          style={{
            position: "absolute",
            left: 16,
            bottom: 20,
            right: 80,
            pointerEvents: "none",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            {current.title || "Reel"}
          </div>
          <div style={{ opacity: 0.9, marginBottom: 8 }}>
            @{current.creator || "creator"}
          </div>
          <div style={{ opacity: 0.8 }}>{current.description || ""}</div>
        </div>

        {/* Right: action buttons */}
        <div
          style={{
            position: "absolute",
            right: 16,
            bottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
          }}
        >
          <button
            onClick={handleToggleMute}
            style={btnStyle}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>

          <button onClick={handleLike} style={btnStyle} title="Like">
            <FaHeart color={liked ? "#ff3b3b" : "#fff"} />
          </button>
          <div style={{ fontSize: 12, opacity: 0.9 }}>{current.likes || 0}</div>

          <a
            href="#comments"
            style={{ ...btnStyle, textDecoration: "none" }}
            title="Comments"
          >
            <FaComment />
          </a>
          <div style={{ fontSize: 12, opacity: 0.9 }}>
            {Array.isArray(current.comments) ? current.comments.length : 0}
          </div>

          <button onClick={handleShare} style={btnStyle} title="Share">
            <FaShare />
          </button>
          <div style={{ fontSize: 12, opacity: 0.9 }}>
            {current.shares || 0}
          </div>

          <button onClick={prevReel} style={btnStyle} title="Previous">
            <FaChevronUp />
          </button>
          <button onClick={nextReel} style={btnStyle} title="Next">
            <FaChevronDown />
          </button>
        </div>
      </div>

      {/* Comments panel */}
      <div
        id="comments"
        style={{
          background: "#000",
          padding: "16px 16px 80px",
          borderTop: "1px solid #222",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Comments</div>

        <form
          onSubmit={handleAddComment}
          style={{ display: "flex", gap: 8, marginBottom: 16 }}
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              background: "#111",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "10px 12px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#e50914",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(current.comments || []).map((c, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 8,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontWeight: 600 }}>{c.user || "User"}</div>
              <div style={{ opacity: 0.9, marginTop: 4 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// small inline button style to match floating icons
const btnStyle = {
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: 24,
  width: 42,
  height: 42,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default ReelShortPage;
