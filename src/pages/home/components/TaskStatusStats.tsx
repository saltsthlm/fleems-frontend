import { PieChart } from "@mui/x-charts";
import Card from "../../../components/Card";
import useScreenType from "../../../hooks/useScreenType";

export default function TaskStatusTasks() {
  const { isMobile } = useScreenType();

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
        height={isMobile ? 100 : 200}
      />
    </Card>
  );
}
