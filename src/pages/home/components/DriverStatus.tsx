import { PieChart } from "@mui/x-charts";
import Card from "../../../components/Card";
import useScreenType from "../../../hooks/useScreenType";
import Throbber from "../../../components/Throbber";
import useApi from "../../../hooks/useApi";

export default function DriverStatus() {
  const { isMobile } = useScreenType();
  const { data, isLoading } = useApi("stats", { statsEndpoint: "driver" });

  return (
    <Card className="w-full">
      <h1 className="text-xl">Driver status data</h1>
      {isLoading ? (
        <Throbber />
      ) : (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: data?.[0] ?? 1, label: "Assigned" },
                { id: 1, value: data?.[1] ?? 1, label: "Unassigned" },
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
