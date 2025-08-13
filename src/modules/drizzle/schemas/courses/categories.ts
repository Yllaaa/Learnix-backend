import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helpers';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nameEn: text('name_en').notNull(),
  nameAr: text('name_ar').notNull(),
  descriptionEn: text('description_en'),
  descriptionAr: text('description_ar'),
  ...timestamps,
});
