import { useState, useEffect } from "react";
import { Bookmark, RotateCcw, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TasbihPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedTasbih, setSelectedTasbih] = useState("سبحان الله");

  // Predefined tasbih phrases
  const tasbihPhrases = [
    "سبحان الله",
    "الحمد لله",
    "الله أكبر",
    "لا إله إلا الله",
    "أستغفر الله",
    "سبحان الله وبحمده سبحان الله العظيم",
    "لا حول ولا قوة إلا بالله",
  ];

  // Vibrate when count reaches target
  useEffect(() => {
    if (count === target && navigator.vibrate) {
      navigator.vibrate(200);
    }
  }, [count, target]);

  const handleIncrement = () => {
    if (count < 999) {
      setCount(count + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleTargetChange = (value: string) => {
    setTarget(parseInt(value));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center">
          <Bookmark className="h-5 w-5 mr-2" />
          المسبحة الإلكترونية
        </h1>
      </div>

      {/* Tasbih Selection */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <Select
            defaultValue={selectedTasbih}
            onValueChange={(value) => setSelectedTasbih(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر الذكر" />
            </SelectTrigger>
            <SelectContent>
              {tasbihPhrases.map((phrase, index) => (
                <SelectItem key={index} value={phrase}>
                  {phrase}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Counter Display */}
      <div className="flex justify-center py-6">
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center text-5xl font-bold shadow-lg ${count >= target ? "bg-[#1e3a8a] text-white" : "bg-white text-[#1e3a8a]"}`}
          onClick={handleIncrement}
        >
          {count}
        </div>
      </div>

      {/* Target Display */}
      <div className="text-center">
        <p className="text-gray-600">الهدف: {target}</p>
        <div className="flex justify-center space-x-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTarget(Math.max(1, target - 1))}
            disabled={target <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Select value={target.toString()} onValueChange={handleTargetChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[33, 99, 100, 500].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTarget(Math.min(999, target + 1))}
            disabled={target >= 999}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Tasbih */}
      <Card className="bg-[#1e3a8a] text-white shadow-md">
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-bold mb-1">{selectedTasbih}</h2>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          إعادة تعيين
        </Button>
      </div>

      {/* Instructions */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">تعليمات الاستخدام</h3>
          <ul className="text-sm space-y-2">
            <li>1. اختر الذكر الذي ترغب في تسبيحه</li>
            <li>2. حدد العدد المستهدف</li>
            <li>3. انقر على الدائرة لزيادة العداد</li>
            <li>4. سيهتز الجهاز عند الوصول للعدد المستهدف</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default TasbihPage;
