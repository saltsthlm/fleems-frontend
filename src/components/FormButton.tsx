import { PropsWithChildren } from "react";

type FormButtonProps = {
  onClick?: () => unknown;
  className?: string;
  overrideColor?: boolean;
  disabled?: boolean;
};
export default function FormButton({
  children,
  onClick: callback,
  className,
  overrideColor,
  disabled = false,
}: PropsWithChildren<FormButtonProps>) {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      className={`btn bg-button border-0 px-8 max-w-48 hover:bg-gray-300  ${className} ${!overrideColor && "text-font"}`}
    >
      {children}
    </button>
  );
}
