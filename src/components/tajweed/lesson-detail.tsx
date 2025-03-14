import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TajweedLesson } from "@/data/tajweed-rules";
import {
  ArrowRight,
  Clock,
  Download,
  Info,
  Play,
  Star,
  Video,
  Volume2,
} from "lucide-react";
import { useRTL } from "@/lib/rtl-context";

interface LessonDetailProps {
  lesson: TajweedLesson;
  onBack: () => void;
}

export function LessonDetail({ lesson, onBack }: LessonDetailProps) {
  const { isRTL } = useRTL();

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="icon-hover">
          <ArrowRight className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
          <span>العودة</span>
        </Button>
      </div>

      <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Play className="h-6 w-6 text-primary" />
          </Button>
        </div>
        <img
          src={`https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80`}
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold">{lesson.title}</h2>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{lesson.duration}</span>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 mr-1 text-yellow-500" />
          <span>المستوى: {lesson.level}</span>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="font-bold mb-2 flex items-center">
          <Info className="h-4 w-4 mr-2 text-primary" />
          <span>وصف الدرس</span>
        </h3>
        <p className="text-sm">
          {lesson.description ||
            `هذا الدرس يشرح ${lesson.title} بالتفصيل مع أمثلة تطبيقية من القرآن الكريم. سيتم توضيح القواعد والأحكام المتعلقة بهذا الحكم مع التدريب العملي على النطق الصحيح.`}
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1">
          <Play className="h-4 w-4 mr-2" />
          <span>بدء الدرس</span>
        </Button>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          <span>تنزيل</span>
        </Button>
      </div>

      <Card className="bg-card p-4 rounded-lg shadow-sm">
        <CardContent className="p-0">
          <h3 className="font-bold mb-3">محتويات الدرس</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2 text-primary" />
                <span>مقدمة وتعريف</span>
              </div>
              <span className="text-xs text-muted-foreground">3:45</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2 text-primary" />
                <span>شرح القاعدة</span>
              </div>
              <span className="text-xs text-muted-foreground">5:20</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2 text-primary" />
                <span>أمثلة تطبيقية</span>
              </div>
              <span className="text-xs text-muted-foreground">4:15</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <div className="flex items-center">
                <Volume2 className="h-4 w-4 mr-2 text-primary" />
                <span>تدريب صوتي</span>
              </div>
              <span className="text-xs text-muted-foreground">6:30</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
