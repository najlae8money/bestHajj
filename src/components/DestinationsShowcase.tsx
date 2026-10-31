import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SaudiDestinationSpotlight, buildWhatsAppUrl, resolveAssetUrl } from '../utils/bookingLogic';
import { MapPin, Sparkles, X, MessageCircle, CalendarCheck } from 'lucide-react';

interface DestinationsShowcaseProps {
  onSelectDestinationBooking: (destination: SaudiDestinationSpotlight) => void;
}

export interface GalleryPhotoItem {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  imageUrl: string;
  remoteFallback: string;
  highlights: string[];
  seasonNote: string;
}

export const GALLERY_ROW_1: GalleryPhotoItem[] = [
  {
    id: 'gallery-makkah-haram',
    title: 'المسجد الحرام والكعبة المشرفة',
    subtitle: 'إقامة فندقية فاخرة بإطلالة بانورامية مباشرة على صحن المطاف وساحات الحرم المكي الشريف',
    region: 'مكة المكرمة · رحاب الحرمين',
    imageUrl: 'images/makkah-haram.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Great_Mosque_of_Mecca1.jpg/1280px-Great_Mosque_of_Mecca1.jpg',
    highlights: ['فنادق الصف الأول بجوار الحرم', 'مرافقة إرشادية لأداء المناسك', 'نقل خاص من المطار للفندق'],
    seasonNote: 'متاح طوال العام'
  },
  {
    id: 'gallery-kaaba-closeup',
    title: 'رحاب الكعبة المشرفة والكسوة الذهبية',
    subtitle: 'أجواء روحانية خاشعة في قلب المسجد الحرام مع تنظيم متكامل لأوقات الطواف والسعي',
    region: 'مكة المكرمة · المشاعر المقدسة',
    imageUrl: 'images/kaaba-closeup.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Kaaba_mirror_edit_jj.jpg/1280px-Kaaba_mirror_edit_jj.jpg',
    highlights: ['إصدار تصاريح العمرة عبر نسك', 'إشراف ميداني على مدار الساعة', 'برامج خاصة للعائلات وكبار السن'],
    seasonNote: 'متاح طوال العام'
  },
  {
    id: 'gallery-makkah-clock',
    title: 'أبراج الساعة وقف الملك عبدالعزيز',
    subtitle: 'ضيافة خمس نجوم في قلب المنطقة المركزية على بُعد خطوات معدودة من بوابات الحرم',
    region: 'مكة المكرمة · أبراج البيت',
    imageUrl: 'images/makkah-clock.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Abraj-al-Bait-Towers.JPG/1280px-Abraj-al-Bait-Towers.JPG',
    highlights: ['أجنحة وغرف مطلة على الكعبة', 'بوفيه إفطار وسحور فاخر', 'مصاعد خاصة متصلة بالحرم'],
    seasonNote: 'حجوزات مؤكدة فورية'
  },
  {
    id: 'gallery-madinah-nabawi',
    title: 'المسجد النبوي الشريف والقبة الخضراء',
    subtitle: 'سكينة الجوار النبوي الشريف مع تنسيق مسبق لتصاريح الصلاة في الروضة الشريفة',
    region: 'المدينة المنورة · طيبة الطيبة',
    imageUrl: 'images/madinah-nabawi.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Al-Masjid_AL-Nabawi_Door800x600x300.jpg/1280px-Al-Masjid_AL-Nabawi_Door800x600x300.jpg',
    highlights: ['إقامة في المنطقة المركزية الشمالية', 'تصاريح مؤكدة للروضة الشريفة', 'جولة المآثر النبوية الشريفة'],
    seasonNote: 'متاح طوال العام'
  },
  {
    id: 'gallery-quba-mosque',
    title: 'مسجد قباء وجادة قباء التاريخية',
    subtitle: 'أول مسجد أُسس على التقوى في الإسلام ضمن برنامج الزيارات النبوية المصحوبة بمرشدين',
    region: 'المدينة المنورة · المآثر الإسلامية',
    imageUrl: 'images/quba-mosque.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Quba_Mosque_in_2023.jpg/1280px-Quba_Mosque_in_2023.jpg',
    highlights: ['زيارة مسجد قباء وشهداء أحد', 'مرشد تاريخي متخصص في السيرة', 'حافلات حديثة مكيفة للعائلات'],
    seasonNote: 'ضمن جميع باقات المدينة'
  }
];

