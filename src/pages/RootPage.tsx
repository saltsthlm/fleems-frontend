import { Outlet } from "@tanstack/react-router";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-secondary text-font flex flex-col">
      <Outlet />
    </div>
  );
}
