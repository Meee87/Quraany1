import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  notification?: boolean;
  className?: string;
}

export function IconButton({
  icon,
  label,
  onClick,
  active = false,
  notification = false,
  className,
}: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center justify-center p-2 h-auto gap-1 hover:bg-accent/10 rounded-xl",
        active && "text-primary",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 shadow-sm transition-all duration-300 hover:bg-primary/20">
          {icon}
        </div>
        {notification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}
