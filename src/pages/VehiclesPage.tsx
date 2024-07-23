import CardButton from "../components/CardButton";
import CardLink from "../components/CardLink";
import GapList from "../components/GapList";
import PageHeading from "../components/PageHeading";
import PageWithNavigation from "../components/PageWithNavigation";

export default function VehiclesPage() {
  const createTruck = () => {
    console.log("Adding truck...");
  };

  return (
    <PageWithNavigation>
      <PageHeading>Vehicles</PageHeading>
      <GapList>
        <CardButton onClick={createTruck}>+ Add new truck</CardButton>
        <CardLink to="/">Fleet information</CardLink>
      </GapList>
    </PageWithNavigation>
  );
}
