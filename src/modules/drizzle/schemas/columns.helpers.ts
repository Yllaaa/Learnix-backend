import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  createdAt: timestamp('created_at').defaultNow().notNull(),
};
