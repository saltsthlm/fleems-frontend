import { SyntheticEvent } from "react";
import TruckForm from "./TruckForm";

export default function EditTruckForm() {
  const updateTruck = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Updating truck...");
  };

  return <TruckForm buttonText="UPDATE" onSubmit={updateTruck} />;
}
