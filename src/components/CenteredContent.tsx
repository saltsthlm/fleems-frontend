import { PropsWithChildren } from "react";
import PageWithNavigation from "./PageWithNavigation";

export default function CenteredContent({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center h-screen">
      <PageWithNavigation showNav={false}>{children}</PageWithNavigation>
    </div>
  );
}
