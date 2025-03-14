import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Share2,
  Menu,
  Check,
  BookOpen,
  Bookmark,
  Volume2,
  Search,
  Settings,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRTL } from "@/lib/rtl-context";
import { quranSurahs } from "@/data/quran-surahs";
import { getSurahText } from "@/data/quran-text";
import { useAudioPlayer } from "@/hooks/use-audio-player";

// Define juz data structure
interface Juz {
  number: number;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
  pages: [number, number]; // [start, end]
  name: string;
}

// Sample Juz data (simplified)
const juzData: Juz[] = [
  {
    number: 1,
    startSurah: 1,
    startAyah: 1,
    endSurah: 2,
    endAyah: 141,
    pages: [1, 21],
    name: "الجزء الأول",
  },
  {
    number: 2,
    startSurah: 2,
    startAyah: 142,
    endSurah: 2,
    endAyah: 252,
    pages: [22, 41],
    name: "الجزء الثاني",
  },
  {
    number: 3,
    startSurah: 2,
    startAyah: 253,
    endSurah: 3,
    endAyah: 92,
    pages: [42, 61],
    name: "الجزء الثالث",
  },
  {
    number: 4,
    startSurah: 3,
    startAyah: 93,
    endSurah: 4,
    endAyah: 23,
    pages: [62, 81],
    name: "الجزء الرابع",
  },
  {
    number: 5,
    startSurah: 4,
    startAyah: 24,
    endSurah: 4,
    endAyah: 147,
    pages: [82, 101],
    name: "الجزء الخامس",
  },
  {
    number: 6,
    startSurah: 4,
    startAyah: 148,
    endSurah: 5,
    endAyah: 81,
    pages: [102, 121],
    name: "الجزء السادس",
  },
  {
    number: 7,
    startSurah: 5,
    startAyah: 82,
    endSurah: 6,
    endAyah: 110,
    pages: [122, 141],
    name: "الجزء السابع",
  },
  {
    number: 8,
    startSurah: 6,
    startAyah: 111,
    endSurah: 7,
    endAyah: 87,
    pages: [142, 161],
    name: "الجزء الثامن",
  },
  {
    number: 9,
    startSurah: 7,
    startAyah: 88,
    endSurah: 8,
    endAyah: 40,
    pages: [162, 181],
    name: "الجزء التاسع",
  },
  {
    number: 10,
    startSurah: 8,
    startAyah: 41,
    endSurah: 9,
    endAyah: 92,
    pages: [182, 201],
    name: "الجزء العاشر",
  },
  {
    number: 11,
    startSurah: 9,
    startAyah: 93,
    endSurah: 11,
    endAyah: 5,
    pages: [202, 221],
    name: "الجزء الحادي عشر",
  },
  {
    number: 12,
    startSurah: 11,
    startAyah: 6,
    endSurah: 12,
    endAyah: 52,
    pages: [222, 241],
    name: "الجزء الثاني عشر",
  },
  {
    number: 13,
    startSurah: 12,
    startAyah: 53,
    endSurah: 14,
    endAyah: 52,
    pages: [242, 261],
    name: "الجزء الثالث عشر",
  },
  {
    number: 14,
    startSurah: 15,
    startAyah: 1,
    endSurah: 16,
    endAyah: 128,
    pages: [262, 281],
    name: "الجزء الرابع عشر",
  },
  {
    number: 15,
    startSurah: 17,
    startAyah: 1,
    endSurah: 18,
    endAyah: 74,
    pages: [282, 301],
    name: "الجزء الخامس عشر",
  },
  {
    number: 16,
    startSurah: 18,
    startAyah: 75,
    endSurah: 20,
    endAyah: 135,
    pages: [302, 321],
    name: "الجزء السادس عشر",
  },
  {
    number: 17,
    startSurah: 21,
    startAyah: 1,
    endSurah: 22,
    endAyah: 78,
    pages: [322, 341],
    name: "الجزء السابع عشر",
  },
  {
    number: 18,
    startSurah: 23,
    startAyah: 1,
    endSurah: 25,
    endAyah: 20,
    pages: [342, 361],
    name: "الجزء الثامن عشر",
  },
  {
    number: 19,
    startSurah: 25,
    startAyah: 21,
    endSurah: 27,
    endAyah: 55,
    pages: [362, 381],
    name: "الجزء التاسع عشر",
  },
  {
    number: 20,
    startSurah: 27,
    startAyah: 56,
    endSurah: 29,
    endAyah: 45,
    pages: [382, 401],
    name: "الجزء العشرون",
  },
  {
    number: 21,
    startSurah: 29,
    startAyah: 46,
    endSurah: 33,
    endAyah: 30,
    pages: [402, 421],
    name: "الجزء الحادي والعشرون",
  },
  {
    number: 22,
    startSurah: 33,
    startAyah: 31,
    endSurah: 36,
    endAyah: 27,
    pages: [422, 441],
    name: "الجزء الثاني والعشرون",
  },
  {
    number: 23,
    startSurah: 36,
    startAyah: 28,
    endSurah: 39,
    endAyah: 31,
    pages: [442, 461],
    name: "الجزء الثالث والعشرون",
  },
  {
    number: 24,
    startSurah: 39,
    startAyah: 32,
    endSurah: 41,
    endAyah: 46,
    pages: [462, 481],
    name: "الجزء الرابع والعشرون",
  },
  {
    number: 25,
    startSurah: 41,
    startAyah: 47,
    endSurah: 45,
    endAyah: 37,
    pages: [482, 501],
    name: "الجزء الخامس والعشرون",
  },
  {
    number: 26,
    startSurah: 46,
    startAyah: 1,
    endSurah: 51,
    endAyah: 30,
    pages: [502, 521],
    name: "الجزء السادس والعشرون",
  },
  {
    number: 27,
    startSurah: 51,
    startAyah: 31,
    endSurah: 57,
    endAyah: 29,
    pages: [522, 541],
    name: "الجزء السابع والعشرون",
  },
  {
    number: 28,
    startSurah: 58,
    startAyah: 1,
    endSurah: 66,
    endAyah: 12,
    pages: [542, 561],
    name: "الجزء الثامن والعشرون",
  },
  {
    number: 29,
    startSurah: 67,
    startAyah: 1,
    endSurah: 77,
    endAyah: 50,
    pages: [562, 581],
    name: "الجزء التاسع والعشرون",
  },
  {
    number: 30,
    startSurah: 78,
    startAyah: 1,
    endSurah: 114,
    endAyah: 6,
    pages: [582, 604],
    name: "الجزء الثلاثون",
  },
];

