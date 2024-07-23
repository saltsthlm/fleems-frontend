import React, { PropsWithChildren } from "react";
import MainNavigation from "./MainNavigation";

type PageWithNavigationProps = {
  showNav?: boolean;
};
export default function PageWithNavigation({
  children,
  showNav = true,
}: PropsWithChildren<PageWithNavigationProps>) {
  return (
    <React.Fragment>
      <div className="p-5">{children}</div>
      {showNav && <MainNavigation />}
    </React.Fragment>
  );
}
