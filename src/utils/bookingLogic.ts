export type PackageCategory = 'all' | 'umrah' | 'hajj' | 'tourism';
export type SortOption = 'featured' | 'distance-asc' | 'rating-desc' | 'duration-desc';

export type SceneArtworkType =
  | 'makkah-haram'
  | 'madinah-nabawi'
  | 'mina-arafat'
  | 'alula-hegra'
  | 'diriyah-turaif'
  | 'redsea-ummahat'
  | 'abha-asir';

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<PackageCategory, 'all'>;
  categoryLabel: string;
  destinations: string[];
  durationDays: number;
  nightsSummary: string;
  tierBadge: string;
  distanceToHaramMeters: number | null;
  distanceLabel: string;
  hotelName: string;
  hotelStars: number;
  rating: number;
  reviewsCount: number;
  mealPlan: string;
  transportType: string;
  nusukPermitIncluded: boolean;
  artwork: SceneArtworkType;
  nextDeparture: string;
  remainingSeats: number;
  highlights: string[];
  itinerary: ItineraryDay[];
}

export interface SaudiDestinationSpotlight {
  id: string;
  name: string;
  tagline: string;
  region: string;
  bestSeason: string;
  artwork: SceneArtworkType;
  description: string;
  landmarks: string[];
  spiritualOrCulturalNote: string;
}

export interface BookingFormInput {
  fullName: string;
  passportOrId: string;
  phone: string;
  email: string;
  departureCity: string;
  departureDate: string;
  pilgrimsCount: number;
  roomOccupancy: 'double' | 'triple' | 'quad' | 'suite';
  notes?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingFormInput, string>>;
}

export interface ConfirmedBooking {
  reference: string;
  packageId: string;
  packageTitle: string;
  categoryLabel: string;
  fullName: string;
  passportOrId: string;
  phone: string;
  email: string;
  departureCity: string;
  departureDate: string;
  pilgrimsCount: number;
  roomOccupancyLabel: string;
  createdAt: string;
  status: 'مؤكد ومُصدر تصريح نسك' | 'قيد المراجعة النهائية';
}

export type HaramainStation = 'makkah' | 'jeddah-airport' | 'kaec' | 'madinah';

export interface HaramainRouteDetail {
  from: HaramainStation;
  to: HaramainStation;
  fromName: string;
  toName: string;
  durationMinutes: number;
  distanceKm: number;
  dailyTrips: number;
  departuresSample: string[];
  stationAmenities: string;
}

export interface RitualStep {
  id: string;
  order: number;
  title: string;
  location: string;
  summary: string;
  duaArabic: string;
  sunnahTip: string;
}

export interface MiqatInfo {
  id: string;
  name: string;
  modernName: string;
  direction: string;
  distanceToMakkahKm: number;
  forPilgrimsFrom: string;
}

