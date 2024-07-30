import { useState, useMemo } from "react";
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
import FormButton from "../../components/FormButton";
import TaskAssignForm from "./components/TaskAssignForm";

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getStateColorClass = (state: string | undefined): string => {
  switch (state?.toLowerCase()) {
    case "ongoing":
      return "text-[#2DA641]";
    case "completed":
      return "text-[#2196F3]";
    case "unassigned":
      return "text-[#F44336]";
    case "assigned":
      return "text-[#FF9800]";
    default:
      return "";
  }
};

const formatDate = (dateInput: Date | string): string => {
  let date: Date;

  if (typeof dateInput === "string") {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toISOString().split("T")[0];
};

export default function TasksPage() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isViewingTask, setIsViewingTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isShowingAssignForm, setIsShowingAssignForm] =
    useState<boolean>(false); // New state for form visibility
  const [activeTab, setActiveTab] = useState<string>("information");

  const { data, isLoading, error } = useApi("tasks");

  const filteredData = useMemo(() => {
    if (!searchFilter) return data;
    const lowerCaseFilter = searchFilter.toLowerCase();
    return data?.filter(
      (task) =>
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
    setIsShowingAssignForm(false);
  };

  const showAssignForm = () => {
    setIsShowingAssignForm(true);
  };

  if (isViewingTask && !!selectedTask) {
    const taskStateClass = getStateColorClass(selectedTask.state);

    return (
      <PageWithNavigation>
        {isShowingAssignForm ? (
          <>
            <PageHeading>
              <button onClick={viewList}>&lt; Assign a task</button>
            </PageHeading>
            <TaskAssignForm
              onSubmit={(formData) => {
                console.log(formData);
                setIsShowingAssignForm(false);
              }}
              buttonText="ASSIGN"
              initialTask={selectedTask}
              drivers={["Driver 1", "Driver 2", "Driver 3"]}
            />
          </>
        ) : (
          <>
            <PageHeading>
              <button onClick={viewList}>&lt; Task information</button>
            </PageHeading>
            <Card className="text-center">
              <h1 className="text-xl">{selectedTask.client.name}</h1>
              <h2>
                Route : {selectedTask.startAddress.city} -{" "}
                {selectedTask.endAddress.city}
              </h2>
              <h2>
                Task : Transportation of {selectedTask.payload}{" "}
                {selectedTask.product}
              </h2>
              <h2>
                Status :{" "}
                <span className={taskStateClass}>
                  {capitalizeFirstLetter(selectedTask.state ?? "")}
                </span>
              </h2>
              <h2>No. of legs : {selectedTask.legs?.length}</h2>
              <h2>
                Start date :{" "}
                {selectedTask.startDate
                  ? formatDate(selectedTask?.startDate)
                  : "N/A"}
              </h2>
              <h2>
                End date :{" "}
                {selectedTask.dateFinished
                  ? formatDate(selectedTask.dateFinished)
                  : "N/A"}
              </h2>
            </Card>
            <div className="flex flex-col py-7 gap-4 items-center">
              {selectedTask.state === "UNASSIGNED" && (
                <FormButton onClick={showAssignForm} className="w-3/5">
                  ASSIGN
                </FormButton>
              )}
            </div>
          </>
        )}
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
      <SecondaryNavigation
        onTabChange={setActiveTab}
        activeTab={activeTab}
        parentRoute="/tasks"
      />
      <SearchBar value={searchFilter} callback={setSearchFilter} />
      {isLoading && <Throbber />}
      {filteredData?.length === 0 ? (
        <div className="text-center mt-10">
          <h1>No tasks to show at the moment</h1>
        </div>
      ) : (
        <GapList>
          {filteredData?.map((task: Task) => {
            const taskStateClass = getStateColorClass(task.state);

            return (
              <CardButtonWithNoStyles
                key={task.id}
                onClick={() => viewTask(task)}
              >
                <h1 className="text-xl">{task.client.name}</h1>
                <div className="flex justify-between w-full text-left">
                  <div>
                    <h2>
                      Route : {task.startAddress.city} - {task.endAddress.city}
                    </h2>
                    <h2>
                      Task : Transportation of {task.payload} {task.product}
                    </h2>
                    <h2>
                      Status :{" "}
                      <span className={taskStateClass}>
                        {capitalizeFirstLetter(task.state ?? "")}
                      </span>
                    </h2>
                    <h2>No. of legs : {task.legs.length}</h2>
                    <h2>
                      Start date :{" "}
                      {task.startDate ? formatDate(task.startDate) : "N/A"}
                    </h2>
                    <h2>
                      End date :{" "}
                      {task.dateFinished
                        ? formatDate(task.dateFinished)
                        : "N/A"}
                    </h2>
                  </div>
                </div>
              </CardButtonWithNoStyles>
            );
          })}
        </GapList>
      )}
    </PageWithNavigation>
  );
}
