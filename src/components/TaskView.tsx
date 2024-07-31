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
            <p className="text-lg">Driver : <span className="text-xl">{task.legs[0]?.driver?.name}</span></p>
            <p className="text-lg">Vehicle : <span className="text-xl">{task.legs[0]?.vehicle?.licenseNumber}</span></p>
            <p className="text-lg">
              Task : <span className="text-xl">Transportation of {task.payload} {task.product}</span>
            </p>
            <p className="text-lg">Duration : <span className="text-xl">{Math.floor(task.expectedTime)} Days</span></p>
            <p className="text-lg">
              Route : <span className="text-xl">{task.startAddress.city} - {task.endAddress.city}</span>
            </p>
            <p className="text-lg">Total distance : <span className="text-xl">{Math.floor(task.expectedDistance)} km</span></p>
          </CardHarsh>
        </>
      ) : (
        <h1 className="text-3xl text-center flex h-full items-center justify-center">
          Select a trip to display details here
        </h1>
      )}
    </div>
  );
}
