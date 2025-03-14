import { useState } from "react";
import {
  BookOpen,
  Play,
  Award,
  Star,
  Gift,
  Smile,
  Volume2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRTL } from "@/lib/rtl-context";

function QuranForKidsPage() {
  const [selectedSurah, setSelectedSurah] = useState("الفاتحة");
  const { isRTL } = useRTL();

  // Sample short surahs for kids
  const shortSurahs = [
    { name: "الفاتحة", verses: 7, progress: 100 },
    { name: "الإخلاص", verses: 4, progress: 80 },
    { name: "الفلق", verses: 5, progress: 60 },
    { name: "الناس", verses: 6, progress: 40 },
    { name: "المسد", verses: 5, progress: 20 },
    { name: "النصر", verses: 3, progress: 0 },
  ];

  // Sample games
  const quranGames = [
    {
      name: "ترتيب الآيات",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      name: "اختبار الحفظ",
      icon: <Award className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      name: "أصوات الحروف",
      icon: <Volume2 className="h-6 w-6 text-green-500" />,
      color: "bg-green-100",
    },
    {
      name: "قصص القرآن",
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gradient-to-b from-blue-50 to-green-50">
      <PageHeader
        title={
          <div className="flex items-center">
            <Smile
              className={`h-6 w-6 ${isRTL ? "ml-2" : "mr-2"} text-primary icon-hover`}
            />
            <span>القرآن للأطفال</span>
          </div>
        }
      />

      {/* Character and Welcome */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
        <div>
          <h2 className="text-lg font-bold text-primary mb-1">
            مرحباً بك يا بطل!
          </h2>
          <p className="text-sm">هيا نتعلم ونحفظ القرآن الكريم معاً</p>
          <Button className="mt-2 bg-primary hover:bg-primary/90">
            <Play className="h-4 w-4 mr-1" />
            ابدأ الرحلة
          </Button>
        </div>
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=quran-kid"
            alt="شخصية كرتونية"
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-white shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">تقدمك في الحفظ</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-bold">45 نقطة</span>
            </div>
          </div>
          <Progress value={45} className="h-3 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4 سور محفوظة</span>
            <span>10 سور متبقية</span>
          </div>
        </CardContent>
      </Card>

      {/* Surahs Carousel */}
      <div className="relative">
        <h3 className="font-bold mb-3">السور القصيرة</h3>
        <div className="flex overflow-x-auto pb-2 space-x-3 rtl:space-x-reverse">
          {shortSurahs.map((surah, index) => (
            <Card
              key={index}
              className={`flex-shrink-0 w-32 cursor-pointer transition-all duration-200 ${selectedSurah === surah.name ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedSurah(surah.name)}
            >
              <CardContent className="p-3 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-sm mb-1">{surah.name}</h4>
                <Progress value={surah.progress} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">
                  {surah.verses} آيات
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Interactive Games */}
      <div>
        <h3 className="font-bold mb-3">ألعاب تفاعلية</h3>
        <div className="grid grid-cols-2 gap-3">
          {quranGames.map((game, index) => (
            <Card
              key={index}
              className={`cursor-pointer hover:shadow-md transition-all duration-200 ${game.color}`}
            >
              <CardContent className="p-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  {game.icon}
                </div>
                <span className="font-medium">{game.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Challenge */}
      <Card className="bg-gradient-to-r from-primary/20 to-accent/20 shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold mb-1">تحدي اليوم</h3>
              <p className="text-sm">احفظ آية الكرسي واحصل على هدية خاصة!</p>
              <Button className="mt-2 bg-white text-primary hover:bg-white/90">
                <Gift className="h-4 w-4 mr-1" />
                بدء التحدي
              </Button>
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Gift className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuranForKidsPage;
