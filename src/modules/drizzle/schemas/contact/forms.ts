import { pgTable, text, serial, boolean } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helpers';

export const joinUsForm = pgTable('join_us_form', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  is_resolved: boolean('is_resolved').default(false).notNull(),
  ...timestamps,
});

export const waitListForm = pgTable('wait_list_form', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  is_resolved: boolean('is_resolved').default(false).notNull(),
  ...timestamps,
});
