import React, { PropsWithChildren } from "react";
import MainNavigation from "./MainNavigation";
import { Toaster } from "react-hot-toast";

type PageWithNavigationProps = {
  showNav?: boolean;
};
export default function PageWithNavigation({
  children,
  showNav = true,
}: PropsWithChildren<PageWithNavigationProps>) {
  return (
    <React.Fragment>
      <div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              padding: "20px",
              fontSize: "20px",
            },
          }}
        />
      </div>
      <div className="p-4 px-6 pt-0">{children}</div>
      {showNav && <MainNavigation />}
    </React.Fragment>
  );
}
