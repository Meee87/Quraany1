import { useState } from "react";
import { Mic2, Play, BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

function TajweedPage() {
  // Sample tajweed rules
  const tajweedRules = [
    {
      id: 1,
      name: "النون الساكنة والتنوين",
      progress: 80,
      lessons: 5,
      completed: 4,
    },
    { id: 2, name: "الميم الساكنة", progress: 60, lessons: 3, completed: 2 },
    { id: 3, name: "المدود", progress: 40, lessons: 7, completed: 3 },
    { id: 4, name: "القلقلة", progress: 20, lessons: 4, completed: 1 },
    { id: 5, name: "الراءات", progress: 0, lessons: 3, completed: 0 },
  ];

  // Sample featured lessons
  const featuredLessons = [
    { id: 1, title: "الإدغام بغنة", duration: "10 دقائق", level: "مبتدئ" },
    { id: 2, title: "المد المتصل", duration: "15 دقيقة", level: "متوسط" },
    { id: 3, title: "الإخفاء الحقيقي", duration: "12 دقيقة", level: "مبتدئ" },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center">
          <Mic2 className="h-5 w-5 mr-2" />
          تعلم التجويد
        </h1>
      </div>

      {/* Progress Overview */}
      <Card className="bg-[#1e3a8a] text-white shadow-md">
        <CardContent className="p-4">
          <h2 className="text-center mb-2">تقدمك الإجمالي</h2>
          <div className="flex items-center justify-between mb-2">
            <span>10/22 درس مكتمل</span>
            <span>45%</span>
          </div>
          <Progress value={45} className="h-2 bg-white/20" />
        </CardContent>
      </Card>

      {/* Featured Lessons */}
      <div>
        <h2 className="font-bold mb-2">دروس مميزة</h2>
        <div className="grid grid-cols-1 gap-3">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.id} className="bg-white shadow-sm">
              <CardContent className="p-3 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{lesson.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">{lesson.duration}</span>
                    <span>{lesson.level}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Play className="h-3 w-3 mr-1" />
                  <span>ابدأ</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tajweed Rules */}
      <div>
        <h2 className="font-bold mb-2">أحكام التجويد</h2>
        <div className="space-y-3">
          {tajweedRules.map((rule) => (
            <Card key={rule.id} className="bg-white shadow-sm">
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">{rule.name}</h3>
                  <span className="text-xs text-gray-500">
                    {rule.completed}/{rule.lessons} دروس
                  </span>
                </div>
                <Progress value={rule.progress} className="h-2" />
                <div className="flex justify-between mt-3">
                  <div className="flex items-center text-xs text-gray-500">
                    {rule.completed > 0 && (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                        <span>{rule.completed} مكتمل</span>
                      </>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <BookOpen className="h-3 w-3 mr-1" />
                    عرض الدروس
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TajweedPage;
