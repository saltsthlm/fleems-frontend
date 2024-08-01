import FormButton from "../../../components/FormButton";
import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "@tanstack/react-router";
import Throbber from "../../../components/Throbber";
import { useAuth } from "../../../AuthProvider";
import Card from "../../../components/Card";

export default function LoginFormGoogle() {
  const navigate = useNavigate({ from: "/login" });
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(null);
      setUser(codeResponse);
      console.log("codeResponse; " + codeResponse);
      navigate({ to: "/" });
    },
    onError: (error) => alert("Login Failed:" + error),
  });

  return (
    <>
      {loading ? (
        <Throbber />
      ) : (
        <>
          <Card className="w-2/3 mx-auto">
            <h1 className="text-center m-4 text-lg">
              Login with Google <br />
              to access your Fleems account
            </h1>

            <FormButton
              className="w-1/3 mx-auto flex"
              onClick={() => {
                setLoading(true);
                login();
              }}
            >
              <strong>LOGIN</strong>
            </FormButton>
          </Card>
        </>
      )}
    </>
  );
}
/*
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
<h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}*/