export const SAUDI_DESTINATIONS: SaudiDestinationSpotlight[] = [
  {
    id: 'dest-makkah',
    name: 'مكة المكرمة',
    tagline: 'مهبط الوحي وقبلة المسلمين ومثابة الناس وأمنهم',
    region: 'منطقة مكة المكرمة',
    bestSeason: 'طوال العام · مواسم العمرة ورمضان والحج',
    artwork: 'makkah-haram',
    description:
      'تجمع رحلاتنا في مكة المكرمة بين الإقامة الفندقية المطلة مباشرة على صحن الكعبة المشرفة والزيارات الإثرائية لمعرض الوحي بحي حراء الثقافي، وغار ثور، ومتحف عمارة الحرمين الشريفين.',
    landmarks: ['المسجد الحرام والكعبة المشرفة', 'حي حراء الثقافي وجبل النور', 'المشاعر المقدسة (منى وعرفات ومزدلفة)', 'متحف برج الساعة الفلكي'],
    spiritualOrCulturalNote: 'تُصدر وكالة مقام تصاريح العمرة الفورية عبر منصة نسك مع مرافقة مرشدين شرعيين معتمدين.'
  },
  {
    id: 'dest-madinah',
    name: 'المدينة المنورة',
    tagline: 'طيبة الطيبة ومثوى المصطفى ﷺ ودار الهجرة النبوية',
    region: 'منطقة المدينة المنورة',
    bestSeason: 'طوال العام · أجواء روحانية هادئة',
    artwork: 'madinah-nabawi',
    description:
      'في رحاب المسجد النبوي الشريف ننظم لضيوفنا الإقامة في المنطقة المركزية الشمالية مع حجوزات مؤكدة للصلاة في الروضة الشريفة، وجولات ميدانية لمسجد قباء وشهداء أُحد وبستان المستظل.',
    landmarks: ['المسجد النبوي والروضة الشريفة', 'مسجد قباء (أول مسجد أُسس في الإسلام)', 'جبل الرماة وميدان شهداء أُحد', 'مجمع الملك فهد لطباعة المصحف الشريف'],
    spiritualOrCulturalNote: 'ترتبط المدينة المنورة بمكة المكرمة عبر قطار الحرمين السريع في رحلة تستغرق ساعتين وعشرين دقيقة فقط.'
  },
  {
    id: 'dest-alula',
    name: 'العُلا والحِجر',
    tagline: 'متحف حي تحت السماء يجمع حضارة الأنباط وسحر الصحراء',
    region: 'شمال غرب المملكة',
    bestSeason: 'أكتوبر إلى أبريل · موسم شتاء طنطورة وسماء العلا',
    artwork: 'alula-hegra',
    description:
      'أول موقع سعودي مسجل في قائمة التراث العالمي لليونسكو؛ حيث الواجهات الصخرية المنحوتة بدقة في الحِجر (مدائن صالح)، وصخرة جبل الفيل، وقاعة مرايا العاكسة لجمال وادي عشار.',
    landmarks: ['قصر الفريد ومقابر الحِجر النبطية', 'جبل الفيل ووادي عشار', 'قاعة مرايا والبلدة القديمة', 'محمية شرعان وصخور الغراميل الفلكية'],
    spiritualOrCulturalNote: 'يمكن الوصول إلى العلا بسهولة بعد إتمام العمرة في المدينة المنورة براً أو بطيران مباشر.'
  },
  {
    id: 'dest-diriyah',
    name: 'الدرعية التاريخية والرياض',
    tagline: 'جوهرة المملكة ومهد الدولة السعودية بعمارتها النجدية الأصيلة',
    region: 'منطقة الرياض — وادي حنيفة',
    bestSeason: 'أكتوبر إلى مايو · أمسيات مطل البجيري وموسم الرياض',
    artwork: 'diriyah-turaif',
    description:
      'رحلة ثقافية بين قصور حي الطريف التاريخي المبنية بالطين واللبن على ضفاف وادي حنيفة، وتجارب الضيافة النجدية الفاخرة في مطل البجيري، مع مغامرة الوقوف على منحدرات حافة العالم.',
    landmarks: ['حي الطريف التاريخي وقصر سلوى', 'مطل البجيري وفندق باب سمحان', 'المتحف الوطني وقصر المربع بالرياض', 'منحدرات حافة العالم (جبل طويق)'],
    spiritualOrCulturalNote: 'تتميز الدرعية بالعروض التراثية الحية وفنون العرضة السعودية الأصيلة والقهوة السعودية.'
  },
  {
    id: 'dest-redsea',
    name: 'وجهة البحر الأحمر',
    tagline: 'أرخبيل بكر من الجزر الفيروزية والشعاب المرجانية المزدهرة',
    region: 'ساحل البحر الأحمر الغربي',
    bestSeason: 'طوال العام · مياه دافئة وشمس مشرقة',
    artwork: 'redsea-ummahat',
    description:
      'ملاذ شاطئي مستدام يضم أفخم المنتجعات العائمة والشاطئية في جزر أمهات وشيبارة، حيث الخصوصية التامة للعائلات والغوص في رابع أكبر حيد مرجاني في العالم.',
    landmarks: ['جزر أمهات ومنتجع نجومة ريتز كارلتون', 'جزيرة شيبارة والفلل العائمة', 'الشعاب المرجانية البكر وغابات المانغروف', 'كثبان الصحراء الساحلية والوديان البركانية'],
    spiritualOrCulturalNote: 'تعمل وجهة البحر الأحمر بالطاقة المتجددة بالكامل وتستقبل زوارها عبر مطار البحر الأحمر الدولي.'
  },
  {
    id: 'dest-abha',
    name: 'أبها وقمم عسير',
    tagline: 'عروس الجبل ومعانقة السحاب والضباب والقرى الحجرية التراثية',
    region: 'منطقة عسير — جنوب غرب المملكة',
    bestSeason: 'مايو إلى سبتمبر · أجواء باردة وأمطار صيفية',
    artwork: 'abha-asir',
    description:
      'طبيعة جبلية خضراء تعانق السحاب على ارتفاع 3000 متر في متنزه السودة، مع استكشاف حصون قرية رجال ألمع التراثية وفن القط العسيري المسجل في اليونسكو.',
    landmarks: ['قمم السودة والمدرجات الزراعية الخضراء', 'قرية رجال ألمع التاريخية', 'شارع الفن والمدينة العالية بأبها', 'بيوت القط العسيري التراثية'],
    spiritualOrCulturalNote: 'وجهة مثالية للعائلات الباحثة عن الأجواء الجبلية المعتدلة والطبيعة الخضراء بعد أداء العمرة.'
  }
];

