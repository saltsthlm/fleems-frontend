import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/clients")({
  component: () => <div>Hello /clients!</div>,
});
