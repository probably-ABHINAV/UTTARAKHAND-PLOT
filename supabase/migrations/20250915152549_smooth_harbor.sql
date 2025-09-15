/*
  # Seed Sample Data

  1. Sample Plots
    - Create sample property listings with images
    - Mix of published and draft properties

  2. Sample Inquiries
    - Create sample customer inquiries
    - Different status types
*/

-- Insert sample plots
INSERT INTO plots (title, slug, description, location, price, size_sqyd, is_published) VALUES
(
  'Premium Plot in Dehradun Hills',
  'premium-plot-dehradun-hills',
  'Beautiful residential plot with mountain views, perfect for your dream home. Located in a peaceful area with excellent connectivity to the city center.',
  'Dehradun, Uttarakhand',
  2500000.00,
  200,
  true
),
(
  'Commercial Plot Near Haridwar',
  'commercial-plot-haridwar',
  'Ideal location for commercial development with excellent connectivity. Perfect for retail stores, offices, or mixed-use development.',
  'Haridwar, Uttarakhand',
  5000000.00,
  500,
  true
),
(
  'Scenic Plot in Nainital',
  'scenic-plot-nainital',
  'Breathtaking views of the lake and mountains. This premium plot offers the perfect opportunity to build your vacation home in the hills.',
  'Nainital, Uttarakhand',
  3500000.00,
  300,
  true
),
(
  'Agricultural Land in Rudrapur',
  'agricultural-land-rudrapur',
  'Fertile agricultural land suitable for farming or future development. Well-connected with proper road access and water supply.',
  'Rudrapur, Uttarakhand',
  1500000.00,
  1000,
  false
);

-- Insert sample plot images
INSERT INTO plot_images (url, plot_id) VALUES
(
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  (SELECT id FROM plots WHERE slug = 'premium-plot-dehradun-hills')
),
(
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
  (SELECT id FROM plots WHERE slug = 'premium-plot-dehradun-hills')
),
(
  'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
  (SELECT id FROM plots WHERE slug = 'commercial-plot-haridwar')
),
(
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
  (SELECT id FROM plots WHERE slug = 'scenic-plot-nainital')
),
(
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  (SELECT id FROM plots WHERE slug = 'scenic-plot-nainital')
);

-- Insert sample inquiries
INSERT INTO inquiries (name, email, phone, message, status, plot_id) VALUES
(
  'Rajesh Kumar',
  'rajesh.kumar@email.com',
  '+91-9876543210',
  'I am interested in the premium plot in Dehradun. Could you please provide more details about the location and amenities?',
  'NEW',
  (SELECT id FROM plots WHERE slug = 'premium-plot-dehradun-hills')
),
(
  'Priya Sharma',
  'priya.sharma@email.com',
  '+91-9876543211',
  'Looking for commercial space in Haridwar. Is this plot suitable for a retail store?',
  'CONTACTED',
  (SELECT id FROM plots WHERE slug = 'commercial-plot-haridwar')
),
(
  'Amit Singh',
  'amit.singh@email.com',
  '+91-9876543212',
  'I would like to know more about properties available in Nainital area. Please contact me.',
  'NEW',
  NULL
),
(
  'Sunita Devi',
  'sunita.devi@email.com',
  '+91-9876543213',
  'The scenic plot in Nainital looks perfect for our vacation home. What are the payment terms?',
  'CLOSED',
  (SELECT id FROM plots WHERE slug = 'scenic-plot-nainital')
);