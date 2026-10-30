import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UMRAH_STEPS,
  HAJJ_STEPS,
  MIQAT_LOCATIONS,
  HaramainStation,
  getHaramainRouteDetails
} from '../utils/bookingLogic';
import { Check, Train, Compass, BookOpen } from 'lucide-react';

export const ManasikAndTrainGuide: React.FC = () => {
  const [ritualType, setRitualType] = useState<'umrah' | 'hajj'>('umrah');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'umrah-1-ihram': true
  });
  const [selectedMiqatId, setSelectedMiqatId] = useState<string>(MIQAT_LOCATIONS[0].id);

  const [fromStation, setFromStation] = useState<HaramainStation>('makkah');
  const [toStation, setToStation] = useState<HaramainStation>('madinah');

  const steps = ritualType === 'umrah' ? UMRAH_STEPS : HAJJ_STEPS;
  const completedCount = steps.filter((s) => completedSteps[s.id]).length;
  const selectedMiqat =
    MIQAT_LOCATIONS.find((m) => m.id === selectedMiqatId) || MIQAT_LOCATIONS[0];

  const routeDetail = getHaramainRouteDetails(fromStation, toStation);

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-16 md:space-y-24 py-16 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
      {/* Section 03: Manasik & Miqat Interactive Guide */}
      <section id="manasik" className="scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#8C6527] mb-2">
              03. الدليل الإرشادي للمناسك والمواقيت
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold text-[#141A17] leading-[1.38] mb-3"
              style={{ textWrap: 'balance' }}
            >
              فقه المناسك خطوة بخطوة على هدي السنة النبوية
            </h2>
            <p className="text-sm md:text-base text-[#4B5650]">
              تصفح خطوات أداء العمرة أو الحج مع الأدعية المأثورة والتنبيهات الشرعية، وحدد الميقات المكاني الموافق لجهة قدومك.
            </p>
          </div>

          {/* Interactive Segmented Control (Full-Width 2-Column Grid on Mobile, Inline Row on Desktop) */}
          <div
            className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex items-center gap-1.5 sm:gap-1 p-1.5 sm:p-1 bg-[#EAE3D5] rounded-xl sm:rounded-lg self-stretch sm:self-start"
            role="tablist"
            aria-label="اختيار دليل المناسك"
          >
            <button
              type="button"
              role="tab"
              aria-selected={ritualType === 'umrah'}
              onClick={() => setRitualType('umrah')}
              className={`w-full sm:w-auto px-2.5 sm:px-4 py-2.5 sm:py-2 text-xs font-semibold text-center leading-snug rounded-lg sm:rounded-md transition-colors cursor-pointer ${
                ritualType === 'umrah'
                  ? 'bg-[#0D4A38] text-white shadow-2xs'
                  : 'text-[#3A443E] hover:text-[#141A17] bg-white/50 sm:bg-transparent'
              }`}
            >
              <span>مناسك العمرة</span>
              <span className="hidden sm:inline"> (4 أركان وواجبات)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={ritualType === 'hajj'}
              onClick={() => setRitualType('hajj')}
              className={`w-full sm:w-auto px-2.5 sm:px-4 py-2.5 sm:py-2 text-xs font-semibold text-center leading-snug rounded-lg sm:rounded-md transition-colors cursor-pointer ${
                ritualType === 'hajj'
                  ? 'bg-[#0D4A38] text-white shadow-2xs'
                  : 'text-[#3A443E] hover:text-[#141A17] bg-white/50 sm:bg-transparent'
              }`}
            >
              <span>مناسك الحج</span>
              <span className="hidden sm:inline"> (من التروية للوداع)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Steps Checklist */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#4B5650] pb-2 border-b border-[#E2DACB]">
              <span className="flex items-center gap-2 font-medium text-[#141A17]">
                <BookOpen className="w-4 h-4 text-[#0D4A38]" />
                قائمة المتابعة الشخصية للمعتمر والحاج
              </span>
              <span className="tabular-nums font-medium">
                تم إنجاز {completedCount} من {steps.length} خطوات
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={ritualType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {steps.map((step) => {
                  const isDone = Boolean(completedSteps[step.id]);
                  return (
                    <div
                      key={step.id}
                      className={`border rounded-xl p-5 sm:p-6 transition-colors ${
                        isDone
                          ? 'bg-[#F3EFE6] border-[#0D4A38]/40'
                          : 'bg-white border-[#E2DACB]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="text-xs text-[#8C6527] mb-1">
                            الخطوة 0{step.order} · {step.location}
                          </div>
                          <h3 className="font-display text-xl font-bold text-[#141A17]">
                            {step.title}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleStep(step.id)}
                          aria-pressed={isDone}
                          className={`self-start px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isDone
                              ? 'bg-[#0D4A38] text-white border-[#0D4A38]'
                              : 'bg-[#FAF8F5] text-[#141A17] border-[#D5CBB8] hover:border-[#0D4A38]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          {isDone ? 'مكتملة' : 'تحديد كمكتملة'}
                        </button>
                      </div>

                      <p className="text-sm text-[#3A443E] leading-relaxed mb-4">
                        {step.summary}
                      </p>

                      <div className="bg-[#FAF8F5] border border-[#E6DFD1] rounded-lg p-4 mb-3">
                        <p className="text-[11px] text-[#8C6527] mb-1 font-medium">
                          الذكر والدعاء المأثور:
                        </p>
                        <p className="font-display text-lg text-[#0D4A38] leading-relaxed">
                          « {step.duaArabic} »
                        </p>
                      </div>

                      <p className="text-xs text-[#5A655E]">
                        هدي السنة: {step.sunnahTip}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Spatial Miqats Explorer */}
          <div className="lg:col-span-4 bg-white border border-[#E2DACB] rounded-xl p-5 sm:p-6 h-fit">
            <div className="flex items-center gap-2 text-xs font-medium text-[#8C6527] mb-2">
              <Compass className="w-4 h-4 text-[#0D4A38]" />
              <span>دليل المواقيت المكانية الخمسة</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#141A17] mb-3">
              اختر ميقات الإحرام حسب وجهتك
            </h3>
            <p className="text-xs text-[#4B5650] leading-relaxed mb-4">
              حدد الميقات لمعرفة اسمه المعاصر والمسافة المتبقية إلى المسجد الحرام بمكة المكرمة:
            </p>

            <div className="space-y-2 mb-6">
              {MIQAT_LOCATIONS.map((miqat) => {
                const active = miqat.id === selectedMiqat.id;
                return (
                  <button
                    key={miqat.id}
                    type="button"
                    onClick={() => setSelectedMiqatId(miqat.id)}
                    className={`w-full text-right px-4 py-3 rounded-lg border text-sm transition-colors flex items-center justify-between cursor-pointer ${
                      active
                        ? 'bg-[#0D4A38] text-white border-[#0D4A38]'
                        : 'bg-[#FAF8F5] text-[#141A17] border-[#E2DACB] hover:border-[#0D4A38]'
                    }`}
                  >
                    <span className="font-semibold">{miqat.name}</span>
                    <span className={`text-xs tabular-nums ${active ? 'text-[#EBC37C]' : 'text-[#5A655E]'}`}>
                      {miqat.distanceToMakkahKm} كم للحرم
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#F3EFE6] border border-[#DFD6C5] rounded-lg p-4 space-y-2.5 text-xs">
              <div>
                <span className="text-[#5A655E] block">الاسم المعاصر والمنطقة:</span>
                <span className="font-semibold text-sm text-[#141A17]">{selectedMiqat.modernName}</span>
              </div>
              <div>
                <span className="text-[#5A655E] block">الاتجاه والمسافة لمكة المكرمة:</span>
                <span className="tabular-nums text-[#141A17]">
                  {selectedMiqat.direction} · {selectedMiqat.distanceToMakkahKm} كم
                </span>
              </div>
              <div>
                <span className="text-[#5A655E] block">مخصص للقادمين من:</span>
                <span className="text-[#141A17] leading-relaxed">{selectedMiqat.forPilgrimsFrom}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Haramain High-Speed Railway Interactive Explorer */}
      <section
        id="haramain-train"
        className="scroll-mt-24 bg-arabesque-sand border border-[#E2DACB] rounded-2xl p-6 sm:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-medium text-[#8C6527] mb-2">
              <Train className="w-4 h-4 text-[#0D4A38]" />
              <span>04. شبكة قطار الحرمين السريع (300 كم/ساعة)</span>
            </div>
            <h2
              className="font-display text-2xl md:text-3xl font-bold text-[#141A17] leading-[1.38] mb-3"
              style={{ textWrap: 'balance' }}
            >
              تنقل سلس بين مكة المكرمة والمدينة المنورة ومطار جدة
            </h2>
            <p className="text-sm text-[#4B5650] leading-relaxed mb-6">
              يربط قطار الحرمين السريع بين مكة المكرمة والمدينة المنورة مروراً بمطار الملك عبدالعزيز الدولي بجدة ومدينة الملك عبدالله الاقتصادية في رحلة كهربائية هادئة ومريحة مشمولة ضمن باقاتنا.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="train-from" className="block text-xs font-medium text-[#4B5650] mb-1.5">
                  محطة القيام
                </label>
                <select
                  id="train-from"
                  value={fromStation}
                  onChange={(e) => {
                    const nextFrom = e.target.value as HaramainStation;
                    setFromStation(nextFrom);
                    if (nextFrom === toStation) {
                      setToStation(nextFrom === 'makkah' ? 'madinah' : 'makkah');
                    }
                  }}
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                >
                  <option value="makkah">مكة المكرمة (الرصيفة)</option>
                  <option value="jeddah-airport">مطار الملك عبدالعزيز (جدة)</option>
                  <option value="kaec">مدينة الملك عبدالله الاقتصادية</option>
                  <option value="madinah">المدينة المنورة (حي المعرفة)</option>
                </select>
              </div>

              <div>
                <label htmlFor="train-to" className="block text-xs font-medium text-[#4B5650] mb-1.5">
                  محطة الوصول
                </label>
                <select
                  id="train-to"
                  value={toStation}
                  onChange={(e) => {
                    const nextTo = e.target.value as HaramainStation;
                    setToStation(nextTo);
                    if (nextTo === fromStation) {
                      setFromStation(nextTo === 'madinah' ? 'makkah' : 'madinah');
                    }
                  }}
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                >
                  <option value="madinah">المدينة المنورة (حي المعرفة)</option>
                  <option value="makkah">مكة المكرمة (الرصيفة)</option>
                  <option value="jeddah-airport">مطار الملك عبدالعزيز (جدة)</option>
                  <option value="kaec">مدينة الملك عبدالله الاقتصادية</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-[#DFD6C5] rounded-xl p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#DFD6C5] text-xs text-[#4B5650]">
              <span className="font-semibold text-sm text-[#141A17]">
                {routeDetail.fromName} ← {routeDetail.toName}
              </span>
              <span className="tabular-nums text-[#0D4A38] font-medium">
                {routeDetail.dailyTrips} رحلة يومية منتظمة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="bg-[#FAF8F5] border border-[#E2DACB] rounded-lg p-3.5">
                <span className="text-[11px] text-[#5A655E] block mb-1">زمن الرحلة</span>
                <span className="text-lg font-bold tabular-nums text-[#0D4A38]">
                  {routeDetail.durationMinutes} دقيقة
                </span>
              </div>
              <div className="bg-[#FAF8F5] border border-[#E2DACB] rounded-lg p-3.5">
                <span className="text-[11px] text-[#5A655E] block mb-1">المسافة المقطوعة</span>
                <span className="text-lg font-bold tabular-nums text-[#141A17]">
                  {routeDetail.distanceKm} كم
                </span>
              </div>
              <div className="bg-[#FAF8F5] border border-[#E2DACB] rounded-lg p-3.5">
                <span className="text-[11px] text-[#5A655E] block mb-1">السرعة التشغيلية</span>
                <span className="text-lg font-bold tabular-nums text-[#8C6527]">
                  300 كم / ساعة
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-[#4B5650] block mb-1">
                  مزايا المحطة والربط مع الحرمين:
                </span>
                <p className="text-xs font-medium text-[#141A17]">
                  {routeDetail.stationAmenities}
                </p>
              </div>

              <div>
                <span className="text-xs text-[#4B5650] block mb-1.5">
                  أبرز مواعيد الانطلاق اليومية المتاحة ضمن باقات مقام:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs tabular-nums text-[#141A17]">
                  {routeDetail.departuresSample.map((time, idx) => (
                    <React.Fragment key={time}>
                      <span>{time}</span>
                      {idx < routeDetail.departuresSample.length - 1 && (
                        <span aria-hidden="true" className="text-[#8C6527]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
