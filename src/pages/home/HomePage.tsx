import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import Map from "../../components/Map";
import AssignmentStats from "./components/AssignmentStats";
import FleetDataStats from "./components/FleetDataStats";

export default function HomePage() {
  return (
    <PageWithNavigation>
      <PageHeading>Dashboard</PageHeading>
      <GapList className="grid-cols-3">
        <AssignmentStats />
        <FleetDataStats />
      </GapList>
      <Map />
    </PageWithNavigation>
  );
}
