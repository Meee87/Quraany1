import { useState } from "react";
import {
  BookOpen,
  Moon,
  Sun,
  Settings,
  Type,
  Palette,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRTL } from "@/lib/rtl-context";
import { quranSurahs } from "@/data/quran-surahs";
import { getSurahText } from "@/data/quran-text";

function NightModePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(24);
  const [lineSpacing, setLineSpacing] = useState(1.8);
  const [selectedSurahId, setSelectedSurahId] = useState(1); // Default to Al-Fatiha
  const [showSettings, setShowSettings] = useState(false);
  const { isRTL } = useRTL();

  // Get the selected surah object
  const selectedSurah =
    quranSurahs.find((surah) => surah.id === selectedSurahId) || quranSurahs[0];
  const surahText = getSurahText(selectedSurahId);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleSurahChange = (surahId: number) => {
    setSelectedSurahId(surahId);
  };

  return (
    <div
      className={`p-4 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-background text-foreground"}`}
    >
      <PageHeader
        title={
          <div className="flex items-center">
            <Moon
              className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} ${darkMode ? "text-blue-400" : "text-primary"} icon-hover`}
            />
            <span>وضع القراءة الليلي</span>
          </div>
        }
        rightContent={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`icon-hover ${darkMode ? "text-blue-400" : "text-primary"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`icon-hover ${darkMode ? "text-blue-400" : "text-primary"}`}
              onClick={toggleSettings}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        }
      />

      {/* Reading Settings Panel */}
      {showSettings && (
        <Card
          className={`mb-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-card"}`}
        >
          <CardContent className="p-4">
            <h2 className="font-bold mb-4 flex items-center">
              <Eye
                className={`h-4 w-4 mr-2 ${darkMode ? "text-blue-400" : "text-primary"}`}
              />
              إعدادات القراءة
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    حجم الخط
                  </Label>
                  <span className="text-sm">{fontSize}px</span>
                </div>
                <Slider
                  value={[fontSize]}
                  min={16}
                  max={40}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                  className={darkMode ? "bg-gray-700" : ""}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center">
                    <ChevronUp className="h-4 w-4 mr-1" />
                    <ChevronDown className="h-4 w-4 mr-2" />
                    تباعد الأسطر
                  </Label>
                  <span className="text-sm">{lineSpacing.toFixed(1)}</span>
                </div>
                <Slider
                  value={[lineSpacing * 10]}
                  min={10}
                  max={30}
                  step={1}
                  onValueChange={(value) => setLineSpacing(value[0] / 10)}
                  className={darkMode ? "bg-gray-700" : ""}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  وضع القراءة الليلي
                </Label>
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex h-[calc(100vh-180px)]">
        {/* Surah List */}
        <div
          className={`w-1/3 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-card"} rounded-lg shadow-md p-2 overflow-y-auto ${isRTL ? "ml-2" : "mr-2"}`}
        >
          {quranSurahs.map((surah) => (
            <div
              key={surah.id}
              className={`p-2 rounded-md cursor-pointer flex justify-between items-center transition-colors duration-200 ${
                surah.id === selectedSurahId
                  ? darkMode
                    ? "bg-blue-900 text-white"
                    : "bg-primary text-primary-foreground"
                  : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-accent/20"
              }`}
              onClick={() => handleSurahChange(surah.id)}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full ${
                    darkMode ? "bg-gray-900" : "bg-background"
                  } ${darkMode ? "text-blue-400" : "text-primary"} flex items-center justify-center text-xs ${isRTL ? "ml-2" : "mr-2"}`}
                >
                  {surah.id}
                </div>
                <span>{surah.name}</span>
              </div>
              <span className="text-xs">{surah.ayahs} آية</span>
            </div>
          ))}
        </div>

        {/* Quran Content */}
        <div
          className={`flex-1 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-card"} rounded-lg shadow-md p-4 overflow-y-auto`}
        >
          <div className="mb-4 flex justify-between items-center">
            <h2
              className={`text-lg font-bold ${darkMode ? "text-blue-400" : "text-primary"}`}
            >
              {selectedSurah.name}
            </h2>
          </div>

          <div className="text-right" dir="rtl">
            {surahText ? (
              <div
                className={`font-quran transition-all duration-300`}
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: lineSpacing,
                }}
              >
                <p
                  className={`mb-4 text-center ${darkMode ? "text-blue-400" : "text-primary"}`}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {surahText.ayahs.map((ayah) => (
                  <p key={ayah.number} className="mb-2">
                    {ayah.text}
                    <span
                      className={`mr-2 text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"}`}
                    >
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
        </div>
      </div>
    </div>
  );
}

export default NightModePage;
