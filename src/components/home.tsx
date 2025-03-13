import {
  Play,
  Pause,
  Settings,
  Search,
  BookOpen,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#f8f4e8] text-[#333]">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 bg-[#1e3a8a] text-white shadow-md">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <h1 className="text-xl font-bold">سورة الفاتحة</h1>
          <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
            الآية 1-7
          </span>
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

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
              />
            </div>
          </div>
          <div className="space-y-1">
            {["الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة"].map(
              (surah, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md cursor-pointer ${index === 0 ? "bg-[#1e3a8a] text-white" : "hover:bg-gray-100"}`}
                >
                  {surah}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Quran Text */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 text-right">
          <div className="text-3xl leading-loose font-quran" dir="rtl">
            <p className="mb-4 text-center text-[#1e3a8a]">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="mb-2">
              <span className="text-[#1e3a8a] font-bold">الْحَمْدُ</span>{" "}
              لِلَّهِ رَبِّ الْعَالَمِينَ
            </p>
            <p className="mb-2">الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="mb-2">
              مَالِكِ يَوْمِ <span className="text-[#d97706]">الدِّينِ</span>
            </p>
            <p className="mb-2">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</p>
            <p className="mb-2">اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</p>
            <p className="mb-2">
              صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ{" "}
              <span className="text-[#059669]">غَيْرِ</span> الْمَغْضُوبِ
              عَلَيْهِمْ وَلَا الضَّالِّينَ
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Controls */}
      <footer className="bg-white p-4 shadow-md">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Play className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <Select defaultValue="mishary">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر القارئ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mishary">مشاري راشد العفاسي</SelectItem>
                  <SelectItem value="sudais">عبد الرحمن السديس</SelectItem>
                  <SelectItem value="minshawi">محمد صديق المنشاوي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex items-center space-x-2">
              <span className="text-sm">سرعة التلاوة</span>
              <Slider defaultValue={[1]} max={2} step={0.1} className="w-32" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
