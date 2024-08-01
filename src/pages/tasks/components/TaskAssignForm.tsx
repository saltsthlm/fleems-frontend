import { SyntheticEvent, useState } from "react";
import FormWithButton from "../../../components/FormWithButton";
import { Driver, Task, Vehicle } from "../../../types/ApiResponses";
import useApi from "../../../hooks/useApi";
import Throbber from "../../../components/Throbber";
import toast from "react-hot-toast";

type FormData = {
  taskId: string;
  driverId: string;
  truckId: string;
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
}: TaskAssignFormProps) {
  const [driver, setDriver] = useState<Driver>();
  const [truck, setTruck] = useState<Vehicle>();

  const { data: driverData, isLoading: isDriverLoading } = useApi("drivers");

  const { data: truckData, isLoading: isTruckLoading } = useApi("vehicles");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!truck || !driver || !initialTask) {
      return;
    }
    const formData: FormData = {
      taskId: initialTask?.id,
      driverId: driver.id,
      truckId: truck.id,
    };
    toast.success("Task assigned!");
    callback(formData);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl p-4">
        Assign transportation of {initialTask?.product} for{" "}
        {typeof initialTask?.client == "string"
          ? initialTask?.client
          : initialTask?.client.name}
      </h1>
      <FormWithButton buttonText={buttonText} onSubmit={handleSubmit}>
        <label htmlFor="driver">Driver</label>
        {isDriverLoading ? (
          <Throbber />
        ) : (
          <select
            name="driver"
            value={driver?.id ?? ""}
            required
            onChange={(e) =>
              setDriver(
                driverData?.find((driver) => driver.id == e.target.value)
              )
            }
            className="bg-white text-black p-2 w-full gap-3 rounded-xl"
          >
            <option value="">-- Select driver --</option>
            {driverData?.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        )}
        <label htmlFor="truck">Truck</label>
        {isTruckLoading ? (
          <Throbber />
        ) : (
          <select
            name="truck"
            value={truck?.licenseNumber ?? ""}
            required
            onChange={(e) =>
              setTruck(
                truckData?.find(
                  (truck) => truck.licenseNumber == e.target.value
                )
              )
            }
            className="bg-white text-black p-2 w-full gap-3 rounded-xl"
          >
            <option value="">-- Select truck --</option>
            {truckData?.map((truck) => (
              <option key={truck.id} value={truck.licenseNumber}>
                {truck.licenseNumber}
              </option>
            ))}
          </select>
        )}
      </FormWithButton>
    </div>
  );
}
