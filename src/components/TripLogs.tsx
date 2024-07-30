import { useState } from "react";
import useApi from "../hooks/useApi";
import CardTr from "./CardTr";
import Throbber from "./Throbber";
import { Task } from "../types/ApiResponses";
import useScreenType from "../hooks/useScreenType";
import TaskView from "./TaskView";
import FormButton from "./FormButton";
import DestinationsMarker from "./DestinationsMarker";

export default function TripLogs() {
  const [currentlyViewedTask, setCurrentlyViewedTask] = useState<Task>();
  const { isMobile } = useScreenType();
  const trips = useApi("tasks");

  if (trips.isLoading) {
    return <Throbber />;
  }

  if (trips.error) {
    return <h1>An error ocurred: {trips.error.message}</h1>;
  }

  if (!trips.data || trips.data.length == 0) {
    return <h1>There's no data to display here.</h1>;
  }

  if (isMobile && currentlyViewedTask != null) {
    return (
      <>
        <FormButton onClick={() => setCurrentlyViewedTask(undefined)}>
          &lt; Back to list
        </FormButton>
        <TaskView task={currentlyViewedTask} />
      </>
    );
  }

  return (
    <div className={`${!isMobile && "grid grid-cols-2 gap-5"}`}>
      <table className={isMobile ? "text-xs" : ""}>
        <thead>
          <tr className="grid w-full grid-cols-4">
            <th>Task</th>
            <th>Duration</th>
            <th>Location</th>
            <th>Trip details</th>
          </tr>
        </thead>
        <tbody className="grid gap-2 h-[75svh] overflow-y-scroll">
          {trips.data.map((trip, index) => (
            <CardTr
              key={index}
              className={`grid-cols-4 items-center ${currentlyViewedTask?.id == trip.id && "bg-button"}`}
              onClick={() => setCurrentlyViewedTask(trip)}
            >
              <td>
                Transportation of {trip.payload} {trip.product}
              </td>
              <td>
                {new Date(trip.startDate).toLocaleDateString()}{" "}
                {new Date(trip.startDate).toLocaleTimeString()} to
                <br />
                {trip.dateFinished
                  ? new Date(trip.startDate).toLocaleDateString() +
                    " " +
                    new Date(trip.startDate).toLocaleTimeString()
                  : "Present"}
              </td>
              <td className="flex">
                <DestinationsMarker className="px-2" />
                <div className="h-full grid gap-1 text-left">
                  <p>{trip.startDestination}</p>
                  <p className="mt-auto">{trip.endDestination}</p>
                </div>
              </td>
              <td>{trip.expectedDistance} km</td>
            </CardTr>
          ))}
        </tbody>
      </table>
      {!isMobile && <TaskView task={currentlyViewedTask} />}
    </div>
  );
}
