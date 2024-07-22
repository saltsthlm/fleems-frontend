import { createRootRoute } from "@tanstack/react-router";
import RootPage from "../pages/RootPage";

export const Route = createRootRoute({
  component: () => <RootPage />,
});
