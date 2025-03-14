import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Settings,
  Search,
  BookOpen,
  Share2,
  Bookmark,
  Menu,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { quranSurahs } from "@/data/quran-surahs";
import { getSurahText } from "@/data/quran-text";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { reciters } from "@/lib/reciters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Define juz data structure
interface Juz {
  number: number;
  name: string;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
  pages: [number, number]; // [start, end]
}

// Sample Juz data (simplified)
const juzData: Juz[] = [
  {
    number: 1,
    name: "الجزء الأول",
    startSurah: 1,
    startAyah: 1,
    endSurah: 2,
    endAyah: 141,
    pages: [1, 21],
  },
  {
    number: 2,
    name: "الجزء الثاني",
    startSurah: 2,
    startAyah: 142,
    endSurah: 2,
    endAyah: 252,
    pages: [22, 41],
  },
  {
    number: 3,
    name: "الجزء الثالث",
    startSurah: 2,
    startAyah: 253,
    endSurah: 3,
    endAyah: 92,
    pages: [42, 61],
  },
  {
    number: 4,
    name: "الجزء الرابع",
    startSurah: 3,
    startAyah: 93,
    endSurah: 4,
    endAyah: 23,
    pages: [62, 81],
  },
  {
    number: 5,
    name: "الجزء الخامس",
    startSurah: 4,
    startAyah: 24,
    endSurah: 4,
    endAyah: 147,
    pages: [82, 101],
  },
];

