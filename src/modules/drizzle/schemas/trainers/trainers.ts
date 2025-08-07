import { pgTable, text, serial, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';
import { courseTrainers } from '../schema';

export const trainers = pgTable('trainers', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameAr: text('name_ar').notNull(),
  titleEn: text('title_en').notNull(),
  titleAr: text('title_ar').notNull(),
  linkedIn: text('linked_in'),
  picture: text('picture'),
  leadWeekend: boolean('lead_weekend').default(false).notNull(),
  ...timestamps,
});

export const trainersRelations = relations(trainers, ({ one, many }) => ({
  courses: many(courseTrainers),
}));
