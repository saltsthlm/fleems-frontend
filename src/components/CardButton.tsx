import { PropsWithChildren } from "react";

type CardButtonProps = {
  onClick?: () => unknown;
};
export default function CardButton({
  children,
  onClick: callback,
}: PropsWithChildren<CardButtonProps>) {
  return (
    <button
      onClick={callback}
      className="card bg-background text-black p-5 w-full drop-shadow-lg gap-3 items-center justify-center py-10"
    >
      {children}
    </button>
  );
}
