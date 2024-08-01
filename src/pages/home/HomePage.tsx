import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import VehicleStatus from "./components/VehicleStatus";
import FinishedTaskStats from "./components/FinishedTaskStats";
import Card from "../../components/Card";
import DriverStatus from "./components/DriverStatus";
import TaskStatus from "./components/TaskStatus";
import SpeedViolations from "./components/SpeedViolations";
import RestViolations from "./components/RestViolations";
export default function HomePage() {
  return (
    <PageWithNavigation>
      <PageHeading>Dashboard</PageHeading>
      <GapList className="grid-cols-3">
        <VehicleStatus />
        <DriverStatus />
        <TaskStatus />
        <FinishedTaskStats />
        <SpeedViolations />
        <RestViolations />
        <Card>
          <h1 className="text-xl">All active fleets</h1>
        </Card>
      </GapList>
    </PageWithNavigation>
  );
}
