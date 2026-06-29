import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Confetti() {
  const confettiPieces = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.15,
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="confetti-piece"
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: piece.x * 3,
            y: piece.y * 4 + 200,
            rotate: piece.rotation + 360,
            scale: 0,
          }}
          transition={{
            duration: 2.2,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function CelebrationOverlay() {
  return (
    <motion.div
      className="celebration-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="celebration-content"
        initial={{ scale: 0.3, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.3, y: -20 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        <div className="celebration-badge">✨</div>
        <h2>Alle Aufgaben erledigt!</h2>
        <p>Großartig – du hast einen produktiven Tag!</p>

        <Confetti />
      </motion.div>
    </motion.div>
  );
}

export function TaskDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCompleteAll = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  return (
    <>
      <button className="drawer-toggle-button" type="button" onClick={() => setIsOpen(true)}>
        <span className="drawer-icon">☐</span>
        Aufgaben
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="task-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="drawer-header">
                <h2>Aufgabenliste</h2>
                <button className="close-button" type="button" onClick={() => setIsOpen(false)}>
                  ✕
                </button>
              </div>

              <div className="drawer-content">
                <div className="task-list">
                  <div className="task-item completed">
                    <input type="checkbox" defaultChecked disabled />
                    <span>Frontend-Komponenten fertigstellen</span>
                  </div>
                  <div className="task-item completed">
                    <input type="checkbox" defaultChecked disabled />
                    <span>Animationen implementieren</span>
                  </div>
                  <div className="task-item completed">
                    <input type="checkbox" defaultChecked disabled />
                    <span>Timer-Funktionalität testen</span>
                  </div>
                  <div className="task-item completed">
                    <input type="checkbox" defaultChecked disabled />
                    <span>Styles anpassen</span>
                  </div>
                </div>

                <div className="drawer-footer">
                  <button className="complete-button" type="button" onClick={handleCompleteAll}>
                    <span>✓</span>
                    Alle als erledigt markieren
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>{showCelebration && <CelebrationOverlay />}</AnimatePresence>
    </>
  );
}
