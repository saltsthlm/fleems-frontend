import { createFileRoute } from "@tanstack/react-router";
import TripLogs from "../components/TripLogs";
import PageWithNavigation from "../components/PageWithNavigation";
import PageHeading from "../components/PageHeading";

export const Route = createFileRoute("/logs")({
  component: () => (
    <>
      <PageWithNavigation>
        <PageHeading>Logs</PageHeading>
        <TripLogs />
      </PageWithNavigation>
    </>
  ),
});
