import { PropsWithChildren } from "react";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function Card({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) {
  return (
    <div
      className={`card bg-background text-black p-5 drop-shadow-lg gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