export const PACKAGES_DATA: TravelPackage[] = [
  {
    id: 'umrah-royal-haramain',
    title: 'عمرة الصفوة المطلة على الكعبة المشرفة',
    subtitle: 'إقامة فندقية فاخرة في أبراج البيت والمنطقة المركزية الشمالية مع قطار الحرمين درجة الأعمال',
    category: 'umrah',
    categoryLabel: 'باقة عمرة فاخرة',
    destinations: ['مكة المكرمة', 'المدينة المنورة'],
    durationDays: 8,
    nightsSummary: '5 ليالٍ مكة · 2 ليلتان المدينة',
    tierBadge: 'ضيافة ملكية — 5 نجوم مطلة',
    distanceToHaramMeters: 50,
    distanceLabel: '50 متراً عن ساحة الحرم المكي',
    hotelName: 'فندق ساعة مكة فيرمونت · أوبروي المدينة',
    hotelStars: 5,
    rating: 4.95,
    reviewsCount: 342,
    mealPlan: 'إفطار وعشاء بوفيه مفتوح',
    transportType: 'قطار الحرمين السريع (درجة الأعمال)',
    nusukPermitIncluded: true,
    artwork: 'makkah-haram',
    nextDeparture: 'رحلات أسبوعية منتظمة طوال العام',
    remainingSeats: 6,
    highlights: [
      'إطلالة بانورامية مباشرة على صحن الكعبة المشرفة من الغرفة',
      'تصريح عمرة وتصريح الصلاة في الروضة الشريفة عبر منصة نسك',
      'استقبال خاص في صالة كبار الشخصيات بمطار الملك عبدالعزيز بجدة',
      'مزارات تاريخية في مكة والمدينة برفقة مرشد شرعي وتاريخي معتمد'
    ],
    itinerary: [
      {
        day: 1,
        title: 'الوصول إلى جدة والتوجه لمكة المكرمة لأداء العمرة',
        location: 'مكة المكرمة',
        description: 'الاستقبال في مطار الملك عبدالعزيز الدولي، الانتقال بسيارة فاخرة إلى فندق ساعة مكة فيرمونت، الراحة ثم أداء مناسك العمرة.'
      },
      {
        day: 2,
        title: 'التفرغ للعبادة والطواف في المسجد الحرام',
        location: 'مكة المكرمة',
        description: 'يوم كامل للصلوات الخمس في الحرم المكي مع جلسة إرشادية مسائية بعد صلاة العشاء.'
      },
      {
        day: 4,
        title: 'جولة المزارات التاريخية ومعرض الوحي بحراء',
        location: 'مكة المكرمة',
        description: 'زيارة حي حراء الثقافي، جبل الرحمة بعرفات، ومشعر منى ومزدلفة مع شرح وافٍ للسيرة النبوية.'
      },
      {
        day: 6,
        title: 'الانتقال بقطار الحرمين السريع إلى المدينة المنورة',
        location: 'المدينة المنورة',
        description: 'رحلة مريحة بسرعة 300 كم/س إلى طيبة الطيبة، تسكين في فندق أوبروي المطل مباشرة على المسجد النبوي وزيارة الروضة الشريفة.'
      },
      {
        day: 8,
        title: 'مزارات قباء وأُحد والمغادرة من مطار الأمير محمد بن عبدالعزيز',
        location: 'المدينة المنورة',
        description: 'الصلاة في مسجد قباء وزيارة شهداء أحد ومجمع الملك فهد لطباعة المصحف الشريف ثم التوديع بالمطار.'
      }
    ]
  },
  {
    id: 'umrah-economic-blessed',
    title: 'عمرة الرحاب الميسرة للعائلات',
    subtitle: 'برنامج متكامل يجمع القرب من الحرمين الشريفين والخدمة الفندقية الراقية والانتقال المريح',
    category: 'umrah',
    categoryLabel: 'باقة عمرة عائلية',
    destinations: ['مكة المكرمة', 'المدينة المنورة'],
    durationDays: 10,
    nightsSummary: '6 ليالٍ مكة · 3 ليالٍ المدينة',
    tierBadge: 'ضيافة عائلية متكاملة',
    distanceToHaramMeters: 320,
    distanceLabel: '320 متراً عن ساحات الحرم',
    hotelName: 'فندق شذا مكة · فندق دلة طيبة المدينة',
    hotelStars: 4,
    rating: 4.82,
    reviewsCount: 518,
    mealPlan: 'إفطار صباحي فاخر يومياً',
    transportType: 'قطار الحرمين السريع',
    nusukPermitIncluded: true,
    artwork: 'madinah-nabawi',
    nextDeparture: 'انطلاق أسبوعي طوال العام',
    remainingSeats: 14,
    highlights: [
      'فنادق حديثة على مسافة مشي قريبة ومستوية من ساحات الحرمين',
      'إصدار فوري لتأشيرة العمرة والتأمين الصحي الشامل وتصريح الروضة',
      'تذاكر قطار الحرمين السريع مؤكدة بين مكة المكرمة والمدينة المنورة',
      'غرف عائلية متصلة ومرافقة إرشادية متكاملة للمعتمرين'
    ],
    itinerary: [
      {
        day: 1,
        title: 'الوصول إلى مكة المكرمة وأداء العمرة',
        location: 'مكة المكرمة',
        description: 'الاستقبال في مطار جدة والانتقال بالحافلات الحديثة المكيفة إلى فندق شذا مكة وأداء العمرة.'
      },
      {
        day: 5,
        title: 'مزارات مكة المكرمة ومتحف عمارة الحرمين',
        location: 'مكة المكرمة',
        description: 'جولة صباحية لزيارة معالم مكة التاريخية ومتحف عمارة الحرمين الشريفين.'
      },
      {
        day: 7,
        title: 'التوجه للمدينة المنورة عبر قطار الحرمين',
        location: 'المدينة المنورة',
        description: 'الوصول إلى محطة المدينة المنورة والتسكين في فندق دلة طيبة وزيارة المسجد النبوي الشريف.'
      },
      {
        day: 10,
        title: 'التسوق في أسواق التمور والمغادرة',
        location: 'المدينة المنورة',
        description: 'جولة في مزارع وتمور المدينة المنورة ثم التوجه إلى المطار للمغادرة بسلامة الله.'
      }
    ]
  },
  {
    id: 'hajj-nusuk-hospitality',
    title: 'باقة حج الضيافة المميزة — أبراج ومخيمات منى المطورة',
    subtitle: 'برنامج حج رسمي معتمد عبر منصة نسك مع مخيمات مكيفة خاصة في منى وعرفات وقطار المشاعر',
    category: 'hajj',
    categoryLabel: 'باقة حج معتمدة',
    destinations: ['مكة المكرمة', 'منى وعرفات', 'المدينة المنورة'],
    durationDays: 14,
    nightsSummary: '7 ليالٍ مكة · 4 المشاعر · 3 المدينة',
    tierBadge: 'مخيمات مجر الكبش (أ) + قطار المشاعر',
    distanceToHaramMeters: 120,
    distanceLabel: '120 متراً عن الحرم + مخيمات منطقة (أ)',
    hotelName: 'جبل عمر حياة ريجنسي · مخيمات مجر الكبش المطورة',
    hotelStars: 5,
    rating: 4.97,
    reviewsCount: 189,
    mealPlan: 'إقامة كاملة (3 وجبات + ضيافة 24 ساعة)',
    transportType: 'قطار المشاعر المقدسة + قطار الحرمين',
    nusukPermitIncluded: true,
    artwork: 'mina-arafat',
    nextDeparture: 'موسم الحج السنوي (التسجيل متاح)',
    remainingSeats: 9,
    highlights: [
      'مخيمات خاصة في منى (منطقة مجر الكبش القريبة من الجمرات) مجهزة بصوفا بيد فردية',
      'تذاكر قطار المشاعر المقدسة للتنقل السلس بين منى وعرفات ومزدلفة',
      'إشراف شرعي وطبي متكامل على مدار الساعة مع توفير الهدي الموثق',
      'إقامة 5 نجوم في جبل عمر قبل وبعد أيام التشريق دون الحاجة لمغادرة الغرفة'
    ],
    itinerary: [
      {
        day: 1,
        title: 'القدوم لمكة المكرمة وأداء طواف القدوم',
        location: 'مكة المكرمة (4-7 ذو الحجة)',
        description: 'الإقامة الفاخرة في فندق جبل عمر حياة ريجنسي والاستعداد الروحي والبدني لمناسك الحج.'
      },
      {
        day: 5,
        title: 'يوم التروية والوقوف بصعيد عرفات الطاهر',
        location: 'منى وعرفات (8-9 ذو الحجة)',
        description: 'التصعيد إلى مخيمات منى ثم مخيمات عرفات المكيفة بالكامل مع البوفيه المفتوح والدعاء حتى الغروب.'
      },
      {
        day: 7,
        title: 'يوم النحر وأيام التشريق الثلاثة في منى',
        location: 'مزدلفة ومنى (10-13 ذو الحجة)',
        description: 'رمي جمرة العقبة الكبرى، نحر الهدي، طواف الإفاضة، والمبيت في مخيمات مجر الكبش القريبة من الجمرات.'
      },
      {
        day: 11,
        title: 'زيارة المدينة المنورة بعد إتمام المناسك',
        location: 'المدينة المنورة (14-17 ذو الحجة)',
        description: 'الانتقال بقطار الحرمين السريع إلى المدينة المنورة للسلام على المصطفى ﷺ وزيارة الروضة الشريفة.'
      }
    ]
  },
  {
    id: 'tourism-alula-hegra-luxury',
    title: 'رحلة العُلا والحِجر التاريخية ومرايا الصحراء',
    subtitle: 'استكشاف أول موقع تراث عالمي لليونسكو في السعودية مع إقامة في منتجعات وادي عشار الصحراوية',
    category: 'tourism',
    categoryLabel: 'سياحة ثقافية وتراثية',
    destinations: ['العلا', 'الحِجر (مدائن صالح)', 'جبل الفيل'],
    durationDays: 4,
    nightsSummary: '3 ليالٍ في وادي عشار بالعلا',
    tierBadge: 'منتجعات وادي عشار 5 نجوم',
    distanceToHaramMeters: null,
    distanceLabel: 'وادي عشار · محمية شرعان الطبيعية',
    hotelName: 'منتجع هابيتاس العلا أو بانيان تري',
    hotelStars: 5,
    rating: 4.94,
    reviewsCount: 276,
    mealPlan: 'إفطار وعشاء في مطاعم الواحة التراثية',
    transportType: 'طيران داخلي + سيارات دفع رباعي خاصة',
    nusukPermitIncluded: false,
    artwork: 'alula-hegra',
    nextDeparture: 'رحلات أسبوعية طوال الموسم',
    remainingSeats: 8,
    highlights: [
      'جولة خاصة بسيارات لاند روفر الكلاسيكية في مقابر الحِجر النبطية ومملكة دادان',
      'أمسية تأمل النجوم في صحراء الغراميل مع عشاء تقليدي تحت الصخور الرملية',
      'زيارة قاعة مرايا (أكبر مبنى مغطى بالمرايا في العالم) والبلدة القديمة في العلا',
      'إمكانية دمج الرحلة مباشرة بعد برنامج العمرة من المدينة المنورة'
    ],
    itinerary: [
      {
        day: 1,
        title: 'الوصول لمطار العلا وجلسة غروب جبل الفيل',
        location: 'العلا',
        description: 'الاستقبال في مطار العلا الدولي، التسكين في منتجع وادي عشار، ثم التوجه لجبل الفيل وقت الغروب.'
      },
      {
        day: 2,
        title: 'جولة الحِجر (مدائن صالح) والبلدة القديمة',
        location: 'الحِجر والعلا',
        description: 'استكشاف قصر الفريد والواجهات النبطية المنحوتة برفقة راوٍ تاريخي، والمساء في سوق البلدة القديمة.'
      },
      {
        day: 3,
        title: 'واحة الديسة ومحمية شرعان وتأمل النجوم',
        location: 'شرعان والغراميل',
        description: 'جولة صباحية بين نخيل الواحة ومحمية شرعان، تليها سهرة فلكية لرصد الكواكب في صحراء الغراميل.'
      },
      {
        day: 4,
        title: 'إفطار إطلالة مرايا والتوديع',
        location: 'وادي عشار',
        description: 'جولة تصوير أمام قاعة مرايا المعمارية ثم التوجه إلى المطار.'
      }
    ]
  },
  {
    id: 'tourism-diriyah-riyadh-heritage',
    title: 'مسار الدرعية التاريخية ونهضة الرياض المعاصرة',
    subtitle: 'رحلة ثقافية تجمع أصالة حي الطريف التاريخي ومطل البجيري مع معالم العاصمة الحديثة',
    category: 'tourism',
    categoryLabel: 'سياحة ثقافية وحضرية',
    destinations: ['الدرعية التاريخية', 'الرياض', 'حافة العالم'],
    durationDays: 5,
    nightsSummary: '4 ليالٍ في العاصمة الرياض والدرعية',
    tierBadge: 'ضيافة نجدية — باب سمحان',
    distanceToHaramMeters: null,
    distanceLabel: 'حي الطريف · مطل البجيري بالدرعية',
    hotelName: 'فندق باب سمحان الدرعية (لكجري كوليكشن)',
    hotelStars: 5,
    rating: 4.89,
    reviewsCount: 194,
    mealPlan: 'إفطار نجدي أصيل + عشاء في مطل البجيري',
    transportType: 'سيارة سيدان فاخرة مع سائق ومرافق سياحي',
    nusukPermitIncluded: false,
    artwork: 'diriyah-turaif',
    nextDeparture: 'رحلات أسبوعية طوال العام',
    remainingSeats: 11,
    highlights: [
      'إقامة استثنائية في فندق باب سمحان المصمم على الطراز المعماري السلماني والنجدي',
      'دخول خاص لحي الطريف التاريخي وقصر سلوى والمتحف الوطني السعودي بالمربع',
      'رحلة سفاري جبلية وقت الغروب إلى جرف "حافة العالم" (جبل فهرين) شمال غرب الرياض',
      'تجربة تذوق القهوة السعودية الأصيلة والمطبخ النجدي في مطل البجيري'
    ],
    itinerary: [
      {
        day: 1,
        title: 'الوصول إلى الرياض وأمسية مطل البجيري',
        location: 'الدرعية',
        description: 'الاستقبال في مطار الملك خالد الدولي، التسكين في باب سمحان، وعشاء مطل على قصر سلوى المضاء ليلاً.'
      },
      {
        day: 2,
        title: 'حي الطريف التاريخي وقصر المربع والمتحف الوطني',
        location: 'الدرعية ووسط الرياض',
        description: 'جولة تاريخية معمقة في مهد الدولة السعودية الأولى ثم زيارة مركز الملك عبدالعزيز التاريخي.'
      },
      {
        day: 3,
        title: 'مغامرة حافة العالم (جبل فهرين)',
        location: 'وادي حنيفة وجبل طويق',
        description: 'رحلة بسيارات الدفع الرباعي إلى منحدرات جبل طويق الشاهقة مع جلسة سمر عربية عند الغروب.'
      },
      {
        day: 5,
        title: 'جسر المشاهدة ببرج المملكة وسوق الزل التراثي',
        location: 'الرياض',
        description: 'اقتناء التحف النجدية والعود الفاخر من سوق الزل التاريخي قبل التوجه للمطار.'
      }
    ]
  },
  {
    id: 'tourism-redsea-ummahat',
    title: 'ملاذ البحر الأحمر الفاخر — جزر أمهات والشعاب المرجانية',
    subtitle: 'استجمام شاطئي مستدام في الفلل العائمة فوق المياه الفيروزية البكر على ساحل البحر الأحمر',
    category: 'tourism',
    categoryLabel: 'سياحة شاطئية واستجمام',
    destinations: ['البحر الأحمر', 'جزر أمهات', 'أملج والوجه'],
    durationDays: 4,
    nightsSummary: '3 ليالٍ في فلل شاطئية أو عائمة',
    tierBadge: 'فلل خاصة فوق الماء',
    distanceToHaramMeters: null,
    distanceLabel: 'أرخبيل جزر أمهات · ساحل البحر الأحمر',
    hotelName: 'منتجع نجومة (ريتز كارلتون ريزيرف) أو سانت ريجيس البحر الأحمر',
    hotelStars: 5,
    rating: 4.98,
    reviewsCount: 128,
    mealPlan: 'إفطار وعشاء بحري فاخر',
    transportType: 'مطار البحر الأحمر الدولي + قارب سريع أو طائرة مائية',
    nusukPermitIncluded: false,
    artwork: 'redsea-ummahat',
    nextDeparture: 'رحلات يومية وأسبوعية منتظمة',
    remainingSeats: 4,
    highlights: [
      'وصول بانورامي بالطائرة المائية أو اليخت السريع من مطار البحر الأحمر الدولي',
      'رحلات غوص وسنوركلينج في رابع أكبر حيد مرجاني مزدهر في العالم',
      'خصوصية تامة للعائلات مع مسبح خاص مطل مباشرة على اللاغون الفيروزي',
      'تجربة التجديف الليلي بين أشجار المانغروف والنجوم المتلألئة'
    ],
    itinerary: [
      {
        day: 1,
        title: 'الوصول لمطار البحر الأحمر والانتقال بالطائرة المائية',
        location: 'جزر أمهات',
        description: 'ترحيب خاص في المطار والانتقال فوق الجزر المرجانية إلى الفيلا الخاصة.'
      },
      {
        day: 2,
        title: 'إبحار اليخت واستكشاف الشعاب المرجانية البكر',
        location: 'أرخبيل البحر الأحمر',
        description: 'رحلة بحرية مع خبير أحياء بحرية للسباحة والغوص السطحي في المياه الكريستالية.'
      },
      {
        day: 3,
        title: 'المنتجع الصحي وجولة غابات المانغروف الساحلية',
        location: 'جزر أمهات',
        description: 'جلسات استشفاء طبيعية وتجديف الكاياك عند الغروب وعشاء على الشاطئ الرملي الأبيض.'
      },
      {
        day: 4,
        title: 'العودة عبر مطار البحر الأحمر الدولي',
        location: 'البحر الأحمر',
        description: 'إفطار صباحي على شرفة الفيلا ثم العودة بالقارب السريع إلى المطار.'
      }
    ]
  }
];

