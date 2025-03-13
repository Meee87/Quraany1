import { createContext, useContext, useState, ReactNode } from "react";

type RTLContextType = {
  isRTL: boolean;
  toggleDirection: () => void;
};

const RTLContext = createContext<RTLContextType>({
  isRTL: true,
  toggleDirection: () => {},
});

export function RTLProvider({ children }: { children: ReactNode }) {
  const [isRTL, setIsRTL] = useState(true);

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

export const useRTL = () => useContext(RTLContext);
