import { SyntheticEvent } from "react";
import DriverForm from "./DriverForm";

export default function EditDriverForm() {
  const updateDriver = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Updating driver...");
  };

  return <DriverForm buttonText="UPDATE" onSubmit={updateDriver} />;
}
