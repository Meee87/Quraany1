// Import adhan library at the top level
import * as adhan from "adhan";

// Use a try-catch to handle potential import errors with the adhan library
let Coordinates, CalculationMethod, PrayerTimes, Madhab;
try {
  Coordinates = adhan.Coordinates;
  CalculationMethod = adhan.CalculationMethod;
  PrayerTimes = adhan.PrayerTimes;
  Madhab = adhan.Madhab;
} catch (error) {
  console.error("Failed to import adhan library:", error);
  // Create dummy classes/objects to prevent runtime errors
  Coordinates = class {
    constructor() {}
  };
  CalculationMethod = { UmmAlQura: () => ({ madhab: null }) };
  PrayerTimes = class {
    constructor() {
      this.fajr = new Date();
      this.sunrise = new Date();
      this.dhuhr = new Date();
      this.asr = new Date();
      this.maghrib = new Date();
      this.isha = new Date();
    }
  };
  Madhab = { Shafi: null };
}

export interface Prayer {
  name: string;
  time: Date;
  timeString: string;
  arabicTimeString: string;
}

export interface CityCoordinates {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// Gulf cities with accurate coordinates
export const gulfCitiesCoordinates: CityCoordinates[] = [
  {
    name: "الرياض",
    country: "المملكة العربية السعودية",
    latitude: 24.7136,
    longitude: 46.6753,
    timezone: "Asia/Riyadh",
  },
  {
    name: "مكة المكرمة",
    country: "المملكة العربية السعودية",
    latitude: 21.3891,
    longitude: 39.8579,
    timezone: "Asia/Riyadh",
  },
  {
    name: "المدينة المنورة",
    country: "المملكة العربية السعودية",
    latitude: 24.5247,
    longitude: 39.5692,
    timezone: "Asia/Riyadh",
  },
  {
    name: "دبي",
    country: "الإمارات العربية المتحدة",
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: "Asia/Dubai",
  },
  {
    name: "أبو ظبي",
    country: "الإمارات العربية المتحدة",
    latitude: 24.4539,
    longitude: 54.3773,
    timezone: "Asia/Dubai",
  },
  {
    name: "الدوحة",
    country: "قطر",
    latitude: 25.2854,
    longitude: 51.531,
    timezone: "Asia/Qatar",
  },
  {
    name: "المنامة",
    country: "البحرين",
    latitude: 26.2285,
    longitude: 50.586,
    timezone: "Asia/Bahrain",
  },
  {
    name: "الكويت",
    country: "الكويت",
    latitude: 29.3759,
    longitude: 47.9774,
    timezone: "Asia/Kuwait",
  },
  {
    name: "مسقط",
    country: "عمان",
    latitude: 23.588,
    longitude: 58.3829,
    timezone: "Asia/Muscat",
  },
];

// Convert number to Arabic numerals
export function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .replace(/[0-9]/g, (match) => arabicNumerals[parseInt(match)]);
}

// Format time to HH:MM format
export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Format time to Arabic HH:MM format
export function formatTimeArabic(date: Date): string {
  const hours = toArabicNumerals(date.getHours());
  const minutes = toArabicNumerals(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Calculate prayer times for a specific city and date
export function calculatePrayerTimes(
  cityName: string,
  date: Date = new Date(),
): Prayer[] {
  // Find city coordinates
  const city =
    gulfCitiesCoordinates.find((city) => city.name === cityName) ||
    gulfCitiesCoordinates[0];

  try {
    // Set up coordinates
    const coordinates = new Coordinates(city.latitude, city.longitude);

    // Set calculation parameters (using Umm al-Qura University, Makkah method which is common in Gulf countries)
    const params = CalculationMethod.UmmAlQura();

    // Set madhab for Asr prayer calculation (Shafi is common in many Gulf countries)
    params.madhab = Madhab.Shafi;

    // Calculate prayer times
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    // Create prayer times array
    return [
      {
        name: "الفجر",
        time: prayerTimes.fajr,
        timeString: formatTime(prayerTimes.fajr),
        arabicTimeString: formatTimeArabic(prayerTimes.fajr),
      },
      {
        name: "الشروق",
        time: prayerTimes.sunrise,
        timeString: formatTime(prayerTimes.sunrise),
        arabicTimeString: formatTimeArabic(prayerTimes.sunrise),
      },
      {
        name: "الظهر",
        time: prayerTimes.dhuhr,
        timeString: formatTime(prayerTimes.dhuhr),
        arabicTimeString: formatTimeArabic(prayerTimes.dhuhr),
      },
      {
        name: "العصر",
        time: prayerTimes.asr,
        timeString: formatTime(prayerTimes.asr),
        arabicTimeString: formatTimeArabic(prayerTimes.asr),
      },
      {
        name: "المغرب",
        time: prayerTimes.maghrib,
        timeString: formatTime(prayerTimes.maghrib),
        arabicTimeString: formatTimeArabic(prayerTimes.maghrib),
      },
      {
        name: "العشاء",
        time: prayerTimes.isha,
        timeString: formatTime(prayerTimes.isha),
        arabicTimeString: formatTimeArabic(prayerTimes.isha),
      },
    ];
  } catch (error) {
    console.error("Error in calculatePrayerTimes:", error);
    throw error; // Let the caller handle the error with fallback mechanism
  }
}

// Get the next prayer
export function getNextPrayer(prayers: Prayer[]): Prayer | null {
  if (!prayers || prayers.length === 0) return null;

  const now = new Date();

  // Find the next prayer
  for (const prayer of prayers) {
    if (prayer.time > now) {
      return prayer;
    }
  }

  // If all prayers for today have passed, return the first prayer for tomorrow
  return prayers[0];
}

// Calculate remaining time until next prayer
export function calculateRemainingTime(nextPrayer: Prayer | null): string {
  if (!nextPrayer) return "";

  const now = new Date();
  const timeDiff = nextPrayer.time.getTime() - now.getTime();

  // If next prayer is tomorrow
  const remainingMs = timeDiff > 0 ? timeDiff : timeDiff + 24 * 60 * 60 * 1000;

  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}
