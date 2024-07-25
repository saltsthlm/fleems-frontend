import Card from "../../components/Card";
import FormButton from "../../components/FormButton";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";

export default function ProfilePage() {
  return (
    <PageWithNavigation>
      <PageHeading>My Profile</PageHeading>
      <GapList>
        <Card className="mb-10 text-center py-10">
          <h1 className="text-xl">Supipi Algama</h1>
          <h2>supipi.algama@gmail.com</h2>
        </Card>
        <FormButton className="w-3/5">LOGOUT</FormButton>
        <FormButton overrideColor className="text-danger w-3/5">
          DELETE ACCOUNT
        </FormButton>
      </GapList>
    </PageWithNavigation>
  );
}