export default function ElegantMushaf() {
  const [selectedSurahId, setSelectedSurahId] = useState(2); // Default to Al-Baqarah
  const [currentJuz, setCurrentJuz] = useState(1); // Default to Juz 1
  const [currentPage, setCurrentPage] = useState(4); // Default to page 4
  const [showMenu, setShowMenu] = useState(false);
  const [showJuzMenu, setShowJuzMenu] = useState(false);
  const [showSurahMenu, setShowSurahMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioState, audioControls] = useAudioPlayer();
  const { isRTL } = useRTL();

  // Get the selected surah object
  const selectedSurah =
    quranSurahs.find((surah) => surah.id === selectedSurahId) || quranSurahs[0];

  // Get current juz object
  const currentJuzObj =
    juzData.find((juz) => juz.number === currentJuz) || juzData[0];

  // Handle page navigation
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle juz selection
  const handleJuzSelect = (juzNumber: number) => {
    const juz = juzData.find((j) => j.number === juzNumber);
    if (juz) {
      setCurrentJuz(juzNumber);
      setCurrentPage(juz.pages[0]);
      // Find the surah that starts this juz
      setSelectedSurahId(juz.startSurah);
      setShowJuzMenu(false);
    }
  };

  // Handle surah selection
  const handleSurahSelect = (surahId: number) => {
    setSelectedSurahId(surahId);
    // Find the page where this surah starts (simplified)
    const surahJuz = juzData.find(
      (juz) => juz.startSurah <= surahId && juz.endSurah >= surahId,
    );
    if (surahJuz) {
      setCurrentJuz(surahJuz.number);
      setCurrentPage(surahJuz.pages[0]);
    }
    setShowSurahMenu(false);
  };

  // Handle audio playback
  const togglePlayback = () => {
    if (isPlaying) {
      audioControls.pause();
    } else {
      // Load audio if not already loaded
      audioControls.loadAudio("mishary", selectedSurahId);
      audioControls.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update isPlaying state when audio state changes
  useEffect(() => {
    setIsPlaying(audioState.isPlaying);
  }, [audioState.isPlaying]);

  // Handle bookmark
  const handleBookmark = () => {
    // Save current page to localStorage
    localStorage.setItem(
      "quranBookmark",
      JSON.stringify({
        page: currentPage,
        surah: selectedSurahId,
        juz: currentJuz,
      }),
    );
    alert("تم حفظ العلامة المرجعية");
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `سورة ${selectedSurah.name} - الجزء ${currentJuz}`,
          text: `أقرأ سورة ${selectedSurah.name} من المصحف الشريف`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      alert("مشاركة الرابط: " + window.location.href);
    }
  };

  // Handle index (open table of contents)
  const handleIndex = () => {
    setShowSurahMenu(true);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f4e8]">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-2 bg-[#f8f4e8] text-[#333] text-sm">
        <div className="text-lg font-bold">
          {new Date().toLocaleTimeString("ar-SA", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="flex items-center gap-2">
          <div>•••</div>
          <div>WiFi</div>
          <div>59%</div>
        </div>
      </div>

      {/* Navigation Header with Decorative Border */}
      <div className="relative">
        <div className="flex justify-between items-center p-2 bg-[#f8f4e8]">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-md bg-[#e8dcc9] border-[#d5c5a9] shadow-sm"
            onClick={handlePrevPage}
          >
            <ChevronLeft className="h-6 w-6 text-[#8b6b42]" />
          </Button>

          <div className="flex-1 flex justify-center items-center">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                className="h-10 px-4 rounded-md border-none text-[#8b6b42] font-medium"
                onClick={() => setShowJuzMenu(!showJuzMenu)}
              >
                {currentJuzObj.name}
              </Button>

              <Button
                variant="ghost"
                className="h-10 px-4 rounded-md border-none text-[#8b6b42] font-medium"
                onClick={() => setShowSurahMenu(!showSurahMenu)}
              >
                سورة {selectedSurah.name}
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-md bg-[#e8dcc9] border-[#d5c5a9] shadow-sm"
            onClick={handleNextPage}
          >
            <ChevronRight className="h-6 w-6 text-[#8b6b42]" />
          </Button>
        </div>

        {/* Decorative Border */}
        <div className="absolute left-0 right-0 h-6 overflow-hidden">
          <div className="w-full h-12 bg-[url('https://i.imgur.com/8YKgHEl.png')] bg-repeat-x bg-contain opacity-70"></div>
        </div>

        {/* Juz Menu */}
        {showJuzMenu && (
          <div className="absolute top-16 left-0 right-0 bg-white z-50 max-h-64 overflow-y-auto rounded-lg shadow-lg border border-[#d5c5a9]">
            <div className="p-2 sticky top-0 bg-[#f8f4e8] border-b border-[#d5c5a9] font-bold text-center">
              اختر الجزء
            </div>
            <div className="grid grid-cols-2 gap-1 p-2">
              {juzData.map((juz) => (
                <Button
                  key={juz.number}
                  variant="ghost"
                  className={`text-right ${juz.number === currentJuz ? "bg-[#e8dcc9] text-[#8b6b42]" : ""}`}
                  onClick={() => handleJuzSelect(juz.number)}
                >
                  {juz.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Surah Menu */}
        {showSurahMenu && (
          <div className="absolute top-16 left-0 right-0 bg-white z-50 max-h-64 overflow-y-auto rounded-lg shadow-lg border border-[#d5c5a9]">
            <div className="p-2 sticky top-0 bg-[#f8f4e8] border-b border-[#d5c5a9] font-bold text-center">
              اختر السورة
            </div>
            <div className="grid grid-cols-2 gap-1 p-2">
              {quranSurahs.map((surah) => (
                <Button
                  key={surah.id}
                  variant="ghost"
                  className={`text-right ${surah.id === selectedSurahId ? "bg-[#e8dcc9] text-[#8b6b42]" : ""}`}
                  onClick={() => handleSurahSelect(surah.id)}
                >
                  {surah.id}. {surah.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quran Content with Decorative Frame */}
      <div className="flex-1 overflow-y-auto bg-[#f8f4e8] px-2 pt-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-[#e0d5c0] relative">
          {/* Decorative Frame */}
          <div className="absolute inset-0 border-[12px] border-[#f8f4e8] rounded-lg pointer-events-none">
            <div className="absolute inset-0 border-[1px] border-[#d5c5a9] rounded-sm"></div>
            <div className="absolute top-0 left-0 right-0 h-8 bg-[url('https://i.imgur.com/8YKgHEl.png')] bg-repeat-x bg-contain opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-[url('https://i.imgur.com/8YKgHEl.png')] bg-repeat-x bg-contain opacity-30 transform rotate-180"></div>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-[url('https://i.imgur.com/8YKgHEl.png')] bg-repeat-y bg-contain opacity-30 transform rotate-270"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-[url('https://i.imgur.com/8YKgHEl.png')] bg-repeat-y bg-contain opacity-30 transform rotate-90"></div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-[url('https://i.imgur.com/JQZJjyT.png')] bg-no-repeat bg-contain opacity-40"></div>
            <div className="absolute top-0 right-0 w-12 h-12 bg-[url('https://i.imgur.com/JQZJjyT.png')] bg-no-repeat bg-contain opacity-40 transform rotate-90"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-[url('https://i.imgur.com/JQZJjyT.png')] bg-no-repeat bg-contain opacity-40 transform -rotate-90"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-[url('https://i.imgur.com/JQZJjyT.png')] bg-no-repeat bg-contain opacity-40 transform rotate-180"></div>
          </div>

          {/* Quran Text */}
          <div className="text-right leading-loose pt-2">
            <p className="text-2xl font-quran mb-2">
              مَثَلُهُمْ كَمَثَلِ الَّذِي اسْتَوْقَدَ نَارًا فَلَمَّا أَضَاءَتْ
              مَا حَوْلَهُ
            </p>
            <p className="text-2xl font-quran mb-2">
              ذَهَبَ اللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِي ظُلُمَاتٍ لَّا
              يُبْصِرُونَ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ١٧
              </span>
            </p>
            <p className="text-2xl font-quran mb-2">
              صُمٌّ بُكْمٌ عُمْيٌ فَهُمْ لَا يَرْجِعُونَ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ١٨
              </span>
            </p>
            <p className="text-2xl font-quran mb-2">
              أَوْ كَصَيِّبٍ مِّنَ السَّمَاءِ فِيهِ
            </p>
            <p className="text-2xl font-quran mb-2">
              ظُلُمَاتٌ وَرَعْدٌ وَبَرْقٌ يَجْعَلُونَ أَصَابِعَهُمْ فِي
              آذَانِهِم مِّنَ
            </p>
            <p className="text-2xl font-quran mb-2">
              الصَّوَاعِقِ حَذَرَ الْمَوْتِ ۚ وَاللَّهُ مُحِيطٌ بِالْكَافِرِينَ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ١٩
              </span>
            </p>
            <p className="text-2xl font-quran mb-2">
              يَكَادُ الْبَرْقُ يَخْطَفُ أَبْصَارَهُمْ ۖ كُلَّمَا أَضَاءَ لَهُم
              مَّشَوْا فِيهِ وَإِذَا أَظْلَمَ عَلَيْهِمْ
            </p>
            <p className="text-2xl font-quran mb-2">
              قَامُوا ۚ وَلَوْ شَاءَ اللَّهُ لَذَهَبَ بِسَمْعِهِمْ
              وَأَبْصَارِهِمْ ۚ إِنَّ اللَّهَ عَلَىٰ
            </p>
            <p className="text-2xl font-quran mb-2">
              كُلِّ شَيْءٍ قَدِيرٌ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ٢٠
              </span>
            </p>
            <p className="text-2xl font-quran mb-2">
              يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي
            </p>
            <p className="text-2xl font-quran mb-2">
              خَلَقَكُمْ وَالَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ٢١
              </span>
            </p>
            <p className="text-2xl font-quran mb-2">الَّذِي جَعَلَ لَكُمُ</p>
            <p className="text-2xl font-quran mb-2">
              الْأَرْضَ فِرَاشًا وَالسَّمَاءَ بِنَاءً وَأَنزَلَ مِنَ السَّمَاءِ
              مَاءً فَأَخْرَجَ
            </p>
            <p className="text-2xl font-quran mb-2">
              بِهِ مِنَ الثَّمَرَاتِ رِزْقًا لَّكُمْ ۖ فَلَا تَجْعَلُوا لِلَّهِ
              أَندَادًا وَأَنتُمْ
            </p>
            <p className="text-2xl font-quran mb-2">
              تَعْلَمُونَ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ٢٢
              </span>
            </p>
            <p className="text-2xl font-quran mb-2">
              وَإِن كُنتُمْ فِي رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا
              فَأْتُوا
            </p>
            <p className="text-2xl font-quran mb-2">
              بِسُورَةٍ مِّن مِّثْلِهِ وَادْعُوا شُهَدَاءَكُم مِّن دُونِ اللَّهِ
              إِن
            </p>
            <p className="text-2xl font-quran mb-2">
              كُنتُمْ صَادِقِينَ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ٢٣
              </span>
            </p>
            <p className="text-2xl font-quran mb-2">
              فَإِن لَّمْ تَفْعَلُوا وَلَن تَفْعَلُوا فَاتَّقُوا النَّارَ
            </p>
            <p className="text-2xl font-quran mb-2">
              الَّتِي وَقُودُهَا النَّاسُ وَالْحِجَارَةُ ۖ أُعِدَّتْ
              لِلْكَافِرِينَ
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8dcc9] text-[#8b6b42] text-sm mx-1">
                ٢٤
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Page Number */}
      <div className="flex justify-center items-center py-2">
        <div className="w-10 h-10 rounded-full bg-[#e8dcc9] flex items-center justify-center text-[#8b6b42] font-bold text-lg shadow-sm">
          {currentPage}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-around items-center p-2 bg-[#f8f4e8] border-t border-[#e0d5c0]">
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1 text-[#8b6b42]"
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" />
              <span className="text-xs">إيقاف</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              <span className="text-xs">استماع</span>
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1 text-[#8b6b42]"
          onClick={handleBookmark}
        >
          <Star className="h-5 w-5" />
          <span className="text-xs">علامة</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1 text-[#8b6b42]"
          onClick={handleIndex}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs">الفهرس</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1 text-[#8b6b42]"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
          <span className="text-xs">مشاركة</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1 text-[#8b6b42]"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs">إعدادات</span>
        </Button>
      </div>

      {/* Settings Menu */}
      {showMenu && (
        <div className="absolute bottom-16 left-0 right-0 bg-white z-50 rounded-t-lg shadow-lg border border-[#d5c5a9] p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#8b6b42]">الإعدادات</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(false)}
            >
              إغلاق
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>حجم الخط</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  -
                </Button>
                <Button variant="outline" size="sm">
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>نوع الخط</span>
              <Button variant="outline" size="sm">
                تغيير
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>وضع القراءة الليلي</span>
              <Button variant="outline" size="sm">
                تفعيل
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>إظهار التشكيل</span>
              <Button variant="outline" size="sm">
                نعم
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
