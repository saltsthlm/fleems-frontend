import { Outlet } from "@tanstack/react-router";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-secondary text-font text-sm flex flex-col relative">
      <Outlet />
    </div>
  );
}
