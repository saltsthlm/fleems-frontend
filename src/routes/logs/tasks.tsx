import { createFileRoute } from "@tanstack/react-router";
import LogPage from "../../pages/log/LogPage";

export const Route = createFileRoute("/logs/tasks")({
  component: () => <LogPage parentRoute="/tasks" />,
});
