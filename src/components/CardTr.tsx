import { PropsWithChildren } from "react";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function CardTr({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) {
  return (
    <tr
      className={`bg-background text-black p-5 drop-shadow-lg gap-3 ${className}`}
    >
      {children}
    </tr>
  );
}
