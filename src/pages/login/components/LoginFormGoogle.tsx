import FormButton from "../../../components/FormButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { redirect, useNavigate } from "@tanstack/react-router";
import Throbber from "../../../components/Throbber";

export default function LoginFormGoogle() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate({ from: "/login" });
  const [loading, setLoading] = useState<boolean>(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      navigate({ to: "/" });
    },
    onError: (error) => alert("Login Failed:" + error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Throbber />
      ) : (
        <FormButton
          className="w-3/5"
          onClick={() => {
            setLoading(true);
            login();
          }}
        >
          <strong>LOGIN</strong>
        </FormButton>
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
