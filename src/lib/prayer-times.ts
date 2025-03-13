// أوقات الصلاة لدول الخليج
export type PrayerTime = {
  name: string;
  time: string;
  arabicTime: string;
};

export type City = {
  name: string;
  country: string;
  prayerTimes: PrayerTime[];
};

export const gulfCities: City[] = [
  {
    name: "الرياض",
    country: "المملكة العربية السعودية",
    prayerTimes: [
      { name: "الفجر", time: "04:30", arabicTime: "٤:٣٠" },
      { name: "الشروق", time: "06:00", arabicTime: "٦:٠٠" },
      { name: "الظهر", time: "12:30", arabicTime: "١٢:٣٠" },
      { name: "العصر", time: "15:45", arabicTime: "٣:٤٥" },
      { name: "المغرب", time: "18:15", arabicTime: "٦:١٥" },
      { name: "العشاء", time: "19:45", arabicTime: "٧:٤٥" },
    ],
  },
  {
    name: "مكة المكرمة",
    country: "المملكة العربية السعودية",
    prayerTimes: [
      { name: "الفجر", time: "04:45", arabicTime: "٤:٤٥" },
      { name: "الشروق", time: "06:15", arabicTime: "٦:١٥" },
      { name: "الظهر", time: "12:15", arabicTime: "١٢:١٥" },
      { name: "العصر", time: "15:30", arabicTime: "٣:٣٠" },
      { name: "المغرب", time: "18:00", arabicTime: "٦:٠٠" },
      { name: "العشاء", time: "19:30", arabicTime: "٧:٣٠" },
    ],
  },
  {
    name: "المدينة المنورة",
    country: "المملكة العربية السعودية",
    prayerTimes: [
      { name: "الفجر", time: "04:40", arabicTime: "٤:٤٠" },
      { name: "الشروق", time: "06:10", arabicTime: "٦:١٠" },
      { name: "الظهر", time: "12:20", arabicTime: "١٢:٢٠" },
      { name: "العصر", time: "15:35", arabicTime: "٣:٣٥" },
      { name: "المغرب", time: "18:05", arabicTime: "٦:٠٥" },
      { name: "العشاء", time: "19:35", arabicTime: "٧:٣٥" },
    ],
  },
  {
    name: "دبي",
    country: "الإمارات العربية المتحدة",
    prayerTimes: [
      { name: "الفجر", time: "04:20", arabicTime: "٤:٢٠" },
      { name: "الشروق", time: "05:50", arabicTime: "٥:٥٠" },
      { name: "الظهر", time: "12:10", arabicTime: "١٢:١٠" },
      { name: "العصر", time: "15:25", arabicTime: "٣:٢٥" },
      { name: "المغرب", time: "18:20", arabicTime: "٦:٢٠" },
      { name: "العشاء", time: "19:50", arabicTime: "٧:٥٠" },
    ],
  },
  {
    name: "أبو ظبي",
    country: "الإمارات العربية المتحدة",
    prayerTimes: [
      { name: "الفجر", time: "04:25", arabicTime: "٤:٢٥" },
      { name: "الشروق", time: "05:55", arabicTime: "٥:٥٥" },
      { name: "الظهر", time: "12:15", arabicTime: "١٢:١٥" },
      { name: "العصر", time: "15:30", arabicTime: "٣:٣٠" },
      { name: "المغرب", time: "18:25", arabicTime: "٦:٢٥" },
      { name: "العشاء", time: "19:55", arabicTime: "٧:٥٥" },
    ],
  },
  {
    name: "الدوحة",
    country: "قطر",
    prayerTimes: [
      { name: "الفجر", time: "04:15", arabicTime: "٤:١٥" },
      { name: "الشروق", time: "05:45", arabicTime: "٥:٤٥" },
      { name: "الظهر", time: "12:05", arabicTime: "١٢:٠٥" },
      { name: "العصر", time: "15:20", arabicTime: "٣:٢٠" },
      { name: "المغرب", time: "18:10", arabicTime: "٦:١٠" },
      { name: "العشاء", time: "19:40", arabicTime: "٧:٤٠" },
    ],
  },
  {
    name: "المنامة",
    country: "البحرين",
    prayerTimes: [
      { name: "الفجر", time: "04:10", arabicTime: "٤:١٠" },
      { name: "الشروق", time: "05:40", arabicTime: "٥:٤٠" },
      { name: "الظهر", time: "12:00", arabicTime: "١٢:٠٠" },
      { name: "العصر", time: "15:15", arabicTime: "٣:١٥" },
      { name: "المغرب", time: "18:05", arabicTime: "٦:٠٥" },
      { name: "العشاء", time: "19:35", arabicTime: "٧:٣٥" },
    ],
  },
  {
    name: "الكويت",
    country: "الكويت",
    prayerTimes: [
      { name: "الفجر", time: "04:05", arabicTime: "٤:٠٥" },
      { name: "الشروق", time: "05:35", arabicTime: "٥:٣٥" },
      { name: "الظهر", time: "11:55", arabicTime: "١١:٥٥" },
      { name: "العصر", time: "15:10", arabicTime: "٣:١٠" },
      { name: "المغرب", time: "18:00", arabicTime: "٦:٠٠" },
      { name: "العشاء", time: "19:30", arabicTime: "٧:٣٠" },
    ],
  },
  {
    name: "مسقط",
    country: "عمان",
    prayerTimes: [
      { name: "الفجر", time: "04:35", arabicTime: "٤:٣٥" },
      { name: "الشروق", time: "06:05", arabicTime: "٦:٠٥" },
      { name: "الظهر", time: "12:25", arabicTime: "١٢:٢٥" },
      { name: "العصر", time: "15:40", arabicTime: "٣:٤٠" },
      { name: "المغرب", time: "18:30", arabicTime: "٦:٣٠" },
      { name: "العشاء", time: "20:00", arabicTime: "٨:٠٠" },
    ],
  },
];

// الحصول على أوقات الصلاة لمدينة معينة
export const getPrayerTimesForCity = (cityName: string): PrayerTime[] => {
  const city = gulfCities.find((city) => city.name === cityName);
  return city ? city.prayerTimes : gulfCities[0].prayerTimes;
};

// الحصول على الصلاة القادمة
export const getNextPrayer = (cityName: string): PrayerTime => {
  const prayerTimes = getPrayerTimesForCity(cityName);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  for (const prayer of prayerTimes) {
    const [hour, minute] = prayer.time.split(":").map(Number);
    if (
      currentHour < hour ||
      (currentHour === hour && currentMinute < minute)
    ) {
      return prayer;
    }
  }

  return prayerTimes[0]; // إذا مرت جميع الصلوات، نعود إلى صلاة الفجر لليوم التالي
};
