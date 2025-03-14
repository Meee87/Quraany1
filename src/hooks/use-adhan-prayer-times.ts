import { useState, useEffect } from "react";
import {
  calculatePrayerTimes,
  getNextPrayer,
  calculateRemainingTime,
  Prayer,
} from "@/lib/prayer-calculator";
import {
  getPrayerTimesForCity,
  getNextPrayer as getLegacyNextPrayer,
} from "@/lib/prayer-times";

interface PrayerTimesResult {
  prayers: Prayer[];
  nextPrayer: Prayer | null;
  remainingTime: string;
  date: Date;
}

// Fallback prayer times when Adhan library fails
function getFallbackPrayerTimes(cityName: string): Prayer[] {
  const legacyTimes = getPrayerTimesForCity(cityName);
  const now = new Date();

  return legacyTimes.map((prayer) => {
    // Parse the time string to create a proper Date object
    const [hours, minutes] = prayer.time.split(":").map(Number);
    const prayerDate = new Date(now);
    prayerDate.setHours(hours, minutes, 0, 0);

    return {
      name: prayer.name,
      time: prayerDate,
      timeString: prayer.time,
      arabicTimeString: prayer.arabicTime,
    };
  });
}

export function useAdhanPrayerTimes(
  cityName: string = "الرياض",
): PrayerTimesResult {
  const [result, setResult] = useState<PrayerTimesResult>({
    prayers: [],
    nextPrayer: null,
    remainingTime: "",
    date: new Date(),
  });

  useEffect(() => {
    // Function to calculate and update prayer times
    const updatePrayerTimes = () => {
      const now = new Date();
      let prayers: Prayer[] = [];
      let nextPrayer: Prayer | null = null;
      let remainingTime = "";

      try {
        // Try to use Adhan library
        prayers = calculatePrayerTimes(cityName, now);
        nextPrayer = getNextPrayer(prayers);
        remainingTime = calculateRemainingTime(nextPrayer);
      } catch (error) {
        console.error("Error calculating prayer times with Adhan:", error);
        // Fallback to static data
        prayers = getFallbackPrayerTimes(cityName);
        const legacyNextPrayer = getLegacyNextPrayer(cityName);

        // Find the next prayer in our prayers array
        nextPrayer =
          prayers.find((p) => p.name === legacyNextPrayer.name) || null;

        // Calculate remaining time manually if we have a next prayer
        if (nextPrayer) {
          remainingTime = calculateRemainingTime(nextPrayer);
        } else {
          remainingTime = "00:00";
        }
      }

      setResult({
        prayers,
        nextPrayer,
        remainingTime,
        date: now,
      });
    };

    // Initial calculation
    updatePrayerTimes();

    // Update every minute
    const interval = setInterval(updatePrayerTimes, 60000);

    return () => clearInterval(interval);
  }, [cityName]);

  return result;
}
