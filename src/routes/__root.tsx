import { createRootRoute } from "@tanstack/react-router";
import RootPage from "../pages/root/RootPage";

export const Route = createRootRoute({
  component: () => <RootPage />,
});
