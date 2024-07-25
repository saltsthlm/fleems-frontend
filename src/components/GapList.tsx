import { PropsWithChildren } from "react";

export default function GapList({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-5 items-center">{children}</div>;
}
