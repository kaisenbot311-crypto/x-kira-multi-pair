# Overview

Kira is a modern personal portfolio and WhatsApp bot pairing application built with Next.js 16. The application serves dual purposes:

1. **Portfolio Site** - A visually rich, animated personal portfolio showcasing projects, skills, experience, and testimonials
2. **WhatsApp Bot Pairing Service** - A real-time pairing API system that allows users to connect their WhatsApp numbers to bot instances across multiple servers

The app uses the Next.js App Router architecture with server-side rendering capabilities and real-time session management. It features smooth animations powered by Framer Motion, custom scroll effects with Lenis, and a responsive design built with TailwindCSS.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Next.js 16 with App Router pattern (`app/` directory structure)

**Key Design Decisions**:
- Client-side rendering for interactive components using `'use client'` directive
- Motion-first design philosophy with extensive use of Framer Motion for animations
- Custom cursor implementation and parallax effects for enhanced UX
- Smooth scrolling powered by Lenis library
- Loading screens with session-based first-visit detection
- Responsive grid layouts with TailwindCSS

**Component Organization**:
- Atomic component design in `app/components/`
- Separation of concerns: presentational components (Hero, Projects, Skills) vs utility components (SmoothScroll, CustomCursor, LoadingScreen)
- Settings-driven content via `settings.json` for easy customization without code changes
- Modal patterns for detailed project views

**Animation Strategy**:
- Intersection Observer-based animations (`useInView` from Framer Motion)
- Staggered reveal animations for lists and grids
- Spring physics for natural motion
- Custom parallax scrolling with velocity-based effects
- Magnetic button interactions with mouse tracking

## Backend Architecture

**API Routes** (Next.js Route Handlers):

**Multi-Server Pairing System**:
- Primary endpoint: `/api/pair` - handles WhatsApp number pairing requests
- Server selection via query parameter (`?server=1-10`)
- Environment-based server configuration (`API_1` through `API_10`)
- Fallback to `NEXT_PUBLIC_API` for default server
- Returns pairing codes for WhatsApp bot connection

**Session Management**:
- `/api/sessions` - aggregates real-time session counts across all configured servers
- Polls upstream APIs to gather total active users
- No-cache headers for real-time data freshness
- Server breakdown tracking for load monitoring

**Server Discovery**:
- `/api/servers` - provides available server list with capacity metrics
- Health checking for each configured server
- User count per server for load balancing visibility

**Deprecated Endpoints**:
- `/api/pair-pro` - redirects to main pairing endpoint
- `/api/check-user` - disabled (Firebase removed)
- `/api/admin/verify-user` - disabled (Firebase removed)

**Data Flow**:
1. User submits phone number via `/pair` page
2. Frontend calls `/api/pair?number=XXX&server=N`
3. API proxies request to configured upstream server
4. Returns pairing code or error status (408 for already connected)
5. Real-time stats updated via periodic polling of `/api/sessions`

## Data Storage

**Configuration Storage**:
- `settings.json` - centralized configuration file containing:
  - Personal information (name, title, email, tagline)
  - Social media links
  - SEO metadata
  - Skills and experience data
  - Projects showcase
  - Education and certifications
  - Testimonials
  - Service offerings

**Session State**:
- Browser `sessionStorage` for loading screen state (`hasVisited`)
- Browser `sessionStorage` for admin authentication (`adminKey`)
- No persistent database - all data is configuration-driven

**Rationale**: 
- Static configuration allows easy content updates without database overhead
- Session storage prevents loading screen on same-session navigation
- Serverless-friendly architecture with no database dependencies

## Authentication & Authorization

**Current State**: 
- Admin panel exists but authentication is disabled (Firebase removed)
- No user authentication required for pairing service
- Admin routes return 410 (Gone) status

**Previous Implementation** (now removed):
- Firebase Authentication for admin access
- Firebase Firestore for user verification storage
- Admin key-based verification system

**Security Considerations**:
- API proxying isolates upstream servers from direct client access
- Server-side environment variables protect API endpoints
- No sensitive data storage in current implementation

# External Dependencies

## Third-Party Services

**WhatsApp Bot APIs**:
- Multiple upstream pairing services configured via environment variables
- Server endpoints: `API_1` through `API_10` and `NEXT_PUBLIC_API`
- Expected API contract: `GET /pair?number=XXX` returns pairing code
- Expected API contract: `GET /sessions` returns session statistics

**Content Delivery**:
- Image hosting: `i.ibb.co` (configured in `next.config.js`)
- Static assets: `static.ryznn.xyz` (fonts, custom resources)
- Google Fonts: Inter, Space Grotesk, Syne, Geist families

## Key NPM Packages

**Framework & Runtime**:
- `next@16.0.0` - App Router, Server Components, API Routes
- `react@19.2.0` - Latest React with concurrent features
- `react-dom@19.2.0` - DOM rendering

**Animation & Interaction**:
- `framer-motion@^11.11.17` - Animation library for all UI transitions
- `@studio-freight/lenis@^1.0.42` - Smooth scroll implementation
- `@popmotion/popcorn@^0.4.4` - Utility functions for motion calculations

**UI Components**:
- `lucide-react@^0.468.0` - Icon system
- `tailwindcss@^4` - Utility-first CSS framework
- `@tailwindcss/postcss@^4` - PostCSS integration

**Development Tools**:
- `typescript@^5` - Type safety
- `eslint@^9` with `eslint-config-next` - Code quality
- Type definitions for Node, React, and React DOM

**Removed Dependencies**:
- Firebase packages (client and admin SDK) - configuration exists but functionality disabled

## Environment Variables Required

**API Configuration**:
- `NEXT_PUBLIC_API` - Default/fallback pairing API endpoint
- `API_1` through `API_10` - Optional additional server endpoints

**Previous Firebase Config** (no longer used):
- Various `NEXT_PUBLIC_FIREBASE_*` variables
- Service account credentials

**Development**:
- Default dev server: `localhost:5000`
- Custom host binding: `0.0.0.0` for network access