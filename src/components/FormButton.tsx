import { PropsWithChildren } from "react";

type FormButtonProps = {
  onClick?: () => unknown;
  className?: string;
};
export default function FormButton({
  children,
  onClick: callback,
  className,
}: PropsWithChildren<FormButtonProps>) {
  return (
    <button
      onClick={callback}
      className={`btn text-font bg-button border-0 px-8 ${className}`}
    >
      {children}
    </button>
  );
}
