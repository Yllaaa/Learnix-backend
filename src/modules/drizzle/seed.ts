import { NestFactory } from '@nestjs/core';
import {
  cities,
  countries,
  courses,
  courseCategories,
  courseTrainers,
  trainers,
} from './schemas/schema';
import { AppModule } from '../../app.module';
import { DrizzleService } from './drizzle.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const drizzle = app.get(DrizzleService);

  console.log('🗑️ Deleting existing data...');
  await drizzle.db.delete(courseTrainers).execute(); // Delete join table first
  await drizzle.db.delete(courses).execute();
  await drizzle.db.delete(trainers).execute();
  await drizzle.db.delete(cities).execute();
  await drizzle.db.delete(countries).execute();
  await drizzle.db.delete(courseCategories).execute();

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
    ])
    .returning();

  const insertedCategories = await drizzle.db
    .insert(courseCategories)
    .values([
      {
        nameEn: 'Web Development',
        nameAr: 'تطوير الويب',
        descriptionEn: 'Learn how to build websites and web applications.',
        descriptionAr: 'تعلم كيفية بناء مواقع الويب وتطبيقات الويب.',
      },
      {
        nameEn: 'Data Science',
        nameAr: 'علوم البيانات',
        descriptionEn: 'Explore data analysis, machine learning, and AI.',
        descriptionAr: 'استكشف تحليل البيانات والتعلم الآلي والذكاء الاصطناعي.',
      },
      {
        nameEn: 'Digital Marketing',
        nameAr: 'التسويق الرقمي',
        descriptionEn: 'Master online marketing strategies and tools.',
        descriptionAr: 'اتقن استراتيجيات وأدوات التسويق عبر الإنترنت.',
      },
      {
        nameEn: 'Graphic Design',
        nameAr: 'تصميم الجرافيك',
        descriptionEn:
          'Learn the principles of design and how to use design software.',
        descriptionAr: 'تعلم مبادئ التصميم وكيفية استخدام برامج التصميم.',
      },
      {
        nameEn: 'Cybersecurity',
        nameAr: 'الأمن السيبراني',
        descriptionEn:
          'Understand the fundamentals of cybersecurity and how to protect systems.',
        descriptionAr: 'فهم أساسيات الأمن السيبراني وكيفية حماية الأنظمة.',
      },
    ])
    .returning();

  const insertedTrainers = await drizzle.db
    .insert(trainers)
    .values([
      {
        nameEn: 'Ahmed Hassan',
        nameAr: 'أحمد حسن',
        titleEn: 'Senior Full-Stack Developer',
        titleAr: 'مطور برمجيات كامل أول',
        linkedIn: 'https://linkedin.com/in/ahmed-hassan-dev',
      },
      {
        nameEn: 'Sarah Johnson',
        nameAr: 'سارة جونسون',
        titleEn: 'Data Science Expert',
        titleAr: 'خبيرة علوم البيانات',
        linkedIn: 'https://linkedin.com/in/sarah-johnson-ds',
      },
      {
        nameEn: 'Mohamed Ali',
        nameAr: 'محمد علي',
        titleEn: 'Digital Marketing Specialist',
        titleAr: 'أخصائي التسويق الرقمي',
        linkedIn: 'https://linkedin.com/in/mohamed-ali-marketing',
      },
      {
        nameEn: 'Lisa Chen',
        nameAr: 'ليزا تشين',
        titleEn: 'UI/UX Designer & Creative Director',
        titleAr: 'مصممة واجهات ومديرة إبداعية',
        linkedIn: 'https://linkedin.com/in/lisa-chen-design',
      },
      {
        nameEn: 'Omar Khaled',
        nameAr: 'عمر خالد',
        titleEn: 'Cybersecurity Consultant',
        titleAr: 'مستشار الأمن السيبراني',
        linkedIn: 'https://linkedin.com/in/omar-khaled-security',
      },
      {
        nameEn: 'Emma Wilson',
        nameAr: 'إيما ويلسون',
        titleEn: 'Frontend Development Lead',
        titleAr: 'قائدة تطوير الواجهات الأمامية',
        linkedIn: 'https://linkedin.com/in/emma-wilson-frontend',
      },
      {
        nameEn: 'Yuki Tanaka',
        nameAr: 'يوكي تاناكا',
        titleEn: 'Machine Learning Engineer',
        titleAr: 'مهندس التعلم الآلي',
        linkedIn: 'https://linkedin.com/in/yuki-tanaka-ml',
      },
      {
        nameEn: 'Fatima Al-Zahra',
        nameAr: 'فاطمة الزهراء',
        titleEn: 'Social Media Marketing Expert',
        titleAr: 'خبيرة التسويق عبر وسائل التواصل الاجتماعي',
        linkedIn: 'https://linkedin.com/in/fatima-alzahra-smm',
      },
    ])
    .returning();

  const getRandom = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const coursesByCategory = {
    'Web Development': [
      'React.js Bootcamp',
      'Mastering HTML & CSS',
      'Fullstack with NestJS',
    ],
    'Data Science': [
      'Intro to Python & Pandas',
      'Machine Learning Basics',
      'Deep Learning with TensorFlow',
    ],
    'Digital Marketing': [
      'SEO Fundamentals',
      'Google Ads Mastery',
      'Social Media Marketing',
    ],
    'Graphic Design': [
      'Photoshop for Beginners',
      'UI/UX Design',
      'Logo Design Workshop',
    ],
    Cybersecurity: [
      'Network Security Essentials',
      'Ethical Hacking 101',
      'Penetration Testing',
    ],
  };

  const descriptions = {
    'Web Development':
      'A hands-on course to build web apps using modern technologies.',
    'Data Science':
      'Dive into data analysis, modeling, and visualization techniques.',
    'Digital Marketing':
      'Learn digital channels, analytics, and growth strategies.',
    'Graphic Design':
      'Develop design thinking and technical skills with tools.',
    Cybersecurity: 'Understand security threats and how to defend systems.',
  };

  const priceRange = {
    'Web Development': [300, 600],
    'Data Science': [400, 800],
    'Digital Marketing': [250, 500],
    'Graphic Design': [200, 450],
    Cybersecurity: [500, 900],
  };

  const trainersByCategory = {
    'Web Development': [
      insertedTrainers.find((t) => t.nameEn === 'Ahmed Hassan'),
      insertedTrainers.find((t) => t.nameEn === 'Emma Wilson'),
    ].filter(Boolean),
    'Data Science': [
      insertedTrainers.find((t) => t.nameEn === 'Sarah Johnson'),
      insertedTrainers.find((t) => t.nameEn === 'Yuki Tanaka'),
    ].filter(Boolean),
    'Digital Marketing': [
      insertedTrainers.find((t) => t.nameEn === 'Mohamed Ali'),
      insertedTrainers.find((t) => t.nameEn === 'Fatima Al-Zahra'),
    ].filter(Boolean),
    'Graphic Design': [
      insertedTrainers.find((t) => t.nameEn === 'Lisa Chen'),
    ].filter(Boolean),
    Cybersecurity: [
      insertedTrainers.find((t) => t.nameEn === 'Omar Khaled'),
    ].filter(Boolean),
  };

  const courseData = insertedCategories.flatMap((category) => {
    const titles =
      coursesByCategory[category.nameEn as keyof typeof coursesByCategory];
    const categoryTrainers = trainersByCategory[
      category.nameEn as keyof typeof trainersByCategory
    ] as typeof insertedTrainers;

    return titles.map((title) => {
      const country = getRandom(insertedCountries);
      const city = getRandom(
        insertedCities.filter((c) => c.countryId === country.id),
      );
      const [min, max] = priceRange[category.nameEn as keyof typeof priceRange];
      const price = Math.floor(Math.random() * (max - min) + min);
      const startDate = new Date();
      startDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 90 + 10),
      );

      return {
        titleEn: title,
        titleAr: `دورة ${title}`,
        descriptionEn:
          descriptions[category.nameEn as keyof typeof descriptions],
        descriptionAr: `وصف ${category.nameAr} باللغة العربية.`,
        startDate: startDate.toISOString().split('T')[0],
        price,
        countryId: country.id,
        cityId: city.id,
        categoryId: category.id,
        trainers: categoryTrainers, // Save for next step
      };
    });
  });

  // Insert courses and map trainers separately
  const insertedCourses = await drizzle.db
    .insert(courses)
    .values(courseData.map(({ trainers, ...course }) => course))
    .returning();

  // Link trainers to courses
  const courseTrainerRecords = insertedCourses.flatMap((course, index) => {
    const trainers = courseData[index].trainers;
    return trainers.map((trainer) => ({
      courseId: course.id,
      trainerId: trainer!.id,
    }));
  });

  await drizzle.db.insert(courseTrainers).values(courseTrainerRecords);

  console.log(`✅ Inserted ${insertedTrainers.length} trainers.`);
  console.log(`✅ Inserted ${insertedCourses.length} courses.`);
  console.log(
    `✅ Linked ${courseTrainerRecords.length} course-trainer records.`,
  );

  await app.close();
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});
