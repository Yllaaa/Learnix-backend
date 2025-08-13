import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { cities } from './cities';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helpers';

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nameAr: text('name_ar').notNull(),
  nameEn: text('name_en').notNull(),
  iso: text('iso').notNull(),
  ...timestamps,
});

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));
