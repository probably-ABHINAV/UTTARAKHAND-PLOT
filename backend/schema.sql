-- ==============================================
-- Property in Uttrakhand - Complete Database Schema
-- ==============================================

-- Drop existing tables if they exist (use with caution in production)
DROP TABLE IF EXISTS password_resets CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS calculator_results CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS inquiry_follow_ups CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS plot_images CASCADE;
DROP TABLE IF EXISTS plot_amenities CASCADE;
DROP TABLE IF EXISTS amenities CASCADE;
DROP TABLE IF EXISTS plot_documents CASCADE;
DROP TABLE IF EXISTS plots CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ==============================================
-- USERS TABLE
-- ==============================================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  profile_image VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ==============================================
-- ADMINS TABLE
-- ==============================================
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  permissions JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_is_active ON admins(is_active);

-- ==============================================
-- LOCATIONS TABLE
-- ==============================================
CREATE TABLE locations (
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
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_district ON locations(district);
CREATE INDEX idx_locations_is_featured ON locations(is_featured);

-- ==============================================
-- CATEGORIES TABLE
-- ==============================================
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);

-- ==============================================
-- AMENITIES TABLE
-- ==============================================
CREATE TABLE amenities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ==============================================
-- PLOTS TABLE
-- ==============================================
CREATE TABLE plots (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
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
  boundary_wall BOOLEAN DEFAULT FALSE,
  water_connection BOOLEAN DEFAULT FALSE,
  electricity_connection BOOLEAN DEFAULT FALSE,
  nearby_places JSONB,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  legal_status VARCHAR(100),
  registry_type VARCHAR(100),
  ownership_type VARCHAR(100),
  gated_community BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  featured_until TIMESTAMP,
  created_by INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_plots_slug ON plots(slug);
CREATE INDEX idx_plots_location_id ON plots(location_id);
CREATE INDEX idx_plots_category_id ON plots(category_id);
CREATE INDEX idx_plots_status ON plots(status);
CREATE INDEX idx_plots_total_price ON plots(total_price);
CREATE INDEX idx_plots_is_featured ON plots(is_featured);
CREATE INDEX idx_plots_created_at ON plots(created_at);

-- ==============================================
-- PLOT IMAGES TABLE
-- ==============================================
CREATE TABLE plot_images (
  id SERIAL PRIMARY KEY,
  plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_plot_images_plot_id ON plot_images(plot_id);
CREATE INDEX idx_plot_images_is_primary ON plot_images(is_primary);

-- ==============================================
-- PLOT AMENITIES TABLE (Many-to-Many)
-- ==============================================
CREATE TABLE plot_amenities (
  id SERIAL PRIMARY KEY,
  plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  amenity_id INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(plot_id, amenity_id)
);

CREATE INDEX idx_plot_amenities_plot_id ON plot_amenities(plot_id);
CREATE INDEX idx_plot_amenities_amenity_id ON plot_amenities(amenity_id);

-- ==============================================
-- PLOT DOCUMENTS TABLE
-- ==============================================
CREATE TABLE plot_documents (
  id SERIAL PRIMARY KEY,
  plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  document_url VARCHAR(500) NOT NULL,
  file_size INTEGER,
  uploaded_by INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_plot_documents_plot_id ON plot_documents(plot_id);
CREATE INDEX idx_plot_documents_document_type ON plot_documents(document_type);

-- ==============================================
-- INQUIRIES TABLE
-- ==============================================
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  plot_id INTEGER REFERENCES plots(id) ON DELETE SET NULL,
  location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  priority VARCHAR(50) DEFAULT 'medium',
  source VARCHAR(50),
  budget_min DECIMAL(12, 2),
  budget_max DECIMAL(12, 2),
  preferred_size_min INTEGER,
  preferred_size_max INTEGER,
  preferred_locations JSONB,
  assigned_to INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  follow_up_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_plot_id ON inquiries(plot_id);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_assigned_to ON inquiries(assigned_to);
CREATE INDEX idx_inquiries_priority ON inquiries(priority);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);

-- ==============================================
-- INQUIRY FOLLOW UPS TABLE
-- ==============================================
CREATE TABLE inquiry_follow_ups (
  id SERIAL PRIMARY KEY,
  inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  follow_up_type VARCHAR(50) NOT NULL,
  notes TEXT NOT NULL,
  next_follow_up TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiry_follow_ups_inquiry_id ON inquiry_follow_ups(inquiry_id);
CREATE INDEX idx_inquiry_follow_ups_admin_id ON inquiry_follow_ups(admin_id);

-- ==============================================
-- CONTACT MESSAGES TABLE
-- ==============================================
CREATE TABLE contact_messages (
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
  replied_by INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- ==============================================
-- CALCULATOR RESULTS TABLE
-- ==============================================
CREATE TABLE calculator_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  plot_size INTEGER NOT NULL,
  purchase_price DECIMAL(12, 2) NOT NULL,
  appreciation_rate DECIMAL(5, 2) NOT NULL,
  years INTEGER NOT NULL,
  future_value DECIMAL(12, 2) NOT NULL,
  total_return DECIMAL(12, 2) NOT NULL,
  roi_percentage DECIMAL(5, 2),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_calculator_results_user_id ON calculator_results(user_id);
CREATE INDEX idx_calculator_results_session_id ON calculator_results(session_id);
CREATE INDEX idx_calculator_results_created_at ON calculator_results(created_at);

-- ==============================================
-- BLOG POSTS TABLE
-- ==============================================
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  tags JSONB,
  meta_title VARCHAR(255),
  meta_description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_is_featured ON blog_posts(is_featured);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);

-- ==============================================
-- NOTIFICATIONS TABLE
-- ==============================================
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_admin_id ON notifications(admin_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ==============================================
-- ACTIVITY LOGS TABLE
-- ==============================================
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INTEGER,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_admin_id ON activity_logs(admin_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- ==============================================
-- SESSIONS TABLE
-- ==============================================
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  token VARCHAR(500) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_admin_id ON sessions(admin_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- ==============================================
-- PASSWORD RESETS TABLE
-- ==============================================
CREATE TABLE password_resets (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_password_resets_email ON password_resets(email);
CREATE INDEX idx_password_resets_token ON password_resets(token);
CREATE INDEX idx_password_resets_expires_at ON password_resets(expires_at);

-- ==============================================
-- TRIGGERS FOR AUTOMATIC UPDATED_AT
-- ==============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plots_updated_at BEFORE UPDATE ON plots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- TRIGGER TO UPDATE PLOTS COUNT IN LOCATIONS
-- ==============================================
CREATE OR REPLACE FUNCTION update_location_plots_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE locations SET total_plots = total_plots + 1 WHERE id = NEW.location_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE locations SET total_plots = total_plots - 1 WHERE id = OLD.location_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.location_id != OLD.location_id THEN
        UPDATE locations SET total_plots = total_plots - 1 WHERE id = OLD.location_id;
        UPDATE locations SET total_plots = total_plots + 1 WHERE id = NEW.location_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER plots_location_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON plots
FOR EACH ROW EXECUTE FUNCTION update_location_plots_count();

-- ==============================================
-- TRIGGER TO UPDATE INQUIRIES COUNT IN PLOTS
-- ==============================================
CREATE OR REPLACE FUNCTION update_plot_inquiries_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.plot_id IS NOT NULL THEN
        UPDATE plots SET inquiries_count = inquiries_count + 1 WHERE id = NEW.plot_id;
    ELSIF TG_OP = 'DELETE' AND OLD.plot_id IS NOT NULL THEN
        UPDATE plots SET inquiries_count = inquiries_count - 1 WHERE id = OLD.plot_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER inquiries_plot_count_trigger
AFTER INSERT OR DELETE ON inquiries
FOR EACH ROW EXECUTE FUNCTION update_plot_inquiries_count();

-- ==============================================
-- SAMPLE DATA
-- ==============================================

-- Insert sample locations
INSERT INTO locations (name, slug, district, description, latitude, longitude, average_price_per_sqyd, is_featured) VALUES
('Mussoorie', 'mussoorie', 'Dehradun', 'Queen of Hills - Premium hill station', 30.4598, 78.0644, 2200.00, true),
('Nainital', 'nainital', 'Nainital', 'Beautiful lake city in Kumaon', 29.3803, 79.4636, 2500.00, true),
('Rishikesh', 'rishikesh', 'Dehradun', 'Yoga capital and adventure hub', 30.0869, 78.2676, 1800.00, true),
('Dehradun', 'dehradun', 'Dehradun', 'Capital city with modern amenities', 30.3165, 78.0322, 1500.00, true),
('Badripur', 'badripur', 'Dehradun', 'Peaceful residential area', 30.3280, 78.0400, 1200.00, false),
('Ganeshpur', 'ganeshpur', 'Dehradun', 'Growing residential locality', 30.3350, 78.0450, 1300.00, false);

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Residential', 'residential', 'Residential plots for homes', 'home'),
('Commercial', 'commercial', 'Commercial plots for business', 'building'),
('Agricultural', 'agricultural', 'Agricultural land', 'tractor'),
('Hill View', 'hill-view', 'Plots with mountain views', 'mountain'),
('Lake View', 'lake-view', 'Plots near lakes', 'water');

-- Insert sample amenities
INSERT INTO amenities (name, icon, description) VALUES
('Electricity', 'zap', '24/7 electricity connection'),
('Water Supply', 'droplet', 'Municipal water supply'),
('Road Access', 'road', 'Paved road access'),
('Security', 'shield', '24/7 security'),
('Garden', 'tree', 'Common garden area'),
('Street Lights', 'lamp', 'Street lighting'),
('Sewage', 'pipe', 'Sewage connection'),
('Park', 'park', 'Nearby park');

-- Insert sample admin (password: admin123 - hash this in production!)
INSERT INTO admins (email, password, name, role, permissions) VALUES 
('admin@propertyinuttrakhand.com', '$2b$10$YourHashedPasswordHere', 'Admin User', 'super_admin', '["all"]');

-- Insert sample plots
INSERT INTO plots (title, slug, location_id, category_id, plot_number, area, price_per_sq_yd, total_price, description, status, facing, is_featured, is_verified) VALUES
('Premium Hill View Plot', 'premium-hill-view-plot-mussoorie', 1, 4, 'MSR-001', 2500, 1800.00, 4500000.00, 'Beautiful hill view plot in Mussoorie with excellent connectivity', 'available', 'North', true, true),
('Lake View Residential Plot', 'lake-view-residential-plot-nainital', 2, 5, 'NTL-002', 3000, 2200.00, 6600000.00, 'Prime location near Nainital Lake with stunning views', 'available', 'East', true, true),
('Valley View Land', 'valley-view-land-rishikesh', 3, 1, 'RKH-003', 5000, 1500.00, 7500000.00, 'Peaceful valley view land in Rishikesh, perfect for retreat', 'available', 'South', false, true);

-- ==============================================
-- VIEWS FOR ANALYTICS
-- ==============================================

CREATE OR REPLACE VIEW plot_statistics AS
SELECT 
  l.name as location_name,
  COUNT(p.id) as total_plots,
  COUNT(CASE WHEN p.status = 'available' THEN 1 END) as available_plots,
  COUNT(CASE WHEN p.status = 'sold' THEN 1 END) as sold_plots,
  COUNT(CASE WHEN p.status = 'reserved' THEN 1 END) as reserved_plots,
  AVG(p.total_price) as avg_price,
  MIN(p.total_price) as min_price,
  MAX(p.total_price) as max_price
FROM locations l
LEFT JOIN plots p ON l.id = p.location_id
GROUP BY l.id, l.name;

CREATE OR REPLACE VIEW inquiry_statistics AS
SELECT 
  DATE(i.created_at) as inquiry_date,
  COUNT(*) as total_inquiries,
  COUNT(CASE WHEN i.status = 'new' THEN 1 END) as new_inquiries,
  COUNT(CASE WHEN i.status = 'contacted' THEN 1 END) as contacted_inquiries,
  COUNT(CASE WHEN i.status = 'converted' THEN 1 END) as converted_inquiries,
  COUNT(CASE WHEN i.status = 'closed' THEN 1 END) as closed_inquiries
FROM inquiries i
GROUP BY DATE(i.created_at)
ORDER BY inquiry_date DESC;
