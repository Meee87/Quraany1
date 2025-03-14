import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { TajweedRule } from "@/data/tajweed-rules";
import { useRTL } from "@/lib/rtl-context";
import { ArrowRight, CheckCircle, Clock, Play, Volume2 } from "lucide-react";

interface RuleDetailProps {
  rule: TajweedRule;
  onBack: () => void;
  onSelectLesson: (lessonId: number) => void;
}

export function RuleDetail({ rule, onBack, onSelectLesson }: RuleDetailProps) {
  const { isRTL } = useRTL();

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="icon-hover">
          <ArrowRight className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
          <span>العودة</span>
        </Button>
      </div>

      <Card className="bg-primary text-primary-foreground shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{rule.name}</h2>
          <p className="text-sm">{rule.description}</p>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1 text-sm">
              <span>التقدم</span>
              <span>
                {rule.completed}/{rule.lessons} دروس
              </span>
            </div>
            <Progress value={rule.progress} className="h-2 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-bold mb-3">الدروس</h3>
        <div className="space-y-3">
          {rule.subLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-3 flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <h4 className="font-bold">{lesson.title}</h4>
                    {lesson.completed && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="mr-2">{lesson.duration}</span>
                    <span>{lesson.level}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center icon-hover"
                  onClick={() => onSelectLesson(lesson.id)}
                >
                  <Play className="h-3 w-3 mr-1" />
                  <span>ابدأ</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-3">أمثلة تطبيقية</h3>
        <div className="grid grid-cols-1 gap-3">
          {rule.examples.map((example, index) => (
            <Card key={index} className="bg-muted/30 shadow-sm">
              <CardContent className="p-3">
                <div className="text-center mb-2 text-xl font-bold text-primary">
                  {example.text}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{example.rule}</span>
                  <span className="text-muted-foreground">
                    {example.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Volume2 className="h-4 w-4 mr-2" />
            <span>استماع للأمثلة الصوتية</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>الأمثلة الصوتية - {rule.name}</DialogTitle>
            <DialogDescription>
              استمع إلى الأمثلة التطبيقية بصوت الشيخ محمود خليل الحصري
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {rule.examples.map((example, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
              >
                <div className="font-bold">{example.text}</div>
                <Button variant="ghost" size="icon">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
