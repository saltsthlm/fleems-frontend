import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import Map from "../../components/Map";
import TaskStatusTasks from "./components/TaskStatusStats";
import FinishedTaskStats from "./components/FinishedTaskStats";
import Card from "../../components/Card";

export default function HomePage() {
  return (
    <PageWithNavigation>
      <PageHeading>Dashboard</PageHeading>
      <GapList className="grid-cols-3">
        <TaskStatusTasks />
        <FinishedTaskStats />
        <Card>
          <h1 className="text-xl">All active trucks</h1>
          <Map />
        </Card>
      </GapList>
    </PageWithNavigation>
  );
}
