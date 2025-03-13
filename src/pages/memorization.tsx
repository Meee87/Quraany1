import { useState } from "react";
import {
  BookMarked,
  CheckCircle,
  Play,
  Repeat,
  Plus,
  Award,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRTL } from "@/lib/rtl-context";
import { reciters } from "@/lib/reciters";

function MemorizationPage() {
  const [activeTab, setActiveTab] = useState<"plans" | "activities" | "stats">(
    "plans",
  );
  const { isRTL } = useRTL();

  // Sample memorization data
  const memorizationPlans = [
    {
      id: 1,
      name: "جزء عم",
      progress: 75,
      totalVerses: 564,
      memorizedVerses: 423,
      lastReviewed: "منذ يومين",
    },
    {
      id: 2,
      name: "سورة البقرة",
      progress: 30,
      totalVerses: 286,
      memorizedVerses: 86,
      lastReviewed: "منذ 3 أيام",
    },
    {
      id: 3,
      name: "سورة يس",
      progress: 90,
      totalVerses: 83,
      memorizedVerses: 75,
      lastReviewed: "اليوم",
    },
    {
      id: 4,
      name: "سورة الملك",
      progress: 60,
      totalVerses: 30,
      memorizedVerses: 18,
      lastReviewed: "أمس",
    },
    {
      id: 5,
      name: "سورة الكهف",
      progress: 40,
      totalVerses: 110,
      memorizedVerses: 44,
      lastReviewed: "منذ أسبوع",
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      date: "اليوم",
      surah: "سورة الملك",
      verses: "1-5",
      duration: "15 دقيقة",
      type: "حفظ",
    },
    {
      date: "أمس",
      surah: "سورة يس",
      verses: "60-70",
      duration: "20 دقيقة",
      type: "مراجعة",
    },
    {
      date: "قبل يومين",
      surah: "سورة البقرة",
      verses: "255-260",
      duration: "30 دقيقة",
      type: "حفظ",
    },
    {
      date: "قبل 3 أيام",
      surah: "سورة الكهف",
      verses: "1-10",
      duration: "25 دقيقة",
      type: "مراجعة",
    },
    {
      date: "قبل أسبوع",
      surah: "سورة الرحمن",
      verses: "1-20",
      duration: "40 دقيقة",
      type: "حفظ",
    },
  ];

  // إحصائيات الحفظ
  const memorizationStats = {
    totalMemorized: 646, // عدد الآيات المحفوظة
    totalReviewed: 1240, // عدد الآيات التي تمت مراجعتها
    streakDays: 12, // عدد أيام الاستمرارية
    weeklyProgress: 28, // التقدم الأسبوعي (آيات)
    monthlyProgress: 120, // التقدم الشهري (آيات)
    averageDaily: 5.2, // متوسط الآيات اليومي
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center">
          <BookMarked
            className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
          />
          حفظ القرآن
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center icon-hover"
        >
          <Plus className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
          <span>خطة جديدة</span>
        </Button>
      </div>

      {/* Daily Goal */}
      <Card className="bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4">
          <h2 className="text-center mb-2">هدف اليوم</h2>
          <div className="flex items-center justify-between mb-2">
            <span>5 آيات</span>
            <span>3/5 مكتملة</span>
          </div>
          <Progress value={60} className="h-2 bg-white/20" />
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 icon-hover"
            >
              <Play className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
              <span>متابعة الحفظ</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "plans" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("plans")}
        >
          خطط الحفظ
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "activities" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("activities")}
        >
          النشاط
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "stats" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("stats")}
        >
          الإحصائيات
        </button>
      </div>

      {/* Memorization Plans */}
      {activeTab === "plans" && (
        <div className="space-y-3">
          {memorizationPlans.map((plan) => (
            <Card
              key={plan.id}
              className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">{plan.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {plan.memorizedVerses}/{plan.totalVerses} آية
                  </span>
                </div>
                <Progress value={plan.progress} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    آخر مراجعة: {plan.lastReviewed}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs icon-hover"
                    >
                      <Repeat
                        className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`}
                      />
                      <span>مراجعة</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs icon-hover"
                    >
                      <Play className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                      <span>متابعة</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Activities Tab */}
      {activeTab === "activities" && (
        <div className="space-y-3">
          <Card className="bg-card shadow-sm">
            <CardContent className="p-0">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className={`p-3 flex justify-between items-center ${index !== recentActivities.length - 1 ? "border-b" : ""}`}
                >
                  <div>
                    <div className="font-medium">{activity.surah}</div>
                    <div className="text-xs text-muted-foreground">
                      الآيات {activity.verses}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {activity.date}
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="mr-1">{activity.duration}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-xs ${activity.type === "حفظ" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent-foreground"}`}
                      >
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <BookMarked className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">آيات محفوظة</h3>
                </div>
                <p className="text-2xl font-bold">
                  {memorizationStats.totalMemorized}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Repeat className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">آيات مراجعة</h3>
                </div>
                <p className="text-2xl font-bold">
                  {memorizationStats.totalReviewed}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-accent" />
                  <h3 className="font-medium">أيام متتالية</h3>
                </div>
                <p className="text-2xl font-bold">
                  {memorizationStats.streakDays}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">تقدم أسبوعي</h3>
                </div>
                <p className="text-2xl font-bold">
                  {memorizationStats.weeklyProgress} آية
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary text-primary-foreground shadow-md">
            <CardContent className="p-4 text-center">
              <h2 className="text-xl font-bold mb-1">متوسط الحفظ اليومي</h2>
              <p className="text-3xl font-bold">
                {memorizationStats.averageDaily} آية
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default MemorizationPage;
