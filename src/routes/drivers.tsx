import { createFileRoute } from "@tanstack/react-router";
import DriversPage from "../pages/drivers/DriversPage";

export const Route = createFileRoute("/drivers")({
  component: () => <DriversPage />,
});
