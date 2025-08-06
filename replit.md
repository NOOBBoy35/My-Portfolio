# Overview

This is a modern full-stack web application built with React and Express.js, featuring a sophisticated portfolio website with dynamic animations, theme switching, and a comprehensive UI component library. The application uses a monorepo structure with client-side React components and server-side Express routing, designed for showcasing professional work and services.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing

**UI Component System**
- Shadcn/ui components built on Radix UI primitives for accessibility
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Custom theme system supporting light/dark modes with CSS variables

**State Management & Data Fetching**
- TanStack React Query for server state management and caching
- React Context for theme state and global UI state
- Custom hooks for scroll tracking, mouse position, and responsive behavior

**Animation & Interactivity**
- Framer Motion for complex animations and transitions
- Custom particle system for background effects
- Scroll-triggered animations and parallax effects
- Interactive hero section with mouse-following elements

## Backend Architecture

**Server Framework**
- Express.js with TypeScript for the REST API server
- Modular route registration system in `server/routes.ts`
- Custom logging middleware for API request tracking
- Error handling middleware for consistent error responses

**Development Integration**
- Vite middleware integration for development mode
- Hot module replacement in development
- Static file serving for production builds
- Replit-specific development tooling integration

**Storage Interface**
- Abstract storage interface (`IStorage`) for data persistence
- In-memory storage implementation (`MemStorage`) for development
- Designed to be easily replaceable with database implementations

## Data Layer

**Database Schema**
- Drizzle ORM configured for PostgreSQL with Neon Database integration
- User schema with UUID primary keys and unique constraints
- Type-safe schema definitions with Zod validation
- Migration system configured for database schema changes

**Data Validation**
- Drizzle-Zod integration for automatic schema validation
- Type inference from database schema to TypeScript types
- Consistent validation patterns across client and server

## Project Structure

**Monorepo Organization**
- `/client` - React frontend application
- `/server` - Express.js backend API
- `/shared` - Common TypeScript types and schemas
- Shared TypeScript configuration and build processes

**Component Architecture**
- Atomic design principles with reusable UI components
- Custom hooks for business logic separation
- Responsive design patterns with mobile-first approach
- Accessibility-first component design using Radix UI

# External Dependencies

## Frontend Dependencies
- **React Query**: Server state management and data synchronization
- **Framer Motion**: Animation library for sophisticated UI transitions
- **Radix UI**: Accessible component primitives for the design system
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Wouter**: Lightweight routing library for single-page application navigation

## Backend Dependencies
- **Express.js**: Web application framework for Node.js
- **Drizzle ORM**: TypeScript ORM for database operations
- **Neon Database**: Serverless PostgreSQL database platform
- **Zod**: TypeScript-first schema validation library

## Development Tools
- **Vite**: Build tool and development server with HMR
- **TypeScript**: Static type checking for JavaScript
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment tooling and deployment

## UI Component Library
- **Shadcn/ui**: Complete component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant and styling management
- **CLSX/Tailwind Merge**: Utility for conditional class name management