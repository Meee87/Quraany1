import { useState, useEffect } from "react";
import {
  MapPin,
  Bell,
  Clock,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Hand,
  BookOpen,
  Bookmark,
  MoreHorizontal,
  Gift,
} from "lucide-react";
import { useAdhanPrayerTimes } from "@/hooks/use-adhan-prayer-times";

export default function PrayerTimesNew() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { prayers, nextPrayer, remainingTime } = useAdhanPrayerTimes("قطر");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format current time
  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format countdown time
  const formatCountdown = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const seconds = Math.floor(Math.random() * 60); // Random seconds for demo
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Get prayer icon based on name
  const getPrayerIcon = (name: string) => {
    switch (name) {
      case "الفجر":
        return <Sunrise className="h-5 w-5 text-blue-500" />;
      case "الشروق":
        return <Sun className="h-5 w-5 text-orange-400" />;
      case "الظهر":
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case "العصر":
        return <Sun className="h-5 w-5 text-amber-500" />;
      case "المغرب":
        return <Sunset className="h-5 w-5 text-orange-600" />;
      case "العشاء":
        return <Moon className="h-5 w-5 text-indigo-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://api.dicebear.com/7.x/icons/svg?icon=mosque"
            alt="المصلي الذهبي"
            className="h-8 w-8 text-amber-500"
          />
          <h1 className="text-lg font-bold text-amber-600 mr-2">المصلي</h1>
        </div>
        <div className="text-xl font-bold">
          {formatCurrentTime(currentTime)}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-600" />
          <span className="text-sm">قطر</span>
          <Bell className="h-5 w-5 text-gray-600 mr-1" />
        </div>
      </header>

      {/* Main Content with Mosque Background */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1564769625688-8318f9153a5c?w=800&q=80"
            alt="مسجد"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Countdown Timer */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            {nextPrayer ? `${nextPrayer.name} بعد` : "جاري التحميل..."}
          </h2>
          <div className="text-5xl font-bold mb-8 text-primary">
            {formatCountdown(remainingTime)}
          </div>

          {/* Prayer Times Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 w-full max-w-md">
            <h3 className="text-lg font-bold mb-3 text-center">أوقات الصلاة</h3>
            <div className="space-y-3">
              {prayers.map((prayer, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-2 rounded-lg ${prayer.name === nextPrayer?.name ? "bg-primary/10 text-primary font-bold" : ""}`}
                >
                  <div className="flex items-center">
                    {getPrayerIcon(prayer.name)}
                    <span className="mr-2">{prayer.name}</span>
                  </div>
                  <span>{prayer.arabicTimeString}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Icons */}
      <div className="bg-white p-4 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
            <Hand className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-xs mt-1">الأجر بالنشر</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-xs mt-1">القبلة</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shadow-sm">
            <Bookmark className="h-6 w-6 text-amber-600" />
          </div>
          <span className="text-xs mt-1">السبحة</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shadow-sm">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-xs mt-1">الأذكار</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
            <MoreHorizontal className="h-6 w-6 text-gray-600" />
          </div>
          <span className="text-xs mt-1">المزيد</span>
        </div>
      </div>

      {/* Bottom Promotional Banner */}
      <div className="bg-amber-50 p-3 flex justify-between items-center border-t border-amber-100">
        <div className="flex items-center">
          <Gift className="h-5 w-5 text-amber-500 mr-2" />
          <span className="text-sm font-medium">اغتنم هدية الطائعين</span>
        </div>
        <button className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          احصل عليها
        </button>
      </div>
    </div>
  );
}
