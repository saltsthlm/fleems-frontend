import { Outlet } from "@tanstack/react-router";

export default function RootPage() {
  return (
    <div className="bg-secondary text-font p-5 px-10 flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}
