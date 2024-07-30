import { useState } from "react";
import Card from "../../components/Card";
import FormButton from "../../components/FormButton";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import Popup from "../../components/Popup";
import { useAuth } from "../../AuthProvider";
import LoginFormGoogle from "../login/components/LoginFormGoogle";

export default function ProfilePage() {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
  const { isLoggedIn, profile } = useAuth();

  const logout = () => {
    console.log("Logging out...");
    setIsLoggingOut(false);
  };

  const deleteAccount = () => {
    console.log("Deleting account...");
    setIsDeletingAccount(false);
  };

  return (
    <PageWithNavigation>
      <PageHeading noProfileButton>My Profile</PageHeading>
      {isLoggingOut && (
        <Popup>
          <Card className="bg-tertiary w-full p-12">
            <h1 className="text-center">Are you sure you want to logout?</h1>
            <div className="flex gap-4 justify-between [&>button]:grow">
              <FormButton
                onClick={logout}
                className="text-danger"
                overrideColor
              >
                YES
              </FormButton>
              <FormButton onClick={() => setIsLoggingOut(false)}>NO</FormButton>
            </div>
          </Card>
        </Popup>
      )}
      {isDeletingAccount && (
        <Popup>
          <Card className="bg-tertiary w-full p-12">
            <h1 className="text-center">
              Are you sure you want to delete this account?
            </h1>
            <div className="flex gap-4 justify-between [&>button]:grow">
              <FormButton
                onClick={deleteAccount}
                className="text-danger"
                overrideColor
              >
                YES
              </FormButton>
              <FormButton onClick={() => setIsDeletingAccount(false)}>
                NO
              </FormButton>
            </div>
          </Card>
        </Popup>
      )}
      {isLoggedIn && profile && (
        <GapList>
          <Card className="mb-10 text-center py-10">
            <img src={profile.picture} alt="user image" className="aspect-square w-[clamp(80px,100%,200px)] mx-auto"/>
            <h1 className="text-xl">{profile.name}</h1>
            <h2>{profile.email}</h2>
          </Card>
          
          <FormButton onClick={() => logout()} className="w-3/5">
            LOGOUT
          </FormButton>
          <FormButton
            onClick={() => setIsDeletingAccount(true)}
            overrideColor
            className="text-danger w-3/5"
          >
            DELETE ACCOUNT
          </FormButton>

          
        </GapList>
      )}
      {!isLoggedIn && <LoginFormGoogle />}
    </PageWithNavigation>
  );
}
