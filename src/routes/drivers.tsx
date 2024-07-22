import { createFileRoute } from "@tanstack/react-router";
import DriversPage from "../pages/DriversPage";

export const Route = createFileRoute("/drivers")({
  component: () => <DriversPage />,
});
