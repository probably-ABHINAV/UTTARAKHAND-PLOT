-- Uttarakhand Properties Database Schema
-- Complete SQL schema for Supabase

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  profile_image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  permissions JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Locations Table
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  state VARCHAR(100) NOT NULL DEFAULT 'Uttarakhand',
  district VARCHAR(100) NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  average_price_per_sqyd DECIMAL(10, 2),
  total_plots INTEGER DEFAULT 0,
  image_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Amenities Table
CREATE TABLE IF NOT EXISTS amenities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Plots Table
CREATE TABLE IF NOT EXISTS plots (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  location_id INTEGER REFERENCES locations(id),
  category_id INTEGER REFERENCES categories(id),
  plot_number VARCHAR(50) UNIQUE,
  area INTEGER NOT NULL,
  price_per_sq_yd DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  description TEXT,
  features JSONB,
  status VARCHAR(50) NOT NULL DEFAULT 'available',
  dimensions VARCHAR(100),
  facing VARCHAR(50),
  road_width INTEGER,
  boundary_wall BOOLEAN DEFAULT false,
  water_connection BOOLEAN DEFAULT false,
  electricity_connection BOOLEAN DEFAULT false,
  nearby_places JSONB,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  legal_status VARCHAR(100),
  registry_type VARCHAR(100),
  ownership_type VARCHAR(100),
  gated_community BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  featured_until TIMESTAMP,
  created_by INTEGER REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Plot Images Table
CREATE TABLE IF NOT EXISTS plot_images (
  id SERIAL PRIMARY KEY,
  plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Plot Amenities Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS plot_amenities (
  id SERIAL PRIMARY KEY,
  plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  amenity_id INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT plot_amenity_unique UNIQUE(plot_id, amenity_id)
);

-- Plot Documents Table
CREATE TABLE IF NOT EXISTS plot_documents (
  id SERIAL PRIMARY KEY,
  plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  document_url VARCHAR(500) NOT NULL,
  file_size INTEGER,
  uploaded_by INTEGER REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  plot_id INTEGER REFERENCES plots(id),
  location_id INTEGER REFERENCES locations(id),
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  priority VARCHAR(50) DEFAULT 'medium',
  source VARCHAR(50),
  budget_min DECIMAL(12, 2),
  budget_max DECIMAL(12, 2),
  preferred_size_min INTEGER,
  preferred_size_max INTEGER,
  preferred_locations JSONB,
  assigned_to INTEGER REFERENCES admins(id),
  follow_up_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Inquiry Follow Ups Table
CREATE TABLE IF NOT EXISTS inquiry_follow_ups (
  id SERIAL PRIMARY KEY,
  inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id),
  follow_up_type VARCHAR(50) NOT NULL,
  notes TEXT NOT NULL,
  next_follow_up TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  ip_address VARCHAR(45),
  user_agent TEXT,
  replied_at TIMESTAMP,
  replied_by INTEGER REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Calculator Results Table
CREATE TABLE IF NOT EXISTS calculator_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  session_id VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  plot_size INTEGER NOT NULL,
  purchase_price DECIMAL(12, 2) NOT NULL,
  appreciation_rate DECIMAL(5, 2) NOT NULL,
  years INTEGER NOT NULL,
  future_value DECIMAL(12, 2) NOT NULL,
  total_return DECIMAL(12, 2) NOT NULL,
  roi_percentage DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author_id INTEGER REFERENCES admins(id),
  category_id INTEGER REFERENCES categories(id),
  tags JSONB,
  meta_title VARCHAR(255),
  meta_description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  admin_id INTEGER REFERENCES admins(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INTEGER,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  token VARCHAR(500) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Password Resets Table
CREATE TABLE IF NOT EXISTS password_resets (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT false,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_plots_slug ON plots(slug);
CREATE INDEX IF NOT EXISTS idx_plots_location ON plots(location_id);
CREATE INDEX IF NOT EXISTS idx_plots_status ON plots(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
