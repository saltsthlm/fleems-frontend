import { SyntheticEvent, useState, useEffect } from "react";
import FormWithButton from "../../../components/FormWithButton";
import { Task } from "../../../types/ApiResponses";

type FormData = {
  task: number; 
  driver: string;
  licensePlate: string;
  startDate?: Date;
  endDate?: Date;
  route: string;
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
  const [task, setTask] = useState<number>(initialTask?.payload ?? 0); // Assuming payload is a number
  const [driver, setDriver] = useState<string>(initialTask?.driver ?? ''); // Default to empty string if driver is undefined
  const [licensePlate, setLicensePlate] = useState<string>(initialTask?.licensePlate ?? ''); // Default to empty string if licensePlate is undefined
  // const [startDate, setStartDate] = useState<string>(initialTask?.startDate ? initialTask.startDate.toISOString().split('T')[0] : ''); // Format as YYYY-MM-DD
  // const [endDate, setEndDate] = useState<string>(initialTask?.endDate ? initialTask.endDate.toISOString().split('T')[0] : ''); // Format as YYYY-MM-DD
   const [route, setRoute] = useState<string>(initialTask ? `${initialTask.startDestination} - ${initialTask.endDestination}` : '');

 
  useEffect(() => {
    if (initialTask) {
      // setStartDate(initialTask.startDate ? initialTask.startDate.toISOString().split('T')[0] : '');
      // setEndDate(initialTask.endDate ? initialTask.endDate.toISOString().split('T')[0] : '');
      setRoute(`${initialTask.startDestination} - ${initialTask.endDestination}`);
    }
  }, [initialTask]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const formData: FormData = {
      task,
      driver,
      licensePlate,
      // startDate: startDate ? new Date(startDate) : undefined,
      // endDate: endDate ? new Date(endDate) : undefined,
      route,
    };

    callback(formData); 
  };

  return (
    <FormWithButton buttonText={buttonText} onSubmit={handleSubmit}>
      <label htmlFor="task">Task</label>
      <input
        name="task"
        type="number"
        value={task}
        onChange={(e) => setTask(Number(e.target.value))}
      />
      <label htmlFor="driver">Driver</label>
      <select
        name="driver"
        value={driver}
        onChange={(e) => setDriver(e.target.value)}
      >
        <option value="">Select driver</option>
        {drivers.map((driverName) => (
          <option key={driverName} value={driverName}>{driverName}</option>
        ))}
      </select>
      <label htmlFor="license-plate">License plate</label>
      <input
        name="license-plate"
        type="text"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
      />
      <label htmlFor="startDate">Start date</label>
      {/* <input
        name="startDate"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      /> */}
      <label htmlFor="endDate">End date</label>
      {/* <input
        name="endDate"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      /> */}
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