function QuranMushaf() {
  const [selectedSurahId, setSelectedSurahId] = useState(1); // Default to Al-Fatiha
  const [currentJuz, setCurrentJuz] = useState(1); // Default to Juz 1
  const [currentPage, setCurrentPage] = useState(1); // Default to page 1
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSurahList, setShowSurahList] = useState(false);
  const [showJuzList, setShowJuzList] = useState(false);
  const [audioState, audioControls] = useAudioPlayer();
  const [selectedReciter, setSelectedReciter] = useState("mishary");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  // Get the selected surah object
  const selectedSurah =
    quranSurahs.find((surah) => surah.id === selectedSurahId) || quranSurahs[0];
  const surahText = getSurahText(selectedSurahId);

  // Get current juz object
  const currentJuzObj =
    juzData.find((juz) => juz.number === currentJuz) || juzData[0];

  // Filter surahs based on search query
  const filteredSurahs = quranSurahs.filter((surah) =>
    surah.name.includes(searchQuery),
  );

  // Handle surah selection
  const handleSurahSelect = (surahId: number) => {
    setSelectedSurahId(surahId);
    setShowSurahList(false);
    // Find the juz that contains this surah
    const surahJuz = juzData.find(
      (juz) => juz.startSurah <= surahId && juz.endSurah >= surahId,
    );
    if (surahJuz) {
      setCurrentJuz(surahJuz.number);
      setCurrentPage(surahJuz.pages[0]);
    }
  };

  // Handle juz selection
  const handleJuzSelect = (juzNumber: number) => {
    setCurrentJuz(juzNumber);
    const juz = juzData.find((j) => j.number === juzNumber);
    if (juz) {
      setSelectedSurahId(juz.startSurah);
      setCurrentPage(juz.pages[0]);
    }
    setShowJuzList(false);
  };

  // Handle audio playback
  const togglePlayback = () => {
    if (isPlaying) {
      audioControls.pause();
    } else {
      audioControls.loadAudio(selectedReciter, selectedSurahId);
      audioControls.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update isPlaying state when audio state changes
  useEffect(() => {
    setIsPlaying(audioState.isPlaying);
  }, [audioState.isPlaying]);

  // Handle playback speed change
  const handleSpeedChange = (value: number[]) => {
    const speed = value[0];
    setPlaybackSpeed(speed);
    audioControls.setPlaybackRate(speed);
  };

  // Handle reciter change
  const handleReciterChange = (value: string) => {
    setSelectedReciter(value);
    if (isPlaying) {
      audioControls.loadAudio(value, selectedSurahId);
    }
  };

  // Handle bookmark toggle
  const toggleBookmark = () => {
    if (bookmarks.includes(selectedSurahId)) {
      setBookmarks(bookmarks.filter((id) => id !== selectedSurahId));
    } else {
      setBookmarks([...bookmarks, selectedSurahId]);
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `سورة ${selectedSurah.name}`,
          text: `أقرأ سورة ${selectedSurah.name} من المصحف الشريف`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      alert(`مشاركة سورة ${selectedSurah.name}: ${window.location.href}`);
    }
  };

  // Handle page navigation
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f4e8] text-[#333]">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 bg-[#3bb1a2] text-white shadow-md">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <h1 className="text-xl font-bold">{selectedSurah.name}</h1>
          <button
            onClick={() => setShowJuzList(!showJuzList)}
            className="text-sm bg-white/20 px-2 py-0.5 rounded hover:bg-white/30 transition-colors"
          >
            {currentJuzObj.name}
          </button>
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleBookmark}>
            <Bookmark
              className={`h-5 w-5 ${bookmarks.includes(selectedSurahId) ? "fill-white" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Juz List Dialog */}
      {showJuzList && (
        <div className="absolute top-16 left-0 right-0 bg-white z-50 shadow-lg rounded-b-lg max-h-64 overflow-y-auto">
          <div className="flex justify-between items-center p-2 border-b">
            <h3 className="font-bold">اختر الجزء</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowJuzList(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-2">
            {juzData.map((juz) => (
              <div
                key={juz.number}
                className={`p-2 rounded-md cursor-pointer ${juz.number === currentJuz ? "bg-[#3bb1a2] text-white" : "hover:bg-gray-100"}`}
                onClick={() => handleJuzSelect(juz.number)}
              >
                {juz.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Dialog */}
      {showSettings && (
        <div className="absolute top-16 left-0 right-0 bg-white z-50 shadow-lg rounded-b-lg">
          <div className="flex justify-between items-center p-2 border-b">
            <h3 className="font-bold">الإعدادات</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">حجم الخط</h4>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  -
                </Button>
                <Slider defaultValue={[16]} min={12} max={24} step={1} />
                <Button variant="outline" size="sm">
                  +
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">نوع الخط</h4>
              <Select defaultValue="uthmani">
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الخط" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uthmani">خط عثماني</SelectItem>
                  <SelectItem value="naskh">خط نسخ</SelectItem>
                  <SelectItem value="indopak">خط هندي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">وضع القراءة</h4>
              <Select defaultValue="day">
                <SelectTrigger>
                  <SelectValue placeholder="اختر وضع القراءة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">وضع النهار</SelectItem>
                  <SelectItem value="night">وضع الليل</SelectItem>
                  <SelectItem value="sepia">وضع القراءة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 flex">
        {/* Side Navigation */}
        <div className="w-64 bg-white rounded-lg shadow-md p-4 ml-4 hidden md:block">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="البحث في السور..."
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredSurahs.map((surah) => (
              <div
                key={surah.id}
                className={`p-2 rounded-md cursor-pointer ${surah.id === selectedSurahId ? "bg-[#3bb1a2] text-white" : "hover:bg-gray-100"}`}
                onClick={() => handleSurahSelect(surah.id)}
              >
                <div className="flex justify-between items-center">
                  <span>{surah.name}</span>
                  <span className="text-xs opacity-80">{surah.ayahs} آية</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quran Text */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 text-right">
          <div className="text-3xl leading-loose font-quran" dir="rtl">
            <p className="mb-4 text-center text-[#3bb1a2]">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            {surahText &&
              surahText.ayahs.map((ayah) => (
                <p key={ayah.number} className="mb-2">
                  {ayah.text}
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f8f4e8] text-[#3bb1a2] text-sm mx-1">
                    {ayah.number}
                  </span>
                </p>
              ))}
          </div>
        </div>
      </main>

      {/* Mobile Surah List Button */}
      <div className="md:hidden fixed bottom-20 right-4 z-10">
        <Dialog open={showSurahList} onOpenChange={setShowSurahList}>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-full bg-[#3bb1a2] shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>اختر السورة</DialogTitle>
            </DialogHeader>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="البحث في السور..."
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[50vh] overflow-y-auto">
              {filteredSurahs.map((surah) => (
                <DialogClose asChild key={surah.id}>
                  <div
                    className={`p-2 rounded-md cursor-pointer ${surah.id === selectedSurahId ? "bg-[#3bb1a2] text-white" : "hover:bg-gray-100"}`}
                    onClick={() => handleSurahSelect(surah.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{surah.name}</span>
                      <span className="text-xs opacity-80">
                        {surah.ayahs} آية
                      </span>
                    </div>
                  </div>
                </DialogClose>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Page Navigation */}
      <div className="fixed bottom-20 left-4 z-10 flex space-x-2">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-white shadow-lg"
          onClick={prevPage}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <div className="flex items-center justify-center bg-white rounded-full h-10 w-10 shadow-lg">
          <span className="text-sm font-medium">{currentPage}</span>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-white shadow-lg"
          onClick={nextPage}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Controls */}
      <footer className="bg-white p-4 shadow-md">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <div className="flex flex-col">
              <Select
                value={selectedReciter}
                onValueChange={handleReciterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر القارئ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mishary">مشاري راشد العفاسي</SelectItem>
                  <SelectItem value="sudais">عبد الرحمن السديس</SelectItem>
                  <SelectItem value="minshawi">محمد صديق المنشاوي</SelectItem>
                  <SelectItem value="husary">محمود خليل الحصري</SelectItem>
                  <SelectItem value="ajmy">أحمد العجمي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex items-center space-x-2">
              <span className="text-sm">سرعة التلاوة</span>
              <Slider
                value={[playbackSpeed]}
                min={0.5}
                max={2}
                step={0.1}
                className="w-32"
                onValueChange={handleSpeedChange}
              />
              <span className="text-sm">{playbackSpeed}x</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default QuranMushaf;
