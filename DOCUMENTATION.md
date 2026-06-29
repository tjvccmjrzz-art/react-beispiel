# React Microinteractions & Dashboard Demo

Eine moderne React-Anwendung, die zeigt, wie Microanimationen, Zeiterfassung, responsive Designs und elegante UI-Komponenten zusammenwirken.

---

## 📦 Verwendete Frameworks & Bibliotheken

### Core
- **React** `^18.3.1` – JavaScript UI-Bibliothek
- **React DOM** `^18.3.1` – DOM-Renderer für React
- **TypeScript** `^5.6.0` – Typsichere Programmiersprache

### Build & Development
- **Vite** `^5.4.0` – Moderner, schneller Build-Tool
- **@vitejs/plugin-react** `^4.3.1` – React-Plugin für Vite

### Animationen & Motion
- **framer-motion** `^11.11.9` – Production-ready Motion Library für React
  - Smooth Animationen
  - Layout-Animationen
  - Presence-Animationen (Enter/Exit)
  - Gesture-Support

### UI & Komponenten
- **sonner** `^2.0.0` – Modern Toast-Benachrichtigungen
- **react-country-flag** `^3.1.0` – Responsive Länder-Flag-Komponenten

### Daten & Validierung
- **iban** `^0.0.14` – IBAN-Formatierung und Validierung
  - Automatische Formatierung mit Trennzeichen
  - Länder-Validierung
  - IBAN-Checksum-Prüfung

---

## 🎯 Feature-Mapping: Was wurde womit umgesetzt?

### 1. **IBAN-Eingabefeld**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| IBAN-Formatierung | `iban` | `App.tsx` |
| Länderflagge | `react-country-flag` | `App.tsx` |
| Validierungslogik | `iban.isValid()` | `App.tsx` |
| Eingabefeld-Styling | CSS (custom) | `styles.css` |
| Smooth Hover | CSS transitions | `styles.css` |

**Beschreibung:** Ein intelligentes Eingabefeld, das IBAN-Nummern automatisch formatiert, die richtige Länderflagge basierend auf dem Länderkennzeichen anzeigt und das Formular blockiert, bis eine gültige IBAN eingegeben ist.

---

### 2. **Hover-Animation mit Button-Reveal**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Fade-In Animation | `framer-motion` / CSS | `App.tsx`, `styles.css` |
| Button-Visibility Toggle | React State | `App.tsx` |
| Smooth Scale | CSS transitions | `styles.css` |
| Hover-Effekt | CSS `:hover` | `styles.css` |

**Beschreibung:** Ein Button erscheint sanft beim Hover über die Karte und wird erst dann anklickbar. Die Animation ist elegant und nicht zu schnell.

---

### 3. **Toast-Benachrichtigungen**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Success-Toast | `sonner` | `App.tsx` |
| Custom Styling | CSS Variables | `styles.css` |
| Position | `sonner` Konfiguration | `App.tsx` |

**Beschreibung:** Beim Klick auf den Button erscheint eine Success-Benachrichtigung mit der Meldung "Antrag wurde genehmigt".

---

### 4. **Bento-Grid Layout**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Responsive Grid | CSS Flexbox + `flex-basis` | `styles.css` |
| Card-Sizing (sm/md/lg) | CSS Media Queries | `styles.css` |
| Hover-Effekt | CSS transitions | `styles.css` |
| Responsive Breakpoints | CSS Media Queries | `styles.css` |

**Beschreibung:** Ein modernes Bento-Grid-Layout mit verschieden großen Cards, das sich responsiv anpasst.

---

### 5. **Entfernung von Bento-Cards mit Animation**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Entrance-Animation | `framer-motion` motion | `App.tsx` |
| Exit-Animation | `framer-motion` AnimatePresence | `App.tsx` |
| Layout-Animation | `framer-motion` layout prop | `App.tsx` |
| Smooth Filling | CSS + framer-motion | `styles.css` |
| Remove-Funktion | React State | `App.tsx` |

**Beschreibung:** Cards fading sanft aus und die verbleibenden Cards rücken flüssig nach – alles ohne Flackern.

---

### 6. **Zeiterfassungs-Timer**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Kontinuierliches Ticking | `setInterval` (100ms) | `TimeTracker.tsx` |
| Zeitformat HH:MM:SS | JavaScript Date Math | `TimeTracker.tsx` |
| Start/Pause/Reset | React State + onClick | `TimeTracker.tsx` |
| Status-Badge | CSS + React State | `TimeTracker.tsx` + `styles.css` |

**Beschreibung:** Ein präziser, laufender Timer mit Starten, Pausieren und Zurücksetzen.

---

### 7. **Kreisförmiger Fortschrittsindikator (60-Sekunden-Ring)**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| SVG-Ring | SVG Circle mit stroke-dasharray | `TimeTracker.tsx` |
| Kontinuierliche Animation | `framer-motion` animate + linear ease | `TimeTracker.tsx` |
| Gradient-Fill | SVG linearGradient | `TimeTracker.tsx` |
| Tick-Markierungen | SVG lines (6 Ticks) | `TimeTracker.tsx` |
| Millisekunden-Präzision | `Math.floor(elapsedMs / 100)` | `TimeTracker.tsx` |

**Beschreibung:** Der Kreis füllt sich über eine komplette Minute hinweg flüssig und setzt dann zurück.

---

### 8. **Minute-Completion-Animation (Puls/Glow)**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Scale + Filter Animation | `framer-motion` animate | `TimeTracker.tsx` |
| Drop-Shadow Glow | CSS `drop-shadow` | `TimeTracker.tsx` |
| Timing (600ms) | `framer-motion` transition.duration | `TimeTracker.tsx` |