export const GALLERY_ROW_2: GalleryPhotoItem[] = [
  {
    id: 'gallery-alula-hegra',
    title: 'مدائن صالح والحِجر التاريخية بالعلا',
    subtitle: 'استكشاف أول موقع تراث عالمي لليونسكو في المملكة بين الواجهات النبطية المنحوتة في الصخر',
    region: 'العلا · شمال غرب المملكة',
    imageUrl: 'images/alula-hegra.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Mada%27in_Salih-61982.jpg/1280px-Mada%27in_Salih-61982.jpg',
    highlights: ['جولة الحِجر وقصر الفريد', 'الإقامة في منتجعات وادي عشار', 'تأمل النجوم في سماء العلا الصافية'],
    seasonNote: 'أكتوبر — أبريل'
  },
  {
    id: 'gallery-elephant-rock',
    title: 'جبل الفيل وتكوينات العلا الصخرية',
    subtitle: 'جلسات مسائية ساحرة عند الغروب وسط التكوينات الرملية الذهبية الفريدة في صحراء العلا',
    region: 'العلا · واحة الحضارات',
    imageUrl: 'images/elephant-rock.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Elephant_Rock%2C_Al-Ula.jpg/1280px-Elephant_Rock%2C_Al-Ula.jpg',
    highlights: ['جلسات غروب خاصة للعائلات', 'زيارة البلدة القديمة بالعلا', 'رحلات جوية وطيران شراعي اختياري'],
    seasonNote: 'موسم شتاء طنطورة'
  },
  {
    id: 'gallery-haramain-train',
    title: 'قطار الحرمين السريع بين مكة والمدينة',
    subtitle: 'انتقال مريح وفائق السرعة بسرعة 300 كم/س يربط مكة المكرمة بالمدينة المنورة وجدة',
    region: 'مكة · جدة · المدينة المنورة',
    imageUrl: 'images/haramain-train.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Haramain_High_Speed_Railway.jpg/1280px-Haramain_High_Speed_Railway.jpg',
    highlights: ['تذاكر درجة الأعمال والاقتصادية', 'وصول خلال 140 دقيقة بين الحرمين', 'توصيل خاص من المحطة للفندق'],
    seasonNote: 'رحلات يومية منتظمة'
  },
  {
    id: 'gallery-jeddah-balad',
    title: 'جدة التاريخية — حارات ورواشين البلد',
    subtitle: 'جولة تراثية في قلب جدة القديمة المسجلة في اليونسكو بين البيوت الحجازية العريقة وأسواقها',
    region: 'جدة · ساحل البحر الأحمر',
    imageUrl: 'images/jeddah-balad.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Jeddah_historique.jpg/1280px-Jeddah_historique.jpg',
    highlights: ['زيارة بيت نصيف ومسجد الشافعي', 'واجهة جدة البحرية الجديدة', 'برامج الترانزيت السريع للمعتمرين'],
    seasonNote: 'متاح طوال العام'
  },
  {
    id: 'gallery-mina-arafat',
    title: 'صعيد عرفات وجبل الرحمة بالمشاعر المقدسة',
    subtitle: 'تنظيم متكامل لرحلات الحج والمزارات الإيمانية في عرفات ومزدلفة ومنى بإشراف نخبة المرشدين',
    region: 'المشاعر المقدسة · مكة المكرمة',
    imageUrl: 'images/mina-arafat.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mount_Arafat.jpg/1280px-Mount_Arafat.jpg',
    highlights: ['مخيمات مطورة ومكيفة في المشاعر', 'إعاشة فاخرة ورعاية طبية متكاملة', 'مرشدون شرعيون مرافقون للحملة'],
    seasonNote: 'موسم الحج السنوي'
  }
];

