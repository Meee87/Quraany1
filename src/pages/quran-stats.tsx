import { useState } from "react";
import {
  BarChart2,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Heart,
  Star,
  Target,
  CheckCircle,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRTL } from "@/lib/rtl-context";

function QuranStatsPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "community">(
    "personal",
  );
  const { isRTL } = useRTL();

  // Sample user stats
  const userStats = {
    totalRead: 1240, // آيات
    totalMemorized: 320, // آيات
    streakDays: 15, // أيام
    badges: 8, // شارات
    dailyAverage: 42, // آيات
    completedKhatmas: 2, // ختمات
  };

  // Sample reading history
  const readingHistory = [
    { day: "الأحد", pages: 12 },
    { day: "الإثنين", pages: 8 },
    { day: "الثلاثاء", pages: 15 },
    { day: "الأربعاء", pages: 10 },
    { day: "الخميس", pages: 7 },
    { day: "الجمعة", pages: 20 },
    { day: "السبت", pages: 5 },
  ];

  // Sample badges
  const badges = [
    {
      name: "المثابر",
      description: "قراءة القرآن لمدة 7 أيام متتالية",
      icon: <Calendar className="h-6 w-6 text-green-500" />,
      achieved: true,
    },
    {
      name: "حافظ جزء عم",
      description: "حفظ جزء عم كاملاً",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      achieved: true,
    },
    {
      name: "قارئ نشط",
      description: "قراءة 1000 آية",
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      achieved: true,
    },
    {
      name: "ختم القرآن",
      description: "إكمال قراءة القرآن كاملاً",
      icon: <Award className="h-6 w-6 text-yellow-500" />,
      achieved: false,
    },
  ];

  // Sample community stats
  const communityStats = {
    totalUsers: 12500,
    totalAyahsRead: 1250000,
    totalKhatmas: 850,
    mostActiveTime: "بعد صلاة الفجر",
    mostReadSurah: "البقرة",
    mostMemorizedSurah: "الكهف",
  };

  // Sample challenges
  const challenges = [
    { name: "تحدي رمضان", progress: 75, total: 30, unit: "يوم" },
    { name: "حفظ سورة البقرة", progress: 40, total: 286, unit: "آية" },
    { name: "قراءة جزء يومياً", progress: 60, total: 30, unit: "يوم" },
  ];

  return (
    <div className="p-4 space-y-6">
      <PageHeader
        title={
          <div className="flex items-center">
            <BarChart2
              className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
            />
            <span>إحصائيات وتحفيز</span>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "personal" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("personal")}
        >
          إحصائياتي الشخصية
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "community" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("community")}
        >
          إحصائيات المجتمع
        </button>
      </div>

      {activeTab === "personal" ? (
        <>
          {/* User Stats Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">آيات مقروءة</h3>
                <p className="text-2xl font-bold text-primary">
                  {userStats.totalRead}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">آيات محفوظة</h3>
                <p className="text-2xl font-bold text-primary">
                  {userStats.totalMemorized}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">أيام متتالية</h3>
                <p className="text-2xl font-bold text-primary">
                  {userStats.streakDays}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Current Streak */}
          <Card className="bg-primary text-primary-foreground shadow-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  استمراريتك الحالية
                </h3>
                <span className="text-xl font-bold">
                  {userStats.streakDays} يوم
                </span>
              </div>
              <p className="text-sm mb-2">
                استمر في القراءة يومياً للحفاظ على استمراريتك!
              </p>
              <div className="flex space-x-1 rtl:space-x-reverse">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full ${index < 5 ? "bg-white" : "bg-white/30"}`}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reading History */}
          <Card className="bg-card shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-bold mb-3 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                نشاط القراءة الأسبوعي
              </h3>
              <div className="flex items-end justify-between h-32">
                {readingHistory.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-primary/80 rounded-t-md transition-all duration-300 hover:bg-primary"
                      style={{ height: `${(day.pages / 20) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          <div>
            <h3 className="font-bold mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              التحديات النشطة
            </h3>
            <div className="space-y-3">
              {challenges.map((challenge, index) => (
                <Card key={index} className="bg-card shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold">{challenge.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(
                          (challenge.progress / 100) * challenge.total,
                        )}{" "}
                        / {challenge.total} {challenge.unit}
                      </span>
                    </div>
                    <Progress value={challenge.progress} className="h-2 mb-2" />
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        تفاصيل التحدي
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="font-bold mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              الشارات والإنجازات
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, index) => (
                <Card
                  key={index}
                  className={`bg-card shadow-sm ${badge.achieved ? "" : "opacity-50"}`}
                >
                  <CardContent className="p-3 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {badge.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold">{badge.name}</h4>
                        {badge.achieved && (
                          <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Community Stats */}
          <Card className="bg-primary text-primary-foreground shadow-md">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-xl font-bold mb-1">مجتمع القراء</h3>
              <p className="text-3xl font-bold">
                {communityStats.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm">مستخدم نشط</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">آيات مقروءة</h3>
                <p className="text-xl font-bold text-primary">
                  {communityStats.totalAyahsRead.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">ختمات مكتملة</h3>
                <p className="text-xl font-bold text-primary">
                  {communityStats.totalKhatmas}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  الأكثر قراءة
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">السورة:</span>
                    <span>{communityStats.mostReadSurah}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">الوقت:</span>
                    <span>{communityStats.mostActiveTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  الأكثر حفظاً
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">السورة:</span>
                    <span>{communityStats.mostMemorizedSurah}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">نسبة الحفظ:</span>
                    <span>65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Challenges */}
          <Card className="bg-card shadow-sm mt-6">
            <CardContent className="p-4">
              <h3 className="font-bold mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                التحديات العالمية
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">تحدي رمضان العالمي</h4>
                    <span className="text-sm text-muted-foreground">
                      15 مليون ختمة
                    </span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">تحدي المليار آية</h4>
                    <span className="text-sm text-muted-foreground">
                      750 مليون / 1 مليار
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
              <Button className="w-full mt-4">انضم للتحديات</Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default QuranStatsPage;
