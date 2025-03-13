import { useEffect, useState } from "react";
import {
  Clock,
  ArrowRight,
  BookOpen,
  PrayingHands,
  BookMarked,
  Compass,
  Mic2,
  Bookmark,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useRTL } from "@/lib/rtl-context";

function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState({
    name: "الظهر",
    time: "12:30",
  });
  const { isRTL } = useRTL();

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
    },
    {
      title: "أوقات الصلاة",
      description: "مواقيت الصلاة اليومية",
      path: "/prayer-times",
      icon: Clock,
    },
    {
      title: "الحفظ",
      description: "حفظ القرآن الكريم",
      path: "/memorization",
      icon: BookMarked,
    },
    {
      title: "اتجاه القبلة",
      description: "تحديد اتجاه القبلة",
      path: "/qibla",
      icon: Compass,
    },
    {
      title: "تعلم التجويد",
      description: "دروس في أحكام التجويد",
      path: "/tajweed",
      icon: Mic2,
    },
    {
      title: "التسابيح",
      description: "سبحة إلكترونية",
      path: "/tasbih",
      icon: Bookmark,
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
              {nextPrayer.name} {nextPrayer.time}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          {["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"].map(
            (prayer, index) => (
              <div
                key={index}
                className={`p-2 rounded transition-colors duration-200 ${prayer === nextPrayer.name ? "bg-accent text-accent-foreground" : "hover:bg-primary-foreground/10"}`}
              >
                <div>{prayer}</div>
                <div>
                  {index === 0
                    ? "04:30"
                    : index === 1
                      ? "06:00"
                      : index === 2
                        ? "12:30"
                        : index === 3
                          ? "15:45"
                          : index === 4
                            ? "18:15"
                            : "19:45"}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Last Read */}
      <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">آخر قراءة</h3>
              <p className="text-sm text-muted-foreground">
                سورة البقرة - الآية 255
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center icon-hover"
            >
              <span className={isRTL ? "ml-1" : "mr-1"}>متابعة</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

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
