import { useState, useMemo, useEffect } from "react";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import useApi from "../../hooks/useApi";
import { TableTask, Task } from "../../types/ApiResponses";
import Throbber from "../../components/Throbber";
import CardButtonWithNoStyles from "../../components/CardButtonWithNoStyles";
import Card from "../../components/Card";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import SearchBar from "../../components/SearchBar";
import FormButton from "../../components/FormButton";
import TaskAssignForm from "./components/TaskAssignForm";
import Table from "../../components/Table";
import useScreenType from "../../hooks/useScreenType";

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
  const [selectedTask, setSelectedTask] = useState<TableTask>();
  const [isShowingAssignForm, setIsShowingAssignForm] =
    useState<boolean>(false); // New state for form visibility
  const [activeTab, setActiveTab] = useState<string>("information");

  const { isMobile } = useScreenType();
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

  const [tableData, setTableData] = useState<TableTask[]>([]);
  useEffect(() => {
    if (filteredData != undefined) {
      setTableData(
        filteredData
          .map((task) => {
            const {
              client,
              legs,
              startDestination,
              endDestination,
              startAddress,
              endAddress,
              dateCreated,
              dateFinished,
              startDate,
              ...tablesD
            } = task;
            return {
              client: client.name,
              startAddress: startAddress.city,
              endAddress: endAddress.city,
              dateCreated: dateCreated
                ? new Date(dateCreated).toLocaleDateString()
                : "-",
              dateFinished: dateFinished
                ? new Date(dateFinished).toLocaleDateString()
                : "-",
              startDate: startDate
                ? new Date(startDate).toLocaleDateString()
                : "-",
              legsLength: legs.length,
              ...tablesD,
            };
          })
          .sort((t1, t2) => {
            if (t1.state.toUpperCase() == "UNASSIGNED") {
              return -1;
            } else if (t2.state.toUpperCase() == "UNASSIGNED") {
              return 1;
            } else {
              return 0;
            }
          })
      );
    }
  }, [filteredData]);

  const viewTask = (task: TableTask) => {
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

  const resetPage = () => {
    setIsShowingAssignForm(false);
    setIsViewingTask(false);
    setSelectedTask(undefined);
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
                setIsShowingAssignForm(false);
              }}
              buttonText="ASSIGN"
              initialTask={selectedTask}
            />
          </>
        ) : (
          <>
            <PageHeading>
              <button onClick={viewList}>&lt; Task information</button>
            </PageHeading>
            <Card className="text-center w-2/5 mx-auto">
              <h1 className="text-xl">{selectedTask.client}</h1>
              <h2>
                Route : {selectedTask.startAddress} - {selectedTask.endAddress}
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
              <h2>No. of legs : {selectedTask.legsLength}</h2>
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
        <div>
          {tableData !== undefined && !isMobile && (
            <div className="mt-6">
              <Table callback={(a) => viewTask(a)} data={tableData} />
            </div>
          )}
          {isMobile && (
            <GapList className="grid-cols-1">
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
                          Route : {task.startAddress.city} -{" "}
                          {task.endAddress.city}
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
        </div>
      )}
    </PageWithNavigation>
  );
}
