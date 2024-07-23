import CardButton from "../components/CardButton";
import CardLink from "../components/CardLink";
import GapList from "../components/GapList";
import PageHeading from "../components/PageHeading";
import PageWithNavigation from "../components/PageWithNavigation";

export default function DriversPage() {
  const createDriver = () => {
    console.log("Creating driver...");
  };

  return (
    <PageWithNavigation>
      <PageHeading>Drivers</PageHeading>
      <GapList>
        <CardButton onClick={createDriver}>+ Add new driver</CardButton>
        <CardLink to="/">Driver information</CardLink>
      </GapList>
    </PageWithNavigation>
  );
}
