import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { cities } from './cities';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  nameAr: text('name_ar').notNull(),
  nameEn: text('name_en').notNull(),
  ...timestamps,
});

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));