**Beschreibung:** Alle 60 Sekunden: Kurze Puls- und Glow-Animation mit sanftem Scale-Effekt.

---

### 9. **Task-Drawer (Side Drawer)**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Slide-In Animation | `framer-motion` initial/animate/exit | `TaskDrawer.tsx` |
| Overlay | `framer-motion` AnimatePresence | `TaskDrawer.tsx` |
| Scroll-Area | CSS `overflow-y: auto` | `styles.css` |
| Toggle-Button | React State + onClick | `TaskDrawer.tsx` |
| Checkbox-Items | HTML `<input type="checkbox">` | `TaskDrawer.tsx` |

**Beschreibung:** Ein eleganter Drawer mit Aufgabenliste, der sich von rechts einschieben lässt und ein Overlay darunter dimmt.

---

### 10. **Feier-Animation (Confetti & Celebration Overlay)**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Celebration Overlay | `framer-motion` modal | `TaskDrawer.tsx` |
| Text-Animation | `framer-motion` backOut ease | `TaskDrawer.tsx` |
| Confetti-Effekt | `framer-motion` animate (40 Partikel) | `TaskDrawer.tsx` |
| Backdrop Blur | CSS `backdrop-filter: blur()` | `styles.css` |
| Gradient Text | CSS `background-clip: text` | `styles.css` |
| Auto-Dismiss | `setTimeout` nach 4s | `TaskDrawer.tsx` |

**Beschreibung:** Beim Klick „Alle als erledigt" erscheint ein Celebration-Modal mit animierten Confetti-Partikeln und einem Glückwunsch-Text.

---

### 11. **Responsives Hero-Image**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Full-Width Image | HTML `<img>` | `App.tsx` |
| Responsive Höhe | CSS `clamp(280px, 45vh, 560px)` | `styles.css` |
| Objektpositon-Anpassung | CSS `object-position` | `styles.css` |
| Fokuspunkt-Variation | CSS Media Queries | `styles.css` |
| Smooth Fokus-Transition | CSS transition 0.4s ease | `styles.css` |

**Beschreibung:** Ein responsives Headerimage, das sich mit der Viewportgröße skaliert und seinen Fokuspunkt anpasst.

---

### 12. **Microinteractions & Polish**
| Feature | Technologie | Datei |
|---------|-------------|-------|
| Button-Hover Effects | CSS transform + box-shadow | `styles.css` |
| Smooth Transitions | CSS transitions (180-240ms) | `styles.css` |
| Color-Feedback | CSS (valid/invalid states) | `styles.css` |
| Typography Hierarchy | CSS font-sizes + clamp | `styles.css` |
| Layout Spacing | CSS gap + padding | `styles.css` |

**Beschreibung:** Durchgehend subtile, schnelle Animationen die die UX verbeßern ohne aufdringlich zu sein.

---

## 📁 Dateistruktur

```
src/
├── App.tsx                 # Hauptkomponente (IBAN, Bento-Grid, Hero-Image)
├── TimeTracker.tsx         # Timer mit SVG-Ring (60-Sekunden-Zyklus)
├── TaskDrawer.tsx          # Side Drawer mit Feier-Animation
├── main.tsx               # React Root & DOM Mount
├── vite-env.d.ts          # TypeScript Environment (Vite + Moduldeklarationen)
├── react-country-flag.d.ts # Type Definitions für react-country-flag
└── styles.css             # Global Styling (Dark-Mode, Animations, Responsive)
```

---

## 🚀 Verwendete Techniken

### CSS-Techniken
- **`clamp()`** – Responsive Sizing ohne Media Queries
- **`object-fit: cover`** – Responsives Image Handling
- **`backdrop-filter: blur()`** – Moderndialog-Overlay
- **Flexbox** – Card-Layout
- **CSS Variables** – (Strukturiert für Token)
- **Gradient Text** – `background-clip: text`

### React-Patterns
- **React Hooks** – `useState`, `useEffect`, `useMemo`, `useCallback`
- **Controlled Components** – IBAN-Input
- **Conditional Rendering** – DrawerState
- **Composition** – TimeTracker, TaskDrawer als eigenständige Komponenten

### Animations-Patterns
- **Enter/Exit Animations** – `AnimatePresence` + `initial/animate/exit`
- **Layout Animations** – `layout` prop für natürliche Neuanordnungen
- **Continuous Animations** – SVG-Ring mit `transition: duration 0.12s linear`
- **Gesture Feedback** – Hover-States mit Skalierung

---

## 💡 Best Practices

✅ **Modulare Komponenten** – Jede Komponente hat eine klare Verantwortung  
✅ **TypeScript** – Volle Typsicherheit  
✅ **Performant Animations** – Lineare Kurven für kontinuierliche Motion  
✅ **Accessibility** – Semantisches HTML, ARIA-Labels  
✅ **Responsive Design** – Mobile-First mit `clamp()` und Media Queries  
✅ **Dark Mode First** – Moderne, kontraststarke Farben  

---

## 🎬 Nächste Schritte für Entwickler

1. **IBAN-Komponente isolieren** – In eigene `<IbanInput />` Komponente auslagern
2. **Timer komponetisieren** – `<CircleProgress />` und `<Timer />` separieren
3. **Design-Tokens definieren** – CSS Variables für Farben/Spacing
4. **Storybook hinzufügen** – Komponenten-Dokumentation
5. **Unit-Tests** – Jest + React Testing Library für Validierungslogik
6. **E2E-Tests** – Playwright für kritische Flows (Timer, Drawer)

---

**Erstellt: 29.06.2026**  
**Tech Stack: React 18 + TypeScript + Vite + framer-motion**
