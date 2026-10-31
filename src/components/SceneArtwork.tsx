import React, { useState } from 'react';
import { SceneArtworkType, resolveAssetUrl } from '../utils/bookingLogic';

interface SceneArtworkProps {
  type: SceneArtworkType;
  className?: string;
  continuousZoom?: boolean;
}

const IMAGE_CONFIG: Record<
  SceneArtworkType,
  { src: string; remoteFallback: string; alt: string; fallbackBg: string }
> = {
  'makkah-haram': {
    src: 'images/makkah-haram.jpg',
    remoteFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Great_Mosque_of_Mecca1.jpg/1280px-Great_Mosque_of_Mecca1.jpg',
    alt: 'صورة حقيقية للمسجد الحرام والكعبة المشرفة بمكة المكرمة',
    fallbackBg: 'from-[#071B15] via-[#123A2E] to-[#8C6229]'
  },
  'madinah-nabawi': {
    src: 'images/madinah-nabawi.jpg',
    remoteFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Al-Masjid_AL-Nabawi_Door800x600x300.jpg/1280px-Al-Masjid_AL-Nabawi_Door800x600x300.jpg',
    alt: 'صورة حقيقية للمسجد النبوي الشريف والقبة الخضراء بالمدينة المنورة',
    fallbackBg: 'from-[#0A201A] via-[#1A4B3C] to-[#C89B4B]'
  },
  'mina-arafat': {
    src: 'images/mina-arafat.jpg',
    remoteFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mount_Arafat.jpg/1280px-Mount_Arafat.jpg',
    alt: 'صورة حقيقية لحجاج بيت الله الحرام على جبل الرحمة بصعيد عرفات',
    fallbackBg: 'from-[#142923] via-[#6C5234] to-[#D8C39E]'
  },
  'alula-hegra': {
    src: 'images/alula-hegra.jpg',
    remoteFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Mada%27in_Salih-61982.jpg/1280px-Mada%27in_Salih-61982.jpg',
    alt: 'صورة حقيقية للواجهات النبطية المنحوتة في الحِجر (مدائن صالح) بالعلا',
    fallbackBg: 'from-[#2A1810] via-[#8E4D2E] to-[#D4844A]'
  },
  'diriyah-turaif': {
    src: 'images/diriyah-turaif.jpg',
    remoteFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Masmak_Fort_%2812753717253%29.jpg/1280px-Masmak_Fort_%2812753717253%29.jpg',
    alt: 'صورة حقيقية للعمارة النجدية التاريخية والتراث السعودي في الرياض والدرعية',
    fallbackBg: 'from-[#0E2433] via-[#35586C] to-[#C89D74]'
  },
  'redsea-ummahat': {
    src: 'images/redsea-ummahat.jpg',
    remoteFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/%D8%A7%D9%84%D8%B4%D8%B9%D8%A8_%D8%A7%D9%84%D9%85%D8%B1%D8%AC%D8%A7%D9%86%D9%8A%D8%A9_%D8%A8%D8%A7%D9%84%D8%A8%D8%AD%D8%B1_%D8%A7%D9%84%D8%A3%D8%AD%D9%85%D8%B1_-_%D8%A3%D9%85%D9%84%D8%AC.jpg/1280px-%D8%A7%D9%84%D8%B4%D8%B9%D8%A8_%D8%A7%D9%84%D9%85%D8%B1%D8%AC%D8%A7%D9%86%D9%8A%D8%A9_%D8%A8%D8%A7%D9%84%D8%A8%D8%AD%D8%B1_%D8%A7%D9%84%D8%A3%D8%AD%D9%85%D8%B1_-_%D8%A3%D9%85%D9%84%D8%AC.jpg',
    alt: 'صورة حقيقية للمياه الفيروزية والشعاب المرجانية في ساحل البحر الأحمر بأملج',
    fallbackBg: 'from-[#083B4C] via-[#127487] to-[#48C6C9]'
  },
  'abha-asir': {
    src: 'images/abha-asir.jpg',
    remoteFallback:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%D8%B1%D8%AC%D8%A7%D9%84_%D8%A3%D9%84%D9%85%D8%B91.jpg/1280px-%D8%B1%D8%AC%D8%A7%D9%84_%D8%A3%D9%84%D9%85%D8%B91.jpg',
    alt: 'صورة حقيقية لقرية رجال ألمع التراثية والمدرجات الخضراء في منطقة عسير وأبها',
    fallbackBg: 'from-[#12352C] via-[#2E6F56] to-[#C9E4D6]'
  }
};

export const SceneArtwork: React.FC<SceneArtworkProps> = ({
  type,
  className = '',
  continuousZoom = false
}) => {
  const config = IMAGE_CONFIG[type] || IMAGE_CONFIG['makkah-haram'];
  const [currentSrc, setCurrentSrc] = useState<string>(() => resolveAssetUrl(config.src));
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    const publicPath = `public/${config.src}`;
    if (currentSrc === config.src) {
      setCurrentSrc(publicPath);
    } else if (currentSrc === publicPath) {
      setCurrentSrc(config.remoteFallback);
    } else {
      setImgError(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${config.fallbackBg} ${className}`}
    >
      {!imgError && (
        <img
          src={currentSrc}
          alt={config.alt}
          referrerPolicy="no-referrer"
          loading={continuousZoom ? 'eager' : 'lazy'}
          onError={handleImageError}
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
