import { useState, useEffect } from "react";
import { Clock, Calendar, MapPin, Bell, BellOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRTL } from "@/lib/rtl-context";
import {
  gulfCities,
  getPrayerTimesForCity,
  getNextPrayer,
  PrayerTime,
} from "@/lib/prayer-times";

function PrayerTimesPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("الرياض");
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { isRTL } = useRTL();

  // تحديث أوقات الصلاة عند تغيير المدينة
  useEffect(() => {
    const times = getPrayerTimesForCity(selectedCity);
    setPrayerTimes(times);
    setNextPrayer(getNextPrayer(selectedCity));
  }, [selectedCity]);

  // تحديث الصلاة القادمة كل دقيقة
  useEffect(() => {
    const interval = setInterval(() => {
      setNextPrayer(getNextPrayer(selectedCity));
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Format date in Arabic
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // تفعيل/تعطيل الإشعارات
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // في تطبيق حقيقي، هنا سيتم طلب إذن الإشعارات من المستخدم
    if (!notificationsEnabled) {
      // محاكاة طلب الإذن
      setTimeout(() => {
        alert("تم تفعيل إشعارات أوقات الصلاة");
      }, 500);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center">
          <Clock className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`} />
          أوقات الصلاة
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center icon-hover"
          onClick={toggleNotifications}
        >
          {notificationsEnabled ? (
            <>
              <Bell
                className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"} text-accent`}
              />
              <span>الإشعارات مفعلة</span>
            </>
          ) : (
            <>
              <BellOff className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
              <span>تفعيل الإشعارات</span>
            </>
          )}
        </Button>
      </div>

      {/* Location and Date */}
      <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <MapPin
              className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-primary icon-hover`}
            />
            <div className="flex-1">
              <Select
                defaultValue={selectedCity}
                onValueChange={(value) => setSelectedCity(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {gulfCities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}، {city.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar
              className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-primary icon-hover`}
            />
            <span>{formatDate(selectedDate)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Next Prayer */}
      {nextPrayer && (
        <Card className="bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <h2 className="text-center mb-2">الصلاة القادمة</h2>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{nextPrayer.name}</span>
              <span className="text-4xl font-bold mt-2">
                {nextPrayer.arabicTime}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Prayer Times */}
      <div className="grid grid-cols-2 gap-3">
        {prayerTimes.map((prayer, index) => (
          <Card
            key={index}
            className={`shadow-sm hover:shadow-md transition-all duration-200 ${prayer.name === nextPrayer?.name ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent/10"}`}
          >
            <CardContent className="p-3 flex justify-between items-center">
              <span className="font-bold">{prayer.name}</span>
              <span className="text-xl">{prayer.arabicTime}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PrayerTimesPage;
