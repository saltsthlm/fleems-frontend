import { useState , useMemo } from "react";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import useApi from "../../hooks/useApi";
import { Task } from "../../types/ApiResponses";
import Throbber from "../../components/Throbber";
import CardButtonWithNoStyles from "../../components/CardButtonWithNoStyles";
import Card from "../../components/Card";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import SearchBar from "../../components/SearchBar";

export default function TasksPage() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isViewingTask, setIsViewingTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [activeTab, setActiveTab] = useState<string>("information");

  const { data, isLoading, error } = useApi("tasks");

  const filteredData = useMemo(() => {
    if (!searchFilter) return data;
    const lowerCaseFilter = searchFilter.toLowerCase();
    return data?.filter(task =>
      task.client.name.toLowerCase().includes(lowerCaseFilter) ||
      task.startDestination.toLowerCase().includes(lowerCaseFilter) ||
      task.endDestination.toLowerCase().includes(lowerCaseFilter) ||
      task.payload.toString().toLowerCase().includes(lowerCaseFilter)
    );
  }, [data, searchFilter]);

  const viewTask = (task: Task) => {
    setSelectedTask(task);
    setIsViewingTask(true);
  };

  const viewList = () => {
    setIsViewingTask(false);
  };

  if (isViewingTask && !!selectedTask) {
    return (
      <PageWithNavigation>
        <PageHeading>
          <button onClick={viewList}>&lt; Task information</button>
        </PageHeading>
        
        <Card className="text-center">
          <h1 className="text-xl">{selectedTask.client.name}</h1>
          <h2>Route: {selectedTask.startDestination} - {selectedTask.endDestination}</h2>
          <h2>Task: {selectedTask.payload}</h2>
          <h2>No. of legs: {selectedTask.legs?.length}</h2>
          <h2>Start date: {selectedTask.startDate?.toString()}</h2>
          <h2>End date: {selectedTask.dateFinished?.toString()}</h2>
        </Card>
      </PageWithNavigation>
    );
  }

  if (isLoading || error) {
    return (
      <PageWithNavigation>
        <PageHeading>Tasks</PageHeading>
        <GapList>
          {isLoading && <Throbber />}
          {error && <h1>An error occurred: {error.message}</h1>}
        </GapList>
      </PageWithNavigation>
    );
  }

  return (
    <PageWithNavigation>
      <PageHeading>Tasks</PageHeading>
      <SecondaryNavigation onTabChange={setActiveTab} activeTab={activeTab} />
      <SearchBar
        value={searchFilter}
        callback={setSearchFilter}
      />
      {isLoading && <Throbber />}
      <GapList>
        {filteredData?.map((task: Task) => (
          <CardButtonWithNoStyles
            key={task.id}
            onClick={() => viewTask(task)}
          >
            <h1 className="text-xl">{task.client.name}</h1>
            <div className="flex justify-between w-full text-left">
              <div> 
                <h2>Route: {task.startDestination} - {task.endDestination}</h2>
                <h2>Task: {task.payload}</h2>
                <h2>No. of legs: {task.legs.length}</h2>
                <h2>Start date: {task.startDate?.toString()}</h2>
                <h2>End date: {task.dateFinished?.toString()}</h2>
              </div>
            </div>
          </CardButtonWithNoStyles>
        ))}
      </GapList>
    </PageWithNavigation>
  );
}
