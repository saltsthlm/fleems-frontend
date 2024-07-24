import { SyntheticEvent } from "react";
import DriverForm from "./DriverForm";

export default function CreateDriverForm() {
  const createDriver = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Creating driver from CreateDriverForm component");
  };

  return <DriverForm buttonText="REGISTER" onSubmit={createDriver} />;
}
