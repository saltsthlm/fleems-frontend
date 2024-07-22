import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/drivers")({
  component: () => <div>Hello /drivers!</div>,
});
