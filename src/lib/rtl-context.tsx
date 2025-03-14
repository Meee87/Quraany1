import { createContext, useContext, useState, ReactNode } from "react";

type RTLContextType = {
  isRTL: boolean;
  toggleDirection: () => void;
};

const RTLContext = createContext<RTLContextType>({
  isRTL: true,
  toggleDirection: () => {},
});

// Export as named export instead of default export for Fast Refresh compatibility
export function RTLProvider({ children }: { children: ReactNode }) {
  const [isRTL, setIsRTL] = useState(true); // Default to RTL

  const toggleDirection = () => {
    setIsRTL(!isRTL);
  };

  return (
    <RTLContext.Provider value={{ isRTL, toggleDirection }}>
      <div dir={isRTL ? "rtl" : "ltr"} className="h-full">
        {children}
      </div>
    </RTLContext.Provider>
  );
}

// Export as a named constant function for Fast Refresh compatibility
export const useRTL = () => useContext(RTLContext);
