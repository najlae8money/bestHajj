import React, { useState } from 'react';
import { SceneArtworkType } from '../utils/bookingLogic';

interface SceneArtworkProps {
  type: SceneArtworkType;
  className?: string;
  continuousZoom?: boolean;
}

const IMAGE_CONFIG: Record<
  SceneArtworkType,
  { src: string; alt: string; fallbackBg: string }
> = {
  'makkah-haram': {
    src: '/images/makkah-haram.jpg',
    alt: 'صورة حقيقية للمسجد الحرام والكعبة المشرفة بمكة المكرمة',
    fallbackBg: 'from-[#071B15] via-[#123A2E] to-[#8C6229]'
  },
  'madinah-nabawi': {
    src: '/images/madinah-nabawi.jpg',
    alt: 'صورة حقيقية للمسجد النبوي الشريف والقبة الخضراء بالمدينة المنورة',
    fallbackBg: 'from-[#0A201A] via-[#1A4B3C] to-[#C89B4B]'
  },
  'mina-arafat': {
    src: '/images/mina-arafat.jpg',
    alt: 'صورة حقيقية لحجاج بيت الله الحرام على جبل الرحمة بصعيد عرفات',
    fallbackBg: 'from-[#142923] via-[#6C5234] to-[#D8C39E]'
  },
  'alula-hegra': {
    src: '/images/alula-hegra.jpg',
    alt: 'صورة حقيقية للواجهات النبطية المنحوتة في الحِجر (مدائن صالح) بالعلا',
    fallbackBg: 'from-[#2A1810] via-[#8E4D2E] to-[#D4844A]'
  },
  'diriyah-turaif': {
    src: '/images/diriyah-turaif.jpg',
    alt: 'صورة حقيقية للعمارة النجدية التاريخية والتراث السعودي في الرياض والدرعية',
    fallbackBg: 'from-[#0E2433] via-[#35586C] to-[#C89D74]'
  },
  'redsea-ummahat': {
    src: '/images/redsea-ummahat.jpg',
    alt: 'صورة حقيقية للمياه الفيروزية والشعاب المرجانية في ساحل البحر الأحمر بأملج',
    fallbackBg: 'from-[#083B4C] via-[#127487] to-[#48C6C9]'
  },
  'abha-asir': {
    src: '/images/abha-asir.jpg',
    alt: 'صورة حقيقية لقرية رجال ألمع التراثية والمدرجات الخضراء في منطقة عسير وأبها',
    fallbackBg: 'from-[#12352C] via-[#2E6F56] to-[#C9E4D6]'
  }
};

export const SceneArtwork: React.FC<SceneArtworkProps> = ({
  type,
  className = '',
  continuousZoom = false
}) => {
  const [imgError, setImgError] = useState(false);
  const config = IMAGE_CONFIG[type] || IMAGE_CONFIG['makkah-haram'];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${config.fallbackBg} ${className}`}
    >
      {!imgError && (
        <img
          src={config.src}
          alt={config.alt}
          referrerPolicy="no-referrer"
          loading={continuousZoom ? 'eager' : 'lazy'}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover ${
            continuousZoom
              ? 'animate-hero-ken-burns'
              : 'transition-transform duration-500 ease-out group-hover:scale-105'
          }`}
        />
      )}
    </div>
  );
};
