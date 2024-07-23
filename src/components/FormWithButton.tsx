import { PropsWithChildren, SyntheticEvent } from "react";
import FormButton from "./FormButton";
import Card from "./Card";

type FormWithButtonProps = {
  onSubmit?: (arg0: SyntheticEvent) => unknown;
  buttonText: string;
};
export default function FormWithButton({
  children,
  onSubmit: callback,
  buttonText,
}: PropsWithChildren<FormWithButtonProps>) {
  return (
    <form
      onSubmit={callback}
      className="flex flex-col gap-10 items-center [&>div>input]:rounded-xl [&>div>input]:p-3"
    >
      <Card>{children}</Card>
      <div className="w-full flex flex-col items-center gap-3">
        <FormButton>{buttonText}</FormButton>
      </div>
    </form>
  );
}
