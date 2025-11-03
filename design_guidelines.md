# Cat Tarot Web App - Design Guidelines

## Design Approach

**Reference-Based: Mystical Card Game Aesthetic**
Drawing inspiration from premium card game interfaces (Hearthstone, Slay the Spire) combined with spiritual/mystical app design patterns (Co-Star, The Pattern). Focus on theatrical presentation with smooth, deliberate animations that enhance the fortune-telling experience.

---

## Typography System

**Font Families:**
- Primary (Headings): 'Cinzel' or 'Playfair Display' (serif, mystical elegance) - Google Fonts
- Secondary (Body/Chat): 'Inter' or 'Source Sans Pro' (clean readability)

**Hierarchy:**
- App Title "Cat Tarot": text-4xl md:text-5xl, font-bold, tracking-wide
- Section Headers: text-2xl md:text-3xl, font-semibold
- Chatbot Text: text-base md:text-lg, leading-relaxed
- Input Field: text-base, placeholder with reduced opacity
- Buttons: text-sm md:text-base, font-medium, uppercase tracking-wider

---

## Layout System

**Spacing Primitives:**
Using Tailwind units: **2, 4, 6, 8, 12, 16, 20** for consistent rhythm
- Micro spacing: p-2, gap-2, m-2
- Standard spacing: p-4, gap-4, m-4, p-6
- Section spacing: p-8, py-12, py-16
- Large spacing: p-20 (desktop containers)

**Viewport Strategy:**
- Mobile: Single column, full-height sections
- Desktop: Asymmetric two-column layout (left: controls, right: cards)
- Card area: Occupies 60-70% of viewport width on desktop
- Home screen: Cards stacked bottom-left, input at bottom

---

## Core Layout Structure

### Home Screen (Initial State)
```
┌─────────────────────────────────────┐
│ [Home]              Cat Tarot       │ ← Header: h-16, sticky
├─────────────────────────────────────┤
│                                     │
│                                     │
│  [AD SPACE RESERVED]                │ ← h-24 reserved banner
│                                     │
│                                     │
│                                     │
│                                     │
│     🂠                              │ ← Card stack: absolute
│    🂠🂠   (bottom-left)              │   bottom-20 left-8
│   🂠🂠🂠                              │
│                                     │
├─────────────────────────────────────┤
│ [Enter your question...]      [→]   │ ← Input bar: h-16
└─────────────────────────────────────┘
```

### Card Spread State (Post-Shuffle)
Cards fan out in arc formation on right side with staggered rotation transforms (-15° to +15°)

### Three-Card Selection State
Selected cards align center-right in row formation, enlarged and highlighted

---

## Component Library

### 1. Navigation Header
- Fixed top positioning, h-16
- Home button: top-4 left-4, rounded-lg, px-4 py-2
- Title: center-aligned, mystical serif font
- Backdrop blur effect: backdrop-blur-md

### 2. Tarot Card Elements
**Card Dimensions:**
- Mobile: w-24 h-36 (aspect-ratio: 2/3)
- Desktop: w-32 h-48

**Card States:**
- Face-down: Identical ornate back design, subtle glow/shadow
- Face-up: Unique illustration per Major Arcana
- Hover (desktop): scale-105, lift effect with shadow
- Selected: scale-110, prominent border/glow

**Card Flip Animation:**
- 3D transform with perspective(1000px)
- rotateY from 0deg to 180deg
- Duration: 600ms, ease-in-out
- Backface-visibility: hidden

### 3. Question Input Bar
- Fixed bottom positioning, h-16
- Input field: flex-1, px-6, rounded-full or rounded-lg
- Submit/Arrow button: w-12 h-12, rounded-full, right-aligned
- Reserved ad space above: h-24, subtle border-top

### 4. Shuffle Animation
**Card Movement:**
- Initial stack translates from bottom-left to center-right
- Cards separate with staggered delays (100ms intervals)
- Rapid shuffle effect: 8-12 position swaps over 1.5s
- Elastic easing for playful mystical feel

**Spread Formation:**
- Arc layout: 7 cards fanned across 180° semicircle
- Each card: rotate between -20° to +20°
- translateX spacing: 60-80px between cards
- All cards appear simultaneously with fade-in

