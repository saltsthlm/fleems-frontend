import { PropsWithChildren } from "react";
import ProfileButton from "./ProfileButton";

type PageHeadingProps = {
  noProfileButton?: boolean;
};
export default function PageHeading({
  children,
  noProfileButton = false,
}: PropsWithChildren<PageHeadingProps>) {
  return (
    <h1 className="pb-5 text-xl flex justify-between">
      {children}
      {!noProfileButton && <ProfileButton />}
    </h1>
  );
}
