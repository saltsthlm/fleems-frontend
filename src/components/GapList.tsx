import { PropsWithChildren } from "react";
import useScreenType from "../hooks/useScreenType";
import { PropsWithClassName } from "../types/ComponentTypes";

type GapListProps = {
  desktopColumns: number;
} & PropsWithClassName;
export default function GapList({
  children,
  className,
  desktopColumns,
}: PropsWithChildren<GapListProps>) {
  const { isMobile } = useScreenType();

  return (
    <div
      className={`${isMobile ? "flex flex-col gap-5 items-center" : `grid grid-cols-${desktopColumns} gap-5`} ${className && className}`}
    >
      {children}
    </div>
  );
}
