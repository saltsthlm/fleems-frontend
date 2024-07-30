import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import TripLogs from "../../components/TripLogs";

type LogPageProps = {
  parentRoute: string;
};
export default function LogPage({ parentRoute }: LogPageProps) {
  return (
    <PageWithNavigation>
      <PageHeading>Logs</PageHeading>
      <TripLogs parentRoute={parentRoute} />
    </PageWithNavigation>
  );
}
