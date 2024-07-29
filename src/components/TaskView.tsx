import { Task } from "../types/ApiResponses";
import CardHarsh from "./CardHarsh";

type TaskViewProps = {
  task: Task | undefined;
};
export default function TaskView({ task }: TaskViewProps) {
  return (
    <div className="flex flex-col gap-5">
      {task ? (
        <>
          <CardHarsh className="h-full">
            <h1>Map here</h1>
          </CardHarsh>
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
