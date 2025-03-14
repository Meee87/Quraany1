import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  ThumbsUp,
  User,
  Calendar,
  Tag,
  Smile,
  Frown,
  Meh,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from "@/lib/rtl-context";

function QuranInLifePage() {
  const [activeTab, setActiveTab] = useState<"daily" | "stories" | "mood">(
    "daily",
  );
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const { isRTL } = useRTL();

  // Sample daily applications
  const dailyApplications = [
    {
      title: "الصبر في مواجهة التحديات",
      verse:
        "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
      reference: "البقرة: 45",
      application:
        "عندما تواجه تحديات في العمل أو الدراسة، تذكر أن الصبر والصلاة هما مفتاح التغلب على الصعاب. خذ وقتاً للتأمل والدعاء قبل اتخاذ القرارات الصعبة.",
      tags: ["الصبر", "العمل", "التحديات"],
    },
    {
      title: "الإحسان في التعامل مع الآخرين",
      verse: "وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
      reference: "البقرة: 195",
      application:
        "في تعاملاتك اليومية مع الزملاء والأصدقاء والعائلة، اجعل الإحسان منهجك. قدم المساعدة دون انتظار المقابل، وتعامل بلطف حتى مع من يسيء إليك.",
      tags: ["الإحسان", "العلاقات", "الأخلاق"],
    },
  ];

  // Sample real-life stories
  const realLifeStories = [
    {
      title: "كيف غيرت آية قرآنية حياتي المهنية",
      author: "أحمد محمد",
      date: "منذ 3 أيام",
      verse:
        "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
      reference: "الطلاق: 2-3",
      content:
        "كنت أمر بفترة صعبة في عملي، وكنت على وشك فقدان وظيفتي. بدأت في قراءة القرآن بانتظام وتدبر معانيه، وعندما قرأت هذه الآية شعرت بطمأنينة عجيبة. قررت أن أتقي الله في عملي وأؤديه بإتقان دون قلق من المستقبل. بعد أسابيع قليلة، تلقيت عرضاً لوظيفة أفضل لم أكن أتوقعها أبداً!",
      likes: 42,
      comments: 15,
    },
    {
      title: "دروس من سورة الكهف في رحلتي مع المرض",
      author: "سارة أحمد",
      date: "منذ أسبوع",
      verse:
        "عَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰ أَن تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَّكُمْ ۗ وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
      reference: "البقرة: 216",
      content:
        "عندما تم تشخيصي بمرض مزمن، شعرت باليأس والحزن. بدأت في قراءة سورة الكهف كل جمعة، وتأملت في قصصها وعبرها. تعلمت من قصة موسى والخضر أن ما نراه شراً قد يكون خيراً لنا في المستقبل. هذا المرض جعلني أعيد ترتيب أولوياتي في الحياة، وأصبحت أكثر قرباً من الله وأكثر تقديراً للنعم الصغيرة.",
      likes: 78,
      comments: 23,
    },
  ];

  // Mood-based verses
  const moodVerses = {
    happy: {
      title: "الشكر والسعادة",
      verse:
        "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ",
      reference: "إبراهيم: 7",
      reflection:
        "في لحظات السعادة، تذكر شكر الله على نعمه. الشكر يزيد من النعم ويديم السعادة في حياتك.",
    },
    sad: {
      title: "الصبر والأمل",
      verse: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      reference: "الشرح: 5-6",
      reflection:
        "مهما كانت شدة الحزن، فإن الفرج قادم. كرر الله اليسر مرتين ليؤكد أن العسر محاط باليسر من كل جانب.",
    },
    anxious: {
      title: "السكينة والطمأنينة",
      verse:
        "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      reference: "الرعد: 28",
      reflection:
        "عندما تشعر بالقلق، الجأ إلى ذكر الله. التسبيح والاستغفار والدعاء تجلب السكينة للقلب المضطرب.",
    },
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader
        title={
          <div className="flex items-center">
            <Heart
              className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
            />
            <span>القرآن في حياتك</span>
          </div>
        }
        rightContent={
          <div className="relative w-40">
            <Search
              className={`absolute ${isRTL ? "right-3" : "left-3"} top-2.5 h-4 w-4 text-muted-foreground icon-hover`}
            />
            <input
              type="text"
              placeholder="بحث..."
              className={`w-full ${isRTL ? "pr-9 pl-3" : "pl-9 pr-3"} py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
          </div>
        }
      />

      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">تطبيقات يومية</TabsTrigger>
          <TabsTrigger value="stories">قصص حقيقية</TabsTrigger>
          <TabsTrigger value="mood">حسب المزاج</TabsTrigger>
        </TabsList>

        {/* Daily Applications Tab */}
        <TabsContent value="daily" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            تطبيقات عملية للآيات القرآنية في حياتك اليومية
          </p>
          {dailyApplications.map((item, index) => (
            <Card
              key={index}
              className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <div className="bg-primary/5 p-3 rounded-md mb-3 text-right">
                  <p className="text-lg mb-1">{item.verse}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.reference}
                  </p>
                </div>
                <p className="mb-3">{item.application}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <div
                      key={idx}
                      className="bg-secondary/50 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          <Button className="w-full">المزيد من التطبيقات</Button>
        </TabsContent>

        {/* Real-life Stories Tab */}
        <TabsContent value="stories" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            قصص حقيقية عن تأثير القرآن في حياة الناس
          </p>
          {realLifeStories.map((story, index) => (
            <Card
              key={index}
              className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{story.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-2">{story.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{story.date}</span>
                </div>
                <div className="bg-primary/5 p-3 rounded-md mb-3 text-right">
                  <p className="text-lg mb-1">{story.verse}</p>
                  <p className="text-sm text-muted-foreground">
                    {story.reference}
                  </p>
                </div>
                <p className="mb-4">{story.content}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{story.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{story.comments}</span>
                    </Button>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button className="w-full">المزيد من القصص</Button>
        </TabsContent>

        {/* Mood-based Tab */}
        <TabsContent value="mood" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            اختر حالتك المزاجية لنقترح عليك آيات قرآنية تناسب مشاعرك
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card
              className={`cursor-pointer transition-all duration-200 ${currentMood === "happy" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setCurrentMood("happy")}
            >
              <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                <Smile className="h-10 w-10 text-yellow-500 mb-2" />
                <span>سعيد</span>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-all duration-200 ${currentMood === "sad" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setCurrentMood("sad")}
            >
              <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                <Frown className="h-10 w-10 text-blue-500 mb-2" />
                <span>حزين</span>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-all duration-200 ${currentMood === "anxious" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setCurrentMood("anxious")}
            >
              <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                <Meh className="h-10 w-10 text-purple-500 mb-2" />
                <span>قلق</span>
              </CardContent>
            </Card>
          </div>

          {currentMood && (
            <Card className="bg-primary/5 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  {moodVerses[currentMood].title}
                </h3>
                <div className="bg-white p-3 rounded-md mb-3 text-right">
                  <p className="text-lg mb-1">
                    {moodVerses[currentMood].verse}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {moodVerses[currentMood].reference}
                  </p>
                </div>
                <p>{moodVerses[currentMood].reflection}</p>
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Bookmark className="h-4 w-4 mr-1" />
                    حفظ
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    مشاركة
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default QuranInLifePage;
