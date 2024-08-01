import DriverForm from "./DriverForm";
import toast from "react-hot-toast";
import usePostApi from "../../../hooks/usePostApi";
import Throbber from "../../../components/Throbber";
import { CreateDriver } from "../../../types/createTypes";

type CreateDriverFormProps = {
  afterSubmit?: () => void;
};
export default function CreateDriverForm({
  afterSubmit,
}: CreateDriverFormProps) {
  const { doPost, isLoading, error, isSuccess } = usePostApi("drivers");

  const createDriver = (driver: CreateDriver) => {
    if (!driver) {
      toast.error("Couldn't create driver.", { duration: 6000 });
      return;
    }

    doPost(driver);
  };

  if (error) {
    toast.error("An error ocurred: " + error.message, { duration: 6000 });
  }

  if (isLoading) {
    return <Throbber />;
  }

  if (isSuccess) {
    toast.success("Driver successfully created!", { duration: 6000 });
    if (afterSubmit) {
      afterSubmit();
    }
  }

  return <DriverForm buttonText="REGISTER" onSubmit={createDriver} />;
}
