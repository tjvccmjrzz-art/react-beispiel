import { useMemo, useState, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import ReactCountryFlag from "react-country-flag";
import iban from "iban";
import { AnimatePresence, motion } from "framer-motion";
import { TimeTracker } from "./TimeTracker";
import { TaskDrawer } from "./TaskDrawer";

const countryRegex = /^[A-Z]{2}/;

type BentoCard = {
  id: number;
  title: string;
  description: string;
  tag: string;
  accent: string;
  size: "sm" | "md" | "lg";
  metric: string;
};

const initialCards: BentoCard[] = [
  {
    id: 1,
    title: "Genehmigungen",
    description: "Schnelle Freigabe für neue Anträge.",
    tag: "Workflow",
    accent: "#7c59ff",
    size: "lg",
    metric: "24 offen",
  },
  {
    id: 2,
    title: "Dokumente",
    description: "Alle Unterlagen in einem Blick.",
    tag: "Paket",
    accent: "#5dd8ff",
    size: "md",
    metric: "12 neu",
  },
  {
    id: 3,
    title: "Kundenscore",
    description: "Starke Kooperationen mit klaren Signalen.",
    tag: "Insights",
    accent: "#6df5a4",
    size: "sm",
    metric: "92%",
  },
  {
    id: 4,
    title: "Notizen",
    description: "Wichtige Hinweise direkt beim Antrag.",
    tag: "Team",
    accent: "#ffb96b",
    size: "md",
    metric: "3 aktiv",
  },
];

function formatIban(value: string) {
  const electronic = iban.electronicFormat(value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
  return iban.printFormat(electronic);
}

function App() {
  const [hovered, setHovered] = useState(false);
  const [ibanValue, setIbanValue] = useState("");
  const [cards, setCards] = useState(initialCards);
  const [bellActive, setBellActive] = useState(false);

  const formattedIban = useMemo(() => {
    try {
      return ibanValue ? formatIban(ibanValue) : "";
    } catch {
      return ibanValue.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }
  }, [ibanValue]);

  const isIbanValid = useMemo(() => {
    try {
      return iban.isValid(formattedIban);
    } catch {
      return false;
    }
  }, [formattedIban]);

  const countryCode = useMemo(() => {
    const match = formattedIban.match(countryRegex);
    return match ? match[0] : "";
  }, [formattedIban]);

  const removeCard = (id: number) => {
    setCards((current) => current.filter((card) => card.id !== id));
  };

  function showApprovalToast() {
    const DURATION = 5000; // ms

    setBellActive(true);
    window.setTimeout(() => setBellActive(false), 900);

    return toast.custom((t) => {
      return (
        <ApprovalToast
          duration={DURATION}
          onUndo={() => {
            toast("Aktion rückgängig gemacht");
            toast.dismiss(t as string | number);
          }}
          onFinish={() => toast.dismiss(t as string | number)}
        />
      );
    });
  }

  function ApprovalToast({
    duration = 5000,
    onUndo,
    onFinish,
  }: {
    duration?: number;
    onUndo: () => void;
    onFinish: () => void;
  }) {
    const [progress, setProgress] = useState(1);
    const startRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
      const start = performance.now();
      startRef.current = start;

      function tick(now: number) {
        const elapsed = now - (startRef.current || now);
        const p = Math.max(0, 1 - elapsed / duration);
        setProgress(p);
        if (elapsed < duration) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          onFinish();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [duration, onFinish]);

    return (
      <div className="approval-toast">
        <div className="approval-body">
          <motion.div
            className="check-wrap"
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle
                cx="12"
                cy="12"
                r="10"
                stroke="#ffffff"
                strokeWidth="2"
                initial={{ strokeDashoffset: 62.8 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                strokeDasharray="62.8"
              />
              <motion.path
                d="M7 12l3 3 7-7"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.18, duration: 0.35, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <div className="approval-content">
            <div className="approval-title">Antrag genehmigt</div>
            <button
              className="approval-undo"
              type="button"
              onClick={() => {
                onUndo();
              }}
            >
              Rückgängig
            </button>
          </div>
        </div>

        <div className="approval-progress" aria-hidden="true">
          <div className="approval-progress-bar" style={{ transform: `scaleX(${Math.max(progress, 0)})` }} />
        </div>
      </div>
    );
  }

  return (
    <main className="app-shell">
      <div className="hero-image-section">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=600&fit=crop"
          alt="Modern dashboard background with gradient and abstract elements"
          className="hero-image"
        />
      </div>

      <motion.button
        type="button"
        className={`notification-bell ${bellActive ? "active" : ""}`}
        onClick={() => {
          setBellActive(true);
          window.setTimeout(() => setBellActive(false), 900);
        }}
        aria-label="Neue Benachrichtigung"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="bell-dot" />
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4a4 4 0 0 0-4 4v2.2c0 .8-.3 1.6-.8 2.2L6 14h12l-1.2-1.6a3.4 3.4 0 0 1-.8-2.2V8a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 17a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </motion.button>

      <div className="content-container">
        <section className="hero-block">
          <h1>Microinteractions & Bento Grid</h1>
          <p>Hover über die Karte, ziehe einzelne Tiles aus dem Layout und lass die restlichen Inhalte weich mitwachsen.</p>
        </section>

        <div
          className={`card ${hovered ? "card-hovered" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="card-body">
            <div>
              <p className="eyebrow">Antrag prüfen</p>
              <h2>Firmenkonto Genehmigung</h2>
              <p className="card-copy">
                Diese Karte zeigt eine kleine Microanimation mit einem Button, der beim Hover fade-in erscheint.
              </p>

              <label className="input-label" htmlFor="iban">
                IBAN eingeben
              </label>
              <div className="iban-row">
                <span className="iban-flag">
                  {countryCode ? (
                    <ReactCountryFlag svg countryCode={countryCode} title={countryCode} />
                  ) : (
                    <span className="iban-flag-placeholder">🇪🇺</span>
                  )}
                </span>
                <input
                  id="iban"
                  className={`iban-input ${ibanValue ? (isIbanValid ? "valid" : "invalid") : ""}`}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  placeholder="DE89 3704 0044 0532 0130 00"
                  value={formattedIban}
                  onChange={(event) => setIbanValue(event.target.value)}
                />
              </div>

              <p className={`iban-feedback ${ibanValue ? (isIbanValid ? "valid" : "invalid") : ""}`}>
                {ibanValue
                  ? isIbanValid
                    ? "IBAN ist gültig."
                    : "Ungültige IBAN. Bitte prüfe Eingabe und Länderkennzeichen."
                  : "Bitte gib eine IBAN ein."}
              </p>
            </div>

            <button
              className="action-button"
              type="button"
              disabled={!isIbanValid}
              onClick={() => {
                if (!isIbanValid) return;
                showApprovalToast();
              }}
            >
              Genehmigen
            </button>
          </div>
        </div>

        <TimeTracker />

        <section className="bento-panel card">
          <div className="bento-header">
            <div>
              <p className="eyebrow">Bento Grid</p>
              <h2>Verfügbare Module</h2>
            </div>
            <button className="ghost-button" type="button" onClick={() => setCards(initialCards)}>
              Zurücksetzen
            </button>
          </div>

          <div className="bento-grid">
            <AnimatePresence initial={false} mode="popLayout">
              {cards.map((card) => (
                <motion.article
                  key={card.id}
                  layout
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`bento-card ${card.size}`}
                >
                  <div className="bento-card-top">
                    <span className="bento-tag">{card.tag}</span>
                    <button className="icon-button" type="button" onClick={() => removeCard(card.id)} aria-label={`Karte ${card.title} entfernen`}>
                      ×
                    </button>
                  </div>

                  <div className="bento-card-body">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>

                  <div className="bento-footer">
                    <span className="bento-metric">{card.metric}</span>
                    <button className="secondary-button" type="button">
                      Öffnen
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>

      <TaskDrawer />
      <Toaster position="bottom-center" richColors />
    </main>
  );
}

export default App;
