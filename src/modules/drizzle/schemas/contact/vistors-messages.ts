import { pgTable, text, serial, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helpers';

export const vistorsMessagesStatus = pgEnum(
  'lead_weekends_applications_status',
  ['pending', 'resolved', 'reopened'],
);

export const vistorMessages = pgTable('vistor_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: vistorsMessagesStatus('status').default('pending').notNull(),
  ...timestamps,
});
