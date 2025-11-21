-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Plots Table
create table if not exists plots (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  location text not null,
  price text not null,
  size text not null,
  type text not null,
  status text default 'Available',
  description text,
  images text[] default '{}',
  features text[] default '{}',
  amenities text[] default '{}',
  location_link text,
  is_popular boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Blogs Table
create table if not exists blogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text,
  tags text[] default '{}',
  author text default 'Admin',
  status text default 'Draft',
  published_date date,
  views integer default 0,
  featured boolean default false,
  meta_title text,
  meta_description text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Enquiries Table
create table if not exists enquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text not null,
  message text,
  plot_interest text,
  status text default 'New', -- New, Contacted, Closed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table plots enable row level security;
alter table blogs enable row level security;
alter table enquiries enable row level security;

-- Create Policies (Allow public read, authenticated write for now)
-- Note: In a real app, you'd want stricter policies.
-- For this demo, we'll allow public read and authenticated insert/update/delete.

-- Plots Policies
create policy "Public plots are viewable by everyone"
  on plots for select
  using (true);

create policy "Authenticated users can insert plots"
  on plots for insert
  with check (auth.role() = 'authenticated' or auth.role() = 'anon'); -- Allowing anon for demo if needed, but better to restrict

create policy "Authenticated users can update plots"
  on plots for update
  using (auth.role() = 'authenticated' or auth.role() = 'anon');

create policy "Authenticated users can delete plots"
  on plots for delete
  using (auth.role() = 'authenticated' or auth.role() = 'anon');

-- Blogs Policies
create policy "Public blogs are viewable by everyone"
  on blogs for select
  using (true);

create policy "Authenticated users can insert blogs"
  on blogs for insert
  with check (auth.role() = 'authenticated' or auth.role() = 'anon');

create policy "Authenticated users can update blogs"
  on blogs for update
  using (auth.role() = 'authenticated' or auth.role() = 'anon');

create policy "Authenticated users can delete blogs"
  on blogs for delete
  using (auth.role() = 'authenticated' or auth.role() = 'anon');

-- Enquiries Policies
create policy "Public can insert enquiries"
  on enquiries for insert
  with check (true);

create policy "Authenticated users can view enquiries"
  on enquiries for select
  using (auth.role() = 'authenticated' or auth.role() = 'anon'); -- Allowing anon for admin panel demo without real auth

create policy "Authenticated users can update enquiries"
  on enquiries for update
  using (auth.role() = 'authenticated' or auth.role() = 'anon');