export const HARAMAIN_ROUTES: HaramainRouteDetail[] = [
  {
    from: 'makkah',
    to: 'madinah',
    fromName: 'محطة مكة المكرمة (الرصيفة)',
    toName: 'محطة المدينة المنورة (حي المعرفة)',
    durationMinutes: 140,
    distanceKm: 453,
    dailyTrips: 38,
    departuresSample: ['08:00 ص', '10:00 ص', '01:00 م', '04:00 م', '07:00 م', '09:30 م'],
    stationAmenities: 'صالة درجة الأعمال · مصلى فسيح · حافلات ترددية مباشرة لساحات الحرم'
  },
  {
    from: 'jeddah-airport',
    to: 'makkah',
    fromName: 'محطة مطار الملك عبدالعزيز الدولي (جدة)',
    toName: 'محطة مكة المكرمة (الرصيفة)',
    durationMinutes: 54,
    distanceKm: 95,
    dailyTrips: 48,
    departuresSample: ['07:35 ص', '09:35 ص', '11:35 ص', '02:35 م', '05:35 م', '08:35 م', '10:35 م'],
    stationAmenities: 'ربط مباشر بصالة القدوم رقم 1 بالمطار · نقل الأمتعة · عربات كبار السن'
  },
  {
    from: 'jeddah-airport',
    to: 'madinah',
    fromName: 'محطة مطار الملك عبدالعزيز الدولي (جدة)',
    toName: 'محطة المدينة المنورة (حي المعرفة)',
    durationMinutes: 110,
    distanceKm: 358,
    dailyTrips: 32,
    departuresSample: ['08:30 ص', '11:30 ص', '02:30 م', '05:30 م', '08:30 م'],
    stationAmenities: 'انطلاق مباشر من صالة المطار إلى المدينة المنورة دون الحاجة لدخول جدة'
  },
  {
    from: 'kaec',
    to: 'madinah',
    fromName: 'محطة مدينة الملك عبدالله الاقتصادية (رابغ)',
    toName: 'محطة المدينة المنورة (حي المعرفة)',
    durationMinutes: 75,
    distanceKm: 268,
    dailyTrips: 20,
    departuresSample: ['09:12 ص', '01:12 م', '05:12 م', '09:12 م'],
    stationAmenities: 'توقف سريع ومريح يربط ساحل البحر الأحمر بالمدينة المنورة'
  }
];

