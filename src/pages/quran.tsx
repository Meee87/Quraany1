import { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Play,
  Pause,
  Bookmark,
  Share2,
  Settings,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRTL } from "@/lib/rtl-context";
import { reciters, Reciter } from "@/lib/reciters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState("الفاتحة");
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(reciters[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showReciterSelector, setShowReciterSelector] = useState(false);
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const { isRTL } = useRTL();

  // Sample surahs for demonstration
  const surahs = [
    { name: "الفاتحة", ayahs: 7 },
    { name: "البقرة", ayahs: 286 },
    { name: "آل عمران", ayahs: 200 },
    { name: "النساء", ayahs: 176 },
    { name: "المائدة", ayahs: 120 },
    { name: "الأنعام", ayahs: 165 },
    { name: "الأعراف", ayahs: 206 },
    { name: "الأنفال", ayahs: 75 },
    { name: "التوبة", ayahs: 129 },
    { name: "يونس", ayahs: 109 },
    { name: "هود", ayahs: 123 },
    { name: "يوسف", ayahs: 111 },
    { name: "الرعد", ayahs: 43 },
    { name: "إبراهيم", ayahs: 52 },
  ];

  // محاكاة تسليط الضوء على الكلمات أثناء التلاوة
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isPlaying) {
      const words = ["الْحَمْدُ", "الدِّينِ", "غَيْرِ"];
      let index = 0;
      interval = setInterval(() => {
        setHighlightedWord(words[index]);
        index = (index + 1) % words.length;
      }, 2000 / playbackSpeed); // تعديل سرعة التسليط بناءً على سرعة التشغيل
    } else {
      setHighlightedWord(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleWordClick = (word: string) => {
    setHighlightedWord(word === highlightedWord ? null : word);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleReciterSelector = () => {
    setShowReciterSelector(!showReciterSelector);
    if (showSpeedControl) setShowSpeedControl(false);
  };

  const toggleSpeedControl = () => {
    setShowSpeedControl(!showSpeedControl);
    if (showReciterSelector) setShowReciterSelector(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center">
          <BookOpen
            className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
          />
          المصحف الشريف
        </h1>
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
      </div>

      <div className="flex h-[calc(100vh-180px)]">
        {/* Surah List */}
        <div
          className={`w-1/3 bg-card rounded-lg shadow-md p-2 overflow-y-auto ${isRTL ? "ml-2" : "mr-2"}`}
        >
          {surahs.map((surah, index) => (
            <div
              key={index}
              className={`p-2 rounded-md cursor-pointer flex justify-between items-center transition-colors duration-200 ${surah.name === selectedSurah ? "bg-primary text-primary-foreground" : "hover:bg-accent/20"}`}
              onClick={() => setSelectedSurah(surah.name)}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full bg-background text-primary flex items-center justify-center text-xs ${isRTL ? "ml-2" : "mr-2"}`}
                >
                  {index + 1}
                </div>
                <span>{surah.name}</span>
              </div>
              <span className="text-xs">{surah.ayahs} آية</span>
            </div>
          ))}
        </div>

        {/* Quran Content */}
        <div className="flex-1 bg-card rounded-lg shadow-md p-4 overflow-y-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-primary">{selectedSurah}</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="icon-hover">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="icon-hover">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="icon-hover">
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center icon-hover"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <>
                    <Pause
                      className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"} text-accent`}
                    />
                    <span>إيقاف</span>
                  </>
                ) : (
                  <>
                    <Play className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                    <span>استماع</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="text-right" dir="rtl">
            {selectedSurah === "الفاتحة" && (
              <div className="text-2xl leading-loose">
                <p className="mb-4 text-center text-primary">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="mb-2">
                  <span
                    className={`cursor-pointer transition-colors duration-200 ${highlightedWord === "الْحَمْدُ" ? "text-accent font-bold" : "text-primary hover:text-accent"}`}
                    onClick={() => handleWordClick("الْحَمْدُ")}
                  >
                    الْحَمْدُ
                  </span>{" "}
                  لِلَّهِ رَبِّ الْعَالَمِينَ
                </p>
                <p className="mb-2">الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p className="mb-2">
                  مَالِكِ يَوْمِ{" "}
                  <span
                    className={`cursor-pointer transition-colors duration-200 ${highlightedWord === "الدِّينِ" ? "text-accent font-bold" : "hover:text-accent"}`}
                    onClick={() => handleWordClick("الدِّينِ")}
                  >
                    الدِّينِ
                  </span>
                </p>
                <p className="mb-2">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</p>
                <p className="mb-2">اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</p>
                <p className="mb-2">
                  صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ{" "}
                  <span
                    className={`cursor-pointer transition-colors duration-200 ${highlightedWord === "غَيْرِ" ? "text-accent font-bold" : "hover:text-accent"}`}
                    onClick={() => handleWordClick("غَيْرِ")}
                  >
                    غَيْرِ
                  </span>{" "}
                  الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ
                </p>
              </div>
            )}
            {selectedSurah === "البقرة" && (
              <div className="text-2xl leading-loose">
                <p className="mb-4 text-center text-primary">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="mb-2">الم</p>
                <p className="mb-2">
                  ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ
                </p>
                <p className="mb-2">
                  الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ
                  وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ
                </p>
                <p className="mb-2">
                  وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ
                  مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ
                </p>
                <p className="mb-2">
                  أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ
                  الْمُفْلِحُونَ
                </p>
              </div>
            )}
            {selectedSurah !== "الفاتحة" && selectedSurah !== "البقرة" && (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                اختر سورة لعرض محتواها
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      {isPlaying && (
        <div className="fixed bottom-16 left-0 right-0 bg-primary text-primary-foreground p-2 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="icon-hover"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <div className="w-24">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setVolume(value[0]);
                    if (value[0] > 0 && isMuted) setIsMuted(false);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="icon-hover"
                onClick={toggleSpeedControl}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <span className="text-sm mx-2">سرعة: {playbackSpeed}x</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm">{selectedReciter.arabicName}</span>
              <Button
                variant="ghost"
                size="icon"
                className="icon-hover"
                onClick={toggleReciterSelector}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Reciter Selector */}
          {showReciterSelector && (
            <div className="mt-2 p-2 bg-card text-card-foreground rounded-md shadow-md">
              <div className="grid grid-cols-2 gap-2">
                {reciters.slice(0, 6).map((reciter) => (
                  <div
                    key={reciter.id}
                    className={`p-2 rounded-md cursor-pointer flex items-center ${reciter.id === selectedReciter.id ? "bg-accent/20" : "hover:bg-accent/10"}`}
                    onClick={() => {
                      setSelectedReciter(reciter);
                      setShowReciterSelector(false);
                    }}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{reciter.arabicName}</div>
                      <div className="text-xs text-muted-foreground">
                        {reciter.country}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speed Control */}
          {showSpeedControl && (
            <div className="mt-2 p-2 bg-card text-card-foreground rounded-md shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm">0.5x</span>
                <Slider
                  value={[playbackSpeed * 10]}
                  min={5}
                  max={20}
                  step={1}
                  className="w-48 mx-4"
                  onValueChange={(value) => setPlaybackSpeed(value[0] / 10)}
                />
                <span className="text-sm">2.0x</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuranPage;
