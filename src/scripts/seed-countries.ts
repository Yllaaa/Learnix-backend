import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { countries } from 'src/modules/drizzle/schemas/schema';
import countryList from './country-list.json';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
});

async function main() {
  await client.connect();
  const db = drizzle(client);

  console.log('Seeding countries...');

  try {
    console.log(`🌱 Seeding ${countryList.length} countries...`);
    const countryRecords = countryList.map((country) => ({
      name: country.nameEn,
      nameAr: country.nameAr,
      nameEn: country.nameEn,
      iso: country.iso,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.insert(countries).values(countryRecords);
    console.log(`✅ Successfully seeded ${countryRecords.length} countries.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await client.end();
  }
}

main();
