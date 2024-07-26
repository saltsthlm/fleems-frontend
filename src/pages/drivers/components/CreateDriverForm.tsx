import { SyntheticEvent } from "react";
import DriverForm from "./DriverForm";

import usePostApi from "../../../hooks/usePostApi";
import { CreateDriver } from "../../../types/createTypes";

const nelsonTest: CreateDriver = {
  emailAddress: "hejnälson@gmail.com",
  licenseNumber: "123455-1234",
  name: "NelsonTest5",
  phoneNumber: "+46708342069",
  photo: "testpfp",
};

export default function CreateDriverForm() {
  usePostApi("drivers", nelsonTest);
  const createDriver = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return <DriverForm buttonText="REGISTER" onSubmit={createDriver} />;
}
