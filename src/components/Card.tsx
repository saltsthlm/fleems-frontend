import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="card bg-background text-black p-5 w-full drop-shadow-lg gap-3">
      {children}
    </div>
  );
}
