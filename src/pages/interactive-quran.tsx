import { useState } from "react";
import {
  BookOpen,
  Headphones,
  MessageCircle,
  Award,
  BarChart2,
  Heart,
  Moon,
  Sun,
  Users,
  Search,
  Play,
  Bookmark,
  Share2,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from "@/lib/rtl-context";
import { quranSurahs } from "@/data/quran-surahs";
import { getSurahText } from "@/data/quran-text";

function InteractiveQuranPage() {
  const [selectedSurahId, setSelectedSurahId] = useState(1); // Default to Al-Fatiha
  const [activeTab, setActiveTab] = useState<
    "recitation" | "tafsir" | "reflection" | "memorization"
  >("recitation");
  const [darkMode, setDarkMode] = useState(false);
  const { isRTL } = useRTL();

  // Get the selected surah object
  const selectedSurah =
    quranSurahs.find((surah) => surah.id === selectedSurahId) || quranSurahs[0];
  const surahText = getSurahText(selectedSurahId);

  // Tajweed colors for demonstration
  const tajweedColors = {
    ikhfa: "text-blue-500",
    idgham: "text-green-500",
    iqlab: "text-purple-500",
    qalqalah: "text-orange-500",
  };

  // Sample highlighted words with tajweed rules
  const highlightedWords = {
    الْحَمْدُ: "ikhfa",
    الدِّينِ: "idgham",
    نَعْبُدُ: "qalqalah",
    نَسْتَعِينُ: "iqlab",
  };

  const handleSurahChange = (surahId: number) => {
    setSelectedSurahId(surahId);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-background"}`}
    >
      <PageHeader
        title={
          <div className="flex items-center">
            <BookOpen
              className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
            />
            <span>القرآن التفاعلي</span>
          </div>
        }
        rightContent={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="icon-hover"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <div className="relative w-40">
              <Search
                className={`absolute ${isRTL ? "right-3" : "left-3"} top-2.5 h-4 w-4 text-muted-foreground icon-hover`}
              />
              <input
                type="text"
                placeholder="بحث..."
                className={`w-full ${isRTL ? "pr-9 pl-3" : "pl-9 pr-3"} py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
              />
            </div>
          </div>
        }
      />

      {/* Feature Icons */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          {
            name: "التلاوة التفاعلية",
            icon: <Headphones className="h-6 w-6" />,
            tab: "recitation",
          },
          {
            name: "التفسير",
            icon: <MessageCircle className="h-6 w-6" />,
            tab: "tafsir",
          },
          {
            name: "التدبر",
            icon: <Heart className="h-6 w-6" />,
            tab: "reflection",
          },
          {
            name: "الحفظ والمراجعة",
            icon: <Award className="h-6 w-6" />,
            tab: "memorization",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all duration-200 ${activeTab === feature.tab ? "bg-primary text-primary-foreground" : darkMode ? "bg-gray-800" : "bg-card"}`}
            onClick={() => setActiveTab(feature.tab as any)}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {feature.icon}
              </div>
              <span className="text-sm">{feature.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex h-[calc(100vh-280px)]">
        {/* Surah List */}
        <div
          className={`w-1/3 ${darkMode ? "bg-gray-800" : "bg-card"} rounded-lg shadow-md p-2 overflow-y-auto ${isRTL ? "ml-2" : "mr-2"}`}
        >
          {quranSurahs.map((surah) => (
            <div
              key={surah.id}
              className={`p-2 rounded-md cursor-pointer flex justify-between items-center transition-colors duration-200 ${surah.id === selectedSurahId ? "bg-primary text-primary-foreground" : darkMode ? "hover:bg-gray-700" : "hover:bg-accent/20"}`}
              onClick={() => handleSurahChange(surah.id)}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full ${darkMode ? "bg-gray-900" : "bg-background"} text-primary flex items-center justify-center text-xs ${isRTL ? "ml-2" : "mr-2"}`}
                >
                  {surah.id}
                </div>
                <span>{surah.name}</span>
              </div>
              <span className="text-xs">{surah.ayahs} آية</span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div
          className={`flex-1 ${darkMode ? "bg-gray-800" : "bg-card"} rounded-lg shadow-md p-4 overflow-y-auto`}
        >
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-primary">
              {selectedSurah.name}
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="icon-hover">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="icon-hover">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center icon-hover"
              >
                <Play className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                <span>استماع</span>
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recitation">التلاوة</TabsTrigger>
              <TabsTrigger value="tafsir">التفسير</TabsTrigger>
              <TabsTrigger value="reflection">التدبر</TabsTrigger>
              <TabsTrigger value="memorization">الحفظ</TabsTrigger>
            </TabsList>

            {/* Recitation Tab */}
            <TabsContent value="recitation" className="mt-4">
              <div className="text-right" dir="rtl">
                {surahText ? (
                  <div
                    className={`text-2xl leading-loose font-quran ${darkMode ? "text-white" : ""}`}
                  >
                    <p className="mb-4 text-center text-primary">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                    {surahText.ayahs.map((ayah) => (
                      <p key={ayah.number} className="mb-2">
                        {/* Split text and apply tajweed colors */}
                        {ayah.text.split(" ").map((word, idx) => {
                          const tajweedRule = Object.keys(
                            highlightedWords,
                          ).find((key) => word.includes(key));
                          return (
                            <span
                              key={idx}
                              className={
                                tajweedRule
                                  ? tajweedColors[highlightedWords[tajweedRule]]
                                  : ""
                              }
                            >
                              {word}{" "}
                            </span>
                          );
                        })}
                        <span className="mr-2 text-sm text-muted-foreground">
                          ﴿{ayah.number}﴾
                        </span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    اختر سورة لعرض محتواها
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tafsir Tab */}
            <TabsContent value="tafsir" className="mt-4">
              <div className="flex mb-4">
                <Button variant="outline" className="mr-2">
                  تفسير ابن كثير
                </Button>
                <Button variant="outline" className="mr-2">
                  تفسير السعدي
                </Button>
                <Button variant="outline">تفسير الطبري</Button>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                <h3 className="font-bold mb-2">
                  تفسير سورة {selectedSurah.name}
                </h3>
                <p className="text-sm">
                  هذا القسم يعرض تفسير الآيات بشكل مبسط ومفصل، مع إمكانية
                  الاستماع للتفسير الصوتي أو مشاهدة فيديوهات توضيحية لمعاني
                  الآيات وأسباب النزول.
                </p>
              </div>
              {surahText &&
                surahText.ayahs.slice(0, 3).map((ayah) => (
                  <div key={ayah.number} className="mb-4 p-3 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">الآية {ayah.number}</span>
                      <Button variant="ghost" size="sm">
                        <Headphones className="h-4 w-4 mr-1" />
                        استماع للتفسير
                      </Button>
                    </div>
                    <p className="text-primary mb-2">{ayah.text}</p>
                    <p className="text-sm">
                      تفسير الآية: هذا النص هو مثال لتفسير الآية، وسيتم استبداله
                      بالتفسير الحقيقي من المصادر المعتمدة.
                    </p>
                  </div>
                ))}
            </TabsContent>

            {/* Reflection Tab */}
            <TabsContent value="reflection" className="mt-4">
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                <h3 className="font-bold mb-2">
                  تدبر سورة {selectedSurah.name}
                </h3>
                <p className="text-sm">
                  في هذا القسم يمكنك إضافة تأملاتك الشخصية حول الآيات، ومشاركتها
                  مع الآخرين، والاطلاع على تدبرات المستخدمين الآخرين.
                </p>
              </div>
              {surahText &&
                surahText.ayahs.slice(0, 2).map((ayah) => (
                  <div key={ayah.number} className="mb-4 p-3 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">الآية {ayah.number}</span>
                      <div className="flex">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          حفظ
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          مشاركة
                        </Button>
                      </div>
                    </div>
                    <p className="text-primary mb-2">{ayah.text}</p>
                    <textarea
                      className={`w-full p-2 border rounded-md ${darkMode ? "bg-gray-700 border-gray-600" : ""}`}
                      placeholder="أضف تأملاتك حول هذه الآية..."
                      rows={3}
                    ></textarea>
                    <div className="mt-2">
                      <h4 className="text-sm font-bold flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        تأملات المستخدمين
                      </h4>
                      <div className="mt-2 text-sm p-2 bg-secondary/10 rounded-md">
                        <p className="mb-1 font-bold">أحمد محمد:</p>
                        <p>
                          هذه الآية تذكرنا بأهمية الشكر والحمد لله على نعمه التي
                          لا تعد ولا تحصى.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>

            {/* Memorization Tab */}
            <TabsContent value="memorization" className="mt-4">
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                <h3 className="font-bold mb-2">
                  حفظ ومراجعة سورة {selectedSurah.name}
                </h3>
                <p className="text-sm">
                  هذا القسم يساعدك على حفظ القرآن الكريم بطريقة منظمة، مع
                  اختبارات تفاعلية للمراجعة وتتبع تقدمك.
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex-1 mr-2 p-3 border rounded-lg text-center">
                  <BarChart2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <h4 className="font-bold">تقدم الحفظ</h4>
                  <p className="text-2xl font-bold text-primary">35%</p>
                  <p className="text-xs text-muted-foreground">12 آية من 30</p>
                </div>
                <div className="flex-1 ml-2 p-3 border rounded-lg text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <h4 className="font-bold">الإنجازات</h4>
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-xs text-muted-foreground">شارات مكتسبة</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button className="flex items-center justify-center py-6">
                  <Play className="h-5 w-5 mr-2" />
                  بدء جلسة حفظ
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center py-6"
                >
                  <Award className="h-5 w-5 mr-2" />
                  اختبار المراجعة
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default InteractiveQuranPage;
