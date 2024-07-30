import { useState } from "react";
import useApi from "../hooks/useApi";
import CardTr from "./CardTr";
import Throbber from "./Throbber";
import { Task } from "../types/ApiResponses";
import useScreenType from "../hooks/useScreenType";
import TaskView from "./TaskView";
import FormButton from "./FormButton";
import DestinationsMarker from "./DestinationsMarker";
import SearchBar from "./SearchBar";

export default function TripLogs() {
  const [currentlyViewedTask, setCurrentlyViewedTask] = useState<Task>();
  const [searchFilter, setSearchFilter] = useState<string>("");
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

  const zeroPad = (num: number, places: number): string =>
    String(num).padStart(places, "0");

  const formatDate = (date: string | Date): string => {
    if (!date) {
      return "Present";
    }
    const newDate = date instanceof Date ? date : new Date(date);
    if (isMobile) {
      return `${newDate.toLocaleDateString()}`;
    }
    return `${newDate.toLocaleDateString()} ${zeroPad(newDate.getHours(), 2)}:${zeroPad(newDate.getMinutes(), 2)}`;
  };

  return (
    <div className={`${!isMobile && "grid grid-cols-2 gap-5"}`}>
      <div>
        <SearchBar callback={setSearchFilter} />
        <table className={isMobile ? "text-xs" : ""}>
          <thead>
            <tr className="grid w-full grid-cols-4 gap-3 px-3">
              <th>Task</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Trip details</th>
            </tr>
          </thead>
          <tbody className="grid gap-2 h-[70svh] overflow-y-scroll">
            {trips.data
              .filter((t) =>
                t.product.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .map((trip, index) => (
                <CardTr
                  key={index}
                  className={`grid-cols-4 items-center hover:cursor-pointer ${currentlyViewedTask?.id == trip.id && "bg-button"} ${!isMobile && "p-3"}`}
                  onClick={() => setCurrentlyViewedTask(trip)}
                >
                  <td>
                    {isMobile
                      ? trip.payload + " " + trip.product
                      : `Transportation of ${trip.payload} ${trip.product}`}
                  </td>
                  <td>
                    {formatDate(trip.startDate)}
                    <br />
                    {formatDate(trip.dateFinished)}
                  </td>
                  <td className="flex">
                    <DestinationsMarker className="px-2" />
                    <div className="h-full grid gap-1 text-left">
                      <p>{trip.startAddress.city}</p>
                      <p className="mt-auto">{trip.endAddress.city}</p>
                    </div>
                  </td>
                  <td>{Math.floor(trip.expectedDistance)} km</td>
                </CardTr>
              ))}
          </tbody>
        </table>
      </div>
      {!isMobile && <TaskView task={currentlyViewedTask} />}
    </div>
  );
}
