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
  SkipForward,
  SkipBack,
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
import { quranSurahs } from "@/data/quran-surahs";
import { getSurahText } from "@/data/quran-text";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { Progress } from "@/components/ui/progress";

function QuranPage() {
  const [selectedSurahId, setSelectedSurahId] = useState(1); // Default to Al-Fatiha
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(reciters[0]);
  const [showReciterSelector, setShowReciterSelector] = useState(false);
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const [surahText, setSurahText] = useState(getSurahText(1));
  const [audioState, audioControls] = useAudioPlayer();
  const { isRTL } = useRTL();

  // Get the selected surah object
  const selectedSurah =
    quranSurahs.find((surah) => surah.id === selectedSurahId) || quranSurahs[0];

  // Load surah text when selected surah changes
  useEffect(() => {
    const text = getSurahText(selectedSurahId);
    setSurahText(text);
  }, [selectedSurahId]);

  // محاكاة تسليط الضوء على الكلمات أثناء التلاوة
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (audioState.isPlaying) {
      const words = ["الْحَمْدُ", "الدِّينِ", "غَيْرِ"];
      let index = 0;
      interval = setInterval(() => {
        setHighlightedWord(words[index]);
        index = (index + 1) % words.length;
      }, 2000 / audioState.playbackRate); // تعديل سرعة التسليط بناءً على سرعة التشغيل
    } else {
      setHighlightedWord(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [audioState.isPlaying, audioState.playbackRate]);

  const handlePlayPause = () => {
    if (!audioState.isPlaying) {
      // Load audio if not already loaded
      audioControls.loadAudio(selectedReciter.id, selectedSurahId);
    }
    audioControls.toggle();
  };

  const handleWordClick = (word: string) => {
    setHighlightedWord(word === highlightedWord ? null : word);
  };

  const handleSurahChange = (surahId: number) => {
    setSelectedSurahId(surahId);
    if (audioState.isPlaying) {
      audioControls.pause();
    }
  };

  const toggleReciterSelector = () => {
    setShowReciterSelector(!showReciterSelector);
    if (showSpeedControl) setShowSpeedControl(false);
  };

  const toggleSpeedControl = () => {
    setShowSpeedControl(!showSpeedControl);
    if (showReciterSelector) setShowReciterSelector(false);
  };

  const handleReciterChange = (reciter: Reciter) => {
    setSelectedReciter(reciter);
    setShowReciterSelector(false);
    if (audioState.isPlaying) {
      audioControls.loadAudio(reciter.id, selectedSurahId);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    audioControls.setPlaybackRate(rate);
    setShowSpeedControl(false);
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
          {quranSurahs.map((surah) => (
            <div
              key={surah.id}
              className={`p-2 rounded-md cursor-pointer flex justify-between items-center transition-colors duration-200 ${surah.id === selectedSurahId ? "bg-primary text-primary-foreground" : "hover:bg-accent/20"}`}
              onClick={() => handleSurahChange(surah.id)}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full bg-background text-primary flex items-center justify-center text-xs ${isRTL ? "ml-2" : "mr-2"}`}
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
        <div className="flex-1 bg-card rounded-lg shadow-md p-4 overflow-y-auto">
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
              <Button variant="ghost" size="icon" className="icon-hover">
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center icon-hover"
                onClick={handlePlayPause}
              >
                {audioState.isPlaying ? (
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
            {surahText ? (
              <div className="text-2xl leading-loose font-quran">
                <p className="mb-4 text-center text-primary">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {surahText.ayahs.map((ayah) => (
                  <p key={ayah.number} className="mb-2">
                    {ayah.text}
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
        </div>
      </div>

      {/* Playback Controls */}
      {audioState.isPlaying && (
        <div className="fixed bottom-16 left-0 right-0 bg-primary text-primary-foreground p-2 shadow-lg">
          {/* Progress bar */}
          <div className="px-2 mb-2">
            <Progress
              value={(audioState.currentTime / audioState.duration) * 100}
              className="h-1 bg-white/20"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="icon-hover"
                onClick={audioControls.toggleMute}
              >
                {audioState.isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <div className="w-24">
                <Slider
                  value={[audioState.isMuted ? 0 : audioState.volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    audioControls.setVolume(value[0] / 100);
                    if (value[0] > 0 && audioState.isMuted)
                      audioControls.unmute();
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="icon-hover">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="icon-hover"
                onClick={audioControls.toggle}
              >
                {audioState.isPlaying ? (
                  <Pause className="h-5 w-5 text-accent" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="icon-hover">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon-hover"
                  onClick={toggleSpeedControl}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <span className="text-sm mx-2">
                  سرعة: {audioState.playbackRate}x
                </span>
              </div>

              <div className="flex items-center ml-4">
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
          </div>

          {/* Reciter Selector */}
          {showReciterSelector && (
            <div className="mt-2 p-2 bg-card text-card-foreground rounded-md shadow-md">
              <div className="grid grid-cols-2 gap-2">
                {reciters.map((reciter) => (
                  <div
                    key={reciter.id}
                    className={`p-2 rounded-md cursor-pointer flex items-center ${reciter.id === selectedReciter.id ? "bg-accent/20" : "hover:bg-accent/10"}`}
                    onClick={() => handleReciterChange(reciter)}
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
                  value={[audioState.playbackRate * 10]}
                  min={5}
                  max={20}
                  step={1}
                  className="w-48 mx-4"
                  onValueChange={(value) =>
                    handlePlaybackRateChange(value[0] / 10)
                  }
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
