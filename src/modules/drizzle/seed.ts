import { NestFactory } from '@nestjs/core';
import {
  cities,
  countries,
  courses,
  courseCategories,
  courseTrainers,
  trainers,
  curriculums,
  leadWeekendApplicants,
  categories,
  courseOutcomes,
} from './schemas/schema';
import { AppModule } from '../../app.module';
import { DrizzleService } from './drizzle.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const drizzle = app.get(DrizzleService);

  console.log('🗑️ Deleting existing data...');
  await drizzle.db.delete(courseTrainers).execute();
  await drizzle.db.delete(courseCategories).execute();
  await drizzle.db.delete(courseOutcomes).execute();
  await drizzle.db.delete(curriculums).execute();
  await drizzle.db.delete(courses).execute();
  await drizzle.db.delete(leadWeekendApplicants).execute();
  await drizzle.db.delete(trainers).execute();
  await drizzle.db.delete(categories).execute();
  await drizzle.db.delete(cities).execute();
  await drizzle.db.delete(countries).execute();

  console.log('🌱 Seeding database...');

  const insertedCountries = await drizzle.db
    .insert(countries)
    .values([
      { name: 'Egypt', nameEn: 'Egypt', nameAr: 'مصر', iso: 'EG' },
      { name: 'Germany', nameEn: 'Germany', nameAr: 'ألمانيا', iso: 'DE' },
      { name: 'Japan', nameEn: 'Japan', nameAr: 'اليابان', iso: 'JP' },
    ])
    .returning();

  const insertedCities = await drizzle.db
    .insert(cities)
    .values([
      {
        name: 'Cairo',
        nameEn: 'Cairo',
        nameAr: 'القاهرة',
        countryId: insertedCountries[0].id,
        cityPicture:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/960px-Paris_-_Eiffelturm_und_Marsfeld2.jpg',
      },
      {
        name: 'Alexandria',
        nameEn: 'Alexandria',
        nameAr: 'الإسكندرية',
        countryId: insertedCountries[0].id,
        cityPicture:
          'https://www.egiptoexclusivo.com/wp-content/uploads/2023/06/corniche-alejandria.jpg',
      },
      {
        name: 'Berlin',
        nameEn: 'Berlin',
        nameAr: 'برلين',
        countryId: insertedCountries[1].id,
        cityPicture:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/960px-Paris_-_Eiffelturm_und_Marsfeld2.jpg',
      },
      {
        name: 'Munich',
        nameEn: 'Munich',
        nameAr: 'ميونيخ',
        countryId: insertedCountries[1].id,
        cityPicture:
          'https://www.egiptoexclusivo.com/wp-content/uploads/2023/06/corniche-alejandria.jpg',
      },
      {
        name: 'Tokyo',
        nameEn: 'Tokyo',
        nameAr: 'طوكيو',
        countryId: insertedCountries[2].id,
        cityPicture:
          'https://www.egiptoexclusivo.com/wp-content/uploads/2023/06/corniche-alejandria.jpg',
      },
      {
        name: 'Osaka',
        nameEn: 'Osaka',
        nameAr: 'أوساكا',
        countryId: insertedCountries[2].id,
        cityPicture:
          'https://www.egiptoexclusivo.com/wp-content/uploads/2023/06/corniche-alejandria.jpg',
      },
    ])
    .returning();

  const insertedCategories = await drizzle.db
    .insert(categories)
    .values([
      {
        name: 'Web Development',
        nameEn: 'Web Development',
        nameAr: 'تطوير الويب',
        descriptionEn: 'Learn how to build websites and web applications.',
        descriptionAr: 'تعلم كيفية بناء مواقع الويب وتطبيقات الويب.',
      },
      {
        name: 'Mobile Development',
        nameEn: 'Data Science',
        nameAr: 'علوم البيانات',
        descriptionEn: 'Explore data analysis, machine learning, and AI.',
        descriptionAr: 'استكشف تحليل البيانات والتعلم الآلي والذكاء الاصطناعي.',
      },
      {
        name: 'Digital Marketing',
        nameEn: 'Digital Marketing',
        nameAr: 'التسويق الرقمي',
        descriptionEn: 'Master online marketing strategies and tools.',
        descriptionAr: 'اتقن استراتيجيات وأدوات التسويق عبر الإنترنت.',
      },
      {
        name: 'Graphic Design',
        nameEn: 'Graphic Design',
        nameAr: 'تصميم الجرافيك',
        descriptionEn:
          'Learn the principles of design and how to use design software.',
        descriptionAr: 'تعلم مبادئ التصميم وكيفية استخدام برامج التصميم.',
      },
      {
        name: 'Cybersecurity',
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
        name: 'Mostafa Adel',
        nameEn: 'Mostafa Adel',
        nameAr: 'مصطفى عادل',
        titleEn: 'Frontend Developer',
        titleAr: 'مطور واجهات أمامية',
        linkedIn: 'https://linkedin.com/in/mostafa-adel-dev',
        trainerPicture:
          'https://yllaaa.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FmoustafaAdel.af36deb9.png&w=2048&q=75',
      },
      {
        name: 'Ahmed Hassan',
        nameEn: 'Ahmed Hassan',
        nameAr: 'أحمد حسن',
        titleEn: 'Backend Developer',
        titleAr: 'مطور خلفية',
        linkedIn: 'https://linkedin.com/in/ahmed-hassan-dev',
        trainerPicture:
          'https://yllaaa.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FmoustafaAdel.af36deb9.png&w=2048&q=75',
      },
      {
        name: 'Yehya Abdelhamed',
        nameEn: 'Yehya Abdelhamed',
        nameAr: 'يحيى عبد الحميد',
        titleEn: 'SEO Specialist',
        titleAr: 'خبير تحسين محركات البحث',
        linkedIn: 'https://linkedin.com/in/yehya-abdelhamed',
        trainerPicture:
          'https://yllaaa.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FyehiaAbdelhamed.464f2bb7.png&w=2048&q=75',
      },
      {
        name: 'Lisa Chen',
        nameEn: 'Lisa Chen',
        nameAr: 'ليسا تشين',
        titleEn: 'UI/UX Designer & Creative Director',
        titleAr: 'مصممة واجهات ومديرة إبداعية',
        linkedIn: 'https://linkedin.com/in/lisa-chen-design',
        trainerPicture:
          'https://yllaaa.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FyehiaAbdelhamed.464f2bb7.png&w=2048&q=75',
      },
      {
        name: 'Omar Khaled',
        nameEn: 'Omar Khaled',
        nameAr: 'عمر خالد',
        titleEn: 'Cybersecurity Consultant',
        titleAr: 'مستشار الأمن السيبراني',
        linkedIn: 'https://linkedin.com/in/omar-khaled-security',
      },
      {
        name: 'Sarah Johnson',
        nameEn: 'Sarah Johnson',
        nameAr: 'سارة جونسون',
        titleEn: 'Data Scientist',
        titleAr: 'عالمة بيانات',
        linkedIn: 'https://linkedin.com/in/sarah-johnson-data',
      },
      {
        name: 'Mohamed Ali',
        nameEn: 'Mohamed Ali',
        nameAr: 'محمد علي',
        titleEn: 'Digital Marketing Specialist',
        titleAr: 'أخصائي تسويق رقمي',
        linkedIn: 'https://linkedin.com/in/mohamed-ali-marketing',
      },
      {
        name: 'Yuki Tanaka',
        nameEn: 'Yuki Tanaka',
        nameAr: 'يوكي تاناكا',
        titleEn: 'Machine Learning Engineer',
        titleAr: 'مهندس تعلم آلي',
        linkedIn: 'https://linkedin.com/in/yuki-tanaka-ml',
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
      insertedTrainers.find((t) => t.nameEn === 'Mostafa Adel'),
      insertedTrainers.find((t) => t.nameEn === 'Ahmed Hassan'),
    ].filter(Boolean),
    'Data Science': [
      insertedTrainers.find((t) => t.nameEn === 'Sarah Johnson'),
      insertedTrainers.find((t) => t.nameEn === 'Yuki Tanaka'),
    ].filter(Boolean),
    'Digital Marketing': [
      insertedTrainers.find((t) => t.nameEn === 'Mohamed Ali'),
      insertedTrainers.find((t) => t.nameEn === 'Yehya Abdelhamed'),
    ].filter(Boolean),
    'Graphic Design': [
      insertedTrainers.find((t) => t.nameEn === 'Lisa Chen'),
    ].filter(Boolean),
    Cybersecurity: [
      insertedTrainers.find((t) => t.nameEn === 'Omar Khaled'),
    ].filter(Boolean),
  };

  // Add outcomes by category
  const outcomesByCategory = {
    'Web Development': [
      {
        titleEn: 'Build Responsive Websites',
        titleAr: 'بناء مواقع ويب متجاوبة',
        descriptionEn:
          'Create modern, responsive websites that work on all devices.',
        descriptionAr: 'إنشاء مواقع ويب حديثة ومتجاوبة تعمل على جميع الأجهزة.',
      },
      {
        titleEn: 'Master Modern JavaScript',
        titleAr: 'إتقان جافا سكريبت الحديثة',
        descriptionEn:
          'Understand ES6+ features and modern JavaScript development patterns.',
        descriptionAr: 'فهم ميزات ES6+ وأنماط تطوير جافا سكريبت الحديثة.',
      },
      {
        titleEn: 'Deploy Applications',
        titleAr: 'نشر التطبيقات',
        descriptionEn:
          'Learn how to deploy and host web applications in production.',
        descriptionAr: 'تعلم كيفية نشر واستضافة تطبيقات الويب في الإنتاج.',
      },
    ],
    'Data Science': [
      {
        titleEn: 'Analyze Complex Data',
        titleAr: 'تحليل البيانات المعقدة',
        descriptionEn:
          'Extract insights from large datasets using statistical methods.',
        descriptionAr:
          'استخراج الرؤى من مجموعات البيانات الكبيرة باستخدام الأساليب الإحصائية.',
      },
      {
        titleEn: 'Build Machine Learning Models',
        titleAr: 'بناء نماذج التعلم الآلي',
        descriptionEn:
          'Create and train machine learning models for real-world problems.',
        descriptionAr: 'إنشاء وتدريب نماذج التعلم الآلي لمشاكل العالم الحقيقي.',
      },
      {
        titleEn: 'Visualize Data Effectively',
        titleAr: 'تصور البيانات بفعالية',
        descriptionEn:
          'Create compelling data visualizations to communicate findings.',
        descriptionAr: 'إنشاء تصورات بيانات ملهمة للتواصل مع النتائج.',
      },
    ],
    'Digital Marketing': [
      {
        titleEn: 'Increase Brand Visibility',
        titleAr: 'زيادة رؤية العلامة التجارية',
        descriptionEn:
          'Boost your brand presence across digital channels and platforms.',
        descriptionAr:
          'تعزيز حضور علامتك التجارية عبر القنوات والمنصات الرقمية.',
      },
      {
        titleEn: 'Generate Qualified Leads',
        titleAr: 'توليد عملاء محتملين مؤهلين',
        descriptionEn:
          'Attract and convert high-quality leads for your business.',
        descriptionAr: 'جذب وتحويل عملاء محتملين عاليي الجودة لعملك.',
      },
      {
        titleEn: 'Optimize Marketing ROI',
        titleAr: 'تحسين عائد الاستثمار في التسويق',
        descriptionEn:
          'Maximize your marketing budget with data-driven strategies.',
        descriptionAr:
          'تعظيم ميزانية التسويق الخاصة بك مع استراتيجيات قائمة على البيانات.',
      },
    ],
    'Graphic Design': [
      {
        titleEn: 'Create Professional Designs',
        titleAr: 'إنشاء تصاميم احترافية',
        descriptionEn:
          'Design logos, branding materials, and marketing assets.',
        descriptionAr: 'تصميم الشعارات، مواد العلامة التجارية، وأصول التسويق.',
      },
      {
        titleEn: 'Master Design Software',
        titleAr: 'إتقان برامج التصميم',
        descriptionEn:
          'Become proficient in industry-standard design tools like Adobe Creative Suite.',
        descriptionAr:
          'أن تصبح ماهراً في أدوات التصميم القياسية في الصناعة مثل Adobe Creative Suite.',
      },
      {
        titleEn: 'Develop Design Thinking',
        titleAr: 'تطوير التفكير التصميمي',
        descriptionEn:
          'Apply design principles to solve creative and business problems.',
        descriptionAr: 'تطبيق مبادئ التصميم لحل المشاكل الإبداعية والأعمال.',
      },
    ],
    Cybersecurity: [
      {
        titleEn: 'Identify Security Threats',
        titleAr: 'تحديد التهديدات الأمنية',
        descriptionEn:
          'Recognize and analyze potential security vulnerabilities and threats.',
        descriptionAr: 'التعرف وتحليل الثغرات والأمان المحتملة والتهديدات.',
      },
      {
        titleEn: 'Implement Security Measures',
        titleAr: 'تنفيذ تدابير الأمان',
        descriptionEn:
          'Deploy effective security controls to protect systems and data.',
        descriptionAr:
          'نشر عناصر تحكم الأمان الفعالة لحماية الأنظمة والبيانات.',
      },
      {
        titleEn: 'Respond to Security Incidents',
        titleAr: 'الاستجابة للحوادث الأمنية',
        descriptionEn:
          'Handle security breaches and implement incident response procedures.',
        descriptionAr:
          'التعامل مع انتهاكات الأمان وتنفيذ إجراءات الاستجابة للحوادث.',
      },
    ],
  };

  const curriculumsByCourse = {
    'React.js Bootcamp': [
      {
        nameEn: 'React Fundamentals',
        nameAr: 'أساسيات رياكت',
        descriptionEn: 'Learn React components, state, and props.',
        descriptionAr: 'تعلم مكونات رياكت والحالة والخصائص.',
      },
      {
        nameEn: 'Advanced React Patterns',
        nameAr: 'أنماط رياكت المتقدمة',
        descriptionEn: 'Explore hooks, context, and performance optimization.',
        descriptionAr: 'استكشف الهوكس والسياق وتحسين الأداء.',
      },
    ],
    'Mastering HTML & CSS': [
      {
        nameEn: 'HTML Essentials',
        nameAr: 'أساسيات HTML',
        descriptionEn: 'Understand semantic HTML and document structure.',
        descriptionAr: 'فهم HTML الدلالي وبنية الوثيقة.',
      },
      {
        nameEn: 'CSS Mastery',
        nameAr: 'إتقان CSS',
        descriptionEn: 'Master layouts, flexbox, and responsive design.',
        descriptionAr: 'إتقان التخطيطات، فليكسبوكس، والتصميم المتجاوب.',
      },
    ],
    'Fullstack with NestJS': [
      {
        nameEn: 'Backend with NestJS',
        nameAr: 'الخلفية مع NestJS',
        descriptionEn: 'Build RESTful APIs with NestJS and TypeScript.',
        descriptionAr: 'بناء واجهات برمجية مع NestJS وتايب سكريبت.',
      },
      {
        nameEn: 'Frontend Integration',
        nameAr: 'تكامل الواجهة الأمامية',
        descriptionEn: 'Connect frontend with backend services.',
        descriptionAr: 'ربط الواجهة الأمامية بالخدمات الخلفية.',
      },
    ],
    'Intro to Python & Pandas': [
      {
        nameEn: 'Python Basics',
        nameAr: 'أساسيات بايثون',
        descriptionEn: 'Learn Python syntax and data structures.',
        descriptionAr: 'تعلم بنية بايثون وهياكل البيانات.',
      },
      {
        nameEn: 'Pandas for Data Analysis',
        nameAr: 'بانداس لتحليل البيانات',
        descriptionEn: 'Manipulate and analyze data with Pandas.',
        descriptionAr: 'معالجة وتحليل البيانات باستخدام بانداس.',
      },
    ],
    'Machine Learning Basics': [
      {
        nameEn: 'Supervised Learning',
        nameAr: 'التعلم الموجّه',
        descriptionEn: 'Understand regression and classification algorithms.',
        descriptionAr: 'فهم خوارزميات الانحدار والتصنيف.',
      },
      {
        nameEn: 'Model Evaluation',
        nameAr: 'تقييم النماذج',
        descriptionEn: 'Learn metrics and techniques for model performance.',
        descriptionAr: 'تعلم المقاييس وتقنيات أداء النماذج.',
      },
    ],
    'Deep Learning with TensorFlow': [
      {
        nameEn: 'Neural Networks',
        nameAr: 'الشبكات العصبية',
        descriptionEn: 'Build and train neural networks with TensorFlow.',
        descriptionAr: 'بناء وتدريب الشبكات العصبية باستخدام TensorFlow.',
      },
      {
        nameEn: 'Deep Learning Applications',
        nameAr: 'تطبيقات التعلم العميق',
        descriptionEn: 'Explore CNNs and RNNs for real-world problems.',
        descriptionAr:
          'استكشف الشبكات الالتفافية والتكرارية لمشاكل العالم الحقيقي.',
      },
    ],
    'SEO Fundamentals': [
      {
        nameEn: 'On-Page SEO',
        nameAr: 'تحسين محركات البحث على الصفحة',
        descriptionEn: 'Optimize content and metadata for search engines.',
        descriptionAr: 'تحسين المحتوى والبيانات الوصفية لمحركات البحث.',
      },
      {
        nameEn: 'Link Building',
        nameAr: 'بناء الروابط',
        descriptionEn: 'Strategies for acquiring quality backlinks.',
        descriptionAr: 'استراتيجيات للحصول على روابط خلفية عالية الجودة.',
      },
    ],
    'Google Ads Mastery': [
      {
        nameEn: 'Campaign Setup',
        nameAr: 'إعداد الحملات',
        descriptionEn: 'Create and optimize Google Ads campaigns.',
        descriptionAr: 'إنشاء وتحسين حملات جوجل الإعلانية.',
      },
      {
        nameEn: 'Ad Optimization',
        nameAr: 'تحسين الإعلانات',
        descriptionEn: 'Improve ad performance with targeting and analytics.',
        descriptionAr: 'تحسين أداء الإعلانات باستخدام الاستهداف والتحليلات.',
      },
    ],
    'Social Media Marketing': [
      {
        nameEn: 'Content Strategy',
        nameAr: 'استراتيجية المحتوى',
        descriptionEn: 'Develop engaging content for social platforms.',
        descriptionAr: 'تطوير محتوى جذاب لمنصات التواصل الاجتماعي.',
      },
      {
        nameEn: 'Analytics & Growth',
        nameAr: 'التحليلات والنمو',
        descriptionEn: 'Measure and boost social media performance.',
        descriptionAr: 'قياس وتعزيز أداء وسائل التواصل الاجتماعي.',
      },
    ],
    'Photoshop for Beginners': [
      {
        nameEn: 'Photoshop Basics',
        nameAr: 'أساسيات فوتوشوب',
        descriptionEn: 'Learn Photoshop tools and interface.',
        descriptionAr: 'تعلم أدوات فوتوشوب وواجهة المستخدم.',
      },
      {
        nameEn: 'Image Editing',
        nameAr: 'تحرير الصور',
        descriptionEn: 'Master photo editing and manipulation techniques.',
        descriptionAr: 'إتقان تقنيات تحرير ومعالجة الصور.',
      },
    ],
    'UI/UX Design': [
      {
        nameEn: 'User Research',
        nameAr: 'بحث المستخدم',
        descriptionEn: 'Conduct user research and create personas.',
        descriptionAr: 'إجراء بحث المستخدم وإنشاء شخصيات.',
      },
      {
        nameEn: 'Prototyping',
        nameAr: 'النمذجة',
        descriptionEn: 'Design wireframes and interactive prototypes.',
        descriptionAr: 'تصميم إطارات سلكية ونماذج تفاعلية.',
      },
    ],
    'Logo Design Workshop': [
      {
        nameEn: 'Branding Principles',
        nameAr: 'مبادئ العلامة التجارية',
        descriptionEn: 'Understand branding and logo design concepts.',
        descriptionAr: 'فهم مفاهيم العلامة التجارية وتصميم الشعار.',
      },
      {
        nameEn: 'Logo Creation',
        nameAr: 'إنشاء الشعار',
        descriptionEn: 'Create professional logos with design tools.',
        descriptionAr: 'إنشاء شعارات احترافية باستخدام أدوات التصميم.',
      },
    ],
    'Network Security Essentials': [
      {
        nameEn: 'Network Fundamentals',
        nameAr: 'أساسيات الشبكات',
        descriptionEn: 'Learn network protocols and security basics.',
        descriptionAr: 'تعلم بروتوكولات الشبكة وأساسيات الأمان.',
      },
      {
        nameEn: 'Threat Mitigation',
        nameAr: 'تخفيف التهديدات',
        descriptionEn: 'Implement strategies to secure networks.',
        descriptionAr: 'تنفيذ استراتيجيات لتأمين الشبكات.',
      },
    ],
    'Ethical Hacking 101': [
      {
        nameEn: 'Hacking Basics',
        nameAr: 'أساسيات القرصنة الأخلاقية',
        descriptionEn: 'Understand ethical hacking techniques and tools.',
        descriptionAr: 'فهم تقنيات وأدوات القرصنة الأخلاقية.',
      },
      {
        nameEn: 'Vulnerability Assessment',
        nameAr: 'تقييم الثغرات',
        descriptionEn: 'Identify and assess system vulnerabilities.',
        descriptionAr: 'تحديد وتقييم ثغرات النظام.',
      },
    ],
    'Penetration Testing': [
      {
        nameEn: 'Penetration Testing Tools',
        nameAr: 'أدوات اختبار الاختراق',
        descriptionEn: 'Use tools like Metasploit for penetration testing.',
        descriptionAr: 'استخدام أدوات مثل Metasploit لاختبار الاختراق.',
      },
      {
        nameEn: 'Reporting & Ethics',
        nameAr: 'التقارير والأخلاقيات',
        descriptionEn: 'Learn reporting and ethical considerations.',
        descriptionAr: 'تعلم التقارير والاعتبارات الأخلاقية.',
      },
    ],
  };

  // Create courses without category assignment
  const courseData = Object.entries(coursesByCategory).flatMap(
    ([categoryName, titles]) => {
      const category = insertedCategories.find(
        (c) => c.nameEn === categoryName,
      );
      const categoryTrainers = trainersByCategory[
        categoryName as keyof typeof trainersByCategory
      ] as typeof insertedTrainers;
      const categoryOutcomes = outcomesByCategory[
        categoryName as keyof typeof outcomesByCategory
      ] as any[];

      return titles.map((title) => {
        const country = getRandom(insertedCountries);
        const city = getRandom(
          insertedCities.filter((c) => c.countryId === country.id),
        );
        const [min, max] = priceRange[categoryName as keyof typeof priceRange];
        const price = Math.floor(Math.random() * (max - min) + min);
        const startDate = new Date();
        startDate.setDate(
          startDate.getDate() + Math.floor(Math.random() * 90 + 10),
        );

        return {
          titleEn: title,
          titleAr: `دورة ${title}`,
          descriptionEn:
            descriptions[categoryName as keyof typeof descriptions],
          descriptionAr: `وصف ${category?.nameAr || categoryName} باللغة العربية.`,
          startDate: startDate.toISOString().split('T')[0],
          price,
          cityId: city.id,
          categoryId: category?.id,
          trainers: categoryTrainers,
          categoryName,
          outcomes: categoryOutcomes,
        };
      });
    },
  );

  const insertedCourses = await drizzle.db
    .insert(courses)
    .values(
      courseData.map(({ trainers, categoryName, outcomes, ...course }) => ({
        name: course.titleEn,
        titleEn: course.titleEn,
        titleAr: course.titleAr,
        descriptionEn: course.descriptionEn,
        descriptionAr: course.descriptionAr,
        startDate: course.startDate,
        price: course.price,
        cityId: course.cityId,
      })),
    )
    .returning();

  // Create course-category relationships (many-to-many)
  const courseCategoryRecords = insertedCourses
    .map((course, index) => {
      const originalCourseData = courseData[index];
      const category = insertedCategories.find(
        (c) => c.nameEn === originalCourseData.categoryName,
      );
      return {
        courseId: course.id,
        categoryId: category?.id,
      };
    })
    .filter((record) => record.categoryId);

  if (courseCategoryRecords.length > 0) {
    await drizzle.db.insert(courseCategories).values(courseCategoryRecords);
  }

  // Create course-trainer relationships
  const courseTrainerRecords = insertedCourses.flatMap((course, index) => {
    const trainers = courseData[index].trainers;
    return trainers.map((trainer) => ({
      courseId: course.id,
      trainerId: trainer.id,
    }));
  });

  if (courseTrainerRecords.length > 0) {
    await drizzle.db.insert(courseTrainers).values(courseTrainerRecords);
  }

  // Create course outcomes
  const outcomeRecords = insertedCourses.flatMap((course, index) => {
    const outcomes = courseData[index].outcomes;
    return outcomes.map((outcome) => ({
      ...outcome,
      courseId: course.id,
    }));
  });

  if (outcomeRecords.length > 0) {
    await drizzle.db.insert(courseOutcomes).values(outcomeRecords);
  }

  // Create curriculums
  const curriculumRecords = insertedCourses.flatMap((course, index) => {
    const courseTitle = courseData[index].titleEn;
    const curriculumsForCourse =
      curriculumsByCourse[courseTitle as keyof typeof curriculumsByCourse] ||
      [];
    return curriculumsForCourse.map((curriculum) => ({
      ...curriculum,
      courseId: course.id,
    }));
  });

  if (curriculumRecords.length > 0) {
    await drizzle.db.insert(curriculums).values(curriculumRecords);
  }

  console.log(`✅ Inserted ${insertedCountries.length} countries.`);
  console.log(`✅ Inserted ${insertedCities.length} cities.`);
  console.log(`✅ Inserted ${insertedCategories.length} categories.`);
  console.log(`✅ Inserted ${insertedTrainers.length} trainers.`);
  console.log(`✅ Inserted ${insertedCourses.length} courses.`);
  console.log(
    `✅ Linked ${courseCategoryRecords.length} course-category records.`,
  );
  console.log(
    `✅ Linked ${courseTrainerRecords.length} course-trainer records.`,
  );
  console.log(`✅ Inserted ${outcomeRecords.length} course outcomes.`);
  console.log(`✅ Inserted ${curriculumRecords.length} curriculums.`);

  await app.close();
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});