export const GALLERY_ROW_3: GalleryPhotoItem[] = [
  {
    id: 'gallery-diriyah-turaif',
    title: 'الدرعية التاريخية والعمارة النجدية الأصيلة',
    subtitle: 'رحلة ثقافية إلى مهد الدولة السعودية الأولى وقصورها الطينية التاريخية ومطل البجيري',
    region: 'الرياض · الدرعية التاريخية',
    imageUrl: 'images/diriyah-turaif.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Masmak_Fort_%2812753717253%29.jpg/1280px-Masmak_Fort_%2812753717253%29.jpg',
    highlights: ['جولة حي الطريف وقصر سلوى', 'عشاء فاخر في مطل البجيري', 'زيارة المتحف الوطني وقصر المصمك'],
    seasonNote: 'أكتوبر — مايو'
  },
  {
    id: 'gallery-riyadh-kingdom',
    title: 'أفق الرياض الحديثة وجسر المشاهدة',
    subtitle: 'إقامة فندقية راقية في العاصمة السعودية تجمع بين التسوق العالمي والفعاليات الثقافية والترفيهية',
    region: 'الرياض · العاصمة السعودية',
    imageUrl: 'images/riyadh-kingdom.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kingdom_Centre_Tower.JPG/1280px-Kingdom_Centre_Tower.JPG',
    highlights: ['جسر المشاهدة ببرج المملكة', 'جولات بوليفارد وموسم الرياض', 'فنادق 5 نجوم في حي السفارات والعليا'],
    seasonNote: 'متاح طوال العام'
  },
  {
    id: 'gallery-redsea-ummahat',
    title: 'جزر البحر الأحمر والشعاب المرجانية البكر',
    subtitle: 'استجمام فاخر فوق المياه الفيروزية الصافية في أرخبيل أملج وجزر أمهات بالبحر الأحمر',
    region: 'البحر الأحمر · أملج والوجه',
    imageUrl: 'images/redsea-ummahat.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/%D8%A7%D9%84%D8%B4%D8%B9%D8%A8_%D8%A7%D9%84%D9%85%D8%B1%D8%AC%D8%A7%D9%86%D9%8A%D8%A9_%D8%A8%D8%A7%D9%84%D8%A8%D8%AD%D8%B1_%D8%A7%D9%84%D8%A3%D8%AD%D9%85%D8%B1_-_%D8%A3%D9%85%D9%84%D8%AC.jpg/1280px-%D8%A7%D9%84%D8%B4%D8%B9%D8%A8_%D8%A7%D9%84%D9%85%D8%B1%D8%AC%D8%A7%D9%86%D9%8A%D8%A9_%D8%A8%D8%A7%D9%84%D8%A8%D8%AD%D8%B1_%D8%A7%D9%84%D8%A3%D8%AD%D9%85%D8%B1_-_%D8%A3%D9%85%D9%84%D8%AC.jpg',
    highlights: ['فلل شاطئية وعائمة بخصوصية تامة', 'رحلات يخت وغوص في الشعاب البكر', 'طيران مباشر لمطار البحر الأحمر الدولي'],
    seasonNote: 'طوال العام · طقس معتدل'
  },
  {
    id: 'gallery-abha-asir',
    title: 'قرية رجال ألمع التراثية وقمم عسير',
    subtitle: 'أجواء جبلية باردة وضباب يعانق المدرجات الخضراء والحصون الحجرية الملونة بجنوب المملكة',
    region: 'أبها وعسير · السروات الجنوبية',
    imageUrl: 'images/abha-asir.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%D8%B1%D8%AC%D8%A7%D9%84_%D8%A3%D9%84%D9%85%D8%B91.jpg/1280px-%D8%B1%D8%AC%D8%A7%D9%84_%D8%A3%D9%84%D9%85%D8%B91.jpg',
    highlights: ['زيارة قرية رجال ألمع التاريخية', 'مطل السودة والقرية المعلقة بحبلة', 'رحلات عائلية صيفية في أجواء الغيم'],
    seasonNote: 'مايو — سبتمبر (موسم الصيف)'
  },
  {
    id: 'gallery-taif-mountains',
    title: 'مرتفعات الهدا والشفا بمدينة الورد الطائف',
    subtitle: 'إطلالات جبلية خلابة عبر طريق الكر والتلفريك ومزارع الورد الطائفي القريبة من مكة المكرمة',
    region: 'الطائف · مصيف العرب',
    imageUrl: 'images/taif-mountains.jpg',
    remoteFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Al_Hada_mountain_at_dusk.jpg/1280px-Al_Hada_mountain_at_dusk.jpg',
    highlights: ['رحلة يوم كامل من مكة أو جدة', 'زيارة مصانع ومزارع الورد الطائفي', 'منتجعات الشفا والهدا الجبلية'],
    seasonNote: 'ربيع وصيف الطائف'
  }
];

