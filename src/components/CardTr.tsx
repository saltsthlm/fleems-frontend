import { PropsWithChildren } from "react";
import { PropsWithClassName } from "../types/ComponentTypes";

type CardTrProps = {
  onClick: () => unknown;
} & PropsWithClassName;
export default function CardTr({
  children,
  className,
  onClick: callback,
}: PropsWithChildren<CardTrProps>) {
  return (
    <tr
      onClick={callback}
      className={`bg-background text-black drop-shadow-strong gap-3 grid text-center ${className}`}
    >
      {children}
    </tr>
  );
}
