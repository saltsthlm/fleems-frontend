import { PropsWithChildren } from "react";
import useScreenType from "../hooks/useScreenType";

export default function GapList({ children }: PropsWithChildren) {
  const { isMobile } = useScreenType();

  return (
    <div
      className={`${isMobile ? "flex flex-col gap-5 items-center" : "grid grid-cols-4 gap-5"}`}
    >
      {children}
    </div>
  );
}
