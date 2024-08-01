import { SyntheticEvent, useState, useEffect } from "react";
import FormWithButton from "../../../components/FormWithButton";
import { Task } from "../../../types/ApiResponses";

type FormData = {
  task: string;
  driver: string;
  licensePlate: string;
  startDate?: Date;
  endDate?: Date;
  route: string;
  client: string;
};

type TaskAssignFormProps = {
  onSubmit: (data: FormData) => void;
  buttonText: string;
  initialTask?: Task;
  drivers: string[];
};

export default function TaskAssignForm({
  onSubmit: callback,
  buttonText,
  initialTask,
  drivers,
}: TaskAssignFormProps) {
  const [task, setTask] = useState<string>(
    initialTask
      ? `Transportation of ${initialTask.payload} ${initialTask.product}`
      : ""
  );
  const [driver, setDriver] = useState<string>(initialTask?.driver ?? "");
  const [licensePlate, setLicensePlate] = useState<string>(
    initialTask?.licensePlate ?? ""
  );
  const [route, setRoute] = useState<string>(
    initialTask
      ? `${initialTask.startAddress.city} - ${initialTask.endAddress.city}`
      : ""
  );
  const [client, setClient] = useState<string>(initialTask?.client.name ?? "");

  useEffect(() => {
    if (initialTask) {
      setRoute(
        `${initialTask.startAddress.city} - ${initialTask.endAddress.city}`
      );
    }
  }, [initialTask]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const formData: FormData = {
      task,
      driver,
      licensePlate,
      route,
      client,
    };

    callback(formData);
  };

  return (
    <FormWithButton buttonText={buttonText} onSubmit={handleSubmit}>
      <label htmlFor="client">Client</label>
      <input
        name="client"
        type="text"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />
      <label htmlFor="task">Task</label>
      <input
        name="task"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <label htmlFor="driver">Driver</label>
      <select
        name="driver"
        value={driver}
        onChange={(e) => setDriver(e.target.value)}
        className="bg-white text-black p-2 w-full gap-3 rounded-xl"
      >
        <option value="">Select driver</option>
        {drivers.map((driverName) => (
          <option key={driverName} value={driverName}>
            {driverName}
          </option>
        ))}
      </select>
      <label htmlFor="license-plate">License plate</label>
      <input
        name="license-plate"
        type="text"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
      />
      <label htmlFor="route">Route</label>
      <input
        name="route"
        type="text"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
      />
    </FormWithButton>
  );
}
