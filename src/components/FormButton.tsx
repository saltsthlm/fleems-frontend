import { PropsWithChildren } from "react";

type FormButtonProps = {
  onClick?: () => unknown;
  className?: string;
  overrideColor?: boolean;
};
export default function FormButton({
  children,
  onClick: callback,
  className,
  overrideColor,
}: PropsWithChildren<FormButtonProps>) {
  return (
    <button
      onClick={callback}
      className={`btn bg-button border-0 px-8 ${className} ${!overrideColor && "text-font"}`}
    >
      {children}
    </button>
  );
}
