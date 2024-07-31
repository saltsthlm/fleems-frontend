import { PropsWithChildren } from "react";
import { PropsWithClassName } from "../types/ComponentTypes";

interface CardButtonProps extends PropsWithClassName {
  onClick?: () => unknown;
  isCentered?: boolean;
}
export default function CardButton({
  children,
  onClick: callback,
  isCentered = true,
  className,
}: PropsWithChildren<CardButtonProps>) {
  return (
    <button
      onClick={callback}
      className={`card bg-background text-black c p-5 w-full drop-shadow-lg gap-3 hover:bg-button ${className} ${isCentered && "items-center justify-center py-10"}`}
    >
      {children}
    </button>
  );
}
