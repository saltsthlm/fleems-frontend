import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import Throbber from "../../components/Throbber";
import useApi from "../../hooks/useApi";
import Task from "./components/Task";

export default function TasksPage() {
  const { data, isLoading, error } = useApi("tasks");

  if (isLoading || error) {
    return (
      <PageWithNavigation>
        <PageHeading>Tasks</PageHeading>
        <GapList>
          {isLoading && <Throbber />}
          {error && <h1>An error ocurred: {error.message}</h1>}
        </GapList>
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
