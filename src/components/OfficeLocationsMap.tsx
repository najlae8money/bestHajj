import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { buildWhatsAppUrl } from '../utils/bookingLogic';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  Building2,
  Compass,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export interface OfficeBranch {
  id: string;
  city: string;
  badge: string;
  title: string;
  address: string;
  district: string;
  hours: string;
  phone: string;
  coordinatesLabel: string;
  lat: number;
  lng: number;
  bbox: string;
  directionsUrl: string;
  nearbyLandmarks: { name: string; distance: string }[];
  services: string[];
}

export const OFFICE_BRANCHES: OfficeBranch[] = [
  {
    id: 'makkah-hq',
    city: 'مكة المكرمة',
    badge: 'المقر الرئيسي · خدمة ضيوف الرحمن 24/7',
    title: 'المقر الرئيسي — مكة المكرمة (المنطقة المركزية)',
    address: 'طريق الملك عبدالعزيز — أبراج البوابة، الطابق الرابع، جناح 402',
    district: 'المنطقة المركزية — بالقرب من ساحات المسجد الحرام',
    hours: 'مفتوح على مدار الساعة (24/7 طوال أيام الأسبوع)',
    phone: '920033850',
    coordinatesLabel: '21.4225° N, 39.8262° E',
    lat: 21.4225,
    lng: 39.8262,
    bbox: '39.8120%2C21.4140%2C39.8400%2C21.4310',
    directionsUrl: 'https://www.openstreetmap.org/?mlat=21.4225&mlon=39.8262#map=16/21.4225/39.8262',
    nearbyLandmarks: [
      { name: 'ساحات المسجد الحرام وأبراج البيت', distance: '3 دقائق مشياً' },
      { name: 'محطة قطار الحرمين السريع (الرصيفة)', distance: '8 دقائق بالسيارة' },
      { name: 'مطار الملك عبدالعزيز الدولي بجدة', distance: '54 دقيقة بالقطار' }
    ],
    services: [
      'استقبال ومرافقة المعتمرين والحجاج فور الوصول',
      'إصدار وتحديث تصاريح العمرة والروضة الشريفة',
      'تسكين فندقي فوري وخدمة نقل الأمتعة للحرم'
    ]
  },
  {
    id: 'madinah-branch',
    city: 'المدينة المنورة',
    badge: 'فرع طيبة الطيبة · المنطقة المركزية الشمالية',
    title: 'مكتب المدينة المنورة — جوار المسجد النبوي الشريف',
    address: 'طريق الملك فهد — المنطقة المركزية الشمالية، برج دار التقوى الإداري',
    district: 'شمال المسجد النبوي الشريف — قريب من بوابة الملك فهد',
    hours: 'يومياً من 7:00 صباحاً حتى 12:00 منتصف الليل',
    phone: '920033850',
    coordinatesLabel: '24.4709° N, 39.6122° E',
    lat: 24.4709,
    lng: 39.6122,
    bbox: '39.5980%2C24.4620%2C39.6260%2C24.4790',
    directionsUrl: 'https://www.openstreetmap.org/?mlat=24.4709&mlon=39.6122#map=16/24.4709/39.6122',
    nearbyLandmarks: [
      { name: 'الساحة الشمالية للمسجد النبوي الشريف', distance: '2 دقيقة مشياً' },
      { name: 'مسجد قباء وجادة قباء التاريخية', distance: '10 دقائق بالسيارة' },
      { name: 'محطة قطار الحرمين بالمدينة المنورة', distance: '12 دقيقة بالسيارة' }
    ],
    services: [
      'تنسيق دخول الروضة الشريفة والسلام على المصطفى ﷺ',
      'تنظيم جولات المزارات النبوية (قباء، أُحد، البقيع)',
      'ربط رحلات المدينة المنورة ببرامج العلا والحِجر'
    ]
  },
  {
    id: 'riyadh-branch',
    city: 'الرياض',
    badge: 'فرع العاصمة · السياحة السعودية والعائلات',
    title: 'مكتب الرياض — حي العليا والدرعية التاريخية',
    address: 'طريق الملك فهد — حي العليا، أبراج العليا، المبنى ب، الطابق السابع',
    district: 'قلب العاصمة الرياض — مقابل برج المملكة',
    hours: 'السبت إلى الخميس: 9:00 صباحاً — 10:00 مساءً',
    phone: '920033850',
    coordinatesLabel: '24.7117° N, 46.6744° E',
    lat: 24.7117,
    lng: 46.6744,
    bbox: '46.6600%2C24.7020%2C46.6890%2C24.7210',
    directionsUrl: 'https://www.openstreetmap.org/?mlat=24.7117&mlon=46.6744#map=16/24.7117/46.6744',
    nearbyLandmarks: [
      { name: 'برج المملكة وجسر المشاهدة بالعليا', distance: '3 دقائق مشياً' },
      { name: 'حي الطريف ومطل البجيري بالدرعية', distance: '15 دقيقة بالسيارة' },
      { name: 'مطار الملك خالد الدولي بالرياض', distance: '25 دقيقة بالسيارة' }
    ],
    services: [
      'تصميم باقات العمرة العائلية والسياحة السعودية الشاملة',
      'تنظيم الجولات الخاصة في الدرعية، العلا، والبحر الأحمر',
      'خدمات كبار الشخصيات (VIP) وحجوزات الطيران والفنادق'
    ]
  }
];

