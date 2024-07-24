import { PropsWithChildren } from "react";

export default function Popup({ children }: PropsWithChildren) {
  return (
    <div className="w-screen h-screen absolute left-0 top-0 bg-black/50 z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 w-full">
        {children}
      </div>
    </div>
  );
}
