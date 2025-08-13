import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { countries } from './countries';
import { courses } from '../courses/courses';
import { timestamps } from '../columns.helpers';

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nameEn: text('name_en').notNull(),
  nameAr: text('name_ar').notNull(),
  cityPicture: text('city_picture'),
  countryId: serial('country_id')
    .notNull()
    .references(() => countries.id, {
      onDelete: 'cascade',
    }),
  ...timestamps,
});

export const citiesRelations = relations(cities, ({ one, many }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.id],
  }),
  courses: many(courses),
}));
