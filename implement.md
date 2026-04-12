# IGNITRIX Website — Animation & Interactivity Upgrade

> **Goal:** Transform the static site into an immersive, animated, interactive hackathon experience.
> **Stack:** Next.js + Tailwind CSS. Add `tsParticles`, `AOS.js`, `vanilla-tilt.js`, `Framer Motion`.

---

## Install Dependencies First

```bash
npm install tsparticles @tsparticles/react @tsparticles/slim
npm install aos
npm install vanilla-tilt
npm install framer-motion
```

---

## 🔴 TIER 1 — Highest Priority (Do These First)

---

### 1. Animated Particle / Neural Network Hero Background

**File:** `components/HeroParticles.tsx` (create new)

- Use `@tsparticles/react` to render a full-screen canvas behind the hero content.
- Configure as a **neural network**: connected nodes with moving particles.
- Particle color: `#ff4444` (red) and `#9b59b6` (purple) to match brand.
- Links between particles: enabled, color `#ffffff`, opacity `0.15`, distance `150`.
- Particle count: `80`. Movement speed: `1.5` (subtle, not distracting).
- Canvas must be `position: absolute`, `top: 0`, `left: 0`, `width: 100%`, `height: 100%`, `z-index: 0`.
- Hero text/content must be `position: relative`, `z-index: 1`.

**Config skeleton:**
```js
{
  particles: {
    number: { value: 80 },
    color: { value: ["#ff4444", "#9b59b6"] },
    links: { enable: true, color: "#ffffff", opacity: 0.15, distance: 150 },
    move: { enable: true, speed: 1.5 },
    size: { value: { min: 1, max: 3 } },
    opacity: { value: 0.6 }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 140, links: { opacity: 0.5 } } }
  }
}
```

---

### 2. CSS Glitch Animation on "IGNITRIX" Title

**File:** `styles/globals.css` or a CSS module for the hero section.

- Add a `@keyframes glitch` animation that uses `clip-path` + `transform: skewX()` to create horizontal slice distortion.
- Apply two pseudo-elements (`::before`, `::after`) on the `.glitch` class, each with offset colors (`#ff4444` and `#00ffff`).
- Trigger animation every **4 seconds** using `animation-delay` and `steps()` timing.
- The glitch should last **~0.3s** then return to normal — subtle, not constant.

**Usage:** Add `className="glitch"` to the `<h1>IGNITRIX</h1>` element.

```css
.glitch {
  position: relative;
  animation: glitch-skew 4s infinite linear alternate-reverse;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}

.glitch::before {
  color: #ff4444;
  animation: glitch-effect 4s infinite;
  clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  transform: translate(-3px, 0);
}

.glitch::after {
  color: #00ffff;
  animation: glitch-effect 4s infinite reverse;
  clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
  transform: translate(3px, 0);
}

@keyframes glitch-effect {
  0%   { opacity: 1; transform: translate(0); }
  2%   { transform: translate(-3px, 1px); }
  4%   { transform: translate(3px, -1px); }
  6%   { opacity: 0; }
  8%   { opacity: 1; transform: translate(0); }
  100% { transform: translate(0); }
}
```

> Also add `data-text="IGNITRIX"` attribute to the h1 element.

---

### 3. Scroll Reveal Animations (AOS.js)

**Files:** `pages/_app.tsx` (init) + every section component.

**Step 1 — Initialize AOS in `_app.tsx`:**
```tsx
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

useEffect(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
  });
}, []);
```

**Step 2 — Add `data-aos` attributes to sections:**

| Section | Attribute |
|---|---|
| About cards | `data-aos="fade-up"` with `data-aos-delay="100"` per card (stagger by 100ms) |
| Session cards | `data-aos="fade-up"` |
| Stats bar | `data-aos="zoom-in"` |
| Timeline items | Alternating `data-aos="fade-right"` and `data-aos="fade-left"` |
| Theme cards | `data-aos="fade-up"` staggered |
| Team cards | `data-aos="flip-left"` |
| FAQ items | `data-aos="fade-up"` |
| CTA section | `data-aos="zoom-in"` |

