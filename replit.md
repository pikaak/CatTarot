# Cat Tarot Web Application

## Overview

Cat Tarot is an interactive web application where users can ask questions about their cat and receive answers from their cat's perspective using tarot card insights. The app provides three-card tarot readings using a full 78-card deck (22 Major Arcana + 56 Minor Arcana), with AI-generated responses where the cat speaks directly to its owner. Users ask questions ABOUT their cat (health, feelings, wants, needs), and the young cat responds honestly about itself. The application features a talking cat interface with personalized greetings, editable cat names and photos, overlapping card spread layout, prominent card selection counter, large visible result cards, loading indicators, and smooth animations for an engaging user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**November 5, 2025 (Latest Session)**
- **Editable Cat Names**: Added pencil icon button next to cat name (appears on hover) to edit name and photo
- **Updated Branding**: Changed app title from "내 고양이 타로 번역기" to "냥이 타로 번역기"
- **Updated Default Greeting**: Changed from "신비로운 여정을 시작하세요..." to "냥!"
- **Larger Result Cards**: Increased card size in result modal from w-16 h-24 to w-32 h-48 (mobile) and w-40 h-60 (desktop) for better visibility
- Added flex-wrap and flex-shrink-0 to result cards for mobile responsiveness
- Fixed accessibility warnings by adding DialogDescription to all modals

**November 5, 2025 (Earlier Session)**
- **Cat Name Feature**: Added cat name input field to photo upload modal with localStorage persistence
- Cat name displayed above cat photo in TalkingCat component
- **Greeting Refresh System**: Greetings automatically refresh after completing first tarot reading (queryClient.invalidateQueries approach)
- **Informal Speech (반말)**: All AI responses now use warm, friendly informal Korean speech
- UI text updates: "고양이어 번역 중" (loading), "번역 완료!" (result title)
- **Noto Sans KR Font**: Implemented modern Korean typography for entire UI
- Fixed localStorage hydration to independently restore cat name and photo
- Fixed card click handling by adding pointer-events-none to all TarotCard child elements

**November 5, 2025 (Earlier)**
- **Language Change**: All UI and AI responses now in Korean (card selection counter, loading overlay, input placeholder, greetings, readings)
- **Card System Change**: Replaced all 78 cards with Mystical Cats Tarot system with Korean keywords
- Added custom cat photo upload feature with localStorage persistence
- Changed interaction flow: Arrow button in input triggers shuffle (not clicking talking cat)
- Added prominent card selection counter at top of screen (Korean: "카드 3장을 선택하세요")
- Implemented full-screen loading overlay with animation
- TalkingCat now shows camera icon placeholder when no photo uploaded
- Auto-prompts for photo upload on first visit
- Fixed SSR bug by guarding all window access in useEffect with viewport state
- Fixed z-index ordering: Modal (200) > Loading (150) > Selected cards (100)
- Fixed mobile responsive issues: Cat image increased to 140px with flex-shrink-0, speech bubble reduced to max-w-[200px] on mobile
- Fixed card spread positioning: Changed from left: 45% to left: 50% with padding for proper mobile centering
- **Major context change**: AI now speaks AS the user's young cat responding to questions ABOUT itself (health, feelings, wants), not as a fortune-teller

**Previous Session**
- Implemented talking cat feature with AI-generated greetings via Gemini
- Redesigned card spread to use overlapping layout (60% overlap)
- Fixed selected card behavior to enlarge in place using scale transforms
- Increased modal z-index from 50 to 200 to float above selected cards

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API interaction

**UI Component System**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Custom theme system supporting light/dark modes with CSS variables

**State Management Strategy**
- React hooks for local component state
- TanStack Query for server state, caching, and API mutations
- No global state management library (Redux/Zustand) - relying on React Query's cache and component composition

**Design System**
- Typography: Noto Sans KR (Korean sans-serif) for modern, clean Korean text rendering
- Spacing: Tailwind's standard spacing scale (2, 4, 6, 8, 12, 16, 20)
- Responsive: Mobile-first with breakpoints for tablet/desktop layouts
- Animation: CSS transitions and transform-based card animations
- Language: All UI text and AI responses in Korean using informal speech (반말)

