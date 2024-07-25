import Card from "../../../components/Card";
import { Task as TaskType } from "../../../types/ApiResponses";

type TaskProps = {
  task: TaskType;
};
export default function Task({ task }: TaskProps) {
  return (
    <Card>
      <h1>{task.id}</h1>
    </Card>
  );
}
