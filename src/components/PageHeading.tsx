import { PropsWithChildren } from "react";

export default function PageHeading({ children }: PropsWithChildren) {
  return (
    <h1 className="pb-5 text-xl">
      {children}
    </h1>
  )
}
