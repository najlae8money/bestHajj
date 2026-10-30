import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookingFormInput,
  ConfirmedBooking,
  validateBookingInput,
  generateBookingReference,
  formatBookingWhatsAppMessage,
  buildBookingWhatsAppUrl
} from '../utils/bookingLogic';
import { X, CheckCircle2, ShieldCheck, MessageCircle, Copy, Check } from 'lucide-react';

export interface BookingDraftTarget {
  packageId: string;
  packageTitle: string;
  categoryLabel: string;
  defaultPilgrimsCount?: number;
  defaultOccupancy?: BookingFormInput['roomOccupancy'];
  defaultDepartureDate?: string;
}

interface BookingModalProps {
  target: BookingDraftTarget | null;
  onClose: () => void;
  onBookingConfirmed: (booking: ConfirmedBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  target,
  onClose,
  onBookingConfirmed
}) => {
  const [form, setForm] = useState<BookingFormInput>({
    fullName: '',
    passportOrId: '',
    phone: '',
    email: '',
    departureCity: 'الرياض — مطار الملك خالد الدولي',
    departureDate: target?.defaultDepartureDate || 'أقرب رحلة متاحة',
    pilgrimsCount: target?.defaultPilgrimsCount || 2,
    roomOccupancy: target?.defaultOccupancy || 'double',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormInput, string>>>({});
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!target) return null;

  const occupancyLabels: Record<BookingFormInput['roomOccupancy'], string> = {
    double: 'غرفة مزدوجة',
    triple: 'غرفة ثلاثية',
    quad: 'غرفة رباعية عائلية',
    suite: 'جناح ملكي مطل'
  };

  const triggerWhatsAppAnchor = (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Fallback handled by the visible direct link on the confirmation view
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingInput(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const reference = generateBookingReference(form.passportOrId, form.pilgrimsCount);
    const newBooking: ConfirmedBooking = {
      reference,
      packageId: target.packageId,
      packageTitle: target.packageTitle,
      categoryLabel: target.categoryLabel,
      fullName: form.fullName.trim(),
      passportOrId: form.passportOrId.trim().toUpperCase(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      departureCity: form.departureCity,
      departureDate: form.departureDate,
      pilgrimsCount: form.pilgrimsCount,
      roomOccupancyLabel: occupancyLabels[form.roomOccupancy],
      createdAt: '',
      status: 'مؤكد ومُصدر تصريح نسك'
    };

    const whatsappUrl = buildBookingWhatsAppUrl(newBooking, form.notes);
    setConfirmed(newBooking);
    onBookingConfirmed(newBooking);
    triggerWhatsAppAnchor(whatsappUrl);
  };

  const formattedMessage = confirmed
    ? formatBookingWhatsAppMessage(confirmed, form.notes)
    : '';
  const confirmedWhatsAppUrl = confirmed
    ? buildBookingWhatsAppUrl(confirmed, form.notes)
    : '';

  const handleCopyMessage = async () => {
    if (!formattedMessage) return;
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-heading"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF8F5] border border-[#D5CBB8] rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-xl p-5 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2DACB] mb-6">
          <div>
            <p className="text-xs text-[#8C6527] mb-1">
              {target.categoryLabel} · إرسال فوري ومرتب عبر واتساب
            </p>
            <h2 id="booking-modal-heading" className="font-display text-2xl font-bold text-[#141A17]">
              {confirmed
                ? 'تم تجهيز وتحويل بيانات الحجز إلى واتساب'
                : `حجز: ${target.packageTitle}`}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق نافذة الحجز"
            className="w-9 h-9 rounded-lg border border-[#D5CBB8] flex items-center justify-center text-[#3A443E] hover:bg-[#F3EFE6] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmed ? (
          <div className="space-y-5">
            <div className="bg-[#0D4A38] text-white rounded-xl p-5">
              <div className="flex items-center gap-2 text-[#EBC37C] text-xs mb-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تم فتح محادثة واتساب الرسمية مع مستشار الحجوزات</span>
              </div>
              <p className="text-xs text-[#C2D4CD] leading-relaxed">
                تم ترتيب جميع بيانات حجزك في رسالة منظمة وجاهزة للإرسال. إذا لم تفتح نافذة واتساب تلقائياً في متصفحك، اضغط على الزر أدناه للإرسال الفوري.
              </p>
            </div>

            {/* Organized WhatsApp Message Preview */}
            <div className="bg-white border border-[#D5CBB8] rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#EFEAE0]">
                <span className="text-xs font-semibold text-[#141A17]">
                  ملخص رسالة الحجز المرتبة المرسلة عبر واتساب:
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#0D4A38] bg-[#E8F3EE] hover:bg-[#D5EAE0] rounded-md transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم نسخ الرسالة</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ النص</span>
                    </>
                  )}
                </button>
              </div>
              <pre
                data-testid="whatsapp-formatted-preview"
                className="text-xs text-[#2B3530] font-sans whitespace-pre-wrap leading-relaxed bg-[#FAF8F5] p-3.5 rounded-lg border border-[#E6DFD1]"
              >
                {formattedMessage}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium text-[#3A443E] border border-[#D5CBB8] rounded-lg hover:bg-[#F3EFE6] transition-colors cursor-pointer"
              >
                إغلاق النافذة
              </button>

              <a
                href={confirmedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="whatsapp-direct-send-link"
                className="px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال تفاصيل الحجز عبر واتساب الآن</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-fullname" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  الاسم الكامل (مطابق لجواز السفر أو الهوية) *
                </label>
                <input
                  id="booking-fullname"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="مثال: عبدالرحمن بن خالد السديري"
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3.5 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                />
                {errors.fullName && (
                  <p className="text-xs text-[#B42318] mt-1" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-passport" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  رقم جواز السفر أو الهوية الوطنية *
                </label>
                <input
                  id="booking-passport"
                  type="text"
                  value={form.passportOrId}
                  onChange={(e) => setForm((prev) => ({ ...prev, passportOrId: e.target.value }))}
                  placeholder="مثال: N8492017 أو 1094827165"
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                />
                {errors.passportOrId && (
                  <p className="text-xs text-[#B42318] mt-1" role="alert">
                    {errors.passportOrId}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-phone" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  رقم الجوال (المرتبط بواتساب) *
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+966 50 123 4567"
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                />
                {errors.phone && (
                  <p className="text-xs text-[#B42318] mt-1" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  البريد الإلكتروني *
                </label>
                <input
                  id="booking-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="pilgrim@example.com"
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3.5 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                />
                {errors.email && (
                  <p className="text-xs text-[#B42318] mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="booking-city" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  مدينة القدوم / المغادرة
                </label>
                <select
                  id="booking-city"
                  value={form.departureCity}
                  onChange={(e) => setForm((prev) => ({ ...prev, departureCity: e.target.value }))}
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                >
                  <option value="الرياض — مطار الملك خالد الدولي">الرياض</option>
                  <option value="جدة — مطار الملك عبدالعزيز الدولي">جدة</option>
                  <option value="الدمام — مطار الملك فهد الدولي">الدمام</option>
                  <option value="القاهرة — مطار القاهرة الدولي">القاهرة</option>
                  <option value="دبي — مطار دبي الدولي">دبي</option>
                  <option value="الدوحة — مطار حمد الدولي">الدوحة</option>
                  <option value="الكويت — مطار الكويت الدولي">الكويت</option>
                  <option value="عمّان — مطار الملكة علياء">عمّان</option>
                  <option value="الدار البيضاء — مطار محمد الخامس">الدار البيضاء</option>
                </select>
              </div>

              <div>
                <label htmlFor="booking-date" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  موعد أو تاريخ السفر المفضل *
                </label>
                <input
                  id="booking-date"
                  type="text"
                  value={form.departureDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, departureDate: e.target.value }))}
                  placeholder="مثال: الأسبوع القادم / 15 رمضان..."
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                />
                {errors.departureDate && (
                  <p className="text-xs text-[#B42318] mt-1" role="alert">
                    {errors.departureDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-pilgrims" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  عدد المسافرين
                </label>
                <input
                  id="booking-pilgrims"
                  type="number"
                  min={1}
                  max={20}
                  value={form.pilgrimsCount}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      pilgrimsCount: Math.max(1, Math.min(20, Number(e.target.value) || 1))
                    }))
                  }
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3 py-2.5 text-sm tabular-nums text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-occupancy" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  تفضيل الغرفة الفندقية
                </label>
                <select
                  id="booking-occupancy"
                  value={form.roomOccupancy}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      roomOccupancy: e.target.value as BookingFormInput['roomOccupancy']
                    }))
                  }
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3.5 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                >
                  <option value="double">غرفة مزدوجة (شخصان)</option>
                  <option value="triple">غرفة ثلاثية</option>
                  <option value="quad">غرفة رباعية عائلية</option>
                  <option value="suite">جناح ملكي مطل على الحرم</option>
                </select>
              </div>

              <div>
                <label htmlFor="booking-notes" className="block text-xs font-medium text-[#3A443E] mb-1.5">
                  ملاحظات أو طلبات خاصة (اختياري)
                </label>
                <input
                  id="booking-notes"
                  type="text"
                  value={form.notes || ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="مثال: كرسي متحرك، غرف متصلة، إطلالة على الكعبة..."
                  className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3.5 py-2.5 text-sm text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                />
              </div>
            </div>

            <div className="bg-[#F3EFE6] border border-[#E2DACB] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-[#3A443E]">
              <ShieldCheck className="w-4 h-4 text-[#0D4A38] shrink-0 mt-0.5" />
              <span>
                بمجرد الضغط على زر التأكيد أدناه، سيتم إرسال كافة بيانات حجزك مرتبة ومنسقة مباشرة عبر واتساب إلى فريق حجوزات وكالة مقام لاعتمادها فوراً.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-[#3A443E] border border-[#D5CBB8] rounded-lg hover:bg-[#F3EFE6] transition-colors cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                data-testid="booking-whatsapp-submit-btn"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تأكيد وإرسال الحجز عبر واتساب</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
