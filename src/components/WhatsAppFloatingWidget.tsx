import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { buildWhatsAppUrl } from '../utils/bookingLogic';
import { MessageCircle, X, Send, ExternalLink } from 'lucide-react';

const QUICK_TOPICS = [
  'استفسار عن باقات العمرة الفاخرة والعائلية',
  'التسجيل في باقات حج الضيافة المعتمدة عبر نسك',
  'تنظيم رحلة سياحية إلى العلا أو الدرعية أو البحر الأحمر',
  'حجز تذاكر قطار الحرمين السريع وتصريح الروضة الشريفة'
];

export const WhatsAppFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>(QUICK_TOPICS[0]);
  const [customNote, setCustomNote] = useState<string>('');
  const [sentConfirmation, setSentConfirmation] = useState<string | null>(null);

  const composedMessage = customNote.trim()
    ? `السلام عليكم وكالة مقام، بخصوص: ${selectedTopic} — ${customNote.trim()}`
    : `السلام عليكم وكالة مقام، أرغب في الاستفسار عن: ${selectedTopic}`;

  const whatsappHref = buildWhatsAppUrl(composedMessage);

  const handleInstantPreviewSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentConfirmation(composedMessage);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-label="محادثة واتساب الفورية مع مستشار وكالة مقام"
            className="mb-3 w-[calc(100vw-2rem)] max-w-[360px] bg-[#FAF8F5] border border-[#C9C0B1] rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0D4A38] text-white px-4 py-3.5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[#EBC37C] font-medium">
                  خدمة ضيوف الرحمن 24/7
                </p>
                <h3 className="font-display text-lg font-bold text-white">
                  مستشار الحرمين والسياحة — واتساب
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق نافذة واتساب"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3.5 text-xs">
              <div className="bg-[#EFECE4] border border-[#DFD6C5] rounded-xl p-3 text-[#141A17] leading-relaxed">
                مرحباً بك في وكالة مقام. اختر موضوع استفسارك أو اكتب رسالتك ليتواصل معك مستشار العمرة والسياحة فوراً:
              </div>

              <div className="space-y-1.5">
                <span className="block text-[11px] font-medium text-[#4B5650]">
                  اختر موضوع الاستفسار السريع:
                </span>
                {QUICK_TOPICS.map((topic) => {
                  const active = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        setSelectedTopic(topic);
                        setSentConfirmation(null);
                      }}
                      className={`w-full text-right px-3 py-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#0D4A38] text-white border-[#0D4A38] font-medium'
                          : 'bg-white text-[#141A17] border-[#D5CBB8] hover:border-[#0D4A38]'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleInstantPreviewSend} className="space-y-2.5">
                <div>
                  <label htmlFor="wa-custom-note" className="sr-only">
                    تفاصيل إضافية للرسالة
                  </label>
                  <input
                    id="wa-custom-note"
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="أضف عدد المسافرين أو تاريخ السفر المفضل..."
                    className="w-full bg-white border border-[#D5CBB8] rounded-lg px-3 py-2 text-xs text-[#141A17] focus:outline-none focus:border-[#0D4A38]"
                  />
                </div>

                {sentConfirmation && (
                  <div
                    data-testid="whatsapp-sent-feedback"
                    className="bg-[#E6F4EC] border border-[#1E7A56]/30 text-[#0D4A38] rounded-lg p-2.5 text-[11px] leading-relaxed"
                  >
                    تم تجهيز رسالتك لمستشار الحجوزات على الرقم الموحد (920033850). يمكنك فتح تطبيق واتساب مباشرة أدناه.
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-3 bg-[#141A17] hover:bg-[#2A332E] text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>تجهيز الرسالة</span>
                  </button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-[#18794E] hover:bg-[#13633F] text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>فتح واتساب</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="تواصل عبر واتساب"
        aria-expanded={isOpen}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#18794E] hover:bg-[#13633F] text-white shadow-lg border border-white/20 transition-colors cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
          تواصل عبر واتساب
        </span>
      </motion.button>
    </div>
  );
};
