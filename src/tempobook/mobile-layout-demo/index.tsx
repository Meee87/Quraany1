import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Compass, Home, Menu, Moon, X } from "lucide-react";

export default function MobileLayoutDemo() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="px-4 h-14 flex justify-center items-center">
          <h1 className="text-xl font-bold text-primary">قرآني</h1>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3 w-9 h-9 rounded-full"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3 py-3 pb-[60px] overflow-auto">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">عرض تصميم الجوال</h2>
          <p className="text-sm text-muted-foreground">
            هذا العرض يوضح تصميم التطبيق المحسن للجوال مع مراعاة خصائص أجهزة آبل
            والأندرويد
          </p>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">خصائص التصميم المتجاوب</h3>
              <ul className="space-y-2 text-sm">
                <li>• عرض محدود يناسب شاشات الجوال</li>
                <li>• أزرار أكبر لسهولة اللمس</li>
                <li>• مسافات مناسبة بين العناصر</li>
                <li>• قائمة تنقل سفلية سهلة الوصول</li>
                <li>• حجم خط مناسب للقراءة على الشاشات الصغيرة</li>
                <li>• دعم خاص لأجهزة آيفون (home indicator)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Show menu overlay if open */}
          {menuOpen && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
              <div className="w-[85%] max-w-[280px] h-full bg-background border-r shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">قرآني</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-1">
                  {[
                    { icon: Home, label: "الرئيسية", active: true },
                    { icon: BookOpen, label: "المصحف", active: false },
                    { icon: Clock, label: "أوقات الصلاة", active: false },
                    { icon: Compass, label: "اتجاه القبلة", active: false },
                    { icon: Moon, label: "الوضع الليلي", active: false },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${item.active ? "bg-accent/20 text-accent" : "hover:bg-accent/10"}`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t z-50 max-w-md mx-auto">
        <div className="px-2 pb-1 pt-1">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, label: "الرئيسية", active: true },
              { icon: BookOpen, label: "المصحف", active: false },
              { icon: Clock, label: "أوقات الصلاة", active: false },
              { icon: Compass, label: "اتجاه القبلة", active: false },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-1.5 rounded-lg transition-all duration-200 ${item.active ? "text-accent" : "text-muted-foreground hover:text-accent"}`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] mt-0.5 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* iOS Home Indicator Spacer */}
      <div className="h-6 bg-transparent fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto pointer-events-none ios-home-indicator"></div>
    </div>
  );
}
