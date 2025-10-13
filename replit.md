# Shiv Insurance Brokers Ltd - Corporate Website

## Overview

This is a professional corporate website for Shiv Insurance Brokers Ltd, a Kenyan insurance brokerage firm established in 1997. The application is built as a full-stack React application with an Express.js backend, featuring a modern, responsive design that showcases the company's services, team, and allows potential clients to submit contact forms for insurance quotes.

The website serves as the company's digital presence, providing information about their 34+ insurance product categories, company history, team profiles, and a gallery celebrating Kenya. It includes a contact form system for lead generation and quote requests.

## Recent Changes

### October 13, 2025
- **About Page Image Update**: Replaced generic image with professional business meeting stock photo showing team collaboration
- **About Page Content Update**: Removed year/date reference from hero tagline for cleaner messaging
- **Services Page Update**: Removed "Our Underwriting Partners" section from Services page
- **TypeScript Type Safety Enhancement**: Added proper interfaces (MedicalInsuranceProvider, UnderwritingPartner) with `satisfies` keyword for compile-time type checking
- **Contact Form Addition**: Implemented DNG-style contact form on Services page with two-column layout (image left, form right)
- **Full Form Functionality**: Backend integration, success toasts, auto-clear after submission, and proper validation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Single-page application using React 18 with TypeScript for type safety
- **Wouter**: Lightweight client-side routing library for navigation between pages
- **Tailwind CSS**: Utility-first CSS framework for responsive design and styling
- **Shadcn/UI**: Component library built on Radix UI primitives for consistent, accessible UI components
- **React Hook Form**: Form handling and validation for the contact form
- **TanStack Query**: Server state management for API calls and data fetching
- **Vite**: Build tool and development server for fast development and optimized production builds

### Backend Architecture
- **Express.js**: REST API server handling contact form submissions and data retrieval
- **TypeScript**: Type-safe server-side development
- **In-Memory Storage**: Simple storage implementation for development (contacts and users)
- **Zod**: Runtime type validation for API request/response schemas
- **Drizzle ORM**: Type-safe ORM for database interactions (configured for PostgreSQL)

### Database Design
- **Drizzle Schema**: Two main entities - users and contacts
- **Users Table**: Basic authentication structure with username/password
- **Contacts Table**: Lead capture with fields for personal info, insurance type, and messages
- **PostgreSQL**: Production database (Neon Database integration configured)

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Component Architecture**: Modular React components with consistent styling
- **Form Validation**: Client and server-side validation for contact submissions
- **Toast Notifications**: User feedback for form submissions and errors
- **Image Assets**: Company branding and Kenya-themed gallery images
- **SEO Structure**: Proper HTML structure with semantic elements

### Development Workflow
- **Hot Reload**: Vite development server with HMR
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Build Process**: Vite for client build, esbuild for server bundling
- **Path Aliases**: Clean imports using @ aliases for better code organization

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and modern features
- **Express.js**: Backend web server framework
- **TypeScript**: Type system for both client and server
- **Vite**: Frontend build tool and development server

### Database and ORM
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle Kit**: Database migration and schema management tools

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Shadcn/UI**: Pre-built component library
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Web fonts (Inter, DM Sans, Fira Code, etc.)

### Form Handling and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### State Management and Data Fetching
- **TanStack React Query**: Server state management and caching
- **Wouter**: Lightweight routing library for React

### Development and Build Tools
- **Replit Integration**: Development environment plugins and error handling
- **PostCSS**: CSS processing with Autoprefixer
- **ESBuild**: Fast JavaScript bundler for server builds
- **Date-fns**: Date utility library for timestamp handling

### Asset Management
- **Static Assets**: Company logos and images served from attached_assets directory
- **Stock Images**: Professional business meeting images for About page
- **Custom Images**: SIB.png analytics dashboard for authentic company data visualization