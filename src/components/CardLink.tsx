import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";

type CardLinkProps = {
  to?: string;
};
export default function CardLink({
  children,
  to,
}: PropsWithChildren<CardLinkProps>) {
  return (
    <Link
      to={to}
      className="card bg-background text-black p-5 w-full drop-shadow-lg gap-3 items-center justify-center py-10"
    >
      {children}
    </Link>
  );
}
