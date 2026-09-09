import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(), html: text('html').notNull(), revision: integer('revision').notNull(),
  savedAt: text('saved_at').notNull(), savedBy: text('saved_by').notNull(),
});
export const revisions = sqliteTable('revisions', {
  revision: integer('revision').primaryKey(), html: text('html').notNull(),
  savedAt: text('saved_at').notNull(), savedBy: text('saved_by').notNull(),
});
export const members = sqliteTable('members', {
  userId: text('user_id').primaryKey(), email: text('email').notNull(),
  role: text('role').notNull(), joinedAt: text('joined_at').notNull(),
});
export const images = sqliteTable('images', {
  key: text('key').primaryKey(), name: text('name').notNull(), bytes: integer('bytes').notNull(),
  type: text('type').notNull(), uploadedBy: text('uploaded_by').notNull(), uploadedAt: text('uploaded_at').notNull(),
});
