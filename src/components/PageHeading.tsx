import { PropsWithChildren } from "react";
import ProfileButton from "./ProfileButton";
import useScreenType from "../hooks/useScreenType";

type PageHeadingProps = {
  noProfileButton?: boolean;
  sticky?: boolean;
};
export default function PageHeading({
  children,
  noProfileButton = false,
  sticky = true,
}: PropsWithChildren<PageHeadingProps>) {
  const { isMobile } = useScreenType();

  return (
    <h1
      className={`py-5 text-xl flex justify-between align-center drop-shadow mb-4 ${sticky && "sticky top-0 z-10 bg-secondary -mx-6 px-6"}`}
    >
      {children}
      {!noProfileButton && isMobile && <ProfileButton />}
    </h1>
  );
}