### 5. Result Popup Modal
**Structure:**
- Centered overlay: max-w-md md:max-w-lg
- Backdrop: backdrop-blur-lg with dimmed background
- Rounded corners: rounded-2xl
- Inner padding: p-8 md:p-12

**Content Layout:**
- Three selected cards displayed horizontally at top: gap-4, mb-8
- Chatbot avatar/icon: Small cat illustration, w-12 h-12, mb-4
- Text area: leading-relaxed, max 3 sentences visible
- Pagination: Arrow button (>) bottom-right if overflow
- Close button: top-right corner, w-10 h-10

**Pagination Behavior:**
- Smooth scroll/slide transition: 300ms ease
- Arrow indicator pulses subtly when more content available

### 6. Card Stack (Initial)
- 5-7 cards visually stacked with offset: translate(2px, -3px) per layer
- Drop shadow for depth: shadow-2xl
- Hover: entire stack lifts slightly, cursor-pointer
- Click animation: Brief compress before shuffle trigger

---

## Animation Guidelines

**Philosophy:** Purposeful, theatrical animations that reinforce the mystical fortune-telling experience

**Key Animations:**
1. **Card Shuffle:** Most prominent - complex, 1.5-2s duration
2. **Card Flip:** Medium impact - smooth 3D rotate, 600ms
3. **Popup Entry:** Gentle scale + fade, 400ms
4. **Hover Effects:** Subtle lifts, 200ms transitions

**Interaction Feedback:**
- Button presses: scale-95 active state
- Card selection: Immediate visual confirmation (glow/border)
- Disabled states: reduced opacity, cursor-not-allowed

**Performance Notes:**
- Use transform and opacity only (GPU-accelerated)
- will-change on cards during shuffle
- Reduce motion for accessibility: prefers-reduced-motion

---

## Responsive Behavior

### Mobile (< 768px)
- Single column layout
- Card stack: bottom-left, smaller size (w-20 h-30)
- Spread: Vertical scroll or horizontal swipe carousel
- Popup: Full-screen overlay, p-6
- Input: Full width with minimal padding

### Tablet (768px - 1024px)
- Transition to side-by-side layout
- Cards spread in tighter arc
- Popup: max-w-lg centered

### Desktop (> 1024px)
- Full asymmetric layout activated
- Generous spacing, dramatic card spread
- Hover states fully enabled
- Popup: max-w-2xl with ample padding

---

## Accessibility

- All interactive elements: min 44x44px touch target
- Keyboard navigation: Tab through cards, Enter to select
- Focus indicators: Prominent outline/ring on all focusable elements
- Screen reader: aria-labels for card names/states, live region for chatbot
- Reduce motion: Disable decorative animations, keep functional ones simplified
- High contrast ratios maintained throughout

---

## Images

### Required Image Assets:

**1. Tarot Card Illustrations:**
- 22 Major Arcana card faces (unique illustrations)
- 1 universal card back design (ornate, mystical pattern)
- Format: Square or 2:3 aspect ratio, high resolution
- Style: Mystical cat-themed artwork
- Placement: Dynamic (cards appear throughout interaction)

**2. Chatbot Cat Avatar:**
- Small cat icon/illustration for popup modal
- Size: 48x48px to 64x64px
- Style: Matches card illustration aesthetic
- Placement: Top of result popup, above text

**3. Hero/Header (Optional):**
- Subtle mystical background pattern/texture
- Low opacity, non-distracting
- Placement: Full page background or header area

**4. Ad Banner Placeholder:**
- Reserved space: 728x90px (desktop) or 320x50px (mobile)
- Location: Above question input field
- Currently empty, awaiting future integration

**No large hero image** - The app focuses on immediate card interaction rather than traditional landing page structure.

---

## Icon Library

**Font Awesome (CDN):** For UI controls
- Arrow right (fas fa-arrow-right): Submit button
- Home (fas fa-home): Home button  
- Times (fas fa-times): Close modal
- Chevron right (fas fa-chevron-right): Pagination arrow

**Usage:** icon size text-lg to text-xl, consistent with button/element size