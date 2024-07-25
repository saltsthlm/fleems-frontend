import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import Throbber from "../../components/Throbber";
import useApi from "../../hooks/useApi";
import Task from "./components/Task";

export default function TasksPage() {
  const { data, isLoading } = useApi("tasks");

  if (isLoading) {
    return (
      <PageWithNavigation>
        <PageHeading>Tasks</PageHeading>
        <Throbber />
      </PageWithNavigation>
    );
  }

  return (
    <PageWithNavigation>
      <PageHeading>Tasks</PageHeading>
      <GapList>
        {data?.map((task) => <Task task={task} key={task.id} />)}
      </GapList>
    </PageWithNavigation>
  );
}
