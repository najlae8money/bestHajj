import React from 'react';
import { motion } from 'motion/react';
import { TravelPackage, buildWhatsAppUrl } from '../utils/bookingLogic';
import { SceneArtwork } from './SceneArtwork';
import { X, Check, Calendar, MapPin, MessageCircle } from 'lucide-react';

interface PackageDetailsModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onSelectForBooking: (pkg: TravelPackage) => void;
}

export const PackageDetailsModal: React.FC<PackageDetailsModalProps> = ({
  pkg,
  onClose,
  onSelectForBooking
}) => {
  if (!pkg) return null;

  const waUrl = buildWhatsAppUrl(`السلام عليكم وكالة مقام، أرغب في الاستفسار عن تفاصيل وحجز: ${pkg.title}`);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-package-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF8F5] border border-[#D5CBB8] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
      >
        {/* Header Visual */}
        <div className="relative h-56 sm:h-64 w-full">
          <SceneArtwork type={pkg.artwork} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق تفاصيل الباقة"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 right-5 left-5 sm:right-6 sm:left-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#EBC37C] mb-1.5">
              <span>{pkg.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{pkg.nightsSummary}</span>
              <span aria-hidden="true">·</span>
              <span>تقييم {pkg.rating} ({pkg.reviewsCount} مراجعة)</span>
            </div>
            <h2 id="modal-package-title" className="font-display text-2xl md:text-3xl font-bold">
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F3EFE6] border border-[#E2DACB] rounded-xl text-xs">
            <div>
              <span className="text-[#5A655E] block mb-1">الإقامة الفندقية المعتمدة</span>
              <span className="font-semibold text-[#141A17]">{pkg.hotelName}</span>
            </div>
            <div>
              <span className="text-[#5A655E] block mb-1">الموقع والمسافة</span>
              <span className="font-semibold text-[#141A17]">{pkg.distanceLabel}</span>
            </div>
            <div>
              <span className="text-[#5A655E] block mb-1">النقل والوجبات</span>
              <span className="font-semibold text-[#141A17]">{pkg.transportType} · {pkg.mealPlan}</span>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-display text-xl font-bold text-[#141A17] mb-3">
              مزايا وخدمات الباقة المشمولة
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pkg.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#3A443E]">
                  <Check className="w-4 h-4 text-[#0D4A38] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h3 className="font-display text-xl font-bold text-[#141A17] mb-3">
              المسار الزمني للرحلة يوماً بيوم
            </h3>
            <div className="space-y-3">
              {pkg.itinerary.map((item) => (
                <div
                  key={item.day}
                  className="p-4 bg-white border border-[#E2DACB] rounded-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8C6527] mb-1">
                    <span className="font-semibold">اليوم {item.day}: {item.title}</span>
                    <span className="flex items-center gap-1 text-[#5A655E]">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                  <p className="text-sm text-[#4B5650] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E2DACB]">
            <div className="text-xs text-[#5A655E] space-y-1">
              <span className="font-semibold text-sm text-[#0D4A38] block">
                {pkg.tierBadge}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                أقرب رحلة متاحة: {pkg.nextDeparture} · متبقي {pkg.remainingSeats} مقاعد
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#18794E] hover:bg-[#13633F] rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>استفسر عبر واتساب</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectForBooking(pkg);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0D4A38] hover:bg-[#09382A] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                تسجيل الحجز وإصدار التصريح
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
