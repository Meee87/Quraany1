import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuredLessons } from "@/data/tajweed-rules";
import { Clock, Play } from "lucide-react";

export function FeaturedLessons() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {featuredLessons.map((lesson) => (
        <Card
          key={lesson.id}
          className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <div className="aspect-video relative">
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/20 backdrop-blur-sm"
              >
                <Play className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-bold text-lg">{lesson.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span className="mr-2">{lesson.duration}</span>
                <span>{lesson.level}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center icon-hover"
              >
                <Play className="h-3 w-3 mr-1" />
                <span>ابدأ</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