export const UMRAH_STEPS: RitualStep[] = [
  {
    id: 'umrah-1-ihram',
    order: 1,
    title: 'الإحرام من الميقات وعقد النية',
    location: 'الميقات المكاني أو في الطائرة عند محاذاته',
    summary: 'الاغتسال والتطيب في البدن قبل الإحرام، ولبس إزار ورداء أبيضين للرجال، والملابس الساترة الفضفاضة للنساء، ثم التلبية.',
    duaArabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً — لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ',
    sunnahTip: 'يستمر المعتمر في التلبية من الميقات حتى يشرع في استلام الحجر الأسود لبدء الطواف.'
  },
  {
    id: 'umrah-2-tawaf',
    order: 2,
    title: 'الطواف حول الكعبة المشرفة (7 أشواط)',
    location: 'صحن المطاف — المسجد الحرام',
    summary: 'البدء من محاذاة الحجر الأسود وجعل الكعبة عن اليسار سبعة أشواط كاملة، مع الاضطباع والرَّمَل للرجال في الأشواط الثلاثة الأولى، ثم صلاة ركعتين خلف مقام إبراهيم.',
    duaArabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ (بين الركن اليماني والحجر الأسود)',
    sunnahTip: 'يُسن الشرب من ماء زمزم والتضلع منه بعد ركعتي الطواف والدعاء بما شاء من خيري الدنيا والآخرة.'
  },
  {
    id: 'umrah-3-sai',
    order: 3,
    title: 'السعي بين الصفا والمروة (7 أشواط)',
    location: 'المسعى — المسجد الحرام',
    summary: 'البدء بجبل الصفا والاتجاه إلى المروة (شوط أول)، والعودة من المروة إلى الصفا (شوط ثانٍ) حتى إتمام سبعة أشواط تنتهي عند المروة.',
    duaArabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ — لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    sunnahTip: 'يسن للرجال الإسراع بين العلمين الأخضرين في المسعى دون إيذاء أو مزاحمة.'
  },
  {
    id: 'umrah-4-tahallul',
    order: 4,
    title: 'الحلق أو التقصير والتحلل من الإحرام',
    location: 'مكة المكرمة (بعد إتمام السعي عند المروة)',
    summary: 'حلق شعر الرأس بالكامل أو تقصيره من جميع جوانبه للرجال (والحلق أفضل)، وتقصير المرأة من أطراف شعرها قدر أنملة إصبع.',
    duaArabic: 'اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ وَالْمُقَصِّرِينَ، اللَّهُمَّ تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    sunnahTip: 'بهذا تتم العمرة ويحل للمعتمر كل شيء حَرُم عليه بالإحرام.'
  }
];

