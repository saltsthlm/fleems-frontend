import { PropsWithChildren, SyntheticEvent } from "react";
import FormButton from "./FormButton";
import Card from "./Card";
import useScreenType from "../hooks/useScreenType";

type FormWithButtonProps = {
  onSubmit?: (arg0: SyntheticEvent) => unknown;
  buttonText: string;
};

export default function FormWithButton({
  children,
  onSubmit: callback,
  buttonText,
}: PropsWithChildren<FormWithButtonProps>) {
  const { isMobile } = useScreenType();
  
  return (
    <form
      onSubmit={callback}
      className={`flex flex-col gap-3 items-center [&>div>input]:rounded-xl [&>div>input]:p-2 ${isMobile ? "" : "w-2/5 mx-auto"}`}
    >
      <Card className="w-full">{children}</Card>
      <div className="w-full flex flex-col items-center gap-3 max-w-48">
        <FormButton>{buttonText}</FormButton>
      </div>
    </form>
  );
}
