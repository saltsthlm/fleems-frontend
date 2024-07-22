import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vehicles")({
  component: () => <div>Hello /vehicles!</div>,
});
