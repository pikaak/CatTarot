# Cat Tarot Web Application

## Overview
Cat Tarot is an interactive web application designed to provide users with unique tarot readings from their cat's perspective. Users ask questions about their cat's health, feelings, or needs, and the application, using a three-card spread from a full 78-card deck, generates AI-powered responses where the cat directly addresses its owner. The project aims to offer an engaging and personalized user experience through a talking cat interface, editable cat names and photos, intuitive card selection, and dynamic animations.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application is built with React 18 and TypeScript, utilizing Vite for fast development. It uses Wouter for routing and TanStack Query for server state management. The UI is constructed with shadcn/ui (New York style) based on Radix UI primitives, styled using Tailwind CSS. The design system emphasizes Noto Sans KR typography, mobile-first responsiveness, and CSS-based animations. Key components include `TalkingCat` (featuring AI-generated greetings, editable cat details, and responsive speech bubbles), `CatPhotoUpload` (for custom cat photos and name persistence), `TarotCard` (with specific dimensions and click handling), and `ResultModal` (displaying AI readings with a typing animation and integrated sharing options). All UI and AI responses are in informal Korean (반말).

### Backend Architecture
The backend is a lightweight Express.js server, also written in TypeScript. It provides RESTful endpoints for generating tarot readings (`/api/tarot/reading`) and AI greetings (`/api/greeting`). Request validation is handled using Zod schemas, ensuring data integrity. The application is designed to be stateless, with no persistent database layer currently in use, though a storage interface is present for future expansion. Error handling provides clear feedback for validation and AI generation failures.

### System Design Choices
The application leverages AI to deliver a unique interactive experience, focusing on the cat's perspective. It uses a full 78-card tarot deck, with specific card imagery and Korean keywords. A significant design decision was to have the AI speak as the user's young cat, responding honestly about itself, rather than acting as a traditional fortune-teller. The user flow involves asking a question, selecting three cards, and receiving an AI-generated reading. Customization options like editable cat names and photos enhance personalization. Visuals are dynamic, including a prominent card selection counter, full-screen loading overlays, and animated elements like the talking cat and result text typing effect. Sharing functionality is integrated into the result modal, offering various platform options.

## External Dependencies

### AI Integration
- **Google Generative AI (Gemini 2.5 Flash model)**: Used via direct API for AI-generated tarot readings and personalized greetings.
- **API Key**: `GEMINI_API_KEY` environment variable (from Google AI Studio).
- **AI Functions**: `generateTarotReading()` (cat speaks from its perspective, informal Korean) and `generateGreeting()` (warm, affectionate greetings).

### Database
- **Drizzle ORM**: Configured for PostgreSQL dialect (though currently not actively used for data persistence).
- **Driver**: `@neondatabase/serverless`.
- **Environment Variable**: `DATABASE_URL`.

### Third-Party UI Libraries
- **Radix UI**: Headless accessible components.
- **Lucide React**: Icon library.
- **cmdk**: Command palette component.
- **react-day-picker**: Calendar component.
- **embla-carousel-react**: Carousel functionality.
- **vaul**: Drawer component.
- **input-otp**: OTP input component.

### Asset Management
- **Tarot Card Images**: Stored in `/attached_assets/generated_images/`.
- **Stock Images**: Stored in `/attached_assets/stock_images/`.
- **Cat Image**: `friendly_orange_tabb_b7c12b4c.jpg` for the TalkingCat component.
- **Vite Alias**: `@assets` for imports.
- **Card Backs**: `Mystical_tarot_card_back_8388aaca.png`.

### Development Tools
- **Replit-specific plugins**: Runtime error overlay, cartographer, dev banner.
- **TypeScript**: Strict mode enabled.
- **ESBuild**: For production server bundling.
- **PostCSS**: With Tailwind and Autoprefixer.

### Font Loading
- **Google Fonts**: Cinzel, Inter, Playfair Display (with preconnect optimization).