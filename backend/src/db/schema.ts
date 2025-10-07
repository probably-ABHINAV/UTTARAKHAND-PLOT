
import { pgTable, serial, varchar, text, timestamp, integer, boolean, decimal, jsonb, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  phoneVerified: boolean('phone_verified').default(false),
  profileImage: varchar('profile_image', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Admins Table
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  permissions: jsonb('permissions').default([]),
  isActive: boolean('is_active').default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Locations Table
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  state: varchar('state', { length: 100 }).notNull().default('Uttarakhand'),
  district: varchar('district', { length: 100 }).notNull(),
  description: text('description'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  averagePricePerSqyd: decimal('average_price_per_sqyd', { precision: 10, scale: 2 }),
  totalPlots: integer('total_plots').default(0),
  imageUrl: varchar('image_url', { length: 500 }),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Categories Table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Amenities Table
export const amenities = pgTable('amenities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  icon: varchar('icon', { length: 100 }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Plots Table
export const plots = pgTable('plots', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  locationId: integer('location_id').references(() => locations.id),
  categoryId: integer('category_id').references(() => categories.id),
  plotNumber: varchar('plot_number', { length: 50 }).unique(),
  area: integer('area').notNull(),
  pricePerSqYd: decimal('price_per_sq_yd', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
  description: text('description'),
  features: jsonb('features'),
  status: varchar('status', { length: 50 }).notNull().default('available'),
  dimensions: varchar('dimensions', { length: 100 }),
  facing: varchar('facing', { length: 50 }),
  roadWidth: integer('road_width'),
  boundaryWall: boolean('boundary_wall').default(false),
  waterConnection: boolean('water_connection').default(false),
  electricityConnection: boolean('electricity_connection').default(false),
  nearbyPlaces: jsonb('nearby_places'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  legalStatus: varchar('legal_status', { length: 100 }),
  registryType: varchar('registry_type', { length: 100 }),
  ownershipType: varchar('ownership_type', { length: 100 }),
  gatedCommunity: boolean('gated_community').default(false),
  viewsCount: integer('views_count').default(0),
  inquiriesCount: integer('inquiries_count').default(0),
  isFeatured: boolean('is_featured').default(false),
  isVerified: boolean('is_verified').default(false),
  featuredUntil: timestamp('featured_until'),
  createdBy: integer('created_by').references(() => admins.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Plot Images Table
export const plotImages = pgTable('plot_images', {
  id: serial('id').primaryKey(),
  plotId: integer('plot_id').notNull().references(() => plots.id, { onDelete: 'cascade' }),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
  title: varchar('title', { length: 255 }),
  displayOrder: integer('display_order').default(0),
  isPrimary: boolean('is_primary').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Plot Amenities Table (Many-to-Many)
export const plotAmenities = pgTable('plot_amenities', {
  id: serial('id').primaryKey(),
  plotId: integer('plot_id').notNull().references(() => plots.id, { onDelete: 'cascade' }),
  amenityId: integer('amenity_id').notNull().references(() => amenities.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  plotAmenityIdx: uniqueIndex('plot_amenity_idx').on(table.plotId, table.amenityId),
}));

// Plot Documents Table
export const plotDocuments = pgTable('plot_documents', {
  id: serial('id').primaryKey(),
  plotId: integer('plot_id').notNull().references(() => plots.id, { onDelete: 'cascade' }),
  documentType: varchar('document_type', { length: 100 }).notNull(),
  documentName: varchar('document_name', { length: 255 }).notNull(),
  documentUrl: varchar('document_url', { length: 500 }).notNull(),
  fileSize: integer('file_size'),
  uploadedBy: integer('uploaded_by').references(() => admins.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Inquiries Table
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  userId: integer('user_id').references(() => users.id),
  plotId: integer('plot_id').references(() => plots.id),
  locationId: integer('location_id').references(() => locations.id),
  message: text('message'),
  status: varchar('status', { length: 50 }).notNull().default('new'),
  priority: varchar('priority', { length: 50 }).default('medium'),
  source: varchar('source', { length: 50 }),
  budgetMin: decimal('budget_min', { precision: 12, scale: 2 }),
  budgetMax: decimal('budget_max', { precision: 12, scale: 2 }),
  preferredSizeMin: integer('preferred_size_min'),
  preferredSizeMax: integer('preferred_size_max'),
  preferredLocations: jsonb('preferred_locations'),
  assignedTo: integer('assigned_to').references(() => admins.id),
  followUpDate: timestamp('follow_up_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Inquiry Follow Ups Table
export const inquiryFollowUps = pgTable('inquiry_follow_ups', {
  id: serial('id').primaryKey(),
  inquiryId: integer('inquiry_id').notNull().references(() => inquiries.id, { onDelete: 'cascade' }),
  adminId: integer('admin_id').references(() => admins.id),
  followUpType: varchar('follow_up_type', { length: 50 }).notNull(),
  notes: text('notes').notNull(),
  nextFollowUp: timestamp('next_follow_up'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Contact Messages Table
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('new'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  repliedAt: timestamp('replied_at'),
  repliedBy: integer('replied_by').references(() => admins.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Calculator Results Table
export const calculatorResults = pgTable('calculator_results', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  sessionId: varchar('session_id', { length: 255 }),
  location: varchar('location', { length: 255 }).notNull(),
  plotSize: integer('plot_size').notNull(),
  purchasePrice: decimal('purchase_price', { precision: 12, scale: 2 }).notNull(),
  appreciationRate: decimal('appreciation_rate', { precision: 5, scale: 2 }).notNull(),
  years: integer('years').notNull(),
  futureValue: decimal('future_value', { precision: 12, scale: 2 }).notNull(),
  totalReturn: decimal('total_return', { precision: 12, scale: 2 }).notNull(),
  roiPercentage: decimal('roi_percentage', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog Posts Table
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featuredImage: varchar('featured_image', { length: 500 }),
  authorId: integer('author_id').references(() => admins.id),
  categoryId: integer('category_id').references(() => categories.id),
  tags: jsonb('tags'),
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  viewsCount: integer('views_count').default(0),
  isFeatured: boolean('is_featured').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Notifications Table
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  adminId: integer('admin_id').references(() => admins.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  data: jsonb('data'),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Activity Logs Table
export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  adminId: integer('admin_id').references(() => admins.id),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entity_type', { length: 100 }),
  entityId: integer('entity_id'),
  description: text('description'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Sessions Table
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  adminId: integer('admin_id').references(() => admins.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Password Resets Table
export const passwordResets = pgTable('password_resets', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  token: varchar('token', { length: 500 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  used: boolean('used').default(false),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;
export type Location = typeof locations.$inferSelect;
export type NewLocation = typeof locations.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Amenity = typeof amenities.$inferSelect;
export type NewAmenity = typeof amenities.$inferInsert;
export type Plot = typeof plots.$inferSelect;
export type NewPlot = typeof plots.$inferInsert;
export type PlotImage = typeof plotImages.$inferSelect;
export type NewPlotImage = typeof plotImages.$inferInsert;
export type PlotAmenity = typeof plotAmenities.$inferSelect;
export type NewPlotAmenity = typeof plotAmenities.$inferInsert;
export type PlotDocument = typeof plotDocuments.$inferSelect;
export type NewPlotDocument = typeof plotDocuments.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type InquiryFollowUp = typeof inquiryFollowUps.$inferSelect;
export type NewInquiryFollowUp = typeof inquiryFollowUps.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
export type CalculatorResult = typeof calculatorResults.$inferSelect;
export type NewCalculatorResult = typeof calculatorResults.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type PasswordReset = typeof passwordResets.$inferSelect;
export type NewPasswordReset = typeof passwordResets.$inferInsert;
