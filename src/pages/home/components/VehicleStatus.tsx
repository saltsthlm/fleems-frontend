import { PieChart } from "@mui/x-charts";
import Card from "../../../components/Card";
import useScreenType from "../../../hooks/useScreenType";
import Throbber from "../../../components/Throbber";
import useApi from "../../../hooks/useApi";

export default function Vehiclestatus() {
  const { isMobile } = useScreenType();
  const { data, isLoading } = useApi("stats", { statsEndpoint: "vehicles" });

  return (
    <Card>
      <h1 className="text-xl">Vehicle status data</h1>
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
          height={isMobile ? 100 : 200}
        />
      )}
    </Card>
  );
}
