import { Task } from "../types/ApiResponses";
import CardHarsh from "./CardHarsh";
import RouteMap from "./RouteMap";

type TaskViewProps = {
  task: Task | undefined;
};
export default function TaskView({ task }: TaskViewProps) {
  return (
    <div className="grid grid-rows-[1fr_auto] gap-5">
      {task ? (
        <>
          <RouteMap legs={task.legs} className="w-50" />
          <CardHarsh className="text-2xl h-min self-end">
            <p>Driver: dawdawdawdw</p>
            <p>Vehicle: dawdadaw</p>
            <p>
              Task: Transportation of {task.payload} {task.product}
            </p>
            <p>Duration: {task.expectedTime / 24} Days</p>
            <p>
              Route: {task.startDestination} - {task.endDestination}
            </p>
            <p>Total distance: {task.expectedDistance} km</p>
          </CardHarsh>
        </>
      ) : (
        <h1>Select a trip to display details</h1>
      )}
    </div>
  );
}
