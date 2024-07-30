import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import TripLogs from "../../components/TripLogs";

export default function LogPage() {
  return (
    <PageWithNavigation>
      <PageHeading>Logs</PageHeading>
      <TripLogs />
    </PageWithNavigation>
  );
}
