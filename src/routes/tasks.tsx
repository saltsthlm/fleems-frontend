import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks")({
  component: () => <div>Hello /tasks!</div>,
});
