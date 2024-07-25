import { createFileRoute } from "@tanstack/react-router";
import VehiclesPage from "../pages/vehicles/VehiclesPage";

export const Route = createFileRoute("/vehicles")({
  component: () => <VehiclesPage />,
});
