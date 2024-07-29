import { PropsWithChildren } from "react";
import { PropsWithClassName } from "../types/ComponentTypes";

interface CardButtonWithNoStylesProps extends PropsWithClassName {
  onClick?: () => unknown;
}
export default function CardButtonWithNoStyles({
  children,
  onClick: callback,
    className
}: PropsWithChildren<CardButtonWithNoStylesProps>) {
  return (
    <button
      onClick={callback}
      className={`card bg-background text-black p-5 w-full drop-shadow-lg gap-3 ${className}`}
    >
      {children}
    </button>
  );
}



// import { PropsWithChildren } from "react";
// import { PropsWithClassName } from "../types/ComponentTypes";

// export default function Card({
//   children,
//   className,
// }: PropsWithChildren<PropsWithClassName>) {
//   return (
//     <div
//       className={`card bg-background text-black p-5 w-full drop-shadow-lg gap-3 ${className}`}
//     >
//       {children}
//     </div>
//   );
// }


