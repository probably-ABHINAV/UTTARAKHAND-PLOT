# Uttarakhand Properties Backend API (Supabase Edition)

A modern, scalable backend API for a real estate platform specializing in properties in Uttarakhand, India. Built with Supabase for authentication, database, and real-time features.

## 🚀 Features

- **Supabase Integration**: Complete integration with Supabase for database, authentication, and storage
- **Admin Management**: Secure authentication using Supabase Auth
- **Property Listings**: Complete CRUD operations for land plots with image support
- **Inquiry System**: Allow potential buyers to submit inquiries
- **Role-based Access**: Admin-only endpoints for management functions
- **Input Validation**: Comprehensive validation using Zod
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Type Safety**: Full TypeScript implementation
- **Real-time Ready**: Built on Supabase for real-time capabilities

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Backend-as-a-Service**: Supabase

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- Supabase account and project
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd uttarakhand-properties-backend
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and keys
3. Copy the SQL migrations from `supabase/migrations/` and run them in your Supabase SQL editor

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL="https://your-project-ref.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Server Configuration
PORT=5000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### 4. Database Setup

1. Run the initial schema migration in your Supabase SQL editor:
   ```sql
   -- Copy and paste the contents of supabase/migrations/create_initial_schema.sql
   ```

2. Run the seed data migration:
   ```sql
   -- Copy and paste the contents of supabase/migrations/seed_sample_data.sql
   ```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Sign Up (Create Admin)
- **POST** `/api/auth/signup`
- **Body**: `{ "email": "admin@example.com", "password": "password123", "name": "Admin Name" }`
- **Response**: User details

#### Login
- **POST** `/api/auth/login`
- **Body**: `{ "email": "admin@example.com", "password": "password123" }`
- **Response**: JWT token and user details

### Plot Endpoints

#### Public Endpoints
- **GET** `/api/plots` - Get published plots (with pagination and filters)
- **GET** `/api/plots/:slug` - Get single plot by slug

#### Admin Endpoints (Require Authentication)
- **GET** `/api/plots/admin/all` - Get all plots including drafts
- **POST** `/api/plots` - Create new plot
- **PUT** `/api/plots/:slug` - Update plot
- **DELETE** `/api/plots/:slug` - Delete plot

### Inquiry Endpoints

#### Public Endpoints
- **POST** `/api/inquiries` - Submit new inquiry

#### Admin Endpoints (Require Authentication)
- **GET** `/api/inquiries` - Get all inquiries
- **PUT** `/api/inquiries/:id` - Update inquiry status
- **DELETE** `/api/inquiries/:id` - Delete inquiry

### Query Parameters

#### Plots
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `location`: Filter by location
- `min_price`: Minimum price filter
- `max_price`: Maximum price filter
- `published`: Filter by published status (admin only)

#### Inquiries
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `status`: Filter by status (NEW, CONTACTED, CLOSED)
- `plotId`: Filter by specific plot

## 🔐 Authentication

The API uses Supabase Auth with JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🗃️ Database Schema

### Tables

#### plots
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text, unique)
- `description` (text)
- `location` (text)
- `price` (decimal)
- `size_sqyd` (integer)
- `is_published` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### plot_images
- `id` (uuid, primary key)
- `url` (text)
- `plot_id` (uuid, foreign key)

#### inquiries
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `phone` (text)
- `message` (text)
- `status` (enum: NEW, CONTACTED, CLOSED)
- `plot_id` (uuid, optional foreign key)
- `created_at` (timestamp)

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Public users can view published plots and submit inquiries
- Authenticated users (admins) can manage all data
- Proper foreign key relationships and cascading deletes

## 🧪 Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Generate TypeScript types from Supabase (optional)
npm run db:types
```

### Project Structure

```
src/
├── api/
│   ├── auth/           # Authentication endpoints
│   ├── plots/          # Plot management endpoints
│   └── inquiries/      # Inquiry management endpoints
├── config/
│   └── supabase.ts     # Supabase client configuration
├── middlewares/
│   ├── auth.middleware.ts      # Supabase Auth middleware
│   ├── validation.middleware.ts # Input validation
│   └── errorHandler.middleware.ts # Error handling
├── app.ts              # Express app configuration
└── server.ts           # Server startup

supabase/
└── migrations/         # SQL migration files
    ├── create_initial_schema.sql
    └── seed_sample_data.sql
```

## 🛡️ Security Features

- **Supabase Auth**: Built-in authentication with JWT tokens
- **Row Level Security**: Database-level security policies
- **Helmet**: Sets various HTTP security headers
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Supabase handles parameterized queries

## 📈 Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure your production Supabase project
3. Set up proper CORS origins
4. Use HTTPS in production
5. Configure Supabase Auth settings for your domain
6. Set up proper RLS policies for your use case

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `CORS_ORIGIN` | Allowed CORS origins | No (default: http://localhost:3000) |

## 🌟 Supabase Features Used

- **Database**: PostgreSQL with automatic API generation
- **Authentication**: Built-in user management and JWT tokens
- **Row Level Security**: Database-level access control
- **Real-time**: Ready for real-time subscriptions (can be added)
- **Storage**: Ready for file uploads (can be integrated)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.