import { useState, useEffect } from "react";
import { Compass, MapPin, RotateCw, Share2, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRTL } from "@/lib/rtl-context";
import { gulfCities } from "@/lib/prayer-times";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";

function QiblaPage() {
  const [direction, setDirection] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState("الرياض");
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const { isRTL } = useRTL();

  // محاكاة الحصول على اتجاه البوصلة
  useEffect(() => {
    // في تطبيق حقيقي، سنستخدم توجيه الجهاز وتحديد الموقع الجغرافي
    // لأغراض العرض التوضيحي، سنعين اتجاهًا عشوائيًا
    const randomDirection = Math.floor(Math.random() * 360);
    setDirection(randomDirection);
  }, []);

  // تغيير الاتجاه عند تغيير المدينة
  useEffect(() => {
    setIsRotating(true);
    // محاكاة تغيير الاتجاه بناءً على المدينة المختارة
    const timeout = setTimeout(() => {
      // توليد اتجاه مختلف لكل مدينة (للعرض التوضيحي فقط)
      const cityIndex = gulfCities.findIndex(
        (city) => city.name === selectedCity,
      );
      const newDirection = 45 + cityIndex * 10;
      setDirection(newDirection);
      setIsRotating(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [selectedCity]);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    // محاكاة عملية المعايرة
    setTimeout(() => {
      const newDirection = Math.floor(Math.random() * 360);
      setDirection(newDirection);
      setIsCalibrating(false);
    }, 2000);
  };

  const handleShare = () => {
    alert("تم نسخ رابط اتجاه القبلة إلى الحافظة");
  };

  const handleDownload = () => {
    alert("جاري تنزيل اتجاه القبلة للاستخدام دون اتصال");
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader
        title={
          <div className="flex items-center">
            <Compass
              className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
            />
            <span>اتجاه القبلة</span>
          </div>
        }
        rightContent={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="icon-hover"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="icon-hover"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      {/* Location */}
      <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center">
            <MapPin
              className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} text-primary icon-hover`}
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
        </CardContent>
      </Card>

      {/* Compass */}
      <div className="flex justify-center py-6">
        <div className="relative">
          <div
            className="w-64 h-64 rounded-full border-4 border-primary flex items-center justify-center bg-card"
            style={{ position: "relative" }}
          >
            {/* Compass markings */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold">
              N
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold">
              S
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-bold">
              W
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-bold">
              E
            </div>

            {/* Compass needle */}
            <div
              className="w-1 h-48 bg-gradient-to-t from-primary to-accent absolute rounded-full"
              style={{
                transform: `rotate(${direction !== null ? direction : 0}deg)`,
                transformOrigin: "center center",
                transition: "transform 0.8s ease-out",
              }}
            />

            {/* Kaaba indicator */}
            <div
              className="absolute w-8 h-8 bg-primary rounded-sm shadow-lg"
              style={{
                transform: `rotate(${direction !== null ? direction : 0}deg) translateY(-100px)`,
                transformOrigin: "center center",
                transition: "transform 0.8s ease-out",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-4 h-4 bg-accent rounded-sm"></div>
              </div>
            </div>

            {/* Center point */}
            <div className="w-4 h-4 rounded-full bg-gray-800 z-10" />
          </div>
        </div>
      </div>

      {/* Direction info */}
      <Card className="bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-bold mb-1">اتجاه القبلة</h2>
          <p>
            {direction !== null && !isRotating
              ? `${direction}° من الشمال`
              : "جاري تحديد الاتجاه..."}
          </p>
        </CardContent>
      </Card>

      {/* Calibration button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="flex items-center icon-hover"
          onClick={handleCalibrate}
          disabled={isCalibrating}
        >
          <RotateCw
            className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} ${isCalibrating ? "animate-spin" : ""}`}
          />
          {isCalibrating ? "جاري المعايرة..." : "معايرة البوصلة"}
        </Button>
      </div>

      {/* Instructions */}
      <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">تعليمات الاستخدام</h3>
          <ul className="text-sm space-y-2">
            <li>1. امسك الهاتف بشكل أفقي ومستوٍ</li>
            <li>2. قم بتدوير الهاتف حتى يشير المؤشر إلى الكعبة</li>
            <li>3. إذا كان الاتجاه غير دقيق، اضغط على زر المعايرة</li>
            <li>4. يمكنك تغيير المدينة لتحديث اتجاه القبلة</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default QiblaPage;
