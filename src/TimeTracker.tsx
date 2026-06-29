import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const RADIUS = 62;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TICK_COUNT = 6;

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function TimeTracker() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const progressMs = elapsedMs % 60000;
  const progressPercent = progressMs / 60000;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progressPercent);

  const formattedTime = useMemo(() => formatTime(elapsedSeconds), [elapsedSeconds]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = window.setInterval(() => {
      setElapsedMs((previous) => {
        const next = previous + 100;

        if (next > 0 && next % 60000 === 0) {
          setPulseKey((value) => value + 1);
        }

        return next;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!pulseKey) {
      return;
    }

    setIsPulsing(true);
    const timeout = window.setTimeout(() => setIsPulsing(false), 650);
    return () => window.clearTimeout(timeout);
  }, [pulseKey]);

  const resetTimer = () => {
    setElapsedMs(0);
    setIsRunning(false);
    setIsPulsing(false);
  };

  return (
    <section className="time-tracker card">
      <div className="time-tracker-header">
        <div>
          <p className="eyebrow">Zeiterfassung</p>
          <h2>Arbeitszeit verfolgen</h2>
        </div>
        <div className={`status-pill ${isRunning ? "active" : "idle"}`}>
          <span className="status-dot" />
          {isRunning ? "Läuft" : "Bereit"}
        </div>
      </div>

      <div className="time-tracker-body">
        <motion.div
          className="timer-ring-wrapper"
          animate={isPulsing ? { scale: [1, 1.07, 1], filter: ["drop-shadow(0 0 0 rgba(34,197,94,0))", "drop-shadow(0 0 24px rgba(34,197,94,0.35))", "drop-shadow(0 0 0 rgba(34,197,94,0))"] } : { scale: 1, filter: "drop-shadow(0 0 0 rgba(34,197,94,0))" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <svg className="timer-ring" viewBox="0 0 140 140" role="img" aria-label="Fortschrittskreis für den Timer">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>

            <circle className="ring-track" cx="70" cy="70" r={RADIUS} />
            <motion.circle
              className="ring-progress"
              cx="70"
              cy="70"
              r={RADIUS}
              stroke="url(#ringGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.12, ease: "linear" }}
              style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset }}
            />

            {Array.from({ length: TICK_COUNT }).map((_, index) => {
              const angle = (index / TICK_COUNT) * Math.PI * 2 - Math.PI / 2;
              const x1 = 70 + Math.cos(angle) * 78;
              const y1 = 70 + Math.sin(angle) * 78;
              const x2 = 70 + Math.cos(angle) * 90;
              const y2 = 70 + Math.sin(angle) * 90;

              return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} className="ring-tick" />;
            })}

            <circle cx="70" cy="70" r="48" className="ring-inner" />
          </svg>

          <div className="timer-center">
            <p className="timer-label">Aktuelle Zeit</p>
            <div className="timer-value">{formattedTime}</div>
            <p className="timer-caption">{Math.floor(elapsedSeconds / 60)} Minute(n) · {Math.floor(progressMs / 1000)}s / 60s</p>
          </div>
        </motion.div>

        <div className="timer-controls">
          <button className="action-button primary" type="button" onClick={() => setIsRunning((value) => !value)}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="action-button secondary" type="button" onClick={resetTimer}>
            Zurücksetzen
          </button>
        </div>
      </div>
    </section>
  );
}
