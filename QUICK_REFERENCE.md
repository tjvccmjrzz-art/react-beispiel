# Quick Reference: Dependencies & Components

## 📦 Package.json Dependencies

```json
{
  "framer-motion": "^11.11.9",  // Animationen & Motion
  "iban": "^0.0.14",             // IBAN-Formatierung & Validierung
  "react": "^18.3.1",            // UI-Framework
  "react-country-flag": "^3.1.0",// Länder-Flags
  "react-dom": "^18.3.1",        // DOM-Renderer
  "sonner": "^2.0.0"             // Toast-Benachrichtigungen
}
```

---

## 🧩 Komponenten-Übersicht

### **App.tsx** (Hauptkomponente)
```
├─ Hero Image Section (Responsives Headerimage)
├─ IBAN Input Card
│  ├─ Country Flag (react-country-flag)
│  ├─ IBAN Validation (iban package)
│  └─ Success Toast (sonner)
├─ TimeTracker (separate Komponente)
├─ Bento Grid
│  ├─ Animated Card Removal (framer-motion)
│  ├─ Layout Animation
│  └─ Reset Button
└─ Toaster (sonner)
```

### **TimeTracker.tsx** (Timer mit SVG-Ring)
```
├─ Timer Logic (setInterval 100ms)
├─ Time Formatting (HH:MM:SS)
├─ SVG Ring
│  ├─ Background Track
│  ├─ Progress Circle (animated with framer-motion)
│  ├─ Tick Marks (6x)
│  └─ Inner Circle
├─ Center Display (Time + Caption)
├─ Minute Celebration Animation (Pulse + Glow)
└─ Control Buttons (Start/Pause/Reset)
```

### **TaskDrawer.tsx** (Side Drawer)
```
├─ Drawer Toggle Button
├─ Animated Overlay (framer-motion)
├─ Side Drawer (slides from right)
│  ├─ Header
│  ├─ Task List (hardcoded example)
│  └─ Complete Button
└─ Celebration Modal (on completion)
   ├─ Backdrop Blur
   ├─ Animated Content (backOut ease)
   ├─ Confetti Particles (40x framer-motion)
   └─ Success Message
```

---

## 🎨 Styling-Klassen (styles.css)

### Layout & Structure
- `.app-shell` – Main container (flex column)
- `.hero-image-section` – Hero image wrapper
- `.content-container` – Content with max-width
- `.hero-block` – Title + description

### Cards
- `.card` – Base card with hover
- `.card-body` – Card content grid
- `.card-hovered` – Hover state class

### IBAN Input
- `.iban-row` – Flex container
- `.iban-flag` – Country flag display
- `.iban-input` – Input field styling
- `.iban-feedback` – Validation message

### Bento Grid
- `.bento-grid` – Flex container
- `.bento-card` – Individual card (sm/md/lg sizes)
- `.bento-tag` – Category label
- `.bento-metric` – Metric display

### Timer
- `.time-tracker` – Section container
- `.timer-ring` – SVG element
- `.ring-track` – Background circle
- `.ring-progress` – Animated progress circle
- `.timer-value` – Large time display

### Drawer
- `.drawer-toggle-button` – Fixed button (bottom-right)
- `.drawer-overlay` – Backdrop
- `.task-drawer` – Side drawer
- `.task-item` – Task list item
- `.complete-button` – Action button

### Celebration
- `.celebration-overlay` – Modal backdrop
- `.celebration-content` – Modal content
- `.confetti-container` – Particles container
- `.confetti-piece` – Single particle

---

## 🔧 TypeScript Interfaces

### BentoCard
```typescript
type BentoCard = {
  id: number;
  title: string;
  description: string;
  tag: string;
  accent: string;
  size: "sm" | "md" | "lg";
  metric: string;
};
```

---

## 📊 Feature Checklist für Entwickler

- [x] IBAN-Eingabe mit Validierung & Auto-Formatierung
- [x] Länderflaggen-Display
- [x] Hover-Animation mit Button-Reveal
- [x] Toast-Benachrichtigungen
- [x] Bento-Grid mit responsivem Layout
- [x] Animierte Card-Entfernung
- [x] Sekundenpräziser Timer (HH:MM:SS)
- [x] SVG-Ring mit 60-Sekunden-Zyklus
- [x] Kontinuierliche Ring-Animation
- [x] Minute-Completion-Feier-Animation
- [x] Side Drawer mit Slide-In-Animation
- [x] Celebration Modal mit Confetti
- [x] Responsives Hero-Image
- [x] Dark-Mode Dashboard Design
- [x] Micro-Interactions auf allen Elementen

---

## 🚀 Commands

```bash
# Installation
npm install

# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# TypeScript Check
npx tsc -p tsconfig.json --noEmit
```

---

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+ (object-position: center 35%)
- **Tablet**: 768px-1024px (object-position: center 40%)
- **Mobile**: 480px-768px (object-position: center 45%)
- **Small Mobile**: <480px (object-position: center 50%)

---

## 💚 Color Palette

- **Primary Green**: `#22c55e` (Timer Ring, Success)
- **Light Green**: `#4ade80` (Gradients)
- **Purple**: `#7c59ff` (Buttons, Accents)
- **Cyan**: `#5dd8ff` (Gradients)
- **Text**: `#e8e8f0` (Primary), `#c8c8dd` (Secondary)
- **Background**: `#101018`, `#08080f` (Dark)

---

**Zuletzt aktualisiert: 29.06.2026**
