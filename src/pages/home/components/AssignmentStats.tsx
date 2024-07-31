import { PieChart } from "@mui/x-charts";
import Card from "../../../components/Card";

export default function AssignmentStats() {
  return (
    <Card>
      <h1 className="text-xl">Task assignment data</h1>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Assigned" },
              { id: 1, value: 15, label: "Unassigned" },
            ],
          },
        ]}
        height={200}
      />
    </Card>
  );
}
