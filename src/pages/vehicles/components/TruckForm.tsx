import { SyntheticEvent, useState } from "react";
import FormWithButton from "../../../components/FormWithButton";

type TruckFormProps = {
  onSubmit: (e: SyntheticEvent) => unknown;
  buttonText: string;
};
export default function TruckForm({
  onSubmit: callback,
  buttonText,
}: TruckFormProps) {
  const [model, setModel] = useState<string>();
  const [licensePlate, setLicensePlate] = useState<string>();
  const [payload, setPayload] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [length, setLength] = useState<number>();

  return (
 
    <FormWithButton buttonText={buttonText} onSubmit={callback}>
      <label htmlFor="model">Model</label>
      <input
        name="model"
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <label htmlFor="license-plate">Licence plate</label>
      <input
        name="license-plate"
        type="text"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
      />
      <label htmlFor="payload">Payload</label>
      <input
        name="payload"
        type="number"
        value={payload}
        onChange={(e) => setPayload(Number(e.target.value))}
      />
      <label htmlFor="height">Height</label>
      <input
        name="height"
        type="number"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
      />
      <label htmlFor="weight">Weight</label>
      <input
        name="weight"
        type="number"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />
      <label htmlFor="length">Length</label>
      <input
        name="length"
        type="number"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
    </FormWithButton>
   
  );
}