export const OfficeLocationsMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(OFFICE_BRANCHES[0].id);

  const activeBranch =
    OFFICE_BRANCHES.find((b) => b.id === selectedId) || OFFICE_BRANCHES[0];

  const embedMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${activeBranch.bbox}&layer=mapnik&marker=${activeBranch.lat}%2C${activeBranch.lng}`;

  return (
    <section
      id="office-map"
      className="py-16 md:py-24 bg-arabesque-light border-t border-[#E2DACB] scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#8C6527] mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0D4A38]" />
              <span>06. مواقع مكاتبنا وفروعنا على الخريطة</span>
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold text-[#141A17] leading-[1.35]"
              style={{ textWrap: 'balance' }}
            >
              تفضل بزيارة مكاتب وكالة مقام في مكة المكرمة والمدينة المنورة والرياض
            </h2>
          </div>

          {/* Branch City Switcher Tabs (Full-Width 3-Col Grid on Mobile, Inline on Desktop) */}
          <div
            className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex items-center gap-1.5 sm:gap-1 p-1.5 sm:p-1 bg-[#EAE3D5] rounded-xl sm:rounded-lg self-stretch sm:self-start"
            role="tablist"
            aria-label="فروع وكالة مقام"
          >
            {OFFICE_BRANCHES.map((branch) => {
              const isSelected = branch.id === activeBranch.id;
              return (
                <button
                  key={branch.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(branch.id)}
                  className={`w-full sm:w-auto px-2.5 sm:px-4 py-2.5 sm:py-2 text-xs font-semibold text-center rounded-lg sm:rounded-md transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D4A38] text-white shadow-2xs'
                      : 'text-[#3A443E] hover:text-[#141A17] bg-white/50 sm:bg-transparent'
                  }`}
                >
                  {branch.city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Office + Live Interactive Map Split Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBranch.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          >
            {/* Right Column (RTL): Office Details & Landmarks Card */}
            <div className="lg:col-span-5 bg-white border border-[#DFD6C5] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#8C6527] mb-2">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Building2 className="w-4 h-4 text-[#0D4A38]" />
                    <span>{activeBranch.badge}</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#5A655E] tabular-nums" dir="ltr">
                    {activeBranch.coordinatesLabel}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#141A17] mb-3 leading-snug">
                  {activeBranch.title}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#3A443E] pb-5 mb-5 border-b border-[#EFEAE0]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#0D4A38] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[#141A17]">{activeBranch.address}</p>
                      <p className="text-xs text-[#5A655E] mt-0.5">{activeBranch.district}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#8C6527] shrink-0 mt-0.5" />
                    <span>{activeBranch.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#0D4A38] shrink-0" />
                    <span className="tabular-nums font-medium">
                      الرقم الموحد: {activeBranch.phone}
                    </span>
                  </div>
                </div>

                {/* Nearby Landmarks */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[#141A17] mb-2.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#8C6527]" />
                    <span>المسافة من أبرز المعالم المجاورة للمكتب:</span>
                  </p>
                  <div className="space-y-2">
                    {activeBranch.nearbyLandmarks.map((lm) => (
                      <div
                        key={lm.name}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#E6DFD1] text-xs"
                      >
                        <span className="text-[#2B3530] font-medium">{lm.name}</span>
                        <span className="font-semibold text-[#0D4A38] whitespace-nowrap">
                          {lm.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Branch Services */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-[#141A17] mb-2">
                    خدمات المكتب للزوار والمعتمرين:
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#4B5650]">
                    {activeBranch.services.map((srv) => (
                      <li key={srv} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D4A38] shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-[#EFEAE0]">
                <a
                  href={activeBranch.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#0D4A38] hover:bg-[#09382A] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>فتح الاتجاهات على الخريطة</span>
                </a>

                <a
                  href={buildWhatsAppUrl(
                    `السلام عليكم وكالة مقام، أرغب في زيارة ${activeBranch.title} (${activeBranch.address})، يرجى إرسال الموقع الدقيق.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#F3EFE6] hover:bg-[#E7E0D0] text-[#141A17] border border-[#D5CBB8] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>طلب الموقع عبر واتساب</span>
                </a>
              </div>
            </div>

            {/* Left Column (RTL): Live Interactive Map Canvas Only */}
            <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-[#C9C0B1] bg-[#0B261E] shadow-md min-h-[410px] sm:min-h-[480px]">
              {/* Map Top Header Bar */}
              <div className="px-4 sm:px-5 py-3.5 bg-[#0B261E] border-b border-[#1E473B] flex flex-wrap items-center justify-between gap-3 text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="font-semibold text-[#F5F2EB]">
                    الخريطة الحية — {activeBranch.city} ({activeBranch.district})
                  </span>
                </div>

                <span className="font-mono text-[11px] text-[#EBC37C] tabular-nums" dir="ltr">
                  {activeBranch.coordinatesLabel}
                </span>
              </div>

              {/* Live Map Viewport */}
              <div className="relative flex-1 min-h-[360px] sm:min-h-[420px] bg-[#E8E4DC]">
                <iframe
                  key={activeBranch.id}
                  title={`خريطة موقع مكتب وكالة مقام في ${activeBranch.city}`}
                  src={embedMapUrl}
                  className="w-full h-full min-h-[360px] sm:min-h-[420px] border-0"
                  loading="lazy"
                />

                {/* Floating Office Pin Card Overlay at Bottom of Live Map */}
                <div className="pointer-events-none absolute bottom-4 right-4 left-4 flex items-end justify-between gap-3">
                  <div className="pointer-events-auto bg-[#0B261E]/95 backdrop-blur-xs text-white border border-[#D9A85B]/50 rounded-xl p-3.5 shadow-lg max-w-md">
                    <div className="flex items-center gap-2 text-[11px] text-[#EBC37C] mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>علامة موقع المكتب على الخريطة الحية</span>
                    </div>
                    <p className="font-display text-base font-bold text-white leading-snug">
                      {activeBranch.title}
                    </p>
                    <p className="text-[11px] text-[#C2D4CD] mt-0.5">
                      {activeBranch.address}
                    </p>
                  </div>

                  <a
                    href={activeBranch.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#D9A85B] hover:bg-[#C89646] text-[#141A17] text-xs font-bold shadow-lg transition-colors"
                  >
                    <span>تكبير الخريطة</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
