# Overview

UTTARAKHAND-PLOT is a modern property marketing website built with Next.js 14, focused on promoting land plots in Uttarakhand's hill stations. The application serves as a comprehensive platform for showcasing residential and investment properties in scenic locations like Mussoorie, Rishikesh, Nainital, and Dehradun. The site features property listings, investment calculators, location guides, and an admin panel for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 14 with App Router architecture for modern React development and server-side rendering
- **UI Components**: shadcn/ui component library built on Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with custom design system featuring light/dark theme support
- **Typography**: Montserrat and Open Sans fonts for professional presentation
- **State Management**: React hooks and local storage for authentication and UI state
- **Form Handling**: React Hook Form with Zod validation for contact forms and calculators

### Design System
- **Color Scheme**: Professional blue and neutral palette with HSL CSS variables for theme consistency
- **Component Variants**: Class Variance Authority (CVA) for systematic component styling
- **Icons**: Lucide React icon library throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities

### Authentication System
- **Client-Side Auth**: Simple localStorage-based authentication for admin access
- **Route Protection**: AuthGuard component for protecting admin routes
- **User Roles**: Basic admin/user role differentiation stored in localStorage

### Content Management
- **Property Listings**: Static data structure for plot information with detailed property features
- **Location Data**: Comprehensive location profiles with investment metrics and demographic data
- **Blog System**: Admin interface for content creation and management
- **File Upload**: Component for handling property images and documents

### Page Structure
- **Public Pages**: Home, plots listing, locations, investment guide, calculator, about, contact
- **Admin Panel**: Dashboard with analytics, plot management, blog management, and user inquiries
- **Authentication Pages**: Login/signup and password reset flows

### Navigation
- **Header**: Sticky navigation with responsive mobile menu
- **Footer**: Comprehensive site links and contact information
- **Mobile Navigation**: Sheet-based mobile menu for optimal mobile experience

### Performance Optimizations
- **Image Optimization**: Next.js Image component for automatic optimization
- **Font Loading**: Optimized Google Fonts integration
- **Code Splitting**: Automatic code splitting through Next.js App Router

## External Dependencies

### Core Framework
- **Next.js 14**: React framework with App Router for modern web applications
- **React 18**: Latest React features including Server Components

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Comprehensive icon library
- **next-themes**: Theme switching functionality

### Development Tools
- **TypeScript**: Type safety and enhanced developer experience
- **ESLint**: Code linting and style enforcement

### Utility Libraries
- **clsx & tailwind-merge**: Conditional CSS class management
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Type-safe component variants

### Form Management
- **React Hook Form**: Performant form handling
- **@hookform/resolvers**: Form validation resolvers

### Charts and Visualization
- **Recharts**: Chart components for investment calculator and admin analytics

### Analytics
- **@vercel/analytics**: Web analytics tracking

### Additional Components
- **embla-carousel-react**: Carousel functionality for image galleries
- **input-otp**: OTP input components for enhanced security
- **cmdk**: Command palette functionality