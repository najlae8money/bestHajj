import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PACKAGES_DATA,
  SAUDI_DESTINATIONS,
  filterAndSortPackages,
  validateBookingInput,
  generateBookingReference,
  getHaramainRouteDetails,
  buildWhatsAppUrl,
  formatBookingWhatsAppMessage,
  buildBookingWhatsAppUrl
} from './bookingLogic';

test('filterAndSortPackages filters by category and sorts by rating or distance', () => {
  const umrahPackages = filterAndSortPackages(PACKAGES_DATA, {
    category: 'umrah',
    sortBy: 'distance-asc'
  });
  assert.equal(umrahPackages.length, 2);
  assert.equal(umrahPackages[0].id, 'umrah-royal-haramain');
  assert.equal(umrahPackages[1].id, 'umrah-economic-blessed');
});

test('filterAndSortPackages filters by search query across destinations and highlights', () => {
  const alulaPackages = filterAndSortPackages(PACKAGES_DATA, {
    category: 'all',
    searchQuery: 'العلا'
  });
  assert.equal(alulaPackages.length, 1);
  assert.equal(alulaPackages[0].id, 'tourism-alula-hegra-luxury');
});

test('SAUDI_DESTINATIONS includes all 6 sacred and tourism destinations with landmarks', () => {
  assert.equal(SAUDI_DESTINATIONS.length, 6);
  assert.ok(SAUDI_DESTINATIONS.some((d) => d.artwork === 'abha-asir'));
  assert.ok(SAUDI_DESTINATIONS.every((d) => d.landmarks.length >= 3));
});

test('validateBookingInput catches invalid inputs and passes valid pilgrim details', () => {
  const invalid = validateBookingInput({
    fullName: 'محمد',
    passportOrId: '123',
    phone: 'abc',
    email: 'invalid-email',
    departureCity: 'الرياض',
    departureDate: '',
    pilgrimsCount: 0,
    roomOccupancy: 'double'
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.passportOrId);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.departureDate);

  const valid = validateBookingInput({
    fullName: 'عبدالله بن عبدالرحمن العتيبي',
    passportOrId: 'N8492017',
    phone: '+966 50 482 9104',
    email: 'abdullah@example.sa',
    departureCity: 'الرياض',
    departureDate: 'الأسبوع القادم',
    pilgrimsCount: 3,
    roomOccupancy: 'triple'
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateBookingReference, getHaramainRouteDetails, and structured WhatsApp booking formatter work deterministically', () => {
  const ref1 = generateBookingReference('N8492017', 3);
  const ref2 = generateBookingReference('N8492017', 3);
  assert.equal(ref1, ref2);
  assert.ok(ref1.startsWith('NSK-'));

  const reverseRoute = getHaramainRouteDetails('madinah', 'makkah');
  assert.equal(reverseRoute.from, 'madinah');
  assert.equal(reverseRoute.to, 'makkah');
  assert.equal(reverseRoute.distanceKm, 453);

  const waUrl = buildWhatsAppUrl('استفسار عن باقة عمرة الصفوة');
  assert.ok(waUrl.startsWith('https://wa.me/966920031448?text='));

  const sampleBooking = {
    reference: ref1,
    packageId: 'umrah-royal-haramain',
    packageTitle: 'عمرة الصفوة المطلة على الكعبة المشرفة',
    categoryLabel: 'باقة عمرة فاخرة',
    fullName: 'عبدالله بن عبدالرحمن العتيبي',
    passportOrId: 'N8492017',
    phone: '+966 50 482 9104',
    email: 'abdullah@example.sa',
    departureCity: 'الرياض — مطار الملك خالد الدولي',
    departureDate: 'الأسبوع القادم',
    pilgrimsCount: 3,
    roomOccupancyLabel: 'غرفة ثلاثية',
    createdAt: '',
    status: 'مؤكد ومُصدر تصريح نسك' as const
  };

  const formattedMsg = formatBookingWhatsAppMessage(sampleBooking, 'إطلالة مباشرة على الكعبة');
  assert.ok(formattedMsg.includes('عمرة الصفوة المطلة على الكعبة المشرفة'));
  assert.ok(formattedMsg.includes('عبدالله بن عبدالرحمن العتيبي'));
  assert.ok(formattedMsg.includes('N8492017'));
  assert.ok(formattedMsg.includes('إطلالة مباشرة على الكعبة'));
  assert.ok(!formattedMsg.includes(ref1));
  assert.ok(!formattedMsg.includes('رقم الطلب المرجعي'));

  const bookingWaUrl = buildBookingWhatsAppUrl(sampleBooking, 'إطلالة مباشرة على الكعبة');
  assert.ok(bookingWaUrl.startsWith('https://wa.me/966920031448?text='));
});

