import { SyntheticEvent, useState } from "react";
import FormWithButton from "./FormWithButton";

export default function CreateDriverForm() {
  const [name, setName] = useState<string>();

  const createDriver = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Creating driver from CreateDriverForm component");
  };

  return (
    <FormWithButton buttonText="REGISTER" onSubmit={createDriver}>
      <label htmlFor="name">Name of the driver</label>
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </FormWithButton>
  );
}
