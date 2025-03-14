import { useState } from "react";
import { Shield, Search, Star, Clock, Bookmark, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from "@/lib/rtl-context";
import { dhikrCategories, morningAdhkar, eveningAdhkar } from "@/data/adhkar";
import { PageHeader } from "@/components/page-header";

function AdhkarPage() {
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

  // Get adhkar based on selected category
  const getAdhkarByCategory = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return morningAdhkar;
      case 2:
        return eveningAdhkar;
      default:
        return [];
    }
  };

  const renderAdhkarList = (adhkarList: any[]) => {
    return (
      <div className="space-y-4">
        {adhkarList.map((dhikr) => (
          <Card
            key={dhikr.id}
            className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{dhikr.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon-hover"
                  onClick={() => toggleFavorite(dhikr.id)}
                >
                  <Star
                    className={`h-5 w-5 ${favorites.includes(dhikr.id) ? "text-yellow-500 fill-yellow-500" : ""}`}
                  />
                </Button>
              </div>
              <div className="text-right mb-3 text-lg leading-relaxed">
                {dhikr.arabic}
              </div>
              {dhikr.repetitions && (
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    التكرار: {dhikr.repetitions}{" "}
                    {dhikr.repetitions > 1 ? "مرات" : "مرة"}
                  </span>
                </div>
              )}
              {dhikr.source && (
                <div className="text-sm text-muted-foreground">
                  <span>المصدر: {dhikr.source}</span>
                </div>
              )}
              {dhikr.virtue && (
                <div className="mt-2 p-2 bg-primary/10 rounded-md text-sm">
                  <span className="font-medium">الفضل: </span>
                  <span>{dhikr.virtue}</span>
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
      <PageHeader
        title={
          <div className="flex items-center">
            <Shield
              className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
            />
            <span>حصن المسلم</span>
          </div>
        }
        rightContent={
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
        }
      />

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
              {dhikrCategories.find((cat) => cat.id === selectedCategory)?.name}
            </h2>
          </div>
          {renderAdhkarList(getAdhkarByCategory(selectedCategory))}
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
                {dhikrCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {category.icon === "sunrise" && (
                          <Clock className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "sunset" && (
                          <Clock className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "pray" && (
                          <Bookmark className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "moon" && (
                          <Bookmark className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "alarm-clock" && (
                          <Clock className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "book-open" && (
                          <Bookmark className="h-5 w-5 text-primary" />
                        )}
                        {category.icon === "list" && (
                          <Bookmark className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {category.count} ذكر
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
                  {renderAdhkarList(
                    [...morningAdhkar, ...eveningAdhkar].filter((dhikr) =>
                      favorites.includes(dhikr.id),
                    ),
                  )}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Heart className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>لم تقم بإضافة أي أذكار إلى المفضلة بعد</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4 mt-4">
              <div className="text-center py-10 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>لم تقم بقراءة أي أذكار مؤخرًا</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default AdhkarPage;
