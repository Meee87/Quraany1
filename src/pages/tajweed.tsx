import { useState } from "react";
import {
  Mic2,
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  Info,
  Video,
  Volume2,
  Download,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRTL } from "@/lib/rtl-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tajweedRules } from "@/data/tajweed-rules";
import { TajweedRulesList } from "@/components/tajweed/tajweed-rules-list";
import { FeaturedLessons } from "@/components/tajweed/featured-lessons";
import { TajweedCourses } from "@/components/tajweed/tajweed-courses";
import { LessonDetail } from "@/components/tajweed/lesson-detail";
import { RuleDetail } from "@/components/tajweed/rule-detail";

function TajweedPage() {
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const { isRTL } = useRTL();

  return (
    <div className="p-4 space-y-4">
      {selectedLesson ? (
        <LessonDetail
          lesson={tajweedRules
            .flatMap((r) => r.subLessons)
            .find((l) => l.id === selectedLesson)}
          onBack={() => setSelectedLesson(null)}
        />
      ) : selectedRule ? (
        <RuleDetail
          rule={tajweedRules.find((r) => r.id === selectedRule)}
          onBack={() => setSelectedRule(null)}
          onSelectLesson={setSelectedLesson}
        />
      ) : (
        <>
          <PageHeader
            title={
              <div className="flex items-center">
                <Mic2
                  className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} icon-hover`}
                />
                <span>تعلم التجويد</span>
              </div>
            }
          />

          {/* Progress Overview */}
          <Card className="bg-primary text-primary-foreground shadow-md">
            <CardContent className="p-4">
              <h2 className="text-center mb-2">تقدمك الإجمالي</h2>
              <div className="flex items-center justify-between mb-2">
                <span>10/22 درس مكتمل</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2 bg-white/20" />
            </CardContent>
          </Card>

          <Tabs defaultValue="featured">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="featured">دروس مميزة</TabsTrigger>
              <TabsTrigger value="rules">أحكام التجويد</TabsTrigger>
              <TabsTrigger value="courses">دورات كاملة</TabsTrigger>
            </TabsList>

            {/* Featured Lessons Tab */}
            <TabsContent value="featured" className="space-y-4 mt-4">
              <FeaturedLessons />
            </TabsContent>

            {/* Tajweed Rules Tab */}
            <TabsContent value="rules" className="space-y-4 mt-4">
              <TajweedRulesList onSelectRule={setSelectedRule} />
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4 mt-4">
              <TajweedCourses />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default TajweedPage;
