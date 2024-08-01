import { SyntheticEvent, useState } from "react";
import FormWithButton from "../../../components/FormWithButton";
import { CreateDriver } from "../../../types/createTypes";

type DriverFormProps = {
  onSubmit: (driver: CreateDriver) => void;
  buttonText: string;
};

export default function DriverForm({
  onSubmit: callback,
  buttonText,
}: DriverFormProps) {
  const [name, setName] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  const callCallbackWithDriver = (e: SyntheticEvent) => {
    e.preventDefault();
    const driver: CreateDriver = {
      name,
      licenseNumber,
      emailAddress: email,
      phoneNumber: mobileNumber,
      photo: picture,
    };
    callback(driver);
  };

  return (
    <FormWithButton buttonText={buttonText} onSubmit={callCallbackWithDriver}>
      <label htmlFor="name">Name of the driver</label>
      <input
        name="name"
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="license-number">Lincense number</label>
      <input
        name="license-number"
        type="text"
        value={licenseNumber}
        required
        onChange={(e) => setLicenseNumber(e.target.value)}
      />
      <label htmlFor="address">Address</label>
      <input
        name="address"
        type="text"
        value={address}
        required
        onChange={(e) => setAddress(e.target.value)}
      />
      <label htmlFor="mobile-number">Mobile number</label>
      <input
        name="mobile-number"
        type="text"
        value={mobileNumber}
        required
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <label htmlFor="email">Email address</label>
      <input
        name="email"
        type="email"
        value={email}
        required
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
