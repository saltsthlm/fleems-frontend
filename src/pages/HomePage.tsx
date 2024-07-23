import FleetDataStats from "../components/FleetDataStats";
import FleetEventsStats from "../components/FleetEventsStats";
import GapList from "../components/GapList";
import PageHeading from "../components/PageHeading";
import PageWithNavigation from "../components/PageWithNavigation";
import TopDriversStats from "../components/TopDriversStats";

export default function HomePage() {
  return (
    <PageWithNavigation>
      <PageHeading>Dashboard</PageHeading>
      <GapList>
        <FleetEventsStats />
        <TopDriversStats />
        <FleetDataStats />
      </GapList>
    </PageWithNavigation>
  );
}