export const HAJJ_STEPS: RitualStep[] = [
  {
    id: 'hajj-1-tarwiyah',
    order: 1,
    title: 'يوم التروية (8 ذو الحجة) — الإحرام بالحج والتوجه إلى منى',
    location: 'مكة المكرمة ومشعر منى',
    summary: 'يُحرم الحاج المتمتع بالحج ضحى يوم الثامن من مقر إقامته بمكة، ويتوجه إلى منى ليصلي بها الظهر والعصر والمغرب والعشاء والفجر قصراً بلا جمع.',
    duaArabic: 'لَبَّيْكَ اللَّهُمَّ حَجّاً — اللَّهُمَّ هَذِهِ حَجَّةٌ لاَ رِيَاءَ فِيهَا وَلاَ سُمْعَةَ',
    sunnahTip: 'الإكثار من التلبية والذكر واستثمار الأوقات في المخيمات بالتهيؤ ليوم عرفة العظيم.'
  },
  {
    id: 'hajj-2-arafat',
    order: 2,
    title: 'يوم عرفة (9 ذو الحجة) — الركن الأعظم والمبيت بمزدلفة',
    location: 'صعيد عرفات ثم مزدلفة',
    summary: 'التوجه إلى عرفات بعد شروق الشمس، صلاة الظهر والعصر جمع تقديم وقصراً، والتفرغ للدعاء والتضرع حتى غروب الشمس، ثم النفرة إلى مزدلفة وصلاة المغرب والعشاء جمع تأخير.',
    duaArabic: 'خَيْرُ الدُّعَاءِ دُعَاءُ يَوْمِ عَرَفَةَ: لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    sunnahTip: 'التأكد من البقاء داخل حدود عرفة الشرعية حتى تغرب الشمس تماماً قبل التحرك لمزدلفة.'
  },
  {
    id: 'hajj-3-nahr',
    order: 3,
    title: 'يوم النحر (10 ذو الحجة) — رمي جمرة العقبة والحلق وطواف الإفاضة',
    location: 'منى والمسجد الحرام',
    summary: 'رمي جمرة العقبة الكبرى بسبع حصيات، ثم نحر الهدي، ثم الحلق أو التقصير (التحلل الأصغر)، ثم النزول لمكة لطواف الإفاضة وسعي الحج (التحلل الأكبر).',
    duaArabic: 'اللَّهُمَّ اجْعَلْهُ حَجّاً مَبْرُوراً، وَسَعْياً مَشْكُوراً، وَذَنْباً مَغْفُوراً',
    sunnahTip: 'يجوز تقديم بعض أعمال يوم النحر على بعض (الرمي، النحر، الحلق، الطواف) ولا حرج في ذلك.'
  },
  {
    id: 'hajj-4-tashreeq',
    order: 4,
    title: 'أيام التشريق (11-13 ذو الحجة) وطواف الوداع',
    location: 'مشعر منى ثم الكعبة المشرفة',
    summary: 'المبيت بمنى ليالي التشريق، ورمي الجمرات الثلاث (الصغرى، الوسطى، الكبرى) كل يوم بعد الزوال، ثم طواف الوداع عند مغادرة مكة المكرمة.',
    duaArabic: 'وَاذْكُرُوا اللَّهَ فِي أَيَّامٍ مَّعْدُودَاتٍ — اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
    sunnahTip: 'الدعاء طويلًا مستقبل القبلة بعد رمي الجمرة الصغرى والوسطى، والانصراف مباشرة بعد رمي جمرة العقبة الكبرى.'
  }
];

