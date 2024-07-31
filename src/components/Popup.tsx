import { PropsWithChildren } from "react";
import useScreenType from "../hooks/useScreenType";

export default function Popup({ children }: PropsWithChildren) {
  const { isMobile } = useScreenType();
  
  return (
    <div className={`w-screen h-screen absolute left-0 top-0 bg-black/50 z-50 disable-scroll`}>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 h-full flex flex-col justify-center ${isMobile ? "" : "w-2/5 mx-auto"}`}>
        {children}
      </div>
    </div>
  );
}
