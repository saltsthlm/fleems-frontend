import { LineChart } from "@mui/x-charts";
import Card from "../../../components/Card";

export default function FleetDataStats() {
  return (
    <Card>
      <h1 className="text-xl">Super awesome data</h1>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
    </Card>
  );
}