**Component Architecture**
- Atomic design pattern with reusable UI components in `/components/ui`
- Feature components: TalkingCat, CatPhotoUpload, TarotCard, QuestionInput, ResultModal, Header
- Each component is self-contained with props-based configuration
- TalkingCat component features:
  - AI-generated greetings that refresh after each completed reading
  - Custom/placeholder cat image display
  - Cat name display above photo with editable pencil icon (appears on hover)
  - Edit button opens photo upload modal for name/photo changes
  - Speech bubble UI with dynamic Korean greetings in informal speech (반말)
  - Default greeting: "냥!"
- CatPhotoUpload component:
  - Cat name input field with validation
  - Custom cat photo upload with localStorage persistence (CAT_PHOTO_KEY, CAT_NAME_KEY)
  - Independent hydration of saved name and photo
  - Preview functionality
- TarotCard component:
  - All child elements use pointer-events-none for reliable click handling
  - Only outermost div receives click events
- QuestionInput includes arrow button to start reading (replaces clicking on talking cat)
- Prominent card selection counter appears at top of screen showing remaining cards to select
- Full-screen loading overlay displays while AI generates reading (Korean: "고양이어 번역 중")
- Selected cards enlarge in place (scale up) without moving from their spread position
- Modal uses z-index 200 to float above selected cards (z-index 100)

### Backend Architecture

**Server Framework**
- Express.js as the lightweight HTTP server
- TypeScript for type safety across the stack
- Custom Vite integration for development with middleware mode

**API Design**
- RESTful endpoints:
  - POST `/api/tarot/reading` - Generate tarot reading
  - GET `/api/greeting` - Generate personalized AI greeting
- Request validation using Zod schemas
- Shared schema definitions between client and server (`@shared/schema.ts`)

**Request/Response Flow**
1. Client submits question and three selected cards
2. Server validates request against Zod schema
3. AI service generates reading based on card keywords
4. Response returns plain text reading (max 3 sentences)

**Error Handling**
- Schema validation errors return 400 Bad Request
- AI generation failures return 500 Internal Server Error
- Client-side error display via toast notifications

**No Database Layer**
- Application is stateless - no user data or reading history persisted
- All data lives in-memory during session
- Storage interface exists (`server/storage.ts`) but currently unused, allowing future extension

### External Dependencies

**AI Integration**
- Google Generative AI (Gemini 2.5 Flash model via Replit AI Integrations)
- API key configured via environment variable: `AI_INTEGRATIONS_GEMINI_API_KEY`
- Two AI functions:
  1. `generateTarotReading()` - Cat responds from its own perspective about itself (health, feelings, wants) using tarot insights (max 3 sentences, warm honest tone, informal Korean/반말, no card names)
  2. `generateGreeting()` - Creates warm, affectionate greetings from the cat to its owner in informal Korean (반말)
- Context: User asks questions ABOUT their cat, and the cat answers about itself
- Prompt engineering ensures the cat speaks as itself, not as a fortune-teller
- Greeting refresh system: Uses queryClient.invalidateQueries to fetch new greetings after completing readings (tracked via READING_COMPLETED_KEY in localStorage)

**Database**
- Drizzle ORM configured with PostgreSQL dialect
- Connection via `@neondatabase/serverless` driver
- Schema location: `shared/schema.ts` (currently only contains Zod schemas, no DB tables)
- Database URL: `DATABASE_URL` environment variable
- Note: Database is provisioned but not currently used by the application

**Third-Party UI Libraries**
- Radix UI: Headless accessible components (accordion, dialog, dropdown, etc.)
- Lucide React: Icon library
- cmdk: Command palette component
- react-day-picker: Calendar component
- embla-carousel-react: Carousel functionality
- vaul: Drawer component
- input-otp: OTP input component

**Asset Management**
- Tarot card images stored in `/attached_assets/generated_images/`
- Stock images stored in `/attached_assets/stock_images/`
- Cat image for TalkingCat component: `friendly_orange_tabb_b7c12b4c.jpg`
- Vite alias `@assets` for clean imports
- Images are imported as modules and bundled by Vite
- All card backs share the same image: `Mystical_tarot_card_back_8388aaca.png`

**Development Tools**
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript with strict mode enabled
- ESBuild for production server bundling
- PostCSS with Tailwind and Autoprefixer

**Session Management**
- connect-pg-simple package included for PostgreSQL session store (not currently active)
- Express session middleware configured but sessions not yet implemented

**Font Loading**
- Google Fonts: Cinzel, Inter, Playfair Display
- Preconnect optimization for faster font loading