---

### 4. Theme Card Hover Glow + 3D Tilt

**File:** `components/ThemeCard.tsx` (or wherever theme cards are rendered)

**Tilt Effect:**
- Import `vanilla-tilt` and apply via `useEffect` + `ref` on each card.
- Config: `{ max: 15, speed: 400, glare: true, "max-glare": 0.2 }`.

**Glow Effect (CSS):**
- On hover, apply `box-shadow: 0 0 20px rgba(255, 68, 68, 0.4), 0 0 40px rgba(155, 89, 182, 0.2)`.
- Add `border: 1px solid rgba(255, 68, 68, 0.3)` that transitions to `rgba(255, 68, 68, 0.8)` on hover.
- Add `transition: all 0.3s ease` for smoothness.
- Slight `transform: translateY(-6px)` on hover.

```tsx
useEffect(() => {
  if (cardRef.current) {
    VanillaTilt.init(cardRef.current, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }
  return () => cardRef.current?.vanillaTilt?.destroy();
}, []);
```

---

### 5. Count-Up Animation on Stats

**File:** `components/StatsBar.tsx` (or wherever "100+ Participants", "₹30K+", etc. are shown)

- Create a `useCountUp(target, duration)` hook using `requestAnimationFrame`.
- Trigger the count-up only when the stats section enters the viewport using `IntersectionObserver`.
- Count from `0` to target value over `2000ms` with an ease-out curve.
- Suffix ("+", "K+", "-Day") should appear only after counting completes.

```tsx
function useCountUp(target: number, duration = 2000, shouldStart: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);
  return count;
}
```

---

## 🟡 TIER 2 — High Value (Build After Tier 1)

---

### 6. Animated Alternating Timeline

**File:** `components/Timeline.tsx`

- Redesign timeline from a vertical list to an **alternating left-right layout**.
- Desktop: odd items on left, even items on right, centered vertical line with dot connectors.
- Mobile: single column, all items on right.
- Each card: `data-aos="fade-right"` for left cards, `data-aos="fade-left"` for right cards.
- Active/highlighted items (Kickoff, Results): add a **pulsing ring** animation on the dot using `@keyframes pulse-ring`.
- Center line: `2px solid rgba(255,68,68,0.3)`, dots: `12px` circles in red.

---

### 7. Theme Cards → Modal Popup

**File:** `components/ThemeModal.tsx` (create new)

- Clicking a theme card opens a **Framer Motion** animated modal overlay.
- Modal slides up from bottom (`y: 100 → y: 0`) with opacity fade.
- Backdrop: `rgba(0,0,0,0.8)` with blur (`backdrop-filter: blur(8px)`).
- Modal content per theme:
  - Theme name + emoji icon (large)
  - 2–3 sentence description of the problem domain
  - **"Example Agent Idea"** section with a sample use case
  - **"Suggested Tools"** chips: e.g., LangChain, AutoGen, LangGraph, CrewAI, OpenAI API
  - Close button (top-right X) + click-outside-to-close

**Framer Motion config:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 100 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
>
```

> Wrap `ThemeModal` in `<AnimatePresence>` to handle exit animations.

---

### 8. Background Gradient Blobs

**File:** `styles/globals.css` or layout component.

- Add 3 large blurred gradient circles as decorative background elements.
- These must be `position: fixed` or `position: absolute` on the page wrapper, `z-index: -1`, `pointer-events: none`.
- Blob 1 (top-left): `400px × 400px`, color `rgba(255, 68, 68, 0.12)`, `filter: blur(120px)`.
- Blob 2 (top-right): `350px × 350px`, color `rgba(155, 89, 182, 0.12)`, `filter: blur(120px)`.
- Blob 3 (bottom-center): `300px × 300px`, color `rgba(255, 68, 68, 0.08)`, `filter: blur(100px)`.
- Add subtle `animation: float 8s ease-in-out infinite alternate` to each blob for gentle movement.

```css
@keyframes float {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(20px, 30px) scale(1.05); }
}
```

---

### 9. Shimmer / Pulse on Register Button

**File:** `components/RegisterButton.tsx` or global CSS.

- Primary CTA buttons ("Register Now →") should have a **shimmer sweep** on hover.
- Implement with a `::after` pseudo-element containing a white gradient diagonal stripe that sweeps left to right on hover using `@keyframes shimmer`.
- Additionally, add a `box-shadow` pulse animation using `@keyframes pulse-glow` that cycles the red glow opacity.

```css
.btn-register {
  position: relative;
  overflow: hidden;
  animation: pulse-glow 2.5s ease-in-out infinite;
}

