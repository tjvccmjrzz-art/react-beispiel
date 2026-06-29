import { useMemo, useState } from "react";
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

  return (
    <main className="app-shell">
      <div className="hero-image-section">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=600&fit=crop"
          alt="Modern dashboard background with gradient and abstract elements"
          className="hero-image"
        />
      </div>

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
              onClick={() => toast.success("Antrag wurde genehmigt")}
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
