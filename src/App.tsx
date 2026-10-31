import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PACKAGES_DATA,
  TravelPackage,
  SaudiDestinationSpotlight,
  PackageCategory,
  SortOption,
  filterAndSortPackages
} from './utils/bookingLogic';
import { SceneArtwork } from './components/SceneArtwork';
import { DestinationsShowcase } from './components/DestinationsShowcase';
import { ManasikAndTrainGuide } from './components/ManasikAndTrainGuide';
import { PackageDetailsModal } from './components/PackageDetailsModal';
import { BookingModal, BookingDraftTarget } from './components/BookingModal';
import { WhatsAppFloatingWidget } from './components/WhatsAppFloatingWidget';
import { OfficeLocationsMap } from './components/OfficeLocationsMap';
import {
  Search,
  SlidersHorizontal,
  ArrowUpLeft,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [category, setCategory] = useState<PackageCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [selectedPackageForDetails, setSelectedPackageForDetails] =
    useState<TravelPackage | null>(null);
  const [bookingTarget, setBookingTarget] = useState<BookingDraftTarget | null>(null);

  const visiblePackages = filterAndSortPackages(PACKAGES_DATA, {
    category,
    searchQuery,
    sortBy
  });

  const handleOpenPackageBooking = (pkg: TravelPackage) => {
    setBookingTarget({
      packageId: pkg.id,
      packageTitle: pkg.title,
      categoryLabel: pkg.categoryLabel,
      defaultPilgrimsCount: 2,
      defaultOccupancy: 'double',
      defaultDepartureDate: pkg.nextDeparture
    });
  };

  const handleOpenDestinationBooking = (dest: SaudiDestinationSpotlight) => {
    setBookingTarget({
      packageId: dest.id,
      packageTitle: `برنامج زيارة واستكشاف ${dest.name}`,
      categoryLabel: dest.region,
      defaultPilgrimsCount: 2,
      defaultOccupancy: 'double',
      defaultDepartureDate: 'رحلات أسبوعية منتظمة'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-arabesque-light text-[#141A17] overflow-x-hidden">
      {/* Strict 3-Zone Top Bar Contract + Responsive Mobile Menu */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-[#E2DACB]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 md:gap-8 px-4 sm:px-6 py-3.5 sm:py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0D4A38] whitespace-nowrap shrink-0"
          >
            مقام للحرمين والسياحة
          </a>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3A443E]"
          >
            <a
              href="#packages"
              className="hover:text-[#0D4A38] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              الباقات والرحلات
            </a>
            <a
              href="#destinations"
              className="hover:text-[#0D4A38] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              الجولة البصرية
            </a>
            <a
              href="#manasik"
              className="hover:text-[#0D4A38] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              دليل المناسك
            </a>
            <a
              href="#haramain-train"
              className="hover:text-[#0D4A38] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              قطار الحرمين
            </a>
            <a
              href="#office-map"
              className="hover:text-[#0D4A38] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              مكاتبنا والخريطة
            </a>
          </nav>

          {/* Zone 3: Primary action + Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenPackageBooking(PACKAGES_DATA[0])}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-white bg-[#0D4A38] hover:bg-[#09382A] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              احجز رحلتك الآن
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح قائمة التنقل'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-9 h-9 rounded-lg border border-[#D5CBB8] bg-white flex items-center justify-center text-[#141A17] hover:bg-[#F3EFE6] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              aria-label="قائمة الجوال"
              className="md:hidden bg-[#FAF8F5] border-t border-[#E2DACB] px-4 py-3 space-y-1 overflow-hidden"
            >
              {[
                { href: '#packages', label: 'الباقات والرحلات المعتمدة' },
                { href: '#destinations', label: 'الجولة البصرية — معرض الصور' },
                { href: '#manasik', label: 'دليل مناسك العمرة والحج' },
                { href: '#haramain-train', label: 'محطات قطار الحرمين السريع' },
                { href: '#office-map', label: 'مكاتبنا وموقعنا على الخريطة' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#141A17] hover:bg-[#F3EFE6] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section with Animated Entrance & Rich Background */}
        <section className="pt-8 pb-12 md:py-16 border-b border-[#E2DACB]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Editorial Value Proposition Column */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="lg:col-span-6 flex flex-col justify-between py-2"
              >
                <div>
                  <p className="text-xs font-medium text-[#8C6527] mb-3">
                    ترخيص وزارة الحج والعمرة رقم 4401982 · شريك رسمي لمنصة نسك والهيئة السعودية للسياحة
                  </p>
                  <h1
                    className="font-display font-bold text-[#141A17] leading-[1.38] mb-5"
                    style={{
                      fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)',
                      textWrap: 'balance'
                    }}
                  >
                    رحلات العمرة والحج ووجهات المملكة التاريخية بمعايير ضيافة استثنائية
                  </h1>
                  <p className="text-sm sm:text-base text-[#4B5650] leading-relaxed mb-8 max-w-[62ch]">
                    نرتب لك كامل تفاصيل رحلتك الروحانية والسياحية في المملكة العربية السعودية؛ من الإقامة المطلة مباشرة على الكعبة المشرفة والروضة الشريفة وتذاكر قطار الحرمين السريع، إلى استكشاف إرث العلا والدرعية وجزر البحر الأحمر وقمم عسير.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <a
                      href="#packages"
                      className="w-full sm:w-auto text-center px-6 py-3.5 text-sm font-semibold text-white bg-[#0D4A38] hover:bg-[#09382A] rounded-lg transition-colors whitespace-nowrap"
                    >
                      استعرض باقات العمرة والسياحة
                    </a>
                    <a
                      href="#destinations"
                      className="w-full sm:w-auto text-center px-5 py-3.5 text-sm font-medium text-[#141A17] bg-[#F3EFE6] hover:bg-[#E8E1D3] border border-[#D5CBB8] rounded-lg transition-colors whitespace-nowrap"
                    >
                      تصفح معرض الوجهات بالصور
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A655E] pt-2 border-t border-[#E6DFD1]">
                    <span>إصدار فوري لتأشيرة العمرة والسياحة</span>
                    <span aria-hidden="true">·</span>
                    <span>تصاريح الروضة الشريفة مؤكدة</span>
                    <span aria-hidden="true">·</span>
                    <span>مرافقة إرشادية شرعية وتاريخية</span>
                  </div>
                </div>
              </motion.div>

              {/* 16:9 Real Photography Hero Showcase Column */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="lg:col-span-6"
              >
                <div className="relative h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[430px] rounded-2xl overflow-hidden border border-[#D5CBB8] shadow-md">
                  <SceneArtwork
                    type="makkah-haram"
                    continuousZoom
                    className="w-full h-full lg:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-5 right-5 left-5 sm:bottom-6 sm:right-6 sm:left-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#EBC37C] mb-1">
                        موسم العمرة والزيارة · إقامة أبراج البيت وجبل عمر
                      </p>
                      <p className="font-display text-xl sm:text-2xl font-bold">
                        إطلالات مباشرة على صحن المطاف وساحات المسجد النبوي
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPackageForDetails(PACKAGES_DATA[0])}
                      className="px-4 py-2 bg-white/95 hover:bg-white text-[#141A17] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-end cursor-pointer"
                    >
                      تفاصيل باقة الصفوة
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 pt-8 border-t border-[#E2DACB]">
              <div>
                <p className="text-2xl md:text-3xl font-bold tabular-nums text-[#0D4A38] mb-1">
                  +48,500
                </p>
                <p className="text-xs text-[#4B5650]">
                  معتمر وحاج وزائر تشرفنا بخدمتهم خلال المواسم الثلاثة الماضية
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tabular-nums text-[#0D4A38] mb-1">
                  50 متراً
                </p>
                <p className="text-xs text-[#4B5650]">
                  أقرب مسافة مشي لفنادقنا المتعاقدة عن ساحات المسجد الحرام والمسجد النبوي
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tabular-nums text-[#0D4A38] mb-1">
                  140 دقيقة
                </p>
                <p className="text-xs text-[#4B5650]">
                  زمن الانتقال بين مكة المكرمة والمدينة المنورة عبر قطار الحرمين السريع
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tabular-nums text-[#0D4A38] mb-1">
                  4.94 / 5
                </p>
                <p className="text-xs text-[#4B5650]">
                  متوسط تقييم ضيوف الرحمن لجودة التسكين ودقة المواعيد عبر منصة نسك
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: Curated Packages Marketplace */}
        <section id="packages" className="py-16 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#8C6527] mb-2">
                01. الباقات المعتمدة للعمرة والحج والسياحة السعودية
              </p>
              <h2
                className="font-display text-3xl md:text-4xl font-bold text-[#141A17] leading-[1.38]"
                style={{ textWrap: 'balance' }}
              >
                اختر رحلتك بين رحاب الحرمين الشريفين وكنوز المملكة الثقافية
              </h2>
            </div>

            {/* Category Filter Segmented Control (Full-Width 2x2 Grid on Mobile, Inline Row on Desktop) */}
            <div
              className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex items-center gap-1.5 sm:gap-1 p-1.5 sm:p-1 bg-[#EAE3D5] rounded-xl sm:rounded-lg self-stretch sm:self-start lg:self-auto"
              role="tablist"
              aria-label="تصنيف الباقات"
            >
              {(
                [
                  { id: 'all', label: 'جميع الباقات (6)' },
                  { id: 'umrah', label: 'باقات العمرة' },
                  { id: 'hajj', label: 'باقات الحج' },
                  { id: 'tourism', label: 'السياحة السعودية' }
                ] as const
              ).map((tab) => {
                const active = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(tab.id)}
                    className={`w-full sm:w-auto px-3 sm:px-3.5 py-2.5 sm:py-2 text-xs font-semibold text-center rounded-lg sm:rounded-md transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0D4A38] text-white shadow-2xs'
                        : 'text-[#3A443E] hover:text-[#141A17] bg-white/50 sm:bg-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Sort Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10 p-4 bg-arabesque-sand border border-[#E2DACB] rounded-xl">
            <div className="md:col-span-8 relative">
              <label htmlFor="package-search-input" className="sr-only">
                ابحث عن باقة أو مدينة أو فندق
              </label>
              <Search className="w-4 h-4 text-[#5A655E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="package-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالوجهة أو الفندق (مثال: مكة، المدينة، العلا، الدرعية، البحر الأحمر، فيرمونت)..."
                className="w-full bg-white border border-[#D5CBB8] rounded-lg pr-10 pl-4 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#5A655E] shrink-0" />
              <label
                htmlFor="package-sort-select"
                className="text-xs font-medium text-[#4B5650] whitespace-nowrap"
              >
                ترتيب حسب:
              </label>
              <select
                id="package-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3 py-2.5 text-xs font-medium text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
              >
                <option value="featured">الأكثر طلباً وتوصية</option>
                <option value="distance-asc">الأقرب لساحة الحرم الشريف</option>
                <option value="rating-desc">الأعلى تقييماً من المعتمرين</option>
                <option value="duration-desc">الأطول مدة وإقامة</option>
              </select>
            </div>
          </div>

          {/* Packages Grid with Staggered Motion */}
          {visiblePackages.length === 0 ? (
            <div className="bg-white border border-[#E2DACB] rounded-xl p-10 sm:p-12 text-center">
              <p className="font-display text-2xl font-bold text-[#141A17] mb-2">
                لا توجد باقات مطابقة لبحثك الحالي
              </p>
              <p className="text-sm text-[#5A655E] mb-5">
                جرب تغيير تصنيف الباقة أو مسح نص البحث لاستعراض كافة الرحلات المتاحة.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-[#0D4A38] text-white text-xs font-semibold rounded-lg hover:bg-[#09382A] transition-colors cursor-pointer"
              >
                عرض جميع الباقات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {visiblePackages.map((pkg, idx) => (
                <motion.article
                  key={pkg.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: idx * 0.05 }}
                  data-testid={`package-card-${pkg.id}`}
                  className="group bg-white border border-[#E2DACB] rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-1 shadow-2xs"
                >
                  <div>
                    {/* 4:3 Visual Artwork */}
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <SceneArtwork type={pkg.artwork} className="w-full h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute bottom-3.5 right-4 left-4 text-white flex items-center justify-between text-xs">
                        <span>{pkg.destinations.join(' · ')}</span>
                        <span className="tabular-nums text-[#EBC37C] font-semibold">
                          ★ {pkg.rating} ({pkg.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Card Body — Zero-Pill Unboxed Metadata */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8C6527] mb-2">
                        <span>{pkg.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{pkg.durationDays} أيام</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.distanceLabel}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-[#141A17] leading-snug mb-2">
                        {pkg.title}
                      </h3>

                      <p className="text-xs text-[#4B5650] leading-relaxed mb-4">
                        {pkg.subtitle}
                      </p>

                      <div className="text-xs text-[#3A443E] space-y-1.5 pt-3 border-t border-[#EFEAE0]">
                        <p>
                          <span className="text-[#5A655E]">الفنادق: </span>
                          <span className="font-medium">{pkg.hotelName}</span>
                        </p>
                        <p>
                          <span className="text-[#5A655E]">النقل والضيافة: </span>
                          <span>{pkg.transportType} · {pkg.mealPlan}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 py-4 bg-[#FAF8F5] border-t border-[#E6DFD1] flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[11px] text-[#5A655E] block">مستوى الإقامة والضيافة</span>
                      <span className="text-xs font-semibold text-[#0D4A38] block truncate">
                        {pkg.tierBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedPackageForDetails(pkg)}
                        aria-label={`تفاصيل ${pkg.title}`}
                        className="px-3 py-2 text-xs font-medium text-[#141A17] border border-[#D5CBB8] rounded-lg hover:bg-[#F3EFE6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        التفاصيل
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenPackageBooking(pkg)}
                        aria-label={`احجز ${pkg.title}`}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0D4A38] hover:bg-[#09382A] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        احجز الباقة
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* Section 02: 3-Row Alternating Animated Visual Tour Gallery */}
        <DestinationsShowcase onSelectDestinationBooking={handleOpenDestinationBooking} />

        {/* Sections 03 & 04: Interactive Manasik Guide + Haramain High-Speed Railway */}
        <ManasikAndTrainGuide />

        {/* Section 05: Proof & Verified Pilgrim Testimonials (Clean Author Name Only) */}
        <section className="py-16 md:py-20 bg-arabesque-sand border-t border-[#E2DACB]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-medium text-[#8C6527] mb-2">
                05. شهادات موثقة من ضيوف الرحمن وزوار المملكة
              </p>
              <h2 className="font-display text-3xl font-bold text-[#141A17]">
                تجارب حقيقية لعائلات ومعتمرين سافروا عبر وكالة مقام
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <blockquote className="bg-white border border-[#E2DACB] rounded-xl p-6 flex flex-col justify-between">
                <p className="text-sm text-[#3A443E] leading-relaxed mb-6">
                  «كنا نخشى صعوبة تنقل الوالدين أثناء العمرة، لكن اختيار وكالة مقام لفندق فيرمونت المطل مباشرة على الحرم مع تذاكر قطار الحرمين درجة الأعمال اختصر علينا ساعات من الجهد، وصدرت تصاريح الروضة الشريفة للجميع قبل السفر بأربعة أيام.»
                </p>
                <footer className="text-xs border-t border-[#EFEAE0] pt-3">
                  <div className="font-semibold text-[#141A17]">طارق بن عبدالمجيد الأنصاري</div>
                </footer>
              </blockquote>

              <blockquote className="bg-white border border-[#E2DACB] rounded-xl p-6 flex flex-col justify-between">
                <p className="text-sm text-[#3A443E] leading-relaxed mb-6">
                  «دمجنا برنامج العمرة مع رحلة 3 ليالٍ إلى العلا والحِجر. التنظيم بين المدينة المنورة والعلا كان دقيقاً للغاية، والجولة التاريخية في مدائن صالح وجبل الفيل أضافت بعداً ثقافياً لا يُنسى لرحلتنا.»
                </p>
                <footer className="text-xs border-t border-[#EFEAE0] pt-3">
                  <div className="font-semibold text-[#141A17]">نورة بنت فهد القحطاني</div>
                </footer>
              </blockquote>

              <blockquote className="bg-white border border-[#E2DACB] rounded-xl p-6 flex flex-col justify-between">
                <p className="text-sm text-[#3A443E] leading-relaxed mb-6">
                  «خلال رحلة الحج كانت مخيمات مجر الكبش المطورة قريبة جداً من الجمرات مع توفر قطار المشاعر والإشراف الشرعي والطبي على مدار الساعة. المتابعة الفورية عبر واتساب مع فريق مقام جعلت رحلتنا في غاية الطمأنينة.»
                </p>
                <footer className="text-xs border-t border-[#EFEAE0] pt-3">
                  <div className="font-semibold text-[#141A17]">عبدالكريم بن حسن الشامسي</div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Section 06: Interactive Office Locations & Map Showcase */}
        <OfficeLocationsMap />
      </main>

      {/* Quiet Footer with Emerald Arabesque Background */}
      <footer className="bg-arabesque-emerald text-[#C2D4CD] border-t border-[#1E473B] py-12 pb-24 sm:pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#244D40]">
            <div className="md:col-span-5">
              <p className="font-display text-2xl font-bold text-white mb-2">
                مقام للحرمين والسياحة
              </p>
              <p className="text-xs text-[#9AB3AA] leading-relaxed max-w-sm">
                وكالة سعودية مرخصة من وزارة الحج والعمرة والهيئة السعودية للسياحة، متخصصة في تنظيم رحلات العمرة والحج الفاخرة والميسرة والرحلات الثقافية في العلا والدرعية والبحر الأحمر وعسير.
              </p>
            </div>

            <div className="md:col-span-4 text-xs space-y-2">
              <p className="font-semibold text-white mb-2">المكاتب الرئيسية والتواصل</p>
              <p>مكة المكرمة — طريق الملك عبدالعزيز، أبراج البوابة</p>
              <p>المدينة المنورة — المنطقة المركزية الشمالية</p>
              <p className="tabular-nums">الرقم الموحد وواتساب: 920033850 · خدمة ضيوف الرحمن 24/7</p>
            </div>

            <div className="md:col-span-3 text-xs space-y-2">
              <p className="font-semibold text-white mb-2">روابط سريعة</p>
              <ul className="space-y-1.5">
                <li>
                  <a href="#packages" className="hover:text-white transition-colors inline-flex items-center gap-1">
                    الباقات المعتمدة <ArrowUpLeft className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-white transition-colors inline-flex items-center gap-1">
                    الجولة البصرية — معرض الصور <ArrowUpLeft className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#manasik" className="hover:text-white transition-colors inline-flex items-center gap-1">
                    دليل مناسك العمرة والحج <ArrowUpLeft className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#haramain-train" className="hover:text-white transition-colors inline-flex items-center gap-1">
                    محطات قطار الحرمين السريع <ArrowUpLeft className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#office-map" className="hover:text-white transition-colors inline-flex items-center gap-1">
                    موقع المكتب والخريطة التفاعلية <ArrowUpLeft className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9AB3AA]">
            <p>© وكالة مقام لخدمات العمرة والحج والسياحة السعودية. جميع الحقوق محفوظة.</p>
            <p>ترخيص وزارة الحج والعمرة رقم 4401982 · السجل التجاري 4030918472</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppFloatingWidget />

      {/* Modals */}
      <PackageDetailsModal
        pkg={selectedPackageForDetails}
        onClose={() => setSelectedPackageForDetails(null)}
        onSelectForBooking={(pkg) => handleOpenPackageBooking(pkg)}
      />

      <BookingModal
        target={bookingTarget}
        onClose={() => setBookingTarget(null)}
        onBookingConfirmed={() => {}}
      />
    </div>
  );
}
