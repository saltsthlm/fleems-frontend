import { SyntheticEvent, useState } from "react";
import FormWithButton from "../../../components/FormWithButton";

type DriverFormProps = {
  onSubmit: (e: SyntheticEvent) => unknown;
  buttonText: string;
};
export default function DriverForm({
  onSubmit: callback,
  buttonText,
}: DriverFormProps) {
  const [name, setName] = useState<string>();
  const [licenseNumber, setLicenseNumber] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [mobileNumber, setMobileNumber] = useState<string>();
  const [picture, setPicture] = useState<string>();

  return (
    <FormWithButton buttonText={buttonText} onSubmit={callback}>
      <label htmlFor="name">Name of the driver</label>
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="license-number">Lincense number</label>
      <input
        name="license-number"
        type="text"
        value={licenseNumber}
        onChange={(e) => setLicenseNumber(e.target.value)}
      />
      <label htmlFor="address">Address</label>
      <input
        name="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <label htmlFor="mobile-number">Mobile number</label>
      <input
        name="mobile-number"
        type="text"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <label htmlFor="email">Email address</label>
      <input
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="picture">Picture</label>
      <input
        name="picture"
        type="text"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      />
    </FormWithButton>
  );
}
