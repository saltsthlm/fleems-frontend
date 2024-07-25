import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import useApi from "../../hooks/useApi";
import Task from "./components/Task";

export default function TasksPage() {
  const { data, loading } = useApi("tasks");

  if (loading) {
    return (
      <PageWithNavigation>
        <PageHeading>Tasks</PageHeading>
        <h1>Loading...</h1>
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
