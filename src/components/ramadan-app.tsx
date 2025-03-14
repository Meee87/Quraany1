import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface FeatureIconProps {
  icon: string;
  label: string;
  notification?: boolean;
  onClick?: () => void;
}

const FeatureIcon = ({
  icon,
  label,
  notification,
  onClick,
}: FeatureIconProps) => (
  <Button
    variant="ghost"
    className="flex flex-col items-center justify-center p-2 h-auto w-full gap-1 hover:bg-accent/10 rounded-xl"
    onClick={onClick}
  >
    <div className="relative">
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 shadow-sm">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>
      {notification && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </Button>
);

interface RamadanCardProps {
  icon: string;
  label: string;
  color: string;
  onClick?: () => void;
}

const RamadanCard = ({ icon, label, color, onClick }: RamadanCardProps) => (
  <Button
    variant="ghost"
    className={`flex flex-col items-center justify-center p-4 h-auto w-full gap-2 hover:bg-accent/10 rounded-xl ${color}`}
    onClick={onClick}
  >
    <img src={icon} alt={label} className="w-12 h-12" />
    <span className="text-white font-medium">{label}</span>
  </Button>
);

export default function RamadanApp() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=quran",
      label: "المصحف",
      notification: true,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=kaaba",
      label: "القبلة",
      notification: false,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=tasbih",
      label: "السبحة",
      notification: false,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=prayerBook",
      label: "الأذكار",
      notification: false,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=share",
      label: "الأجر بالنشر",
      notification: true,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=menu",
      label: "المزيد",
      notification: false,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=treasure",
      label: "كنوز",
      notification: true,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=quranComplete",
      label: "ختمة",
      notification: false,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=prayingHands",
      label: "الدعاء",
      notification: true,
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=starBadge",
      label: "طاعاتك",
      notification: false,
    },
  ];

  const ramadanCards = [
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=quran",
      label: "المصحف",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=prayerBook",
      label: "الأذكار",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      icon: "https://api.dicebear.com/7.x/icons/svg?icon=ramadanCommunity",
      label: "مجتمع رمضان",
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header with Logo */}
      <header className="bg-primary text-white p-4 text-center shadow-md">
        <h1 className="text-2xl font-bold">قرآني</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {/* Feature Icons Grid */}
        <Card className="bg-white shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="grid grid-cols-5 gap-2">
              {features.map((feature, index) => (
                <FeatureIcon
                  key={index}
                  icon={feature.icon}
                  label={feature.label}
                  notification={feature.notification}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ramadan Section */}
        <Card className="bg-white shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">رمضانيات</h2>
              <img
                src="https://api.dicebear.com/7.x/icons/svg?icon=ramadanMoon"
                alt="رمضان"
                className="w-6 h-6"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {ramadanCards.map((card, index) => (
                <RamadanCard
                  key={index}
                  icon={card.icon}
                  label={card.label}
                  color={card.color}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 py-2">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              className={`w-2 h-2 rounded-full ${activeTab === dot ? "bg-primary" : "bg-gray-300"}`}
              onClick={() => setActiveTab(dot)}
            />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white shadow-lg p-2">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent">
            <TabsTrigger
              value="home"
              className="flex flex-col items-center data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              <img
                src="https://api.dicebear.com/7.x/icons/svg?icon=homeCircle"
                alt="الرئيسية"
                className="w-5 h-5"
              />
              <span className="text-xs">الرئيسية</span>
            </TabsTrigger>
            <TabsTrigger
              value="quran"
              className="flex flex-col items-center data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              <img
                src="https://api.dicebear.com/7.x/icons/svg?icon=quran"
                alt="المصحف"
                className="w-5 h-5"
              />
              <span className="text-xs">المصحف</span>
            </TabsTrigger>
            <TabsTrigger
              value="prayer"
              className="flex flex-col items-center data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              <img
                src="https://api.dicebear.com/7.x/icons/svg?icon=prayerTime"
                alt="الصلاة"
                className="w-5 h-5"
              />
              <span className="text-xs">الصلاة</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex flex-col items-center data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              <img
                src="https://api.dicebear.com/7.x/icons/svg?icon=userCircle"
                alt="حسابي"
                className="w-5 h-5"
              />
              <span className="text-xs">حسابي</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </footer>
    </div>
  );
}
