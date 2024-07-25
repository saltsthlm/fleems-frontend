import { useEffect, useState } from "react";
import useScreenSize from "./useScreenSize";

export default function useScreenType() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width >= 768) {
      setIsMobile(false);
      setIsDesktop(true);
      return;
    }

    setIsMobile(true);
    setIsDesktop(false);
  }, [screenSize]);

  return { isMobile, isDesktop };
}
