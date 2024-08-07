import { PieChart } from "@mui/x-charts";
import Card from "../../../components/Card";
import useScreenType from "../../../hooks/useScreenType";
import Throbber from "../../../components/Throbber";
import useApi from "../../../hooks/useApi";

export default function TaskStatus() {
  const { isMobile } = useScreenType();
  const { data, isLoading } = useApi("stats", { statsEndpoint: "tasks" });

  return (
    <Card className="w-full">
      <h1 className="text-xl">Task status data</h1>
      {isLoading ? (
        <Throbber />
      ) : (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: data?.[0] ?? 1, label: "Assigned" },
                { id: 1, value: data?.[1] ?? 1, label: "Unassigned" },
                { id: 2, value: data?.[2] ?? 1, label: "Ongoing" },
                { id: 3, value: data?.[3] ?? 1, label: "Finnished" },
              ],
            },
          ]}
          height={isMobile ? 150 : 200}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 14,
                paddingRight: 5,
              },
              itemMarkWidth: 12,
              itemMarkHeight: 12,
              markGap: 5,
              itemGap: 10,
            },
          }}
        />
      )}
    </Card>
  );
}
