import { PropsWithChildren } from "react";
import useScreenType from "../hooks/useScreenType";

export default function GapList({ children }: PropsWithChildren) {
  const { isMobile } = useScreenType();

  return <div className={`flex ${isMobile ? "flex-col" : "flex-row flex-wrap"} gap-5 items-center`}>{children}</div>;
}
