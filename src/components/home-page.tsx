import { useEffect, useState } from "react";
import {
  Clock,
  BookOpen,
  BookMarked,
  Compass,
  Mic2,
  Bookmark,
  Shield,
  BookText,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { useRTL } from "@/lib/rtl-context";
import { useAdhanPrayerTimes } from "@/hooks/use-adhan-prayer-times";

function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isRTL } = useRTL();
  const { prayers, nextPrayer } = useAdhanPrayerTimes("الرياض");

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format time in Arabic
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Quick access sections
  const quickAccess = [
    {
      title: "المصحف",
      description: "قراءة القرآن الكريم",
      path: "/quran",
      icon: BookOpen,
      active: true,
    },
    {
      title: "أوقات الصلاة",
      description: "مواقيت الصلاة اليومية",
      path: "/prayer-times",
      icon: Clock,
      active: true,
    },
    {
      title: "الحفظ",
      description: "حفظ القرآن الكريم",
      path: "/memorization",
      icon: BookMarked,
      active: true,
    },
    {
      title: "اتجاه القبلة",
      description: "تحديد اتجاه القبلة",
      path: "/qibla",
      icon: Compass,
      active: true,
    },
    {
      title: "تعلم التجويد",
      description: "دروس في أحكام التجويد",
      path: "/tajweed",
      icon: Mic2,
      active: true,
    },
    {
      title: "التسابيح",
      description: "سبحة إلكترونية",
      path: "/tasbih",
      icon: Bookmark,
      active: true,
    },
    {
      title: "حصن المسلم",
      description: "أذكار وأدعية المسلم",
      path: "/adhkar",
      icon: Shield,
      active: true,
    },
    {
      title: "الأدعية",
      description: "أدعية من القرآن والسنة",
      path: "/duas",
      icon: BookText,
      active: true,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Current Time & Next Prayer */}
      <div className="bg-primary text-primary-foreground rounded-lg p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 icon-hover" />
            <span className={`text-lg ${isRTL ? "mr-2" : "ml-2"}`}>
              {formatTime(currentTime)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">الصلاة القادمة</p>
            <p className="text-lg font-bold">
              {nextPrayer
                ? `${nextPrayer.name} ${nextPrayer.arabicTimeString}`
                : "جاري التحميل..."}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          {prayers.map((prayer, index) => (
            <div
              key={index}
              className={`p-2 rounded transition-colors duration-200 ${prayer.name === nextPrayer?.name ? "bg-accent text-accent-foreground" : "hover:bg-primary-foreground/10"}`}
            >
              <div>{prayer.name}</div>
              <div>{prayer.arabicTimeString}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="space-y-2">
        <h2 className="font-bold text-lg">الأقسام</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickAccess.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link to={item.path} key={index}>
                <Card className="bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:bg-accent/10">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-5 w-5 text-primary icon-hover" />
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
