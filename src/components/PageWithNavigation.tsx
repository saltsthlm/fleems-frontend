import React, { PropsWithChildren } from "react";
import MainNavigation from "./MainNavigation";

export default function PageWithNavigation({ children }: PropsWithChildren) {
  return (
    <React.Fragment>
      {children}
      <MainNavigation />
    </React.Fragment>
  );
}
