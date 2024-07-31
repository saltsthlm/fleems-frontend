import { PropsWithChildren } from "react";
import useScreenType from "../hooks/useScreenType";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function GapList({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) {
  const { isMobile } = useScreenType();

  return (
    <div
      className={`${isMobile ? "flex flex-col gap-5 items-center mb-2" : `grid gap-10`} ${className && className}`}
    >
      {children}
    </div>
  );
}
