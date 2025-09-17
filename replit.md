# AgriNetra - Smart Crop Advisory System

## Project Overview
AgriNetra is a comprehensive AI-powered agricultural platform that provides intelligent crop recommendations, pest detection, IoT sensor monitoring, and expert consultation services for modern farming operations.

## Setup Status
✅ **Completed GitHub Import** - September 17, 2025
- Fixed TailwindCSS v4 compatibility issues by downgrading to v3.4.0
- Resolved package.json dependency issues (removed invalid "lib" package)
- Configured Next.js for Replit environment with proper host settings
- Development server running successfully on port 5000
- Frontend compiled and accessible via webview

## Project Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14.2.16 with TypeScript
- **Styling**: TailwindCSS v3 with custom theme
- **UI Components**: Radix UI components with custom design system
- **Authentication**: JWT-based with middleware protection
- **State Management**: React hooks and server state

### Backend APIs
- **API Routes**: Next.js API routes in `/app/api/`
- **Authentication**: JWT tokens with 24h expiration
- **Database**: Currently using in-memory mock data (ready for PostgreSQL migration)

### Current Database Status
- **Mock Data**: Using in-memory storage for development
- **Schema Ready**: Complete PostgreSQL schema available in `/scripts/`
- **Migration Ready**: Can easily switch to PostgreSQL database when needed

## Key Features
1. **AI Crop Recommendations** - ML-powered crop selection based on soil, weather, and market data
2. **Pest Detection** - Image-based AI pest identification with treatment recommendations
3. **IoT Integration** - Sensor data collection and monitoring
4. **Weather Intelligence** - Hyperlocal weather forecasts and analytics
5. **Expert Network** - Connection with agricultural experts
6. **Analytics Dashboard** - Comprehensive farm performance tracking

## Development Setup

### Current Configuration
- **Host**: 0.0.0.0 (required for Replit proxy)
- **Port**: 5000 (required for Replit webview)
- **Environment**: Development mode with hot reload
- **Cache Control**: Disabled for proper proxy functionality

### Mock Credentials
- **Farmer**: farmer@example.com / password123
- **Expert**: expert@example.com / password123  
- **Admin**: admin@example.com / password123

### API Endpoints
- `/api/farms` - Farm management
- `/api/auth/*` - Authentication
- `/api/ai/*` - AI services (crop recommendations, pest detection)
- `/api/iot/*` - IoT sensor data
- `/api/sensors` - Sensor management

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Start**: `npm start`
- **Environment**: Production-ready with optimized builds

## Recent Changes (Sept 17, 2025)
1. Fixed TailwindCSS v4 → v3 compatibility issues
2. Removed invalid package dependencies
3. Configured Next.js for Replit proxy environment
4. Set up proper development workflow
5. Configured deployment settings
6. Verified frontend functionality and performance

## Next Steps for Production
1. Set up PostgreSQL database using provided schema
2. Replace mock authentication with secure auth system
3. Add real API integrations for weather and market data
4. Configure production environment variables
5. Set up monitoring and analytics

## Technology Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Radix UI
- **Backend**: Next.js API Routes, JWT Authentication
- **Database**: PostgreSQL (schema ready, currently using mocks)
- **Deployment**: Replit Autoscale
- **AI/ML**: Ready for integration with crop and pest detection models
- **IoT**: Sensor data ingestion framework implemented

---
*Last updated: September 17, 2025*
*Status: Development environment ready, deployment configured*