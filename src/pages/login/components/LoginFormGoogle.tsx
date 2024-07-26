import FormButton from "../../../components/FormButton";
import { useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "@tanstack/react-router";
import Throbber from "../../../components/Throbber";
import { useAuth } from "../../../AuthProvider";

export default function LoginFormGoogle() {
  const navigate = useNavigate({ from: "/login" });
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, isLoggedIn, saveUser } = useAuth();

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
          <GoogleLogin onSuccess={(e) => saveUser(e.credential)} />
          <FormButton
            className="w-3/5"
            onClick={() => {
              setLoading(true);
              login();
            }}
          >
            <strong>LOGIN</strong>
          </FormButton>
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