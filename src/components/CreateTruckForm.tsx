import { SyntheticEvent } from "react";
import TruckForm from "./TruckForm";

export default function CreateTruckForm() {
  const createTruck = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Creating truck from CreateTruckForm component");
  };

  return <TruckForm buttonText="REGISTER" onSubmit={createTruck} />;
}