interface MarqueeRowProps {
  items: GalleryPhotoItem[];
  direction: 'left' | 'right';
  rowIndex: 1 | 2 | 3;
  onSelectPhoto: (item: GalleryPhotoItem) => void;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  items,
  direction,
  rowIndex,
  onSelectPhoto
}) => {
  // Duplicate items twice so translateX(-50%) creates a seamless infinite loop
  const loopedItems = [...items, ...items];
  const animationClass =
    rowIndex === 1
      ? 'animate-marquee-row-1'
      : rowIndex === 2
      ? 'animate-marquee-row-2'
      : 'animate-marquee-row-3';

  return (
    <div
      className="marquee-track relative w-full overflow-hidden py-1"
      dir="ltr"
      data-testid={`gallery-marquee-row-${rowIndex}`}
      data-direction={direction}
    >
      {/* Soft Edge Fade Masks for Eye Comfort */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-[#0B261E] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-[#0B261E] to-transparent z-10" />

      <div className={`flex w-max gap-4 sm:gap-5 ${animationClass}`}>
        {loopedItems.map((item, idx) => (
          <button
            key={`${item.id}-${idx}`}
            type="button"
            dir="rtl"
            onClick={() => onSelectPhoto(item)}
            className="group relative w-[265px] sm:w-[320px] md:w-[355px] h-[170px] sm:h-[190px] md:h-[205px] shrink-0 rounded-2xl overflow-hidden border border-[#244D40] bg-[#103328] text-right shadow-md focus:outline-none focus:ring-2 focus:ring-[#D9A85B] cursor-pointer transition-transform duration-300 hover:scale-[1.015] hover:border-[#D9A85B]/70"
          >
            <img
              src={resolveAssetUrl(item.imageUrl)}
              alt={item.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                const step = target.getAttribute('data-fallback-step') || '0';
                if (step === '0') {
                  target.setAttribute('data-fallback-step', '1');
                  target.src = `public/${item.imageUrl}`;
                } else if (step === '1') {
                  target.setAttribute('data-fallback-step', '2');
                  target.src = item.remoteFallback;
                }
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/90 opacity-95 group-hover:opacity-100 transition-opacity" />

            {/* Top subtle location label */}
            <div className="absolute top-3 right-3.5 left-3.5 flex items-center justify-between text-[11px] text-[#F3CF8A] font-medium">
              <span className="inline-flex items-center gap-1 drop-shadow-sm">
                <MapPin className="w-3 h-3 shrink-0" />
                <span>{item.region}</span>
              </span>
              <span className="text-white/90 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                اضغط للتكبير والتفاصيل
              </span>
            </div>

            {/* Bottom title & description */}
            <div className="absolute bottom-3.5 right-4 left-4 text-white">
              <h3 className="font-display text-lg sm:text-xl font-bold leading-snug mb-1 group-hover:text-[#EBC37C] transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#D5E2DD] line-clamp-1 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export const DestinationsShowcase: React.FC<DestinationsShowcaseProps> = ({
  onSelectDestinationBooking
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);

  const handleBookFromPhoto = (photo: GalleryPhotoItem) => {
    const spotlightPayload: SaudiDestinationSpotlight = {
      id: photo.id,
      name: photo.title,
      region: photo.region,
      tagline: photo.subtitle,
      description: photo.subtitle,
      bestSeason: photo.seasonNote,
      recommendedDays: 4,
      startingPriceSar: 3200,
      artwork: 'makkah-haram',
      highlights: photo.highlights
    };
    setSelectedPhoto(null);
    onSelectDestinationBooking(spotlightPayload);
  };

  return (
    <section
      id="destinations"
      className="py-16 md:py-24 bg-arabesque-emerald text-[#F5F2EB] border-y border-[#1E473B] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#D9A85B] tracking-wide mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02. الجولة البصرية — معرض صور الرحلات والأماكن</span>
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold leading-[1.35] text-white"
              style={{ textWrap: 'balance' }}
            >
              معرض حي لرحلات الحرمين الشريفين وأجمل وجهات المملكة العربية السعودية
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C2D4CD] max-w-md leading-relaxed">
            ثلاثة صفوف بانورامية متحركة باتجاهات متعاكسة وهادئة للعين، تستعرض مشاهد حقيقية من رحلاتنا في مكة المكرمة والمدينة المنورة والعلا والدرعية وجدة والبحر الأحمر وعسير. مرر المؤشر لإيقاف الحركة أو اضغط على أي صورة لعرض تفاصيل الوجهة.
          </p>
        </div>
      </div>

      {/* 3-Row Alternating Moving Photo Gallery */}
      <div className="space-y-4 sm:space-y-5">
        {/* Row 1: Moves Right to Left */}
        <MarqueeRow
          items={GALLERY_ROW_1}
          direction="left"
          rowIndex={1}
          onSelectPhoto={setSelectedPhoto}
        />

        {/* Row 2: Moves Left to Right (Opposite to Row 1) */}
        <MarqueeRow
          items={GALLERY_ROW_2}
          direction="right"
          rowIndex={2}
          onSelectPhoto={setSelectedPhoto}
        />

        {/* Row 3: Moves Right to Left (Opposite to Row 2) */}
        <MarqueeRow
          items={GALLERY_ROW_3}
          direction="left"
          rowIndex={3}
          onSelectPhoto={setSelectedPhoto}
        />
      </div>

      {/* Interactive Lightbox Modal when user clicks any photo in the 3 rows */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#103328] border border-[#2C5E4F] rounded-2xl overflow-hidden shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="إغلاق المعاينة"
                className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 relative min-h-[250px] sm:min-h-[340px] bg-black">
                  <img
                    src={resolveAssetUrl(selectedPhoto.imageUrl)}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const step = target.getAttribute('data-fallback-step') || '0';
                      if (step === '0') {
                        target.setAttribute('data-fallback-step', '1');
                        target.src = `public/${selectedPhoto.imageUrl}`;
                      } else if (step === '1') {
                        target.setAttribute('data-fallback-step', '2');
                        target.src = selectedPhoto.remoteFallback;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden" />
                </div>

                <div className="md:col-span-5 p-6 flex flex-col justify-between bg-[#0F2F25]">
                  <div>
                    <p className="text-xs text-[#EBC37C] mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedPhoto.region}</span>
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white mb-3 leading-snug">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C2D4CD] leading-relaxed mb-5">
                      {selectedPhoto.subtitle}
                    </p>

                    <div className="border-t border-[#244D40] pt-4 mb-5">
                      <p className="text-xs font-semibold text-[#EBC37C] mb-2.5">
                        أبرز مميزات هذه الوجهة مع وكالة مقام:
                      </p>
                      <ul className="space-y-2 text-xs text-[#DCE8E3]">
                        {selectedPhoto.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span className="text-[#D9A85B] font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-[#244D40]">
                    <button
                      type="button"
                      onClick={() => handleBookFromPhoto(selectedPhoto)}
                      className="w-full px-4 py-2.5 bg-[#D9A85B] hover:bg-[#C89646] text-[#141A17] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>اطلب تنظيم هذه الرحلة الآن</span>
                    </button>

                    <a
                      href={buildWhatsAppUrl(
                        `السلام عليكم وكالة مقام، أرغب في الاستفسار عن رحلة وزيارة: ${selectedPhoto.title} (${selectedPhoto.region})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2.5 bg-[#194739] hover:bg-[#215948] text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 border border-[#2E6B58] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
                      <span>استفسر عبر واتساب عن الوجهة</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