.btn-register::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%; height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: none;
}

.btn-register:hover::after {
  animation: shimmer 0.6s ease forwards;
}

@keyframes shimmer {
  to { left: 150%; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 10px rgba(255, 68, 68, 0.4); }
  50%       { box-shadow: 0 0 25px rgba(255, 68, 68, 0.8), 0 0 50px rgba(255, 68, 68, 0.3); }
}
```

---

## 🟢 TIER 3 — Polish Layer (Do Last)

---

### 10. "Ask the Agent" Dummy Widget

**File:** `components/AgentDemo.tsx` (create new, place in About section)

- Build a fake chat interface with a `Think → Decide → Act` pipeline visualization.
- Input: a text box where user types a prompt (e.g., "Hire the best candidate for a React role").
- On submit (or Enter key), show a **3-step animated sequence**:
  1. **Think** (blue): "Parsing job requirements, scanning 500 candidate profiles..." (typing animation)
  2. **Decide** (yellow): "Ranking by skill match, experience, cultural fit..." (typing animation)
  3. **Act** (green): "Top 3 candidates shortlisted. Sending interview invites..." (typing animation)
- Each step appears with a 1-second delay after the previous.
- Use a lookup table of 5–6 preset prompts → preset responses. Match on keywords or use first match as default.
- Style as a dark terminal/chat card with monospace font and colored step indicators.
- Add a `Reset` button to clear and try again.

---

### 11. Improved Marquee Ticker

**File:** `components/Ticker.tsx`

- Keep existing marquee content but add:
  - **Gradient fade masks** on left and right edges using `::before` and `::after` pseudo-elements with `background: linear-gradient(to right, #0a0a0a, transparent)` and the reverse on the right.
  - Each ticker item gets a `hover: text-red-400 cursor-pointer` interaction.
  - Pause marquee animation on hover: `animation-play-state: paused` on `hover`.
  - Add a small `✦` separator between items styled in red.

---

### 12. Mobile Nav Hamburger with Slide-in Drawer

**File:** `components/Navbar.tsx`

- On mobile (`< md` breakpoint), replace stacked nav with a **hamburger icon** (animated 3-bar → X on open).
- Clicking hamburger: a drawer slides in from the **right** using Framer Motion `x: 300 → x: 0`.
- Drawer background: `rgba(10, 10, 10, 0.97)` with blur.
- Nav links animate in with **staggered entrance**: each link fades up with `delay: index * 0.08s`.
- Clicking a link: closes drawer with reverse slide animation before scrolling to section.
- Backdrop overlay behind drawer: clicking it closes the drawer.

**Framer Motion stagger config:**
```tsx
const containerVariants = {
  open: { transition: { staggerChildren: 0.08 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};

const itemVariants = {
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
};
```

---

## General Notes for Implementation

- **Never hard-code colors** — use the existing Tailwind config or CSS variables for the red/purple brand palette.
- **Performance**: All animations should respect `prefers-reduced-motion`. Wrap animation logic in a check:
  ```js
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  ```
- **z-index layering**: particles `z-0` → blobs `z-0` → content `z-10` → modals `z-50` → nav `z-100`.
- **Test on mobile** after each Tier 1 item — tilt effect should be disabled on touch devices (`vanilla-tilt` handles this automatically).
- Commit after completing each numbered item so rollback is easy.