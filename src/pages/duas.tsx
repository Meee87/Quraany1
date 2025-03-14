import { useState } from "react";
import {
  BookOpen,
  Search,
  Star,
  Clock,
  Heart,
  Users,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from "@/lib/rtl-context";
import {
  duaCategories,
  prophetsDuas,
  prayerDuas,
  healingDuas,
  forgivenessDuas,
} from "@/data/duas";

function DuasPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const { isRTL } = useRTL();

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Get duas based on selected category
  const getDuasByCategory = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return prophetsDuas;
      case 2:
        return prayerDuas;
      case 4:
        return forgivenessDuas;
      case 6:
        return healingDuas;
      default:
        return [];
    }
  };

  const renderDuasList = (duasList: any[]) => {
    return (
      <div className="space-y-4">
        {duasList.map((dua) => (
          <Card
            key={dua.id}
            className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{dua.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon-hover"
                  onClick={() => toggleFavorite(dua.id)}
                >
                  <Star
                    className={`h-5 w-5 ${favorites.includes(dua.id) ? "text-yellow-500 fill-yellow-500" : ""}`}
                  />
                </Button>
              </div>
              <div className="text-right mb-3 text-lg leading-relaxed">
                {dua.arabic}
              </div>
              {dua.source && (
                <div className="text-sm text-muted-foreground">
                  <span>المصدر: {dua.source}</span>
                </div>
              )}
              {dua.occasion && (
                <div className="mt-2 p-2 bg-primary/10 rounded-md text-sm">
                  <span className="font-medium">المناسبة: </span>
                  <span>{dua.occasion}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center">
          <BookOpen
            className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
          />
          الأدعية
        </h1>
        <div className="relative w-40">
          <Search
            className={`absolute ${isRTL ? "right-3" : "left-3"} top-2.5 h-4 w-4 text-muted-foreground icon-hover`}
          />
          <input
            type="text"
            placeholder="بحث..."
            className={`w-full ${isRTL ? "pr-9 pl-3" : "pl-9 pr-3"} py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {selectedCategory ? (
        <div className="space-y-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => setSelectedCategory(null)}
              className="icon-hover"
            >
              <span className="mr-2">العودة</span>
            </Button>
            <h2 className="text-lg font-bold">
              {duaCategories.find((cat) => cat.id === selectedCategory)?.name}
            </h2>
          </div>
          {renderDuasList(getDuasByCategory(selectedCategory))}
        </div>
      ) : (
        <>
          <Tabs defaultValue="categories">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">الأقسام</TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="h-4 w-4 mr-1" />
                المفضلة
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-1" />
                الأخيرة
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {duaCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {category.icon === "users" && (
                          <Users className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "pray" && (
                          <BookOpen className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "sun" && (
                          <Clock className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "heart" && (
                          <Heart className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "map" && (
                          <BookOpen className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "activity" && (
                          <Activity className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "list" && (
                          <BookOpen className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {category.count} دعاء
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4 mt-4">
              {favorites.length > 0 ? (
                <div className="space-y-4">
                  {renderDuasList(
                    [
                      ...prophetsDuas,
                      ...prayerDuas,
                      ...forgivenessDuas,
                      ...healingDuas,
                    ].filter((dua) => favorites.includes(dua.id)),
                  )}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Heart className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>لم تقم بإضافة أي أدعية إلى المفضلة بعد</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4 mt-4">
              <div className="text-center py-10 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>لم تقم بقراءة أي أدعية مؤخرًا</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default DuasPage;
