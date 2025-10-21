// IntroPage.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    // start the colorful layer a little before leaving
    const timer = setTimeout(() => {
      setShowTransition(true);
      // wait for the animation (1.2s) to finish before navigating
      setTimeout(() => navigate("/signup"), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="intro-page d-flex justify-content-center align-items-center text-center">
        <div className="overlay"></div>

        <div className="content text-white position-relative px-5 py-4">
          <motion.h1
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="display-1 fw-bold mb-3"
          >
            BBS NEO
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lead mb-4"
          >
            Welcome to the future of technology. <br />
            Experience innovation like never before.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="btn btn-success btn-lg"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* Colorful transition overlay */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            key="transition"
            className="color-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <style>
        {`
/* Base full-screen background */
.intro-page {
  height: 100vh;
  width: 100%;
  background: url('https://wallpapercave.com/wp/wp1945939.jpg') no-repeat center center/cover;
  position: relative;
  overflow: hidden;
}

/* Dark overlay behind the text for readability */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

/* Card with content */
.content {
  z-index: 2;
  max-width: 700px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
}

/* Transition layer – on top of everything */
.color-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;  /* highest so it covers everything */
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255, 99, 132, 0.9),
    rgba(54, 162, 235, 0.9),
    rgba(255, 206, 86, 0.9),
    rgba(25,54,55,0.5)

  );
}
        `}
      </style>
    </>
  );
};

export default IntroPage;
