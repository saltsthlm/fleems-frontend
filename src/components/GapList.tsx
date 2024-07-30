import { PropsWithChildren } from "react";
import useScreenType from "../hooks/useScreenType";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function GapList({
  children,
  className,
}: PropsWithChildren & PropsWithClassName) {
  const { isMobile } = useScreenType();

  return (
    <div
      className={`${isMobile ? "flex flex-col gap-5 items-center" : "grid gap-5"} ${className && className}`}
    >
      {children}
    </div>
  );
}
