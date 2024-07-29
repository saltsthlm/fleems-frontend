import { PropsWithChildren } from "react";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function CardHarsh({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) {
  return (
    <div
      className={`bg-background text-black p-5 w-full drop-shadow-strong gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
