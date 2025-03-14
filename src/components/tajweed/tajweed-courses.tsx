import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tajweedCourses } from "@/data/tajweed-rules";
import { BookOpen, Clock, Play, Star } from "lucide-react";

export function TajweedCourses() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {tajweedCourses.map((course) => (
        <Card
          key={course.id}
          className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <div className="aspect-video relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
              <h3 className="font-bold">{course.title}</h3>
              <p className="text-xs">{course.instructor}</p>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-muted-foreground gap-3">
                <div className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  <span>{course.lessons} دروس</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  <span>{course.level}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center icon-hover"
              >
                <Play className="h-3 w-3 mr-1" />
                <span>عرض الدورة</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
