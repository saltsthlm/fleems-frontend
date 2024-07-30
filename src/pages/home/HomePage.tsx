import FleetDataStats from "./components/FleetDataStats";
import FleetEventsStats from "./components/FleetEventsStats";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import TopDriversStats from "./components/TopDriversStats";
import Map from "../../components/Map";

export default function HomePage() {
  return (
    <PageWithNavigation>
      <PageHeading>Dashboard</PageHeading>
      <GapList className="grid-cols-4">
        <FleetEventsStats />
        <TopDriversStats />
        <FleetDataStats />
      </GapList>
      <Map />
    </PageWithNavigation>
  );
}
