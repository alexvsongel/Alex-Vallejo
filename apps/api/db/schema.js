import {
  pgTable,
  boolean,
  serial,
  text,
  varchar,
  date,
  timestamp,
  integer
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  banned: boolean('banned'),
  banReason: text('banReason'),
  banExpires: timestamp('banExpires'),
  role: text('role').default('user'),
  createdAt: timestamp('createdAt', {withTimezone: true}).notNull(),
  updatedAt: timestamp('updatedAt', {withTimezone: true}).notNull()
});

export const session = pgTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: timestamp('expiresAt', {withTimezone: true}).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt', {withTimezone: true}).notNull(),
  updatedAt: timestamp('updatedAt', {withTimezone: true}).notNull(),
  impersonatedBy: text('impersonatedBy'),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id)
});

export const account = pgTable('account', {
  id: text('id').notNull().primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', {
    withTimezone: true
  }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', {
    withTimezone: true
  }),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt', {withTimezone: true}).notNull(),
  updatedAt: timestamp('updatedAt', {withTimezone: true}).notNull()
});

export const verification = pgTable('verification', {
  id: text('id').notNull().primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt', {withTimezone: true}).notNull(),
  createdAt: timestamp('createdAt', {withTimezone: true}),
  updatedAt: timestamp('updatedAt', {withTimezone: true})
});

export const calendar = pgTable('calendar', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  start_date: date('start_date').notNull(),
  hour: varchar('hour', {length: 50}).notNull(),
  location: text('location'),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const suggestions = pgTable('suggestions', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  title: text('title').notNull(),
  start_date: date('start_date').notNull(),
  hour: varchar('hour', {length: 50}).notNull(),
  location: text('location'),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  file_name: varchar('file_name', {length: 255}).notNull(),
  file_url: text('file_url').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});