export const MIQAT_LOCATIONS: MiqatInfo[] = [
  {
    id: 'dhul-hulayfah',
    name: 'ذو الحليفة',
    modernName: 'آبار علي (المدينة المنورة)',
    direction: 'شمال مكة المكرمة',
    distanceToMakkahKm: 420,
    forPilgrimsFrom: 'أهل المدينة المنورة ومن يمر بها من المعتمرين والحجاج'
  },
  {
    id: 'al-juhfah',
    name: 'الجحفة',
    modernName: 'رابغ',
    direction: 'شمال غرب مكة المكرمة',
    distanceToMakkahKm: 183,
    forPilgrimsFrom: 'أهل الشام ومصر والمغرب العربي ومن يحاذيها جواً أو بحراً'
  },
  {
    id: 'qarn-al-manazil',
    name: 'قرن المنازل',
    modernName: 'السيل الكبير / وادي محرم (الطائف)',
    direction: 'شرق مكة المكرمة',
    distanceToMakkahKm: 75,
    forPilgrimsFrom: 'أهل نجد والرياض ودول الخليج العربي والشرق'
  },
  {
    id: 'yalamlam',
    name: 'يلملم',
    modernName: 'السعدية',
    direction: 'جنوب مكة المكرمة',
    distanceToMakkahKm: 92,
    forPilgrimsFrom: 'أهل اليمن وجنوب المملكة والقادمين من الجنوب'
  },
  {
    id: 'dhat-irq',
    name: 'ذات عرق',
    modernName: 'الضريبة',
    direction: 'شمال شرق مكة المكرمة',
    distanceToMakkahKm: 94,
    forPilgrimsFrom: 'أهل العراق والمشرق ومن سلك طريقهم'
  }
];

