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
  Moon,
  BarChart2,
  Heart,
  Sun,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { useRTL } from "@/lib/rtl-context";
import { useAdhanPrayerTimes } from "@/hooks/use-adhan-prayer-times";
import { IconButton } from "./ui/icon-button";

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
      path: "/elegant-mushaf",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3004/3004592.png",
      active: true,
      notification: true,
    },
    {
      title: "أوقات الصلاة",
      description: "مواقيت الصلاة اليومية",
      path: "/prayer-times",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2454/2454306.png",
      active: true,
      notification: false,
    },
    {
      title: "الحفظ",
      description: "حفظ القرآن الكريم",
      path: "/memorization",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
      active: true,
      notification: false,
    },
    {
      title: "اتجاه القبلة",
      description: "تحديد اتجاه القبلة",
      path: "/qibla",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/7505/7505004.png",
      active: true,
      notification: false,
    },
    {
      title: "تعلم التجويد",
      description: "دروس في أحكام التجويد",
      path: "/tajweed",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3094/3094019.png",
      active: true,
      notification: false,
    },
    {
      title: "التسابيح",
      description: "سبحة إلكترونية",
      path: "/tasbih",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2417/2417785.png",
      active: true,
      notification: false,
    },
    {
      title: "حصن المسلم",
      description: "أذكار وأدعية المسلم",
      path: "/adhkar",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6520/6520101.png",
      active: true,
      notification: true,
    },
    {
      title: "الأدعية",
      description: "أدعية من القرآن والسنة",
      path: "/duas",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2829/2829125.png",
      active: true,
      notification: false,
    },
    {
      title: "وضع القراءة الليلي",
      description: "قراءة القرآن في الظلام",
      path: "/night-mode",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3094/3094811.png",
      active: true,
      notification: false,
    },
    {
      title: "إحصائيات وتحفيز",
      description: "متابعة تقدمك في القراءة والحفظ",
      path: "/quran-stats",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2936/2936690.png",
      active: true,
      notification: false,
    },
    {
      title: "القرآن في حياتك",
      description: "تطبيقات عملية للقرآن",
      path: "/quran-in-life",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3820/3820248.png",
      active: true,
      notification: false,
    },
    {
      title: "القرآن التفاعلي",
      description: "تجربة تفاعلية للقرآن",
      path: "/interactive-quran",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5229/5229336.png",
      active: true,
      notification: false,
    },
    {
      title: "القرآن للأطفال",
      description: "تعليم القرآن للأطفال",
      path: "/quran-for-kids",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3094/3094188.png",
      active: true,
      notification: false,
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
        <div className="grid grid-cols-4 gap-3">
          {quickAccess.map((item, index) => (
            <Link to={item.path} key={index} className="flex justify-center">
              <IconButton
                icon={
                  <img
                    src={item.iconUrl}
                    alt={item.title}
                    className="w-8 h-8"
                  />
                }
                label={item.title}
                active={item.active}
                notification={item.notification}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Features Description */}
      <div className="space-y-2">
        <h2 className="font-bold text-lg">الميزات المتاحة</h2>
        <div className="grid grid-cols-1 gap-3">
          {quickAccess.map((item, index) => (
            <Link to={item.path} key={index}>
              <Card className="bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:bg-accent/10">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                      <img
                        src={item.iconUrl}
                        alt={item.title}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
