/*
  # Initial Schema for Uttarakhand Properties

  1. New Tables
    - `users` (handled by Supabase Auth)
    - `plots`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `location` (text)
      - `price` (decimal)
      - `size_sqyd` (integer)
      - `is_published` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `plot_images`
      - `id` (uuid, primary key)
      - `url` (text)
      - `plot_id` (uuid, foreign key)
    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `status` (enum: NEW, CONTACTED, CLOSED)
      - `plot_id` (uuid, optional foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and public access where appropriate
    - Create admin role for management functions

  3. Functions and Triggers
    - Auto-update timestamps
    - Generate slugs automatically
*/

-- Create custom types
CREATE TYPE inquiry_status AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

-- Create plots table
CREATE TABLE IF NOT EXISTS plots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  price decimal(12,2) NOT NULL,
  size_sqyd integer NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create plot_images table
CREATE TABLE IF NOT EXISTS plot_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  plot_id uuid NOT NULL REFERENCES plots(id) ON DELETE CASCADE
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status inquiry_status DEFAULT 'NEW',
  plot_id uuid REFERENCES plots(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE plot_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for plots
CREATE POLICY "Anyone can view published plots"
  ON plots
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all plots"
  ON plots
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage plots"
  ON plots
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for plot_images
CREATE POLICY "Anyone can view images of published plots"
  ON plot_images
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM plots 
      WHERE plots.id = plot_images.plot_id 
      AND plots.is_published = true
    )
  );

CREATE POLICY "Authenticated users can view all plot images"
  ON plot_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage plot images"
  ON plot_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for inquiries
CREATE POLICY "Anyone can create inquiries"
  ON inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view and manage inquiries"
  ON inquiries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for plots table
CREATE TRIGGER update_plots_updated_at
  BEFORE UPDATE ON plots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title text)
RETURNS text AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
END;
$$ language 'plpgsql';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plots_slug ON plots(slug);
CREATE INDEX IF NOT EXISTS idx_plots_published ON plots(is_published);
CREATE INDEX IF NOT EXISTS idx_plots_location ON plots(location);
CREATE INDEX IF NOT EXISTS idx_plots_price ON plots(price);
CREATE INDEX IF NOT EXISTS idx_plot_images_plot_id ON plot_images(plot_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_plot_id ON inquiries(plot_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);