import { NestFactory } from '@nestjs/core';
import { cities, countries, courses } from './schemas/schema';
import { AppModule } from '../../app.module';
import { DrizzleService } from './drizzle.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const drizzle = app.get(DrizzleService);

  console.log('🌱 Seeding database...');

  const insertedCountries = await drizzle.db
    .insert(countries)
    .values([
      { nameEn: 'Egypt', nameAr: 'مصر' },
      { nameEn: 'Germany', nameAr: 'ألمانيا' },
      { nameEn: 'Japan', nameAr: 'اليابان' },
    ])
    .returning();

  const insertedCities = await drizzle.db
    .insert(cities)
    .values([
      {
        nameEn: 'Cairo',
        nameAr: 'القاهرة',
        countryId: insertedCountries[0].id,
      },
      {
        nameEn: 'Alexandria',
        nameAr: 'الإسكندرية',
        countryId: insertedCountries[0].id,
      },
      { nameEn: 'Berlin', nameAr: 'برلين', countryId: insertedCountries[1].id },
      {
        nameEn: 'Munich',
        nameAr: 'ميونيخ',
        countryId: insertedCountries[1].id,
      },
      { nameEn: 'Tokyo', nameAr: 'طوكيو', countryId: insertedCountries[2].id },
      { nameEn: 'Osaka', nameAr: 'أوساكا', countryId: insertedCountries[2].id },
      { nameEn: 'Aswan', nameAr: 'أسوان', countryId: insertedCountries[0].id },
      { nameEn: 'Kyoto', nameAr: 'كيوتو', countryId: insertedCountries[2].id },
    ])
    .returning();

  const getRandom = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const courseData = Array.from({ length: 12 }, (_, i) => {
    const country = getRandom(insertedCountries);
    const city = getRandom(
      insertedCities.filter((c) => c.countryId === country.id),
    );

    return {
      title: `Course ${i + 1}`,
      description: `Description for course ${i + 1}`,
      startDate: new Date(Date.now() + Math.floor(Math.random() * 1000000000))
        .toISOString()
        .split('T')[0],
      price: Math.floor(Math.random() * 1000 + 100),
      countryId: country.id,
      cityId: city.id,
    };
  });

  await drizzle.db.insert(courses).values(courseData);

  console.log('✅ Seeding complete!');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});
