import FleetDataStats from "../components/FleetDataStats";
import FleetEventsStats from "../components/FleetEventsStats";
import GapList from "../components/GapList";
import PageWithNavigation from "../components/PageWithNavigation";
import TopDriversStats from "../components/TopDriversStats";

export default function HomePage() {
  return (
    <PageWithNavigation>
      <h1>Dashboard</h1>
      <GapList>
        <FleetEventsStats />
        <TopDriversStats />
        <FleetDataStats />
      </GapList>
    </PageWithNavigation>
  );
}
