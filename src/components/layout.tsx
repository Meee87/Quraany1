import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Clock,
  BookMarked,
  Compass,
  Mic2,
  Bookmark,
  Home as HomeIcon,
  Moon,
  Sun,
} from "lucide-react";
import { useRTL } from "@/lib/rtl-context";
import { Button } from "./ui/button";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { isRTL, toggleDirection } = useRTL();

  const navItems = [
    { icon: HomeIcon, label: "الرئيسية", path: "/" },
    { icon: BookOpen, label: "المصحف", path: "/quran" },
    { icon: Clock, label: "أوقات الصلاة", path: "/prayer-times" },
    { icon: BookMarked, label: "الحفظ", path: "/memorization" },
    { icon: Compass, label: "اتجاه القبلة", path: "/qibla" },
    { icon: Mic2, label: "تعلم التجويد", path: "/tajweed" },
    { icon: Bookmark, label: "التسابيح", path: "/tasbih" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-14 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gradient">قرآني</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDirection}
              className="icon-hover rounded-full"
              title={isRTL ? "تغيير إلى اليسار إلى اليمين" : "تغيير إلى اليمين إلى اليسار"}
            >
              {isRTL ? (
                <span className="font-bold">LTR</span>
              ) : (
                <span className="font-bold">RTL</span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="icon-hover rounded-full"
              title="تبديل الوضع المظلم"
            >
              <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4 mobile-content">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="mobile-nav">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "icon-active" : "icon-hover"}`} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Layout;