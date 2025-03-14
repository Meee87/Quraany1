import { useState, useEffect } from "react";
import { PrayerTime, City, gulfCities } from "@/lib/prayer-times";

interface PrayerCalculatorResult {
  prayerTimes: PrayerTime[];
  nextPrayer: PrayerTime | null;
  remainingTime: string;
  date: Date;
}

export function usePrayerCalculator(
  cityName: string = "الرياض",
): PrayerCalculatorResult {
  const [result, setResult] = useState<PrayerCalculatorResult>({
    prayerTimes: [],
    nextPrayer: null,
    remainingTime: "",
    date: new Date(),
  });

  useEffect(() => {
    // Find the city
    const city = gulfCities.find((c) => c.name === cityName) || gulfCities[0];
    const prayerTimes = city.prayerTimes;

    // Calculate next prayer and remaining time
    const calculateNextPrayer = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      // Convert prayer times to minutes for comparison
      const prayerTimesInMinutes = prayerTimes.map((prayer) => {
        const [hour, minute] = prayer.time.split(":").map(Number);
        return {
          ...prayer,
          timeInMinutes: hour * 60 + minute,
        };
      });

      // Find the next prayer
      let nextPrayer = null;
      let remainingTimeInMinutes = 0;

      for (const prayer of prayerTimesInMinutes) {
        if (prayer.timeInMinutes > currentTimeInMinutes) {
          nextPrayer = prayer;
          remainingTimeInMinutes = prayer.timeInMinutes - currentTimeInMinutes;
          break;
        }
      }

      // If no next prayer found, it means all prayers for today have passed
      // So the next prayer is the first prayer of tomorrow
      if (!nextPrayer) {
        nextPrayer = prayerTimesInMinutes[0];
        remainingTimeInMinutes =
          24 * 60 - currentTimeInMinutes + nextPrayer.timeInMinutes;
      }

      // Format remaining time
      const hours = Math.floor(remainingTimeInMinutes / 60);
      const minutes = remainingTimeInMinutes % 60;
      const remainingTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

      setResult({
        prayerTimes,
        nextPrayer,
        remainingTime,
        date: now,
      });
    };

    // Calculate initially
    calculateNextPrayer();

    // Update every minute
    const interval = setInterval(calculateNextPrayer, 60000);

    return () => clearInterval(interval);
  }, [cityName]);

  return result;
}
