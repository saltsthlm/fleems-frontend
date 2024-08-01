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
import FleetMap from "../../components/FleetMap";
import TopDrivers from "./components/Topdrivers";
export default function HomePage() {
  return (
    <PageWithNavigation>
      <PageHeading>Dashboard</PageHeading>
      <GapList className="grid-cols-3">
        <VehicleStatus />
        <DriverStatus />
        <TaskStatus />
        <div className="w-full">
        <FinishedTaskStats />
        <Card className="mt-4">
          <h1 className="text-xl">Up coming maintainence</h1>
          <h2 className="text-base">2024/10/22 - Vehicle GHI 789</h2>
        </Card>
        </div>
        
        <div className="w-full">
          <Card className="mb-4 w-full">
            <h1 className="text-xl">Violations</h1>
            <SpeedViolations />
            <RestViolations />
          </Card>
          <TopDrivers />
        </div>
        
        <FleetMap />
      </GapList>
    </PageWithNavigation>
  );
}
