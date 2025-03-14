import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { tajweedRules } from "@/data/tajweed-rules";
import { BookOpen, CheckCircle } from "lucide-react";

interface TajweedRulesListProps {
  onSelectRule: (ruleId: number) => void;
}

export function TajweedRulesList({ onSelectRule }: TajweedRulesListProps) {
  return (
    <div className="space-y-3">
      {tajweedRules.map((rule) => (
        <Card
          key={rule.id}
          className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold">{rule.name}</h3>
              <span className="text-xs text-muted-foreground">
                {rule.completed}/{rule.lessons} دروس
              </span>
            </div>
            <Progress value={rule.progress} className="h-2" />
            <div className="flex justify-between mt-3">
              <div className="flex items-center text-xs text-muted-foreground">
                {rule.completed > 0 && (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                    <span>{rule.completed} مكتمل</span>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs icon-hover"
                onClick={() => onSelectRule(rule.id)}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                عرض الدروس
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
