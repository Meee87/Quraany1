import { ArrowRight, Home } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useRTL } from "@/lib/rtl-context";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  rightContent?: React.ReactNode;
}

export function PageHeader({
  title,
  showBackButton = true,
  showHomeButton = true,
  rightContent,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const { isRTL } = useRTL();

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="icon-hover"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        )}
        {showHomeButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="icon-hover"
          >
            <Home className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-bold flex items-center">{title}</h1>
      </div>
      {rightContent}
    </div>
  );
}
