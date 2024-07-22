import { PropsWithChildren } from "react";

type FormButtonProps = {
  onClick?: () => unknown;
};
export default function FormButton({
  children,
  onClick: callback,
}: PropsWithChildren<FormButtonProps>) {
  return (
    <button onClick={callback} className="btn text-font bg-button">
      {children}
    </button>
  );
}
