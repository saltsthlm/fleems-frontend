import useScreenType from "../hooks/useScreenType";
import { Task } from "../types/ApiResponses";
import CardHarsh from "./CardHarsh";
import RouteMap from "./RouteMap";

type TaskViewProps = {
  task: Task | undefined;
};
export default function TaskView({ task }: TaskViewProps) {
  const { isMobile } = useScreenType();

  return (
    <div className="grid grid-rows-[1fr_auto] gap-5">
      {task ? (
        <>
          <RouteMap legs={task.legs} className="min-h-80" />
          <CardHarsh
            className={`${isMobile ? "text-md" : "text-2xl"} h-min self-end`}
          >
            <p>Driver: {task.legs[0]?.driver?.name}</p>
            <p>Vehicle: {task.legs[0]?.vehicle?.licenseNumber}</p>
            <p>
              Task: Transportation of {task.payload} {task.product}
            </p>
            <p>Duration: {Math.floor(task.expectedTime)} Days</p>
            <p>
              Route: {task.startAddress.city} - {task.endAddress.city}
            </p>
            <p>Total distance: {Math.floor(task.expectedDistance)} km</p>
          </CardHarsh>
        </>
      ) : (
        <h1>Select a trip to display details</h1>
      )}
    </div>
  );
}