export function filterAndSortPackages(
  packages: TravelPackage[],
  options: {
    category: PackageCategory;
    searchQuery?: string;
    sortBy?: SortOption;
  }
): TravelPackage[] {
  const query = (options.searchQuery || '').trim().toLowerCase();

  const filtered = packages.filter((pkg) => {
    if (options.category !== 'all' && pkg.category !== options.category) {
      return false;
    }
    if (query.length > 0) {
      const searchable = [
        pkg.title,
        pkg.subtitle,
        pkg.hotelName,
        pkg.categoryLabel,
        ...pkg.destinations,
        ...pkg.highlights
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  const sortBy = options.sortBy || 'featured';

  if (sortBy === 'distance-asc') {
    sorted.sort((a, b) => {
      const distA = a.distanceToHaramMeters ?? 999999;
      const distB = b.distanceToHaramMeters ?? 999999;
      return distA - distB;
    });
  } else if (sortBy === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'duration-desc') {
    sorted.sort((a, b) => b.durationDays - a.durationDays);
  }

  return sorted;
}

export function validateBookingInput(input: BookingFormInput): BookingValidationResult {
  const errors: Partial<Record<keyof BookingFormInput, string>> = {};

  const trimmedName = (input.fullName || '').trim();
  if (trimmedName.split(/\s+/).filter(Boolean).length < 2) {
    errors.fullName = 'يرجى إدخال الاسم الثنائي أو الثلاثي كما هو مطابق لجواز السفر أو الهوية.';
  }

  const trimmedPassport = (input.passportOrId || '').trim();
  if (!/^[A-Za-z0-9]{6,14}$/.test(trimmedPassport)) {
    errors.passportOrId = 'يرجى إدخال رقم جواز سفر أو هوية وطنية صحيح (6 إلى 14 حرفاً أو رقماً).';
  }

  const trimmedPhone = (input.phone || '').trim();
  if (!/^[+\d][\d\s-]{7,16}$/.test(trimmedPhone)) {
    errors.phone = 'يرجى إدخال رقم جوال فعال مسبوقاً برمز الدولة أو 05.';
  }

  const trimmedEmail = (input.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح لاستلام تصريح نسك وتأكيد الحجز.';
  }

  if (!input.departureDate || input.departureDate.trim().length === 0) {
    errors.departureDate = 'يرجى تحديد تاريخ السفر المفضل.';
  }

  if (!Number.isFinite(input.pilgrimsCount) || input.pilgrimsCount < 1 || input.pilgrimsCount > 20) {
    errors.pilgrimsCount = 'عدد المسافرين يجب أن يكون بين 1 و 20 مسافراً.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function generateBookingReference(passportOrId: string, pilgrimsCount: number): string {
  const clean = passportOrId.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const suffix = clean.slice(-4).padStart(4, '9');
  const checksum = ((clean.charCodeAt(0) || 65) * 17 + pilgrimsCount * 31) % 900 + 100;
  return `NSK-${checksum}${suffix}`;
}

export function getHaramainRouteDetails(
  from: HaramainStation,
  to: HaramainStation
): HaramainRouteDetail {
  if (from === to) {
    return HARAMAIN_ROUTES[0];
  }
  const direct = HARAMAIN_ROUTES.find(
    (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from)
  );
  if (direct) {
    if (direct.from === from) return direct;
    return {
      ...direct,
      from: direct.to,
      to: direct.from,
      fromName: direct.toName,
      toName: direct.fromName
    };
  }
  return {
    from,
    to,
    fromName:
      from === 'makkah'
        ? 'محطة مكة المكرمة (الرصيفة)'
        : from === 'kaec'
        ? 'محطة مدينة الملك عبدالله الاقتصادية'
        : from === 'jeddah-airport'
        ? 'محطة مطار الملك عبدالعزيز الدولي'
        : 'محطة المدينة المنورة',
    toName:
      to === 'makkah'
        ? 'محطة مكة المكرمة (الرصيفة)'
        : to === 'kaec'
        ? 'محطة مدينة الملك عبدالله الاقتصادية'
        : to === 'jeddah-airport'
        ? 'محطة مطار الملك عبدالعزيز الدولي'
        : 'محطة المدينة المنورة',
    durationMinutes: 82,
    distanceKm: 185,
    dailyTrips: 18,
    departuresSample: ['08:30 ص', '12:30 م', '04:30 م', '08:30 م'],
    stationAmenities: 'صالة انتظار مكيفة · خدمة نقل الأمتعة · ربط مباشر بالحافلات الترددية'
  };
}

export function buildWhatsAppUrl(message: string): string {
  const phone = '966920031448';
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function resolveAssetUrl(relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, '');
  if (
    typeof window !== 'undefined' &&
    Boolean((window as unknown as Record<string, boolean>).__MAQAM_STATIC_FALLBACK__)
  ) {
    return `public/${clean}`;
  }
  return clean;
}

export function formatBookingWhatsAppMessage(
  booking: ConfirmedBooking,
  notes?: string
): string {
  const lines: string[] = [
    '*طلب حجز جديد — وكالة مقام للحرمين والسياحة*',
    '────────────────────',
    `• *البرنامج المختار:* ${booking.packageTitle}`,
    `• *التصنيف:* ${booking.categoryLabel}`,
    '────────────────────',
    '*بيانات المسافر الرئيسي:*',
    `• *الاسم الكامل:* ${booking.fullName}`,
    `• *رقم الجواز / الهوية:* ${booking.passportOrId}`,
    `• *رقم الجوال:* ${booking.phone}`,
    `• *البريد الإلكتروني:* ${booking.email}`,
    '────────────────────',
    '*تفاصيل الرحلة والإقامة:*',
    `• *مدينة المغادرة:* ${booking.departureCity}`,
    `• *تاريخ السفر المطلوب:* ${booking.departureDate}`,
    `• *عدد المسافرين:* ${booking.pilgrimsCount} مسافر`,
    `• *نوع الإقامة الفندقية:* ${booking.roomOccupancyLabel}`
  ];

  const trimmedNotes = (notes || '').trim();
  if (trimmedNotes.length > 0) {
    lines.push(`• *ملاحظات إضافية:* ${trimmedNotes}`);
  }

  lines.push(
    '────────────────────',
    'يرجى تأكيد توفر الإقامة وإصدار التصاريح اللازمة، وشكراً لكم.'
  );

  return lines.join('\n');
}

export function buildBookingWhatsAppUrl(
  booking: ConfirmedBooking,
  notes?: string
): string {
  return buildWhatsAppUrl(formatBookingWhatsAppMessage(booking, notes));
}

