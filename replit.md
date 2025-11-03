# Cat Tarot Web Application

## Overview

Cat Tarot is an interactive tarot reading web application where users receive mystical guidance from a cat's perspective. The app provides three-card tarot readings using the Major Arcana, with AI-generated interpretations delivered in a friendly feline voice. The application features a mystical, card game-inspired aesthetic with smooth animations and an engaging user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- Typography: Cinzel/Playfair Display (serif) for headings, Inter/Source Sans Pro for body text
- Spacing: Tailwind's standard spacing scale (2, 4, 6, 8, 12, 16, 20)
- Responsive: Mobile-first with breakpoints for tablet/desktop layouts
- Animation: CSS transitions and transform-based card animations

**Component Architecture**
- Atomic design pattern with reusable UI components in `/components/ui`
- Feature components: CardStack, TarotCard, QuestionInput, ResultModal, Header
- Each component is self-contained with props-based configuration
- Example components provided for development/testing purposes

### Backend Architecture

**Server Framework**
- Express.js as the lightweight HTTP server
- TypeScript for type safety across the stack
- Custom Vite integration for development with middleware mode

**API Design**
- RESTful endpoint: POST `/api/tarot/reading`
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
- Google Generative AI (Gemini 2.0 Flash Exp model)
- API key configured via environment variable: `AI_INTEGRATIONS_GEMINI_API_KEY`
- Prompt engineering ensures cat persona: friendly tone, no card names revealed, max 3 sentences
- Model interprets card keywords rather than card titles for mystical ambiguity

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